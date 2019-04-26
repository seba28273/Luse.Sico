package com.luse.sico.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.luse.sico.domain.enumeration.SEXO;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "dni", nullable = false)
    private String dni;

    @Column(name = "fecha_nacimiento")
    private Instant fechaNacimiento;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "numero")
    private Long numero;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "mail")
    private String mail;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo")
    private SEXO sexo;

    @Column(name = "salary")
    private Long salary;

    @Column(name = "scoring_credit")
    private Long scoringCredit;

    @ManyToOne
    @JsonIgnoreProperties("clientes")
    private Department department;


    @Size(max = 40)
    @Column(name = "nroCbu", length = 40)
    @JsonIgnore
    private String nro_Cbu;

    @Size(max = 40)
    @Column(name = "numeroCuenta", length = 40)
    @JsonIgnore
    private String numero_Cuenta;


    @ManyToOne
    @JsonIgnoreProperties("bancos")
    private Banco banco;


    public String getNumeroCuenta() {
        return numero_Cuenta;
    }
    public void setNumeroCuenta(String pnumeroCuenta) {
        this.numero_Cuenta = pnumeroCuenta;
    }

    public String getNroCbu() {
        return nro_Cbu;
    }
    public void setNroCbu(String nroCbu) {
        this.nro_Cbu = nroCbu;
    }


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Cliente firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Cliente lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDni() {
        return dni;
    }

    public Cliente dni(String dni) {
        this.dni = dni;
        return this;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public Instant getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Cliente fechaNacimiento(Instant fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(Instant fechaNacimiento) { this.fechaNacimiento = fechaNacimiento;
    }

    public String getDireccion() {
        return direccion;
    }

    public Cliente direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Long getNumero() {
        return numero;
    }

    public Cliente numero(Long numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public String getTelefono() {
        return telefono;
    }

    public Cliente telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getMail() {
        return mail;
    }

    public Cliente mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public SEXO getSexo() {
        return sexo;
    }

    public Cliente sexo(SEXO sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(SEXO sexo) {
        this.sexo = sexo;
    }

    public Long getSalary() {
        return salary;
    }

    public Cliente salary(Long salary) {
        this.salary = salary;
        return this;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public Long getScoringCredit() {
        return scoringCredit;
    }

    public Cliente scoringCredit(Long scoringCredit) {
        this.scoringCredit = scoringCredit;
        return this;
    }

    public void setScoringCredit(Long scoringCredit) {
        this.scoringCredit = scoringCredit;
    }

    public Department getDepartment() {
        return department;
    }

    public Cliente department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }


    public Banco getBanco() {
        return banco;
    }

    public Cliente banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", dni='" + getDni() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", numero=" + getNumero() +
            ", telefono='" + getTelefono() + "'" +
            ", mail='" + getMail() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", salary=" + getSalary() +
            ", scoringCredit=" + getScoringCredit() +
            ", numeroCuenta='" + getNumeroCuenta() + "'" +
            ", nroCbu='" + getNroCbu() + "'" +
            "}";
    }
}
