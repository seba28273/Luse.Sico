package com.luse.sico.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.luse.sico.domain.enumeration.EstadoPrestamo;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.luse.sico.domain.enumeration.Periodicidad;

import com.luse.sico.domain.enumeration.TipoCobro;

/**
 * A Recaudador.
 */
@Entity
@Table(name = "recaudador")
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Recaudador implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "cant_cuotas")
    private Long cantCuotas;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "cantidad_renegociado")
    private Long cantidadRenegociado;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "capital_prestamo")
    private Double capitalPrestamo;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "cuota_cobrada")
    private Long cuotaCobrada;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "cuota_pura")
    private Double cuotaPura;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "cuota_recupero_capital")
    private Long cuotaRecuperoCapital;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "dia_hora_ejecucion")
    private Long diaHoraEjecucion;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "es_personal")
    private Boolean esPersonal;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "excluir_finde_semanas")
    private Boolean excluirFindeSemanas;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "fecha_inicio")
    private Instant fechaInicio;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "fecha_vencimiento")
    private Instant fechaVencimiento;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "incobrable")
    private Boolean incobrable;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "intereses_cuota")
    private Double interesesCuota;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "intereses_prestamos")
    private Double interesesPrestamos;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "monto")
    private Double monto;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "observaciones")
    private String observaciones;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "pago_manual")
    private Long pagoManual;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "periodicidad")
    private Periodicidad periodicidad;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "porc_participacion")
    private Long porcParticipacion;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cobro")
    private TipoCobro tipoCobro;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "id_cliente")
    private Long idCliente;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Column(name = "transferido")
    private Boolean transferido;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPrestamo estado;

    //Propiedades Virtuales
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String nroCbu;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String nroCuit;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private Long nro_cuota;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String fecha_programada;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private String fecha_InicioPrestamo;

    public Double getSaldo() {
        return Saldo;
    }

    public void setSaldo(Double saldo) {
        Saldo = saldo;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private Double Saldo;


    //Propiedades Virtuales
    @OneToMany(mappedBy = "recaudador")
    //@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RecaudadorDetalle> recaudadorDetalles = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isActivo() {
        return activo;
    }

    public Recaudador activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getCantCuotas() {
        return cantCuotas;
    }

    public Recaudador cantCuotas(Long cantCuotas) {
        this.cantCuotas = cantCuotas;
        return this;
    }

    public void setCantCuotas(Long cantCuotas) {
        this.cantCuotas = cantCuotas;
    }

    public Long getCantidadRenegociado() {
        return cantidadRenegociado;
    }

    public Recaudador cantidadRenegociado(Long cantidadRenegociado) {
        this.cantidadRenegociado = cantidadRenegociado;
        return this;
    }

    public void setCantidadRenegociado(Long cantidadRenegociado) {
        this.cantidadRenegociado = cantidadRenegociado;
    }

    public Double getCapitalPrestamo() {
        return capitalPrestamo;
    }

    public Recaudador capitalPrestamo(Double capitalPrestamo) {
        this.capitalPrestamo = capitalPrestamo;
        return this;
    }

    public void setCapitalPrestamo(Double capitalPrestamo) {
        this.capitalPrestamo = capitalPrestamo;
    }

    public Long getCuotaCobrada() {
        return cuotaCobrada;
    }

    public Recaudador cuotaCobrada(Long cuotaCobrada) {
        this.cuotaCobrada = cuotaCobrada;
        return this;
    }

    public void setCuotaCobrada(Long cuotaCobrada) {
        this.cuotaCobrada = cuotaCobrada;
    }

    public Double getCuotaPura() {
        return cuotaPura;
    }

    public Recaudador cuotaPura(Double cuotaPura) {
        this.cuotaPura = cuotaPura;
        return this;
    }

    public void setCuotaPura(Double cuotaPura) {
        this.cuotaPura = cuotaPura;
    }

    public Long getCuotaRecuperoCapital() {
        return cuotaRecuperoCapital;
    }

    public Recaudador cuotaRecuperoCapital(Long cuotaRecuperoCapital) {
        this.cuotaRecuperoCapital = cuotaRecuperoCapital;
        return this;
    }

    public void setCuotaRecuperoCapital(Long cuotaRecuperoCapital) {
        this.cuotaRecuperoCapital = cuotaRecuperoCapital;
    }

    public Long getDiaHoraEjecucion() {
        return diaHoraEjecucion;
    }

    public Recaudador diaHoraEjecucion(Long diaHoraEjecucion) {
        this.diaHoraEjecucion = diaHoraEjecucion;
        return this;
    }

    public void setDiaHoraEjecucion(Long diaHoraEjecucion) {
        this.diaHoraEjecucion = diaHoraEjecucion;
    }

    public Boolean isEsPersonal() {
        return esPersonal;
    }

    public Recaudador esPersonal(Boolean esPersonal) {
        this.esPersonal = esPersonal;
        return this;
    }

    public void setEsPersonal(Boolean esPersonal) {
        this.esPersonal = esPersonal;
    }


    public Boolean getTransferido() {
        return transferido;
    }

    public Recaudador Transferido(Boolean transferido) {
        this.transferido = transferido;
        return this;
    }

    public void setTransferido(Boolean transferido) {
        this.transferido = transferido;
    }


    public Boolean isExcluirFindeSemanas() {
        return excluirFindeSemanas;
    }

    public Recaudador excluirFindeSemanas(Boolean excluirFindeSemanas) {
        this.excluirFindeSemanas = excluirFindeSemanas;
        return this;
    }

    public void setExcluirFindeSemanas(Boolean excluirFindeSemanas) {
        this.excluirFindeSemanas = excluirFindeSemanas;
    }

    public Instant getFechaCreacion() {
        return fechaCreacion;
    }

    public Recaudador fechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Instant getFechaInicio() {
        return fechaInicio;
    }

    public Recaudador fechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Instant getFechaVencimiento() {
        return fechaVencimiento;
    }

    public Recaudador fechaVencimiento(Instant fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
        return this;
    }

    public void setFechaVencimiento(Instant fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }



    public void setFechaProgramada(String fecha_programada) {
        this.fecha_programada = fecha_programada;
    }



    public String getFechaProgramada() {
        return fecha_programada;
    }

    public Recaudador FechaProgramada(String fecha_programada) {
        this.fecha_programada = fecha_programada;
        return this;
    }

    public void setFechaInicioPrestamo(String fecha_InicioPrestamo) {
        this.fecha_InicioPrestamo   = fecha_InicioPrestamo;
    }



    public String getFechaInicioPrestamo() {
        return fecha_InicioPrestamo;
    }

    public Recaudador FechaInicioPrestamo(String fecha_InicioPrestamo) {
        this.fecha_InicioPrestamo = fecha_InicioPrestamo;
        return this;
    }





    public Boolean isIncobrable() {
        return incobrable;
    }

    public Recaudador incobrable(Boolean incobrable) {
        this.incobrable = incobrable;
        return this;
    }

    public void setIncobrable(Boolean incobrable) {
        this.incobrable = incobrable;
    }

    public Double getInteresesCuota() {
        return interesesCuota;
    }

    public Recaudador interesesCuota(Double interesesCuota) {
        this.interesesCuota = interesesCuota;
        return this;
    }

    public void setInteresesCuota(Double interesesCuota) {
        this.interesesCuota = interesesCuota;
    }

    public Double getInteresesPrestamos() {
        return interesesPrestamos;
    }

    public Recaudador interesesPrestamos(Double interesesPrestamos) {
        this.interesesPrestamos = interesesPrestamos;
        return this;
    }

    public void setInteresesPrestamos(Double interesesPrestamos) {
        this.interesesPrestamos = interesesPrestamos;
    }

    public Double getMonto() {
        return monto;
    }

    public Recaudador monto(Double monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Recaudador observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Long getPagoManual() {
        return pagoManual;
    }

    public Recaudador pagoManual(Long pagoManual) {
        this.pagoManual = pagoManual;
        return this;
    }


    public Long getnrocuota() {
        return nro_cuota;
    }

    public Recaudador nroCuit(Long nro_cuota) {
        this.nro_cuota = nro_cuota;
        return this;
    }

    public void setnroCuit(Long nro_cuota) {
        this.nro_cuota = nro_cuota;
    }



    public String getnroCuit() {
        return nroCuit;
    }

    public Recaudador nroCuit(String nroCuit) {
        this.nroCuit = nroCuit;
        return this;
    }

    public void setnroCuit(String nroCuit) {
        this.nroCuit = nroCuit;
    }



    public String getnroCbu() {
        return nroCbu;
    }

    public Recaudador nroCbu(String nroCbu) {
        this.nroCbu = nroCbu;
        return this;
    }

    public void setnroCbu(String nroCbu) {
        this.nroCbu = nroCbu;
    }



    public void setPagoManual(Long pagoManual) {
        this.pagoManual = pagoManual;
    }

    public Periodicidad getPeriodicidad() {
        return periodicidad;
    }

    public Recaudador periodicidad(Periodicidad periodicidad) {
        this.periodicidad = periodicidad;
        return this;
    }

    public void setPeriodicidad(Periodicidad periodicidad) {
        this.periodicidad = periodicidad;
    }


    public EstadoPrestamo getEstado() {
        return estado;
    }

    public Recaudador estado(EstadoPrestamo estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoPrestamo estado) {
        this.estado = estado;
    }

    public Long getPorcParticipacion() {
        return porcParticipacion;
    }

    public Recaudador porcParticipacion(Long porcParticipacion) {
        this.porcParticipacion = porcParticipacion;
        return this;
    }

    public void setPorcParticipacion(Long porcParticipacion) {
        this.porcParticipacion = porcParticipacion;
    }

    public TipoCobro getTipoCobro() {
        return tipoCobro;
    }

    public Recaudador tipoCobro(TipoCobro tipoCobro) {
        this.tipoCobro = tipoCobro;
        return this;
    }

    public void setTipoCobro(TipoCobro tipoCobro) {
        this.tipoCobro = tipoCobro;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public Recaudador idCliente(Long idCliente) {
        this.idCliente = idCliente;
        return this;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Set<RecaudadorDetalle> getRecaudadorDetalles() {
        return recaudadorDetalles;
    }

    public Recaudador recaudadorDetalles(Set<RecaudadorDetalle> recaudadorDetalles) {
        this.recaudadorDetalles = recaudadorDetalles;
        return this;
    }

    public Recaudador addRecaudadorDetalle(RecaudadorDetalle recaudadorDetalle) {
        this.recaudadorDetalles.add(recaudadorDetalle);
        recaudadorDetalle.setRecaudador(this);
        return this;
    }

    public Recaudador removeRecaudadorDetalle(RecaudadorDetalle recaudadorDetalle) {
        this.recaudadorDetalles.remove(recaudadorDetalle);
        recaudadorDetalle.setRecaudador(null);
        return this;
    }

    public void setRecaudadorDetalles(Set<RecaudadorDetalle> recaudadorDetalles) {
        this.recaudadorDetalles = recaudadorDetalles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Recaudador()
    {
        super();

    }

    public Recaudador(Long id, Boolean transferido, String nroCuit, Long idCliente, String nroCbu, Double pMonto)
    {
        super();
        this.id = id;
        this.transferido = transferido;
        this.nroCuit = nroCuit;
        this.idCliente = idCliente;
        this.nroCbu = nroCbu;
        this.capitalPrestamo = pMonto;
    }

    public Recaudador(Long id, Long id_cliente,  Boolean transferido, String estado, Long cant_cuotas, Long nro_cuota, Long cuota_cobrada,
                      Double capital_prestamo, String fecha_inicio, String fecha_programada)
    {
        super();
        this.id = id;
        this.transferido = transferido;
        EstadoPrestamo oEstado=EstadoPrestamo.FINALIZADO;
        if (estado== "PENDIENTE")
            oEstado=EstadoPrestamo.PENDIENTE;
        else if ( estado== "ACREDITADO")
            oEstado=EstadoPrestamo.ACREDITADO;
            else if ( estado== "INCOBRABLE")
                oEstado=EstadoPrestamo.INCOBRABLE;
                else if ( estado== "RECHAZADO")
                    oEstado=EstadoPrestamo.RECHAZADO;
                    else if ( estado== "FINALIZADO")
                        oEstado=EstadoPrestamo.FINALIZADO;

        this.estado = oEstado;
        this.idCliente = id_cliente;
        this.capitalPrestamo = capital_prestamo;
        this.cantCuotas = cant_cuotas;
        this.nro_cuota = nro_cuota;
        this.cuotaCobrada = cuota_cobrada;
        this.fecha_InicioPrestamo = fecha_inicio;
        this.fecha_programada = fecha_programada;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Recaudador recaudador = (Recaudador) o;
        if (recaudador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recaudador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recaudador{" +
            "id=" + getId() +
            ", activo='" + isActivo() + "'" +
            ", cantCuotas=" + getCantCuotas() +
            ", cantidadRenegociado=" + getCantidadRenegociado() +
            ", capitalPrestamo=" + getCapitalPrestamo() +
            ", cuotaCobrada=" + getCuotaCobrada() +
            ", cuotaPura=" + getCuotaPura() +
            ", cuotaRecuperoCapital=" + getCuotaRecuperoCapital() +
            ", diaHoraEjecucion=" + getDiaHoraEjecucion() +
            ", esPersonal='" + isEsPersonal() + "'" +
            ", excluirFindeSemanas='" + isExcluirFindeSemanas() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaVencimiento='" + getFechaVencimiento() + "'" +
            ", incobrable='" + isIncobrable() + "'" +
            ", interesesCuota=" + getInteresesCuota() +
            ", interesesPrestamos=" + getInteresesPrestamos() +
            ", monto=" + getMonto() +
            ", observaciones='" + getObservaciones() + "'" +
            ", pagoManual=" + getPagoManual() +
            ", periodicidad='" + getPeriodicidad() + "'" +
            ", porcParticipacion=" + getPorcParticipacion() +
            ", tipoCobro='" + getTipoCobro() + "'" +
            ", idCliente=" + getIdCliente() +
            ", transferido=" + getTransferido() +
            ", nroCuit='" + getnroCuit() + "'" +
            ", nroCbu='" + getnroCbu() + "'" +
            "}";
    }
}
