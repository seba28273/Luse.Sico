package com.luse.sico.web.rest;

import com.luse.sico.repository.UserRepository;
import com.luse.sico.security.SecurityUtils;
import com.luse.sico.security.jwt.JWTFilter;
import com.luse.sico.security.jwt.TokenProvider;
import com.luse.sico.service.MailService;
import com.luse.sico.service.UserService;
import com.luse.sico.web.rest.errors.InvalidPasswordException;
import com.luse.sico.web.rest.errors.LoginAlreadyUsedException;
import com.luse.sico.web.rest.vm.LoginVM;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import static com.luse.sico.security.SecurityUtils.getCurrentUserLogin;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;


    public UserJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;

        //userRepository = null;
    }


    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (loginVM.isRememberMe() == null) ? false : loginVM.isRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);


    }



    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;
        private String User;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        JWTToken(String idToken, String user) {
            this.idToken = idToken;
            this.User = user;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }


        @JsonProperty("usuario")
        String getUser() {
            return User;
        }

        void setUser(String User) {
            this.idToken = User;
        }

    }
}
