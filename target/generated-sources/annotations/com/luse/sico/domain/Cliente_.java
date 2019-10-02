package com.luse.sico.domain;

import com.luse.sico.domain.enumeration.SEXO;
import java.time.Instant;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Cliente.class)
public abstract class Cliente_ {

	public static volatile SingularAttribute<Cliente, String> lastName;
	public static volatile SingularAttribute<Cliente, Long> scoringCredit;
	public static volatile SingularAttribute<Cliente, Long> numero;
	public static volatile SingularAttribute<Cliente, String> mail;
	public static volatile SingularAttribute<Cliente, Instant> fechaNacimiento;
	public static volatile SingularAttribute<Cliente, String> direccion;
	public static volatile SingularAttribute<Cliente, Banco> banco;
	public static volatile SingularAttribute<Cliente, Long> salary;
	public static volatile SingularAttribute<Cliente, String> firstName;
	public static volatile SingularAttribute<Cliente, String> cuit;
	public static volatile SingularAttribute<Cliente, String> numero_Cuenta;
	public static volatile SingularAttribute<Cliente, Long> id;
	public static volatile SingularAttribute<Cliente, String> telefono;
	public static volatile SingularAttribute<Cliente, SEXO> sexo;
	public static volatile SingularAttribute<Cliente, Department> department;
	public static volatile SingularAttribute<Cliente, String> nro_Cbu;
	public static volatile SingularAttribute<Cliente, String> dni;

}

