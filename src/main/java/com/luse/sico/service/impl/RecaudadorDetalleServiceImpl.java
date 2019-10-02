package com.luse.sico.service.impl;

import com.luse.sico.service.RecaudadorDetalleService;
import com.luse.sico.domain.RecaudadorDetalle;
import com.luse.sico.repository.RecaudadorDetalleRepository;
import io.github.jhipster.domain.util.JSR310DateConverters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Service Implementation for managing RecaudadorDetalle.
 */
@Service
@Transactional
public class RecaudadorDetalleServiceImpl implements RecaudadorDetalleService {

    private final Logger log = LoggerFactory.getLogger(RecaudadorDetalleServiceImpl.class);

    private final RecaudadorDetalleRepository recaudadorDetalleRepository;

    public RecaudadorDetalleServiceImpl(RecaudadorDetalleRepository recaudadorDetalleRepository) {
        this.recaudadorDetalleRepository = recaudadorDetalleRepository;
    }


    @Override
    public void AddDetalleRecaudador(Long id, Long cantCuotas) {


        int mDias=0;
        for ( int i =1; i <= cantCuotas;) {
            RecaudadorDetalle recaudadorDetalle=new RecaudadorDetalle();

            mDias =mDias+30;
            //ZoneId z = ZoneId.of( "GMT" ) ;

            Clock cldef = Clock.systemDefaultZone();


            Instant  value = Instant.now(cldef).plus(mDias, ChronoUnit.DAYS);


            recaudadorDetalle.setEjecutada((long) 0);
            recaudadorDetalle.setNroCuota((long) i);

            recaudadorDetalle.setFechaProgramada(value);
            recaudadorDetalle.setObservaciones("");
            recaudadorDetalle.setReintentos((long) 0);
            recaudadorDetalle.setRecaudador_id(id);
            i=i+1;
            save(recaudadorDetalle);
        }




    }

    /**
     * Save a recaudadorDetalle.
     *
     * @param recaudadorDetalle the entity to save
     * @return the persisted entity
     */
    @Override
    public RecaudadorDetalle save(RecaudadorDetalle recaudadorDetalle) {
        log.debug("Request to save RecaudadorDetalle : {}", recaudadorDetalle);
        return recaudadorDetalleRepository.save(recaudadorDetalle);
    }

    /**
     * Get all the recaudadorDetalles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecaudadorDetalle> findAll() {
        log.debug("Request to get all RecaudadorDetalles");
        return recaudadorDetalleRepository.findAll();
    }


    /**
     * Get one recaudadorDetalle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecaudadorDetalle> findOne(Long id) {
        log.debug("Request to get RecaudadorDetalle : {}", id);
        return recaudadorDetalleRepository.findById(id);
    }

    @Override
    public List<RecaudadorDetalle> findbyfechaProgramada(Instant fecha) {
        return null;
    }

    /**
     * Delete the recaudadorDetalle by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecaudadorDetalle : {}", id);
        recaudadorDetalleRepository.deleteById(id);
    }
}
