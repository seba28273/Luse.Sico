package com.luse.sico.service;

import com.luse.sico.domain.Credit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Credit.
 */
public interface CreditService {

    /**
     * Save a credit.
     *
     * @param credit the entity to save
     * @return the persisted entity
     */
    Credit save(Credit credit);

    /**
     * Get all the credits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Credit> findAll(Pageable pageable);


    /**
     * Get the "id" credit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Credit> findOne(Long id);

    /**
     * Delete the "id" credit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
