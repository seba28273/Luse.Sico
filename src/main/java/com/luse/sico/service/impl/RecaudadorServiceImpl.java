package com.luse.sico.service.impl;

import com.luse.sico.domain.RecaudadorDetalle;
import com.luse.sico.repository.RecaudadorDetalleRepository;
import com.luse.sico.service.RecaudadorService;
import com.luse.sico.domain.Recaudador;
import com.luse.sico.repository.RecaudadorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

/**
 * Service Implementation for managing Recaudador.
 */
@Service
@Transactional
public class RecaudadorServiceImpl implements RecaudadorService {

    private final Logger log = LoggerFactory.getLogger(RecaudadorServiceImpl.class);

    private final RecaudadorRepository recaudadorRepository;


    public RecaudadorServiceImpl(RecaudadorRepository recaudadorRepository) {
        this.recaudadorRepository = recaudadorRepository;
    }

    /**
     * Save a recaudador.
     *
     * @param recaudador the entity to save
     * @return the persisted entity
     */
    @Override
    public Recaudador save(Recaudador recaudador) {
        log.debug("Request to save Recaudador : {}", recaudador);
        //AddDetalleRecaudador
        return recaudadorRepository.save(recaudador);
    }

    /**
     * Get all the recaudadors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Recaudador> findAll(Pageable pageable) {
        log.debug("Request to get all Recaudadors");
        return recaudadorRepository.findAll(pageable);
    }


    /**
     * Get one recaudador by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Recaudador> findOne(Long id) {
        log.debug("Request to get Recaudador : {}", id);
        return recaudadorRepository.findById(id);
    }

    public Page<Recaudador> findByidCliente(Pageable pageable, Long  idCliente) {
        log.debug("Request to get Cliente : {}", idCliente);
        return recaudadorRepository.findByidCliente(pageable, idCliente);
    }
    /**
     * Delete the recaudador by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Recaudador : {}", id);
        recaudadorRepository.deleteById(id);
    }

    @Override
    public Page<Recaudador> findAllByFechaInicioBetween(Instant fromDate, Instant toDate, Pageable pageable) {
        return recaudadorRepository.findAllByFechaInicioBetween(fromDate, toDate, pageable);
    }

}
