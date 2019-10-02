package com.luse.sico.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Date;
import java.time.Instant;
import java.util.Objects;

/**
 * A RecaudadorDetalle.
 */
@Entity
@Table(name = "recaudador_detalle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RecaudadorDetalle implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ejecutada")
    private Long ejecutada;

    @Column(name = "fecha_ejecucion")
    private Instant fechaEjecucion;

    @Column(name = "fecha_programada")
    private Instant fechaProgramada;

    @Column(name = "nro_cuota")
    private Long nroCuota;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "reintentos")
    private Long reintentos;

    @Column(name = "id_recaudador")
    private Long recaudadorid;

    @ManyToOne
    @JsonIgnoreProperties("recaudadorDetalles")
    private Recaudador recaudador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEjecutada() {
        return ejecutada;
    }

    public RecaudadorDetalle ejecutada(Long ejecutada) {
        this.ejecutada = ejecutada;
        return this;
    }

    public void setEjecutada(Long ejecutada) {
        this.ejecutada = ejecutada;
    }

    public Instant getFechaEjecucion() {
        return fechaEjecucion;
    }

    public RecaudadorDetalle fechaEjecucion(Instant fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
        return this;
    }

    public void setFechaEjecucion(Instant fechaEjecucion) {
        this.fechaEjecucion = fechaEjecucion;
    }

    public Instant getFechaProgramada() {
        return fechaProgramada;
    }

    public RecaudadorDetalle fechaProgramada(Instant fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
        return this;
    }

    public void setFechaProgramada(Instant fechaProgramada) {
        this.fechaProgramada = fechaProgramada;
    }

    public Long getNroCuota() {
        return nroCuota;
    }

    public RecaudadorDetalle nroCuota(Long nroCuota) {
        this.nroCuota = nroCuota;
        return this;
    }

    public void setNroCuota(Long nroCuota) {
        this.nroCuota = nroCuota;
    }


    public Long getRecaudador_id() {
        return recaudadorid;
    }

    public RecaudadorDetalle recaudadorid(Long recaudadorid) {
        this.recaudadorid = recaudadorid;
        return this;
    }

    public void setRecaudador_id(Long recaudadorid) {
        this.recaudadorid = recaudadorid;
    }



    public String getObservaciones() {
        return observaciones;
    }

    public RecaudadorDetalle observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getReintentos() {
        return reintentos;
    }

    public RecaudadorDetalle reintentos(Long reintentos) {
        this.reintentos = reintentos;
        return this;
    }

    public void setReintentos(Long reintentos) {
        this.reintentos = reintentos;
    }

    public Recaudador getRecaudador() {
        return recaudador;
    }

    public RecaudadorDetalle recaudador(Recaudador recaudador) {
        this.recaudador = recaudador;
        return this;
    }

    public void setRecaudador(Recaudador recaudador) {
        this.recaudador = recaudador;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RecaudadorDetalle recaudadorDetalle = (RecaudadorDetalle) o;
        if (recaudadorDetalle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recaudadorDetalle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
    public RecaudadorDetalle()
    {
        super();
    }
    public RecaudadorDetalle(Long id, Long ejecutada, Long nroCuota, Long reintentos, Long recaudadorid)
    {
        //Date fechaEjecucion, Date fechaProgramada
        super();
        this.id = id;
        this.ejecutada = ejecutada;
       /* this.fechaEjecucion =(Instant)fechaEjecucion;
        this.fechaProgramada = (Instant)fechaProgramada;*/
        this.nroCuota = nroCuota;
        this.reintentos = reintentos;
        this.recaudadorid = recaudadorid;
    }



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
            ", recaudadorid=" + getRecaudador_id() +
            "}";
    }
}
