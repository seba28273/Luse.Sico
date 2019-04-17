package com.luse.sico.web.rest;
import com.luse.sico.domain.CreditDetalle;
import com.luse.sico.service.CreditDetalleService;
import com.luse.sico.web.rest.errors.BadRequestAlertException;
import com.luse.sico.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CreditDetalle.
 */
@RestController
@RequestMapping("/api")
public class CreditDetalleResource {

    private final Logger log = LoggerFactory.getLogger(CreditDetalleResource.class);

    private static final String ENTITY_NAME = "creditDetalle";

    private final CreditDetalleService creditDetalleService;

    public CreditDetalleResource(CreditDetalleService creditDetalleService) {
        this.creditDetalleService = creditDetalleService;
    }

    /**
     * POST  /credit-detalles : Create a new creditDetalle.
     *
     * @param creditDetalle the creditDetalle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new creditDetalle, or with status 400 (Bad Request) if the creditDetalle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/credit-detalles")
    public ResponseEntity<CreditDetalle> createCreditDetalle(@RequestBody CreditDetalle creditDetalle) throws URISyntaxException {
        log.debug("REST request to save CreditDetalle : {}", creditDetalle);
        if (creditDetalle.getId() != null) {
            throw new BadRequestAlertException("A new creditDetalle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CreditDetalle result = creditDetalleService.save(creditDetalle);
        return ResponseEntity.created(new URI("/api/credit-detalles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /credit-detalles : Updates an existing creditDetalle.
     *
     * @param creditDetalle the creditDetalle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated creditDetalle,
     * or with status 400 (Bad Request) if the creditDetalle is not valid,
     * or with status 500 (Internal Server Error) if the creditDetalle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/credit-detalles")
    public ResponseEntity<CreditDetalle> updateCreditDetalle(@RequestBody CreditDetalle creditDetalle) throws URISyntaxException {
        log.debug("REST request to update CreditDetalle : {}", creditDetalle);
        if (creditDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CreditDetalle result = creditDetalleService.save(creditDetalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, creditDetalle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /credit-detalles : get all the creditDetalles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of creditDetalles in body
     */
    @GetMapping("/credit-detalles")
    public List<CreditDetalle> getAllCreditDetalles() {
        log.debug("REST request to get all CreditDetalles");
        return creditDetalleService.findAll();
    }

    /**
     * GET  /credit-detalles/:id : get the "id" creditDetalle.
     *
     * @param id the id of the creditDetalle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the creditDetalle, or with status 404 (Not Found)
     */
    @GetMapping("/credit-detalles/{id}")
    public ResponseEntity<CreditDetalle> getCreditDetalle(@PathVariable Long id) {
        log.debug("REST request to get CreditDetalle : {}", id);
        Optional<CreditDetalle> creditDetalle = creditDetalleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(creditDetalle);
    }

    /**
     * DELETE  /credit-detalles/:id : delete the "id" creditDetalle.
     *
     * @param id the id of the creditDetalle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/credit-detalles/{id}")
    public ResponseEntity<Void> deleteCreditDetalle(@PathVariable Long id) {
        log.debug("REST request to delete CreditDetalle : {}", id);
        creditDetalleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
