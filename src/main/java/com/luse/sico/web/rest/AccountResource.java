package com.luse.sico.web.rest;


import com.luse.sico.config.Constants;
import com.luse.sico.domain.Authority;
import com.luse.sico.domain.User;
import com.luse.sico.repository.UserRepository;
import com.luse.sico.security.SecurityUtils;
import com.luse.sico.security.jwt.JWTFilter;
import com.luse.sico.security.jwt.TokenProvider;
import com.luse.sico.service.MailService;
import com.luse.sico.service.UserService;
import com.luse.sico.service.dto.PasswordChangeDTO;
import com.luse.sico.service.dto.UserDTO;
import com.luse.sico.service.util.RandomUtil;
import com.luse.sico.web.rest.errors.*;
import com.luse.sico.web.rest.util.HeaderUtil;
import com.luse.sico.web.rest.vm.KeyAndPasswordVM;
import com.luse.sico.web.rest.vm.LoginSocialNetwork;
import com.luse.sico.web.rest.vm.LoginVM;
import com.luse.sico.web.rest.vm.ManagedUserVM;

import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;

    public AccountResource(UserRepository userRepository, UserService userService, MailService mailService) {

        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * POST  /register : register the user.
     *
     * @param managedUserVM the managed user View Model
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws LoginAlreadyUsedException 400 (Bad Request) if the login is already used
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
        if (!checkPasswordLength(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword(),false);
        mailService.sendActivationEmail(user);
    }

    /**
     * GET  /activate : activate the registered user.
     *
     * @param key the activation key
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be activated
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new InternalServerErrorException("No user was found for this activation key");
        }
    }

    /**
     * GET  /authenticate : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request
     * @return the login if the user is authenticated
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }


    @PostMapping("/userbyemailsocialnetwork")
    public LoginVM GetUserByEmail(@Valid @RequestBody LoginSocialNetwork loginSocialNetwork) {

        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(loginSocialNetwork.getEmail());
        LoginVM loginVM = new LoginVM();
        UserDTO userDTO = new UserDTO();
        if (existingUser.isPresent()) {
            String mFirsName;
            String mLastName;
            try {
                mFirsName = loginSocialNetwork.getUsername().split(" ")[0];
            } catch(Exception s){
                mFirsName = loginSocialNetwork.getUsername();
            }
            try {
                mLastName = loginSocialNetwork.getUsername().split(" ")[1];
            } catch(Exception s){
                mLastName = loginSocialNetwork.getUsername();
            }
            //long id, String firstName, String lastName, String email, String langKey, String imageUrl, String password
            userService.updateUserfromRedSocial(existingUser.get().getId(), mFirsName,
                mLastName, existingUser.get().getEmail(),
                "es", existingUser.get().getImageUrl(), loginSocialNetwork.getPassword());
        }
        else {
            userDTO.setEmail(loginSocialNetwork.getEmail());
            userDTO.setLogin(loginSocialNetwork.getEmail());
            try {
                userDTO.setFirstName(loginSocialNetwork.getUsername().split(" ")[0]);
            } catch(Exception s){
                userDTO.setFirstName(loginSocialNetwork.getUsername());
            }
            try {
                userDTO.setLastName(loginSocialNetwork.getUsername().split(" ")[1]);
            } catch(Exception s){
                userDTO.setLastName(loginSocialNetwork.getUsername());
            }
            userDTO.setActivated(true);

            userDTO.setImageUrl(loginSocialNetwork.getImageUrl());
            userDTO.setLangKey("es");

            userService.registerUser(userDTO, loginSocialNetwork.getPassword(), true);

        }
        loginVM.setUsername(loginSocialNetwork.getEmail());
        loginVM.setPassword(loginSocialNetwork.getPassword().toString());

        return loginVM;
    }

    /**
     * GET  /account : get the current user.
     *
     * @return the current user
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    public UserDTO getAccount() {
        return userService.getUserWithAuthorities()
            .map(UserDTO::new)
            .orElseThrow(() -> new InternalServerErrorException("User could not be found"));
    }

    /**
     * POST  /account : update the current user information.
     *
     * @param userDTO the current user information
     * @throws EmailAlreadyUsedException 400 (Bad Request) if the email is already used
     * @throws RuntimeException 500 (Internal Server Error) if the user login wasn't found
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) {
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new InternalServerErrorException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new InternalServerErrorException("User could not be found");
        }
        userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(),
            userDTO.getLangKey(), userDTO.getImageUrl());
    }

    /**
     * POST  /account/change-password : changes the current user's password
     *
     * @param passwordChangeDto current and new password
     * @throws InvalidPasswordException 400 (Bad Request) if the new password is incorrect
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (!checkPasswordLength(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * POST   /account/reset-password/init : Send an email to reset the password of the user
     *
     * @param mail the mail of the user
     * @throws EmailNotFoundException 400 (Bad Request) if the email address is not registered
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
       mailService.sendPasswordResetMail(
           userService.requestPasswordReset(mail)
               .orElseThrow(EmailNotFoundException::new)
       );
    }

    /**
     * POST   /account/reset-password/finish : Finish to reset the password of the user
     *
     * @param keyAndPassword the generated key and the new password
     * @throws InvalidPasswordException 400 (Bad Request) if the password is incorrect
     * @throws RuntimeException 500 (Internal Server Error) if the password could not be reset
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (!checkPasswordLength(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user =
            userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new InternalServerErrorException("No user was found for this reset key");
        }
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
            password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }
}
