package com.luse.sico.web.rest.errors;

public class LoginAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public LoginAlreadyUsedException() {
        super(ErrorConstants.LOGIN_ALREADY_USED_TYPE, "El Usuario ingresado ya existe", "userManagement", "userexists");
    }
}
