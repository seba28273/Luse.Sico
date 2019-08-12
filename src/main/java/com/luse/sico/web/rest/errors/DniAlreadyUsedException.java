package com.luse.sico.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class DniAlreadyUsedException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;


    /*public DniAlreadyUsedException() {
        super(ErrorConstants.DNI_ALREADY_USED_TYPE, "El dni ingresado ya existe. Intenta Recuperar tu Cuenta!", "userManagement", "dniexists");
    }*/


    public DniAlreadyUsedException(String pMsn) {
        super(ErrorConstants.DNI_ALREADY_USED_TYPE, pMsn,  Status.NOT_FOUND);
    }
}
