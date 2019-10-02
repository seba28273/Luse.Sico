package com.luse.sico.domain;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(CreditDetalle.class)
public abstract class CreditDetalle_ {

	public static volatile SingularAttribute<CreditDetalle, Long> reintentos;
	public static volatile SingularAttribute<CreditDetalle, Boolean> ejecutada;
	public static volatile SingularAttribute<CreditDetalle, Long> nroCuota;
	public static volatile SingularAttribute<CreditDetalle, Long> cantidadRenegociado;
	public static volatile SingularAttribute<CreditDetalle, Instant> fechaEjecucion;
	public static volatile SingularAttribute<CreditDetalle, String> observaciones;
	public static volatile SingularAttribute<CreditDetalle, Instant> fechaProgramada;
	public static volatile SingularAttribute<CreditDetalle, Long> id;

}

