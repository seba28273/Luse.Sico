package com.luse.sico.web.rest;

import com.luse.sico.SicoApp;

import com.luse.sico.domain.CreditDetalle;
import com.luse.sico.repository.CreditDetalleRepository;
import com.luse.sico.service.CreditDetalleService;
import com.luse.sico.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.luse.sico.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CreditDetalleResource REST controller.
 *
 * @see CreditDetalleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicoApp.class)
public class CreditDetalleResourceIntTest {

    private static final Long DEFAULT_NRO_CUOTA = 1L;
    private static final Long UPDATED_NRO_CUOTA = 2L;

    private static final Instant DEFAULT_FECHA_PROGRAMADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_PROGRAMADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_EJECUCION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_EJECUCION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_REINTENTOS = 1L;
    private static final Long UPDATED_REINTENTOS = 2L;

    private static final Boolean DEFAULT_EJECUTADA = false;
    private static final Boolean UPDATED_EJECUTADA = true;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Long DEFAULT_CANTIDAD_RENEGOCIADO = 1L;
    private static final Long UPDATED_CANTIDAD_RENEGOCIADO = 2L;

    @Autowired
    private CreditDetalleRepository creditDetalleRepository;

    @Autowired
    private CreditDetalleService creditDetalleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCreditDetalleMockMvc;

