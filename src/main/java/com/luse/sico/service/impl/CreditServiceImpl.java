package com.luse.sico.service.impl;

import com.luse.sico.service.CreditService;
import com.luse.sico.domain.Credit;
import com.luse.sico.repository.CreditRepository;
import liquibase.exception.DatabaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

/**
 * Service Implementation for managing Credit.
 */
@Service
@Transactional
public class CreditServiceImpl implements CreditService {

    private final Logger log = LoggerFactory.getLogger(CreditServiceImpl.class);

    private final CreditRepository creditRepository;

    public CreditServiceImpl(CreditRepository creditRepository) {
        this.creditRepository = creditRepository;
    }

    /**
     * Save a credit.
     *
     * @param credit the entity to save
     * @return the persisted entity
     */
    @Override
    public Credit save(Credit credit) {
        log.debug("Request to save Credit : {}", credit);
        Instant instant = Instant.now();
        credit.setFechaCreacion(instant);
        credit.setFechaInicio(instant);
        instant.plusSeconds(10000);
        credit.setFechaVencimiento(instant);
        //prueba
        return creditRepository.save(credit);
    }

    /**
     * Get all the credits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Credit> findAll(Pageable pageable) {
        log.debug("Request to get all Credits");
        return creditRepository.findAll(pageable);
    }


    /**
     * Get one credit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Credit> findOne(Long id) {
        log.debug("Request to get Credit : {}", id);
        return creditRepository.findById(id);
    }

    /**
     * Delete the credit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Credit : {}", id);
        creditRepository.deleteById(id);
    }
}
