package com.luse.sico.domain;

import javax.persistence.Entity;

import java.time.Instant;
import java.util.Date;

public class TokenSaved {

    private String token;
    private Date fechaVigencia;

    public Date getFechaVigencia() {
        return fechaVigencia;
    }

    public void setFechaVigencia(Date fechaVigencia) {
        this.fechaVigencia = fechaVigencia;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public TokenSaved(String token, Date fechavigencia) {
        this.token = token;
        this.fechaVigencia = fechavigencia;
    }
}
