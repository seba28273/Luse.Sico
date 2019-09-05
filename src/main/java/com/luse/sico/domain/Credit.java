package com.luse.sico.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.luse.sico.domain.enumeration.Periodicidad;

import com.luse.sico.domain.enumeration.TipoCobro;

/**
 * A Credit.
 */
@Entity
@Table(name = "credit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Credit implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "periodicidad")
    private Periodicidad periodicidad;

    @Column(name = "dia_hora_ejecucion")
    private Long diaHoraEjecucion;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cobro")
    private TipoCobro tipoCobro;

    @Column(name = "monto")
    private Long monto;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "cant_cuotas")
    private Long cantCuotas;

    @Column(name = "cuota_cobrada")
    private Long cuotaCobrada;

    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @Column(name = "fecha_inicio")
    private Instant fechaInicio;

    @Column(name = "fecha_vencimiento")
    private Instant fechaVencimiento;

    @Column(name = "excluir_finde_semanas")
    private Boolean excluirFindeSemanas;

    @Column(name = "porc_participacion")
    private Long porcParticipacion;

    @Column(name = "capital_prestamo")
    private Long capitalPrestamo;

    @Column(name = "intereses_prestamos")
    private Long interesesPrestamos;

    @Column(name = "cuota_pura")
    private Long cuotaPura;

    @Column(name = "intereses_cuota")
    private Long interesesCuota;

    @Column(name = "cuota_recupero_capital")
    private Long cuotaRecuperoCapital;

    @Column(name = "cantidad_renegociado")
    private Long cantidadRenegociado;

    @Column(name = "incobrable")
    private Boolean incobrable;

    @Column(name = "pago_manual")
    private Boolean pagoManual;

    @Column(name = "es_personal")
    private Boolean esPersonal;

    @Column(name = "idCliente")
    private Long idCliente;

   /* @OneToMany(mappedBy = "credit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CreditDetalle> credits = new HashSet<>();
*/
    /*@OneToMany(mappedBy = "credit")
    @JsonIgnoreProperties("creditDetalle")
    private CreditDetalle credits;*/

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Periodicidad getPeriodicidad() {
        return periodicidad;
    }

    public Credit periodicidad(Periodicidad periodicidad) {
        this.periodicidad = periodicidad;
        return this;
    }

    public void setPeriodicidad(Periodicidad periodicidad) {
        this.periodicidad = periodicidad;
    }

    public Long getDiaHoraEjecucion() {
        return diaHoraEjecucion;
    }

    public Credit diaHoraEjecucion(Long diaHoraEjecucion) {
        this.diaHoraEjecucion = diaHoraEjecucion;
        return this;
    }

    public void setDiaHoraEjecucion(Long diaHoraEjecucion) {
        this.diaHoraEjecucion = diaHoraEjecucion;
    }

    public TipoCobro getTipoCobro() {
        return tipoCobro;
    }

    public Credit tipoCobro(TipoCobro tipoCobro) {
        this.tipoCobro = tipoCobro;
        return this;
    }

    public void setTipoCobro(TipoCobro tipoCobro) {
        this.tipoCobro = tipoCobro;
    }

    public Long getMonto() {
        return monto;
    }

    public Credit monto(Long monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(Long monto) {
        this.monto = monto;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Credit observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Boolean isActivo() {
        return activo;
    }

    public Credit activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getCantCuotas() {
        return cantCuotas;
    }

    public Credit cantCuotas(Long cantCuotas) {
        this.cantCuotas = cantCuotas;
        return this;
    }

    public void setCantCuotas(Long cantCuotas) {
        this.cantCuotas = cantCuotas;
    }

    public Long getCuotaCobrada() {
        return cuotaCobrada;
    }

    public Credit cuotaCobrada(Long cuotaCobrada) {
        this.cuotaCobrada = cuotaCobrada;
        return this;
    }

    public void setCuotaCobrada(Long cuotaCobrada) {
        this.cuotaCobrada = cuotaCobrada;
    }

    public Instant getFechaCreacion() {
        return fechaCreacion;
    }

    public Credit fechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Instant getFechaInicio() {
        return fechaInicio;
    }

    public Credit fechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Instant getFechaVencimiento() {
        return fechaVencimiento;
    }

    public Credit fechaVencimiento(Instant fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
        return this;
    }

    public void setFechaVencimiento(Instant fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public Boolean isExcluirFindeSemanas() {
        return excluirFindeSemanas;
    }

    public Credit excluirFindeSemanas(Boolean excluirFindeSemanas) {
        this.excluirFindeSemanas = excluirFindeSemanas;
        return this;
    }

    public void setExcluirFindeSemanas(Boolean excluirFindeSemanas) {
        this.excluirFindeSemanas = excluirFindeSemanas;
    }

    public Long getPorcParticipacion() {
        return porcParticipacion;
    }

    public Credit porcParticipacion(Long porcParticipacion) {
        this.porcParticipacion = porcParticipacion;
        return this;
    }

    public void setPorcParticipacion(Long porcParticipacion) {
        this.porcParticipacion = porcParticipacion;
    }

    public Long getCapitalPrestamo() {
        return capitalPrestamo;
    }

    public Credit capitalPrestamo(Long capitalPrestamo) {
        this.capitalPrestamo = capitalPrestamo;
        return this;
    }

    public void setCapitalPrestamo(Long capitalPrestamo) {
        this.capitalPrestamo = capitalPrestamo;
    }

    public Long getInteresesPrestamos() {
        return interesesPrestamos;
    }

    public Credit interesesPrestamos(Long interesesPrestamos) {
        this.interesesPrestamos = interesesPrestamos;
        return this;
    }

    public void setInteresesPrestamos(Long interesesPrestamos) {
        this.interesesPrestamos = interesesPrestamos;
    }

    public Long getCuotaPura() {
        return cuotaPura;
    }

    public Credit cuotaPura(Long cuotaPura) {
        this.cuotaPura = cuotaPura;
        return this;
    }

    public void setCuotaPura(Long cuotaPura) {
        this.cuotaPura = cuotaPura;
    }

    public Long getInteresesCuota() {
        return interesesCuota;
    }

    public Credit interesesCuota(Long interesesCuota) {
        this.interesesCuota = interesesCuota;
        return this;
    }

    public void setInteresesCuota(Long interesesCuota) {
        this.interesesCuota = interesesCuota;
    }

    public Long getCuotaRecuperoCapital() {
        return cuotaRecuperoCapital;
    }

    public Credit cuotaRecuperoCapital(Long cuotaRecuperoCapital) {
        this.cuotaRecuperoCapital = cuotaRecuperoCapital;
        return this;
    }

    public void setCuotaRecuperoCapital(Long cuotaRecuperoCapital) {
        this.cuotaRecuperoCapital = cuotaRecuperoCapital;
    }

    public Long getCantidadRenegociado() {
        return cantidadRenegociado;
    }

    public Credit cantidadRenegociado(Long cantidadRenegociado) {
        this.cantidadRenegociado = cantidadRenegociado;
        return this;
    }

    public void setCantidadRenegociado(Long cantidadRenegociado) {
        this.cantidadRenegociado = cantidadRenegociado;
    }


    public Long getidCliente() {
        return idCliente;
    }

    public Credit idCliente(Long idCliente) {
        this.idCliente = idCliente;
        return this;
    }

    public void setidCliente(Long idCliente) {
        this.idCliente = idCliente;
    }



    public Boolean isIncobrable() {
        return incobrable;
    }

    public Credit incobrable(Boolean incobrable) {
        this.incobrable = incobrable;
        return this;
    }

    public void setIncobrable(Boolean incobrable) {
        this.incobrable = incobrable;
    }

    public Boolean isPagoManual() {
        return pagoManual;
    }

    public Credit pagoManual(Boolean pagoManual) {
        this.pagoManual = pagoManual;
        return this;
    }

    public void setPagoManual(Boolean pagoManual) {
        this.pagoManual = pagoManual;
    }

    public Boolean isEsPersonal() {
        return esPersonal;
    }

    public Credit esPersonal(Boolean esPersonal) {
        this.esPersonal = esPersonal;
        return this;
    }

    public void setEsPersonal(Boolean esPersonal) {
        this.esPersonal = esPersonal;
    }

    /*public Banco getBanco() {
        return banco;
    }

    public Cliente banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }*/

   /* public Set<CreditDetalle> getCredits() {
        return credits;
    }

    public Credit credits(Set<CreditDetalle> creditDetalles) {
        this.credits = creditDetalles;
        return this;
    }

    public void setCredits(Set<CreditDetalle> creditDetalles) {
        this.credits = creditDetalles;
    }*/

   /* public Credit addCredit(CreditDetalle creditDetalle) {
        this.credits.add(creditDetalle);
        creditDetalle.setCredit(this);
        return this;
    }

    public Credit removeCredit(CreditDetalle creditDetalle) {
        this.credits.remove(creditDetalle);
        creditDetalle.setCredit(null);
        return this;
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
        Credit credit = (Credit) o;
        if (credit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), credit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Credit{" +
            "id=" + getId() +
            ", periodicidad='" + getPeriodicidad() + "'" +
            ", diaHoraEjecucion=" + getDiaHoraEjecucion() +
            ", tipoCobro='" + getTipoCobro() + "'" +
            ", monto=" + getMonto() +
            ", observaciones='" + getObservaciones() + "'" +
            ", activo='" + isActivo() + "'" +
            ", cantCuotas=" + getCantCuotas() +
            ", cuotaCobrada=" + getCuotaCobrada() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaVencimiento='" + getFechaVencimiento() + "'" +
            ", excluirFindeSemanas='" + isExcluirFindeSemanas() + "'" +
            ", porcParticipacion=" + getPorcParticipacion() +
            ", capitalPrestamo=" + getCapitalPrestamo() +
            ", interesesPrestamos=" + getInteresesPrestamos() +
            ", cuotaPura=" + getCuotaPura() +
            ", interesesCuota=" + getInteresesCuota() +
            ", cuotaRecuperoCapital=" + getCuotaRecuperoCapital() +
            ", cantidadRenegociado=" + getCantidadRenegociado() +
            ", incobrable='" + isIncobrable() + "'" +
            ", pagoManual='" + isPagoManual() + "'" +
            ", esPersonal='" + isEsPersonal() + "'" +
            ", idCliente=" + getidCliente() +
            "}";
    }
}
