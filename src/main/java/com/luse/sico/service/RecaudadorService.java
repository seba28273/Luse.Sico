package com.luse.sico.service;

import com.luse.sico.domain.Recaudador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Recaudador.
 */
public interface RecaudadorService {

    /**
     * Save a recaudador.
     *
     * @param recaudador the entity to save
     * @return the persisted entity
     */
    Recaudador save(Recaudador recaudador);

    /**
     * Get all the recaudadors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Recaudador> findAll(Pageable pageable);


    /**
     * Get the "id" recaudador.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Recaudador> findOne(Long id);


    Page<Recaudador> findByidCliente(Pageable pageable , Long idCLiente);
    /**
     * Delete the "id" recaudador.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
