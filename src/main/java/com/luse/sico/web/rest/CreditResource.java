package com.luse.sico.web.rest;
import com.luse.sico.domain.Credit;
import com.luse.sico.service.CreditService;
import com.luse.sico.web.rest.errors.BadRequestAlertException;
import com.luse.sico.web.rest.util.HeaderUtil;
import com.luse.sico.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Credit.
 */
@RestController
@RequestMapping("/api")
public class CreditResource {

    private final Logger log = LoggerFactory.getLogger(CreditResource.class);

    private static final String ENTITY_NAME = "credit";

    private final CreditService creditService;

    public CreditResource(CreditService creditService) {
        this.creditService = creditService;
    }

    /**
     * POST  /credits : Create a new credit.
     *
     * @param credit the credit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new credit, or with status 400 (Bad Request) if the credit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/credits")
    public ResponseEntity<Credit> createCredit(@RequestBody Credit credit) throws URISyntaxException {
        log.debug("REST request to save Credit : {}", credit);
        if (credit.getId() != null) {
            throw new BadRequestAlertException("A new credit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Credit result = creditService.save(credit);
        return ResponseEntity.created(new URI("/api/credits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /credits : Updates an existing credit.
     *
     * @param credit the credit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated credit,
     * or with status 400 (Bad Request) if the credit is not valid,
     * or with status 500 (Internal Server Error) if the credit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/credits")
    public ResponseEntity<Credit> updateCredit(@RequestBody Credit credit) throws URISyntaxException {
        log.debug("REST request to update Credit : {}", credit);
        if (credit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Credit result = creditService.save(credit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, credit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /credits : get all the credits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of credits in body
     */
    @GetMapping("/credits")
    public ResponseEntity<List<Credit>> getAllCredits(Pageable pageable) {
        log.debug("REST request to get a page of Credits");
        Page<Credit> page = creditService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/credits");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /credits/:id : get the "id" credit.
     *
     * @param id the id of the credit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the credit, or with status 404 (Not Found)
     */
    @GetMapping("/credits/{id}")
    public ResponseEntity<Credit> getCredit(@PathVariable Long id) {
        log.debug("REST request to get Credit : {}", id);
        Optional<Credit> credit = creditService.findOne(id);
        return ResponseUtil.wrapOrNotFound(credit);
    }

    /**
     * DELETE  /credits/:id : delete the "id" credit.
     *
     * @param id the id of the credit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/credits/{id}")
    public ResponseEntity<Void> deleteCredit(@PathVariable Long id) {
        log.debug("REST request to delete Credit : {}", id);
        creditService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
