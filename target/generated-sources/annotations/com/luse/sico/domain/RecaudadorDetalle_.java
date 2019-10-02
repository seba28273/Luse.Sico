package com.luse.sico.domain;

import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(RecaudadorDetalle.class)
public abstract class RecaudadorDetalle_ {

	public static volatile SingularAttribute<RecaudadorDetalle, Long> reintentos;
	public static volatile SingularAttribute<RecaudadorDetalle, Long> ejecutada;
	public static volatile SingularAttribute<RecaudadorDetalle, Long> nroCuota;
	public static volatile SingularAttribute<RecaudadorDetalle, Instant> fechaEjecucion;
	public static volatile SingularAttribute<RecaudadorDetalle, String> observaciones;
	public static volatile SingularAttribute<RecaudadorDetalle, Instant> fechaProgramada;
	public static volatile SingularAttribute<RecaudadorDetalle, Long> id;
	public static volatile SingularAttribute<RecaudadorDetalle, Recaudador> recaudador;
	public static volatile SingularAttribute<RecaudadorDetalle, Long> recaudadorid;

}

