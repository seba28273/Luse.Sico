package com.luse.sico.repository;

import com.luse.sico.domain.CreditDetalle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CreditDetalle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CreditDetalleRepository extends JpaRepository<CreditDetalle, Long> {

}
