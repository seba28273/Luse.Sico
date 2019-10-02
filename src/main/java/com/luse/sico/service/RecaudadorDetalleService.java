package com.luse.sico.service;

import com.luse.sico.domain.RecaudadorDetalle;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing RecaudadorDetalle.
 */
public interface RecaudadorDetalleService {


    void AddDetalleRecaudador(Long id, Long cantCuotas);

    /**
     * Save a recaudadorDetalle.
     *
     * @param recaudadorDetalle the entity to save
     * @return the persisted entity
     */
    RecaudadorDetalle save(RecaudadorDetalle recaudadorDetalle);

    /**
     * Get all the recaudadorDetalles.
     *
     * @return the list of entities
     */
    List<RecaudadorDetalle> findAll();


    /**
     * Get the "id" recaudadorDetalle.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RecaudadorDetalle> findOne(Long id);

    /**
     * Get the "id" recaudadorDetalle.
     *
     * @param fecha the id of the entity
     * @return the entity
     */
    List<RecaudadorDetalle> findbyfechaProgramada(Instant fecha);



    /**
     * Delete the "id" recaudadorDetalle.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
