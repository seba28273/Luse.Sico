package com.luse.sico.web.rest;
import com.luse.sico.domain.Recaudador;
import com.luse.sico.domain.RecaudadorDetalle;
import com.luse.sico.domain.enumeration.EstadoPrestamo;
import com.luse.sico.repository.RecaudadorRepository;
import com.luse.sico.service.RecaudadorDetalleService;
import com.luse.sico.service.RecaudadorService;
import com.luse.sico.web.rest.errors.BadRequestAlertException;
import com.luse.sico.web.rest.util.HeaderUtil;
import com.luse.sico.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.sql.ResultSet;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Recaudador.
 */
@RestController
@RequestMapping("/api")
public class RecaudadorResource {

    private final Logger log = LoggerFactory.getLogger(RecaudadorResource.class);

    private static final String ENTITY_NAME = "recaudador";

    private final RecaudadorService recaudadorService;

    @Autowired
    RecaudadorDetalleService recaudadorDetalleService;

    @Autowired
    JdbcTemplate oTemplate = new JdbcTemplate();

    public RecaudadorResource(RecaudadorService recaudadorService) {

        this.recaudadorService = recaudadorService;

    }

    /**
     * POST  /recaudadors : Create a new recaudador.
     *
     * @param recaudador the recaudador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recaudador, or with status 400 (Bad Request) if the recaudador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recaudadors")
    public ResponseEntity<Recaudador> createRecaudador(@RequestBody Recaudador recaudador) throws URISyntaxException {
        log.debug("REST request to save Recaudador : {}", recaudador);
        if (recaudador.getId() != null) {
            throw new BadRequestAlertException("A new recaudador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recaudador result = recaudadorService.save(recaudador);

        recaudadorDetalleService.AddDetalleRecaudador(result.getId(),result.getCantCuotas());

        return ResponseEntity.created(new URI("/api/recaudadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);

    }

    @GetMapping("/recaudadors/}")
    public List<Recaudador> getAllTransferenciasPendientes() {
        log.debug("REST request to get all RecaudadorDetalles");


        List<Recaudador> oRecaudador;

        oRecaudador = oTemplate.query("SELECT id_cliente,sico.cliente.nro_cbu,sico.recaudador.id,capital_prestamo,sico.cliente.cuit,transferido " +
                "                           FROM sico.recaudador inner join sico.cliente on sico.recaudador.id_cliente= sico.cliente.id WHERE transferido =0" ,
            (ResultSet rs , int rowNum) -> new Recaudador(rs.getLong("id"),rs.getBoolean("transferido"),
                rs.getString("cuit")  , rs.getLong("id_cliente"),rs.getString("nro_cbu") ,
                rs.getDouble("capital_prestamo")  ));

        return  oRecaudador;
    }
    /**
     * PUT  /recaudadors : Updates an existing recaudador.
     *
     * @param recaudador the recaudador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recaudador,
     * or with status 400 (Bad Request) if the recaudador is not valid,
     * or with status 500 (Internal Server Error) if the recaudador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recaudadors")
    public ResponseEntity<Recaudador> updateRecaudador(@RequestBody Recaudador recaudador) throws URISyntaxException {
        log.debug("REST request to update Recaudador : {}", recaudador);
        if (recaudador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Recaudador result = recaudadorService.save(recaudador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recaudador.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recaudadors : Updates an existing recaudador.
     *
     * @param id the recaudador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recaudador,
     * or with status 400 (Bad Request) if the recaudador is not valid,
     * or with status 500 (Internal Server Error) if the recaudador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recaudadors/update/{id}")
    public ResponseEntity<Recaudador> updateRecaudadorOnlyTransferido(@PathVariable Long id) throws URISyntaxException {

       //Recaudador recaudador3 = new Recaudador();

        Optional<Recaudador> recaudador = recaudadorService.findOne(id);
        if (!recaudador.isPresent()) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        recaudador.get().setTransferido(true);
        recaudador.get().setEstado(EstadoPrestamo.ACREDITADO);
        Recaudador result = recaudadorService.save(recaudador.get());
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recaudador.get().getId().toString()))
            .body(result);
    }

    /**
     * GET  /recaudadors : get all the recaudadors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of recaudadors in body
     */
    @GetMapping("/recaudadors")
    public ResponseEntity<List<Recaudador>> getAllRecaudadors(Pageable pageable) {
        log.debug("REST request to get a page of Recaudadors");
        Page<Recaudador> page = recaudadorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/recaudadors");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    /**
     * GET  /recaudadors/:id : get the "id" recaudador.
     *
     * @param id the id of the recaudador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recaudador, or with status 404 (Not Found)
     */
    @GetMapping("/recaudadors/{id}")
    public ResponseEntity<Recaudador> getRecaudador(@PathVariable Long id) {
        log.debug("REST request to get Recaudador : {}", id);
        Optional<Recaudador> recaudador = recaudadorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recaudador);
    }

