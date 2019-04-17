package com.luse.sico.service;

import com.luse.sico.domain.Banco;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Banco.
 */
public interface BancoService {

    /**
     * Save a banco.
     *
     * @param banco the entity to save
     * @return the persisted entity
     */
    Banco save(Banco banco);

    /**
     * Get all the bancos.
     *
     * @return the list of entities
     */
    List<Banco> findAll();


    /**
     * Get the "id" banco.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Banco> findOne(Long id);

    /**
     * Delete the "id" banco.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
