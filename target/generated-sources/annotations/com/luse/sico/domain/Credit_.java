package com.luse.sico.domain;

import com.luse.sico.domain.enumeration.Periodicidad;
import com.luse.sico.domain.enumeration.TipoCobro;
import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Credit.class)
public abstract class Credit_ {

	public static volatile SingularAttribute<Credit, Long> interesesCuota;
	public static volatile SingularAttribute<Credit, Long> porcParticipacion;
	public static volatile SingularAttribute<Credit, Periodicidad> periodicidad;
	public static volatile SingularAttribute<Credit, Long> diaHoraEjecucion;
	public static volatile SingularAttribute<Credit, Boolean> incobrable;
	public static volatile SingularAttribute<Credit, Instant> fechaVencimiento;
	public static volatile SingularAttribute<Credit, Long> cantidadRenegociado;
	public static volatile SingularAttribute<Credit, Long> capitalPrestamo;
	public static volatile SingularAttribute<Credit, Boolean> excluirFindeSemanas;
	public static volatile SingularAttribute<Credit, Long> cantCuotas;
	public static volatile SingularAttribute<Credit, Long> cuotaCobrada;
	public static volatile SingularAttribute<Credit, Boolean> esPersonal;
	public static volatile SingularAttribute<Credit, Long> monto;
	public static volatile SingularAttribute<Credit, Boolean> pagoManual;
	public static volatile SingularAttribute<Credit, Long> idCliente;
	public static volatile SingularAttribute<Credit, Instant> fechaInicio;
	public static volatile SingularAttribute<Credit, String> observaciones;
	public static volatile SingularAttribute<Credit, Long> cuotaRecuperoCapital;
	public static volatile SingularAttribute<Credit, Instant> fechaCreacion;
	public static volatile SingularAttribute<Credit, TipoCobro> tipoCobro;
	public static volatile SingularAttribute<Credit, Long> id;
	public static volatile SingularAttribute<Credit, Long> cuotaPura;
	public static volatile SingularAttribute<Credit, Boolean> activo;
	public static volatile SingularAttribute<Credit, Long> interesesPrestamos;

}

