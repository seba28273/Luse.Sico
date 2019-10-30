package com.luse.sico.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A CreditDetalle.
 */
@Entity
@Table(name = "credit_detalle")
public class CreditDetalle implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nro_cuota")
    private Long nroCuota;

    @Column(name = "fecha_programada")
    private Instant fechaProgramada;

    @Column(name = "fecha_ejecucion")
    private Instant fechaEjecucion;

    @Column(name = "reintentos")
    private Long reintentos;

    @Column(name = "ejecutada")
    private Boolean ejecutada;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "cantidad_renegociado")
    private Long cantidadRenegociado;

    /*@ManyToOne
    @JsonIgnoreProperties("credits")
    private Credit credit;*/

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNroCuota() {
        return nroCuota;
    }

    public CreditDetalle nroCuota(Long nroCuota) {
        this.nroCuota = nroCuota;
        return this;
    }

    public void setNroCuota(Long nroCuota) {
        this.nroCuota = nroCuota;
    }

    public Instant getFechaProgramada() {
        return fechaProgramada;
    }

    public CreditDetalle fechaProgramada(Instant fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
        return this;
    }

    public void setFechaProgramada(Instant fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
    }

    public Instant getFechaEjecucion() {
        return fechaEjecucion;
    }

    public CreditDetalle fechaEjecucion(Instant fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
        return this;
    }

    public void setFechaEjecucion(Instant fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public Long getReintentos() {
        return reintentos;
    }

    public CreditDetalle reintentos(Long reintentos) {
        this.reintentos = reintentos;
        return this;
    }

    public void setReintentos(Long reintentos) {
        this.reintentos = reintentos;
    }

    public Boolean isEjecutada() {
        return ejecutada;
    }

    public CreditDetalle ejecutada(Boolean ejecutada) {
        this.ejecutada = ejecutada;
        return this;
    }

    public void setEjecutada(Boolean ejecutada) {
        this.ejecutada = ejecutada;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public CreditDetalle observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getCantidadRenegociado() {
        return cantidadRenegociado;
    }

    public CreditDetalle cantidadRenegociado(Long cantidadRenegociado) {
        this.cantidadRenegociado = cantidadRenegociado;
        return this;
    }

    public void setCantidadRenegociado(Long cantidadRenegociado) {
        this.cantidadRenegociado = cantidadRenegociado;
    }

    /*public Credit getCredit() {
        return credit;
    }

    public CreditDetalle credit(Credit credit) {
        this.credit = credit;
        return this;
    }

    public void setCredit(Credit credit) {
        this.credit = credit;
    }*/
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CreditDetalle creditDetalle = (CreditDetalle) o;
        if (creditDetalle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), creditDetalle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CreditDetalle{" +
            "id=" + getId() +
            ", nroCuota=" + getNroCuota() +
            ", fechaProgramada='" + getFechaProgramada() + "'" +
            ", fechaEjecucion='" + getFechaEjecucion() + "'" +
            ", reintentos=" + getReintentos() +
            ", ejecutada='" + isEjecutada() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            ", cantidadRenegociado=" + getCantidadRenegociado() +
            "}";
    }
}