    @GetMapping("/ByidCliente/{idCliente}")
    public  ResponseEntity<List<Recaudador>> getRecaudadorByidCliente(@PathVariable Long idCliente, Pageable pageable) {
        log.debug("REST request to get Recaudador : {}", idCliente);

        Page<Recaudador> page = recaudadorService.findByidCliente(pageable, idCliente);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/recaudadors");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    @GetMapping("/Resumido/{idCliente}")
    public  List<Recaudador> getRecaudadorByidClienteResumido(@PathVariable Long idCliente) {
        log.debug("REST request to get Recaudador : {}", idCliente);

        List<Recaudador> oRecaudador;

        oRecaudador = oTemplate.query("SELECT r.id_cliente,r.id,r.capital_prestamo, r.estado, r.transferido, r.cant_cuotas, r.cuota_cobrada ,r.fecha_inicio,nro_cuota, " +
                "min(rd.fecha_programada) as fecha_programada ,(CASE WHEN " +
                "  (SELECT  COUNT(*) " +
                "  FROM sico.recaudador_detalle as recdet " +
                "  INNER JOIN sico.recaudador as Rec ON Rec.id = recdet.id_recaudador " +
                "  WHERE recdet.ejecutada = 0 and " +
                "  Rec.id = r.id and recdet.fecha_programada < NOW() " +
                "  GROUP BY recdet.id_recaudador " +
                "  ) " +
                "   IS NULL  THEN  0 " +
                "  ELSE " +
                "   (SELECT  COUNT(*) " +
                "  FROM sico.recaudador_detalle as recdet " +
                "  INNER JOIN sico.recaudador as Rec ON Rec.id = recdet.id_recaudador " +
                "  WHERE recdet.ejecutada = 0 and " +
                "  Rec.id = r.id and recdet.fecha_programada < NOW() " +
                "  GROUP BY recdet.id_recaudador " +
                "  ) " +
                "  END) " +
                "  AS CuotasAtrasadas " +
                "FROM sico.recaudador as r " +
                "inner join sico.cliente as c on r.id_cliente= c.id " +
                "inner join sico.recaudador_detalle as rd on rd.id_recaudador = r.id " +
                "WHERE r.id_cliente= " + idCliente + "  and ejecutada=0 " +
                "GROUP BY r.id_cliente,r.id,r.capital_prestamo, r.estado, r.transferido, r.cant_cuotas, r.cuota_cobrada ,r.fecha_inicio " ,
            (ResultSet rs , int rowNum) -> new Recaudador(rs.getLong("id"), rs.getLong("id_cliente"),
                rs.getBoolean("transferido"),rs.getString("estado"),rs.getLong("cant_cuotas"),
                rs.getLong("nro_cuota")  , rs.getLong("cuota_cobrada"),rs.getDouble("capital_prestamo") ,
                rs.getString("fecha_inicio") , rs.getString("fecha_programada") ));


        return  oRecaudador;


    }



    /**
     * DELETE  /recaudadors/:id : delete the "id" recaudador.
     *
     * @param id the id of the recaudador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recaudadors/{id}")
    public ResponseEntity<Void> deleteRecaudador(@PathVariable Long id) {
        log.debug("REST request to delete Recaudador : {}", id);
        recaudadorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