    private CreditDetalle creditDetalle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CreditDetalleResource creditDetalleResource = new CreditDetalleResource(creditDetalleService);
        this.restCreditDetalleMockMvc = MockMvcBuilders.standaloneSetup(creditDetalleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CreditDetalle createEntity(EntityManager em) {
        CreditDetalle creditDetalle = new CreditDetalle()
            .nroCuota(DEFAULT_NRO_CUOTA)
            .fechaProgramada(DEFAULT_FECHA_PROGRAMADA)
            .fechaEjecucion(DEFAULT_FECHA_EJECUCION)
            .reintentos(DEFAULT_REINTENTOS)
            .ejecutada(DEFAULT_EJECUTADA)
            .observaciones(DEFAULT_OBSERVACIONES)
            .cantidadRenegociado(DEFAULT_CANTIDAD_RENEGOCIADO);
        return creditDetalle;
    }

    @Before
    public void initTest() {
        creditDetalle = createEntity(em);
    }

    @Test
    @Transactional
    public void createCreditDetalle() throws Exception {
        int databaseSizeBeforeCreate = creditDetalleRepository.findAll().size();

        // Create the CreditDetalle
        restCreditDetalleMockMvc.perform(post("/api/credit-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(creditDetalle)))
            .andExpect(status().isCreated());

        // Validate the CreditDetalle in the database
        List<CreditDetalle> creditDetalleList = creditDetalleRepository.findAll();
        assertThat(creditDetalleList).hasSize(databaseSizeBeforeCreate + 1);
        CreditDetalle testCreditDetalle = creditDetalleList.get(creditDetalleList.size() - 1);
        assertThat(testCreditDetalle.getNroCuota()).isEqualTo(DEFAULT_NRO_CUOTA);
        assertThat(testCreditDetalle.getFechaProgramada()).isEqualTo(DEFAULT_FECHA_PROGRAMADA);
        assertThat(testCreditDetalle.getFechaEjecucion()).isEqualTo(DEFAULT_FECHA_EJECUCION);
        assertThat(testCreditDetalle.getReintentos()).isEqualTo(DEFAULT_REINTENTOS);
        assertThat(testCreditDetalle.isEjecutada()).isEqualTo(DEFAULT_EJECUTADA);
        assertThat(testCreditDetalle.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testCreditDetalle.getCantidadRenegociado()).isEqualTo(DEFAULT_CANTIDAD_RENEGOCIADO);
    }

    @Test
    @Transactional
    public void createCreditDetalleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = creditDetalleRepository.findAll().size();

        // Create the CreditDetalle with an existing ID
        creditDetalle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCreditDetalleMockMvc.perform(post("/api/credit-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(creditDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the CreditDetalle in the database
        List<CreditDetalle> creditDetalleList = creditDetalleRepository.findAll();
        assertThat(creditDetalleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCreditDetalles() throws Exception {
        // Initialize the database
        creditDetalleRepository.saveAndFlush(creditDetalle);

        // Get all the creditDetalleList
        restCreditDetalleMockMvc.perform(get("/api/credit-detalles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(creditDetalle.getId().intValue())))
            .andExpect(jsonPath("$.[*].nroCuota").value(hasItem(DEFAULT_NRO_CUOTA.intValue())))
            .andExpect(jsonPath("$.[*].fechaProgramada").value(hasItem(DEFAULT_FECHA_PROGRAMADA.toString())))
            .andExpect(jsonPath("$.[*].fechaEjecucion").value(hasItem(DEFAULT_FECHA_EJECUCION.toString())))
            .andExpect(jsonPath("$.[*].reintentos").value(hasItem(DEFAULT_REINTENTOS.intValue())))
            .andExpect(jsonPath("$.[*].ejecutada").value(hasItem(DEFAULT_EJECUTADA.booleanValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].cantidadRenegociado").value(hasItem(DEFAULT_CANTIDAD_RENEGOCIADO.intValue())));
    }
    
    @Test
    @Transactional
    public void getCreditDetalle() throws Exception {
        // Initialize the database
        creditDetalleRepository.saveAndFlush(creditDetalle);

        // Get the creditDetalle
        restCreditDetalleMockMvc.perform(get("/api/credit-detalles/{id}", creditDetalle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(creditDetalle.getId().intValue()))
            .andExpect(jsonPath("$.nroCuota").value(DEFAULT_NRO_CUOTA.intValue()))
            .andExpect(jsonPath("$.fechaProgramada").value(DEFAULT_FECHA_PROGRAMADA.toString()))
            .andExpect(jsonPath("$.fechaEjecucion").value(DEFAULT_FECHA_EJECUCION.toString()))
            .andExpect(jsonPath("$.reintentos").value(DEFAULT_REINTENTOS.intValue()))
            .andExpect(jsonPath("$.ejecutada").value(DEFAULT_EJECUTADA.booleanValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.cantidadRenegociado").value(DEFAULT_CANTIDAD_RENEGOCIADO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCreditDetalle() throws Exception {
        // Get the creditDetalle
        restCreditDetalleMockMvc.perform(get("/api/credit-detalles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCreditDetalle() throws Exception {
        // Initialize the database
        creditDetalleService.save(creditDetalle);

        int databaseSizeBeforeUpdate = creditDetalleRepository.findAll().size();

        // Update the creditDetalle
        CreditDetalle updatedCreditDetalle = creditDetalleRepository.findById(creditDetalle.getId()).get();
        // Disconnect from session so that the updates on updatedCreditDetalle are not directly saved in db
        em.detach(updatedCreditDetalle);
        updatedCreditDetalle
            .nroCuota(UPDATED_NRO_CUOTA)
            .fechaProgramada(UPDATED_FECHA_PROGRAMADA)
            .fechaEjecucion(UPDATED_FECHA_EJECUCION)
            .reintentos(UPDATED_REINTENTOS)
            .ejecutada(UPDATED_EJECUTADA)
            .observaciones(UPDATED_OBSERVACIONES)
            .cantidadRenegociado(UPDATED_CANTIDAD_RENEGOCIADO);

        restCreditDetalleMockMvc.perform(put("/api/credit-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCreditDetalle)))
            .andExpect(status().isOk());

        // Validate the CreditDetalle in the database
        List<CreditDetalle> creditDetalleList = creditDetalleRepository.findAll();
        assertThat(creditDetalleList).hasSize(databaseSizeBeforeUpdate);
        CreditDetalle testCreditDetalle = creditDetalleList.get(creditDetalleList.size() - 1);
        assertThat(testCreditDetalle.getNroCuota()).isEqualTo(UPDATED_NRO_CUOTA);
        assertThat(testCreditDetalle.getFechaProgramada()).isEqualTo(UPDATED_FECHA_PROGRAMADA);
        assertThat(testCreditDetalle.getFechaEjecucion()).isEqualTo(UPDATED_FECHA_EJECUCION);
        assertThat(testCreditDetalle.getReintentos()).isEqualTo(UPDATED_REINTENTOS);
        assertThat(testCreditDetalle.isEjecutada()).isEqualTo(UPDATED_EJECUTADA);
        assertThat(testCreditDetalle.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testCreditDetalle.getCantidadRenegociado()).isEqualTo(UPDATED_CANTIDAD_RENEGOCIADO);
    }

    @Test
    @Transactional
    public void updateNonExistingCreditDetalle() throws Exception {
        int databaseSizeBeforeUpdate = creditDetalleRepository.findAll().size();

        // Create the CreditDetalle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCreditDetalleMockMvc.perform(put("/api/credit-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(creditDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the CreditDetalle in the database
        List<CreditDetalle> creditDetalleList = creditDetalleRepository.findAll();
        assertThat(creditDetalleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCreditDetalle() throws Exception {
        // Initialize the database
        creditDetalleService.save(creditDetalle);

        int databaseSizeBeforeDelete = creditDetalleRepository.findAll().size();

        // Delete the creditDetalle
        restCreditDetalleMockMvc.perform(delete("/api/credit-detalles/{id}", creditDetalle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CreditDetalle> creditDetalleList = creditDetalleRepository.findAll();
        assertThat(creditDetalleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CreditDetalle.class);
        CreditDetalle creditDetalle1 = new CreditDetalle();
        creditDetalle1.setId(1L);
        CreditDetalle creditDetalle2 = new CreditDetalle();
        creditDetalle2.setId(creditDetalle1.getId());
        assertThat(creditDetalle1).isEqualTo(creditDetalle2);
        creditDetalle2.setId(2L);
        assertThat(creditDetalle1).isNotEqualTo(creditDetalle2);
        creditDetalle1.setId(null);
        assertThat(creditDetalle1).isNotEqualTo(creditDetalle2);
    }
}
