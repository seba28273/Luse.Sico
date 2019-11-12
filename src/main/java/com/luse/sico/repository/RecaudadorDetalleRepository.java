package com.luse.sico.repository;

import com.luse.sico.domain.RecaudadorDetalle;
import com.luse.sico.service.impl.RecaudadorDetalleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;


/**
 * Spring Data  repository for the RecaudadorDetalle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecaudadorDetalleRepository extends JpaRepository<RecaudadorDetalle, Long> {

   /* @Autowired
    JdbcTemplate oTemplate = new JdbcTemplate();

    {

         return oTemplate.query("SELECT * FROM sico.recaudador_detalle WHERE FECHA_PROGRAMADA='" + fecha + "'" ,
                                                                (rs , rowNum) -> new RecaudadorDetalle());


    }*/
  // List<RecaudadorDetalle> getAllByEjecutadaFalseAndAndFechaProgramada_Min(Instant fecha);

}
