package com.luse.sico.service;

import com.luse.sico.domain.Recaudador;
import com.luse.sico.repository.PersistenceAuditEventRepository;
import com.luse.sico.repository.RecaudadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
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


    Page<Recaudador> findAllByFechaInicioBetween(Instant fromDate, Instant toDate, Pageable pageable);

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
