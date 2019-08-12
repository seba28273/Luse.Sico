package com.luse.sico.web.rest.errors;

public class EmailAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public EmailAlreadyUsedException() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "El Correo ingresado ya existe. Intenta recuperar tu cuenta!", "userManagement", "emailexists");
    }
}
