package com.luse.sico.service;

import com.luse.sico.domain.CreditDetalle;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CreditDetalle.
 */
public interface CreditDetalleService {

    /**
     * Save a creditDetalle.
     *
     * @param creditDetalle the entity to save
     * @return the persisted entity
     */
    CreditDetalle save(CreditDetalle creditDetalle);

    /**
     * Get all the creditDetalles.
     *
     * @return the list of entities
     */
    List<CreditDetalle> findAll();


    /**
     * Get the "id" creditDetalle.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CreditDetalle> findOne(Long id);

    /**
     * Delete the "id" creditDetalle.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
