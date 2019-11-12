package com.luse.sico.web.rest;
import com.luse.sico.domain.CuotasVencidas;
import com.luse.sico.domain.RecaudadorCuotasVencidas;
import com.luse.sico.domain.RecaudadorDetalle;
import com.luse.sico.repository.RecaudadorDetalleRepository;
import com.luse.sico.web.rest.errors.BadRequestAlertException;
import com.luse.sico.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import java.net.URI;
import java.net.URISyntaxException;

import java.sql.ResultSet;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RecaudadorDetalle.
 */
@RestController
@RequestMapping("/api")
public class RecaudadorDetalleResource {

    private final Logger log = LoggerFactory.getLogger(RecaudadorDetalleResource.class);

    private static final String ENTITY_NAME = "recaudadorDetalle";

    private final RecaudadorDetalleRepository recaudadorDetalleRepository;

    @Autowired
    JdbcTemplate oTemplate = new JdbcTemplate();

    public RecaudadorDetalleResource(RecaudadorDetalleRepository recaudadorDetalleRepository) {
        this.recaudadorDetalleRepository = recaudadorDetalleRepository;
    }

    /**
     * POST  /recaudador-detalles : Create a new recaudadorDetalle.
     *
     * @param recaudadorDetalle the recaudadorDetalle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recaudadorDetalle, or with status 400 (Bad Request) if the recaudadorDetalle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recaudador-detalles")
    public ResponseEntity<RecaudadorDetalle> createRecaudadorDetalle(@RequestBody RecaudadorDetalle recaudadorDetalle) throws URISyntaxException {
        log.debug("REST request to save RecaudadorDetalle : {}", recaudadorDetalle);
        if (recaudadorDetalle.getId() != null) {
            throw new BadRequestAlertException("A new recaudadorDetalle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecaudadorDetalle result = recaudadorDetalleRepository.save(recaudadorDetalle);
        return ResponseEntity.created(new URI("/api/recaudador-detalles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recaudador-detalles : Updates an existing recaudadorDetalle.
     *
     * @param recaudadorDetalle the recaudadorDetalle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recaudadorDetalle,
     * or with status 400 (Bad Request) if the recaudadorDetalle is not valid,
     * or with status 500 (Internal Server Error) if the recaudadorDetalle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recaudador-detalles")
    public ResponseEntity<RecaudadorDetalle> updateRecaudadorDetalle(@RequestBody RecaudadorDetalle recaudadorDetalle) throws URISyntaxException {
        log.debug("REST request to update RecaudadorDetalle : {}", recaudadorDetalle);
        if (recaudadorDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecaudadorDetalle result = recaudadorDetalleRepository.save( recaudadorDetalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recaudadorDetalle.getId().toString()))
            .body(result);
    }

    @GetMapping("/recaudador-detalles/listcuotasvencidas/{fechaProgramada}")
    public List<CuotasVencidas> getAllCuotasVencidas(@RequestParam(value = "fechaProgramada") LocalDate fecha) {

        log.debug("REST request to get all RecaudadorDetalles");


        List<CuotasVencidas> oCuotasVencidas;

        oCuotasVencidas = oTemplate.query("SELECT C.first_name, C.last_name,  R.cant_cuotas, D.*,DATEDIFF(D.fecha_programada, NOW()) as Vencida, estadocuota " +
                                                "FROM sico.recaudador_detalle as D inner join sico.recaudador as R ON R.id = D.id_recaudador  " +
                                                "inner join sico.cliente as C  ON C.id = R.id_cliente " +
                                                "WHERE ejecutada =0 and fecha_Programada < '" + fecha + "'" ,
            (ResultSet rs , int rowNum) -> new CuotasVencidas(rs.getLong("id"),rs.getLong("ejecutada"),
                  rs.getLong("nro_cuota")
                , rs.getLong("reintentos") ,rs.getLong("id_recaudador"),rs.getString("observaciones")
            ,rs.getDate("fecha_Programada").toLocalDate().atStartOfDay(ZoneOffset.UTC).toInstant(),
                rs.getLong("Vencida"), rs.getString("first_name"), rs.getString("last_name"),
                rs.getLong("cant_cuotas"),rs.getObject("estadocuota")));


        return  oCuotasVencidas;
    }

//RecaudadorDetalle{id=null, ejecutada=null, fechaEjecucion='null', fechaProgramada='null', nroCuota=null, observaciones='null', reintentos=null, recaudadorid=null}
    @GetMapping("/recaudador-detalles/update/{id}/{pagada}")
    public ResponseEntity<RecaudadorDetalle> UpdateCuota(@PathVariable Long id, @PathVariable Long pagada) {
        log.debug("REST request to get RecaudadorDetalle : {}", id);
        Optional<RecaudadorDetalle> recaudadorDetalle = recaudadorDetalleRepository.findById(id);
        RecaudadorDetalle oRecaudadorDetalle = new RecaudadorDetalle();
        if( recaudadorDetalle.isPresent()){
            if (  pagada == 0  ){
                if (  recaudadorDetalle.get().getEjecutada() == 1  ){
                    throw new BadRequestAlertException("La Cuota ya se encuetra pagada", ENTITY_NAME, "Cuota Paga");
                }
            }
            if (  pagada == 1  ){
                oRecaudadorDetalle.setId(recaudadorDetalle.get().getId());
                oRecaudadorDetalle.setRecaudador_id(recaudadorDetalle.get().getRecaudador_id());
                oRecaudadorDetalle.setReintentos(recaudadorDetalle.get().getReintentos() + 1);
                oRecaudadorDetalle.setObservaciones("Cuota Pagada");
                oRecaudadorDetalle.setEjecutada((long) 1);
                oRecaudadorDetalle.setFechaEjecucion(Instant.now());
                oRecaudadorDetalle.setFechaProgramada(recaudadorDetalle.get().getFechaProgramada());
                oRecaudadorDetalle.setNroCuota(recaudadorDetalle.get().getNroCuota());
                oRecaudadorDetalle.setEstadoCuota("PAGADA");
            }else{
                oRecaudadorDetalle.setId(recaudadorDetalle.get().getId());
                oRecaudadorDetalle.setRecaudador_id(recaudadorDetalle.get().getRecaudador_id());
                oRecaudadorDetalle.setReintentos(recaudadorDetalle.get().getReintentos() + 1);
                oRecaudadorDetalle.setObservaciones("Cuota No Pagada");
                oRecaudadorDetalle.setEjecutada((long) 0);
                oRecaudadorDetalle.setFechaEjecucion(recaudadorDetalle.get().getFechaEjecucion());
                oRecaudadorDetalle.setFechaProgramada(recaudadorDetalle.get().getFechaProgramada());
                oRecaudadorDetalle.setNroCuota(recaudadorDetalle.get().getNroCuota());
                oRecaudadorDetalle.setEstadoCuota("PENDIENTE");
            }

        }
        else{
            throw new BadRequestAlertException("No se pudo cargar la cuota, verifique los datos ingresados", ENTITY_NAME, "Cuota Inexistente");
        }
        RecaudadorDetalle result = recaudadorDetalleRepository.save(oRecaudadorDetalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, oRecaudadorDetalle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recaudador-detalles : get all the recaudadorDetalles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recaudadorDetalles in body
     */
    @GetMapping("/recaudador-detalles")
    public List<RecaudadorDetalle> getAllRecaudadorDetalles() {
        log.debug("REST request to get all RecaudadorDetalles");
        return recaudadorDetalleRepository.findAll();
    }

    /**
     * GET  /recaudador-detalles/:id : get the "id" recaudadorDetalle.
     *
     * @param id the id of the recaudadorDetalle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recaudadorDetalle, or with status 404 (Not Found)
     */
    @GetMapping("/recaudador-detalles/{id}")
    public ResponseEntity<RecaudadorDetalle> getRecaudadorDetalle(@PathVariable Long id) {
        log.debug("REST request to get RecaudadorDetalle : {}", id);
        Optional<RecaudadorDetalle> recaudadorDetalle = recaudadorDetalleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recaudadorDetalle);
    }

    /**
     * DELETE  /recaudador-detalles/:id : delete the "id" recaudadorDetalle.
     *
     * @param id the id of the recaudadorDetalle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recaudador-detalles/{id}")
    public ResponseEntity<Void> deleteRecaudadorDetalle(@PathVariable Long id) {
        log.debug("REST request to delete RecaudadorDetalle : {}", id);
        recaudadorDetalleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
