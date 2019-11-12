package com.luse.sico.repository;

import com.luse.sico.domain.PersistentAuditEvent;
import com.luse.sico.domain.Recaudador;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the Recaudador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecaudadorRepository extends JpaRepository<Recaudador, Long> {

   /* @Override
    <S extends Recaudador> Page<S> findAll(Example<S> example, Pageable pageable);*/

    Page<Recaudador> findByidCliente(Pageable pageable, Long idCliente);

    Page<Recaudador> findAllByFechaInicioBetween(Instant fromDate, Instant toDate, Pageable pageable);

}
