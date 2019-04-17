package com.luse.sico.service.impl;

import com.luse.sico.service.CreditDetalleService;
import com.luse.sico.domain.CreditDetalle;
import com.luse.sico.repository.CreditDetalleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing CreditDetalle.
 */
@Service
@Transactional
public class CreditDetalleServiceImpl implements CreditDetalleService {

    private final Logger log = LoggerFactory.getLogger(CreditDetalleServiceImpl.class);

    private final CreditDetalleRepository creditDetalleRepository;

    public CreditDetalleServiceImpl(CreditDetalleRepository creditDetalleRepository) {
        this.creditDetalleRepository = creditDetalleRepository;
    }

    /**
     * Save a creditDetalle.
     *
     * @param creditDetalle the entity to save
     * @return the persisted entity
     */
    @Override
    public CreditDetalle save(CreditDetalle creditDetalle) {
        log.debug("Request to save CreditDetalle : {}", creditDetalle);
        return creditDetalleRepository.save(creditDetalle);
    }

    /**
     * Get all the creditDetalles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CreditDetalle> findAll() {
        log.debug("Request to get all CreditDetalles");
        return creditDetalleRepository.findAll();
    }


    /**
     * Get one creditDetalle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CreditDetalle> findOne(Long id) {
        log.debug("Request to get CreditDetalle : {}", id);
        return creditDetalleRepository.findById(id);
    }

    /**
     * Delete the creditDetalle by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CreditDetalle : {}", id);
        creditDetalleRepository.deleteById(id);
    }
}
