package com.luse.sico.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class ClientePermitido implements Serializable {


    @Id
    private Long id;

    private String nombre;

    private String dni;

    private String telefono;

    private Long idEmpresa;

    private String nombreempresa;

    private boolean activo;

    public ClientePermitido() {

    }
    public ClientePermitido(String dni) {

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDni() {
            return dni;
    }

    public void setIdEmpresa(Long idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public Long getIdEmpresa() {
        return idEmpresa;
    }

    public void setTelefono(String telefono) {
            this.telefono = telefono;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public boolean geActivo() {
        return activo;
    }
    public void setNombreempresa(String nombreempresa) {
        this.nombreempresa = nombreempresa;
    }

    public String getNombreempresa() {
        return nombreempresa;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
