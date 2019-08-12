package com.luse.sico.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class EmailNotFoundException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public EmailNotFoundException() {
        super(ErrorConstants.EMAIL_NOT_FOUND_TYPE, "el Correo ingresado no esta registrado", Status.BAD_REQUEST);
    }

    public EmailNotFoundException(String pMsn) {
        super(ErrorConstants.EMAIL_NOT_FOUND_TYPE, pMsn,  Status.NOT_FOUND);
    }

}
