package com.luse.sico.domain;

import com.luse.sico.domain.enumeration.EstadoPrestamo;
import com.luse.sico.domain.enumeration.Periodicidad;
import com.luse.sico.domain.enumeration.TipoCobro;
import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Recaudador.class)
public abstract class Recaudador_ {

	public static volatile SingularAttribute<Recaudador, Double> interesesCuota;
	public static volatile SingularAttribute<Recaudador, Long> porcParticipacion;
	public static volatile SingularAttribute<Recaudador, Periodicidad> periodicidad;
	public static volatile SingularAttribute<Recaudador, EstadoPrestamo> estado;
	public static volatile SingularAttribute<Recaudador, Long> diaHoraEjecucion;
	public static volatile SetAttribute<Recaudador, RecaudadorDetalle> recaudadorDetalles;
	public static volatile SingularAttribute<Recaudador, Long> pagoManual;
	public static volatile SingularAttribute<Recaudador, Long> idCliente;
	public static volatile SingularAttribute<Recaudador, Instant> fechaInicio;
	public static volatile SingularAttribute<Recaudador, Long> cuotaRecuperoCapital;
	public static volatile SingularAttribute<Recaudador, Long> id;
	public static volatile SingularAttribute<Recaudador, Double> cuotaPura;
	public static volatile SingularAttribute<Recaudador, Boolean> incobrable;
	public static volatile SingularAttribute<Recaudador, Instant> fechaVencimiento;
	public static volatile SingularAttribute<Recaudador, Long> cantidadRenegociado;
	public static volatile SingularAttribute<Recaudador, Double> capitalPrestamo;
	public static volatile SingularAttribute<Recaudador, Boolean> excluirFindeSemanas;
	public static volatile SingularAttribute<Recaudador, Boolean> transferido;
	public static volatile SingularAttribute<Recaudador, Long> cantCuotas;
	public static volatile SingularAttribute<Recaudador, Long> cuotaCobrada;
	public static volatile SingularAttribute<Recaudador, Boolean> esPersonal;
	public static volatile SingularAttribute<Recaudador, Double> monto;
	public static volatile SingularAttribute<Recaudador, String> observaciones;
	public static volatile SingularAttribute<Recaudador, Instant> fechaCreacion;
	public static volatile SingularAttribute<Recaudador, TipoCobro> tipoCobro;
	public static volatile SingularAttribute<Recaudador, Boolean> activo;
	public static volatile SingularAttribute<Recaudador, Double> interesesPrestamos;

}

