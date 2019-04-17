package com.luse.sico.service.impl;

import com.luse.sico.service.BancoService;
import com.luse.sico.domain.Banco;
import com.luse.sico.repository.BancoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Banco.
 */
@Service
@Transactional
public class BancoServiceImpl implements BancoService {

    private final Logger log = LoggerFactory.getLogger(BancoServiceImpl.class);

    private final BancoRepository bancoRepository;

    public BancoServiceImpl(BancoRepository bancoRepository) {
        this.bancoRepository = bancoRepository;
    }

    /**
     * Save a banco.
     *
     * @param banco the entity to save
     * @return the persisted entity
     */
    @Override
    public Banco save(Banco banco) {
        log.debug("Request to save Banco : {}", banco);
        return bancoRepository.save(banco);
    }

    /**
     * Get all the bancos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Banco> findAll() {
        log.debug("Request to get all Bancos");
        return bancoRepository.findAll();
    }


    /**
     * Get one banco by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Banco> findOne(Long id) {
        log.debug("Request to get Banco : {}", id);
        return bancoRepository.findById(id);
    }

    /**
     * Delete the banco by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Banco : {}", id);
        bancoRepository.deleteById(id);
    }
}
