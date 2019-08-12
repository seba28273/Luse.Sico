package com.luse.sico.service;

import com.luse.sico.domain.Cliente;

import com.luse.sico.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Cliente.
 */
public interface ClienteService {

    /**
     * Save a cliente.
     *
     * @param cliente the entity to save
     * @return the persisted entity
     */
    Cliente save(Cliente cliente);

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Cliente> findAll(Pageable pageable);


    /**
     * Get the "id" cliente.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Cliente> findOne(Long id);

     /**
     * Get the "email" cliente.
     *
     * @param email the id of the entity
     * @return the entity
     */
    Optional<Cliente> findOnebyEmail(String email);

    /**
     * Get the "dni" cliente.
     *
     * @param dni the id of the entity
     * @return the entity
     */
    Optional<Cliente> findBydni(String dni);

    /**
     * Delete the "id" cliente.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    void getOne(Long id);
}
