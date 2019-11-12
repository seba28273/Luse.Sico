package com.luse.sico.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A RecaudadorDetalle.
 */
@JsonIgnoreProperties
public class RecaudadorCuotasVencidas implements Serializable {

    private Long id;

    private Long ejecutada;

    private Instant fechaEjecucion;

    private Instant fechaProgramada;

    private Long nroCuota;

    private String observaciones;

    private Long reintentos;

    private Long recaudadorid;

    private String cantCuotas;

    private String Vencida;

    private String nombre;

    private String estadocuota;

    public String getEstadocuota() {
        return estadocuota;
    }

    public void setEstadocuota(String estadocuota) {
        this.estadocuota = estadocuota;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEjecutada() {
        return ejecutada;
    }

    public void setEjecutada(Long ejecutada) {
        this.ejecutada = ejecutada;
    }

    public Instant getFechaEjecucion() {
        return fechaEjecucion;
    }

    public void setFechaEjecucion(Instant fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public Instant getFechaProgramada() {
        return fechaProgramada;
    }

    public void setFechaProgramada(Instant fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
    }

    public Long getNroCuota() {
        return nroCuota;
    }

    public void setNroCuota(Long nroCuota) {
        this.nroCuota = nroCuota;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getReintentos() {
        return reintentos;
    }

    public void setReintentos(Long reintentos) {
        this.reintentos = reintentos;
    }

    public Long getRecaudadorid() {
        return recaudadorid;
    }

    public void setRecaudadorid(Long recaudadorid) {
        this.recaudadorid = recaudadorid;
    }

    public String getCantCuotas() {
        return cantCuotas;
    }

    public void setCantCuotas(String cantCuotas) {
        this.cantCuotas = cantCuotas;
    }

    public String getVencida() {
        return Vencida;
    }

    public void setVencida(String vencida) {
        Vencida = vencida;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RecaudadorCuotasVencidas recaudadorDetalle = (RecaudadorCuotasVencidas) o;
        if (recaudadorDetalle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recaudadorDetalle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
    public RecaudadorCuotasVencidas()
    {
        super();
    }

/*
    @Override
    public String toString() {
        return "RecaudadorDetalle{" +
            "id=" + getId() +
            ", ejecutada=" + getEjecutada() +
            ", fechaEjecucion='" + getFechaEjecucion() + "'" +
            ", fechaProgramada='" + getFechaProgramada() + "'" +
            ", nroCuota=" + getNroCuota() +
            ", observaciones='" + getObservaciones() + "'" +
            ", reintentos=" + getReintentos() +
            ", Vencida='" + getVencida() +  "'" +
            ", nombre='" + getNombre() +  "'" +
            ", cantCuotas='" + getCantCuotas() +  "'" +
            "}";
    }*/
}
