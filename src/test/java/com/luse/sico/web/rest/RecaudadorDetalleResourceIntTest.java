package com.luse.sico.web.rest;

import com.luse.sico.SicoApp;

import com.luse.sico.domain.RecaudadorDetalle;
import com.luse.sico.repository.RecaudadorDetalleRepository;
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
 * Test class for the RecaudadorDetalleResource REST controller.
 *
 * @see RecaudadorDetalleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicoApp.class)
public class RecaudadorDetalleResourceIntTest {

    private static final Long DEFAULT_EJECUTADA = 1L;
    private static final Long UPDATED_EJECUTADA = 2L;

    private static final Instant DEFAULT_FECHA_EJECUCION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_EJECUCION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_PROGRAMADA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_PROGRAMADA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_NRO_CUOTA = 1L;
    private static final Long UPDATED_NRO_CUOTA = 2L;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Long DEFAULT_REINTENTOS = 1L;
    private static final Long UPDATED_REINTENTOS = 2L;

    @Autowired
    private RecaudadorDetalleRepository recaudadorDetalleRepository;

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

    private MockMvc restRecaudadorDetalleMockMvc;

    private RecaudadorDetalle recaudadorDetalle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecaudadorDetalleResource recaudadorDetalleResource = new RecaudadorDetalleResource(recaudadorDetalleRepository);
        this.restRecaudadorDetalleMockMvc = MockMvcBuilders.standaloneSetup(recaudadorDetalleResource)
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
    public static RecaudadorDetalle createEntity(EntityManager em) {
        RecaudadorDetalle recaudadorDetalle = new RecaudadorDetalle()
            .ejecutada(DEFAULT_EJECUTADA)
            .fechaEjecucion(DEFAULT_FECHA_EJECUCION)
            .fechaProgramada(DEFAULT_FECHA_PROGRAMADA)
            .nroCuota(DEFAULT_NRO_CUOTA)
            .observaciones(DEFAULT_OBSERVACIONES)
            .reintentos(DEFAULT_REINTENTOS);
        return recaudadorDetalle;
    }

    @Before
    public void initTest() {
        recaudadorDetalle = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecaudadorDetalle() throws Exception {
        int databaseSizeBeforeCreate = recaudadorDetalleRepository.findAll().size();

        // Create the RecaudadorDetalle
        restRecaudadorDetalleMockMvc.perform(post("/api/recaudador-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recaudadorDetalle)))
            .andExpect(status().isCreated());

        // Validate the RecaudadorDetalle in the database
        List<RecaudadorDetalle> recaudadorDetalleList = recaudadorDetalleRepository.findAll();
        assertThat(recaudadorDetalleList).hasSize(databaseSizeBeforeCreate + 1);
        RecaudadorDetalle testRecaudadorDetalle = recaudadorDetalleList.get(recaudadorDetalleList.size() - 1);
        assertThat(testRecaudadorDetalle.getEjecutada()).isEqualTo(DEFAULT_EJECUTADA);
        assertThat(testRecaudadorDetalle.getFechaEjecucion()).isEqualTo(DEFAULT_FECHA_EJECUCION);
        assertThat(testRecaudadorDetalle.getFechaProgramada()).isEqualTo(DEFAULT_FECHA_PROGRAMADA);
        assertThat(testRecaudadorDetalle.getNroCuota()).isEqualTo(DEFAULT_NRO_CUOTA);
        assertThat(testRecaudadorDetalle.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testRecaudadorDetalle.getReintentos()).isEqualTo(DEFAULT_REINTENTOS);
    }

    @Test
    @Transactional
    public void createRecaudadorDetalleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recaudadorDetalleRepository.findAll().size();

        // Create the RecaudadorDetalle with an existing ID
        recaudadorDetalle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecaudadorDetalleMockMvc.perform(post("/api/recaudador-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recaudadorDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the RecaudadorDetalle in the database
        List<RecaudadorDetalle> recaudadorDetalleList = recaudadorDetalleRepository.findAll();
        assertThat(recaudadorDetalleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecaudadorDetalles() throws Exception {
        // Initialize the database
        recaudadorDetalleRepository.saveAndFlush(recaudadorDetalle);

        // Get all the recaudadorDetalleList
        restRecaudadorDetalleMockMvc.perform(get("/api/recaudador-detalles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recaudadorDetalle.getId().intValue())))
            .andExpect(jsonPath("$.[*].ejecutada").value(hasItem(DEFAULT_EJECUTADA.intValue())))
            .andExpect(jsonPath("$.[*].fechaEjecucion").value(hasItem(DEFAULT_FECHA_EJECUCION.toString())))
            .andExpect(jsonPath("$.[*].fechaProgramada").value(hasItem(DEFAULT_FECHA_PROGRAMADA.toString())))
            .andExpect(jsonPath("$.[*].nroCuota").value(hasItem(DEFAULT_NRO_CUOTA.intValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].reintentos").value(hasItem(DEFAULT_REINTENTOS.intValue())));
    }
    
    @Test
    @Transactional
    public void getRecaudadorDetalle() throws Exception {
        // Initialize the database
        recaudadorDetalleRepository.saveAndFlush(recaudadorDetalle);

        // Get the recaudadorDetalle
        restRecaudadorDetalleMockMvc.perform(get("/api/recaudador-detalles/{id}", recaudadorDetalle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recaudadorDetalle.getId().intValue()))
            .andExpect(jsonPath("$.ejecutada").value(DEFAULT_EJECUTADA.intValue()))
            .andExpect(jsonPath("$.fechaEjecucion").value(DEFAULT_FECHA_EJECUCION.toString()))
            .andExpect(jsonPath("$.fechaProgramada").value(DEFAULT_FECHA_PROGRAMADA.toString()))
            .andExpect(jsonPath("$.nroCuota").value(DEFAULT_NRO_CUOTA.intValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.reintentos").value(DEFAULT_REINTENTOS.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecaudadorDetalle() throws Exception {
        // Get the recaudadorDetalle
        restRecaudadorDetalleMockMvc.perform(get("/api/recaudador-detalles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecaudadorDetalle() throws Exception {
        // Initialize the database
        recaudadorDetalleRepository.saveAndFlush(recaudadorDetalle);

        int databaseSizeBeforeUpdate = recaudadorDetalleRepository.findAll().size();

        // Update the recaudadorDetalle
        RecaudadorDetalle updatedRecaudadorDetalle = recaudadorDetalleRepository.findById(recaudadorDetalle.getId()).get();
        // Disconnect from session so that the updates on updatedRecaudadorDetalle are not directly saved in db
        em.detach(updatedRecaudadorDetalle);
        updatedRecaudadorDetalle
            .ejecutada(UPDATED_EJECUTADA)
            .fechaEjecucion(UPDATED_FECHA_EJECUCION)
            .fechaProgramada(UPDATED_FECHA_PROGRAMADA)
            .nroCuota(UPDATED_NRO_CUOTA)
            .observaciones(UPDATED_OBSERVACIONES)
            .reintentos(UPDATED_REINTENTOS);

        restRecaudadorDetalleMockMvc.perform(put("/api/recaudador-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecaudadorDetalle)))
            .andExpect(status().isOk());

        // Validate the RecaudadorDetalle in the database
        List<RecaudadorDetalle> recaudadorDetalleList = recaudadorDetalleRepository.findAll();
        assertThat(recaudadorDetalleList).hasSize(databaseSizeBeforeUpdate);
        RecaudadorDetalle testRecaudadorDetalle = recaudadorDetalleList.get(recaudadorDetalleList.size() - 1);
        assertThat(testRecaudadorDetalle.getEjecutada()).isEqualTo(UPDATED_EJECUTADA);
        assertThat(testRecaudadorDetalle.getFechaEjecucion()).isEqualTo(UPDATED_FECHA_EJECUCION);
        assertThat(testRecaudadorDetalle.getFechaProgramada()).isEqualTo(UPDATED_FECHA_PROGRAMADA);
        assertThat(testRecaudadorDetalle.getNroCuota()).isEqualTo(UPDATED_NRO_CUOTA);
        assertThat(testRecaudadorDetalle.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testRecaudadorDetalle.getReintentos()).isEqualTo(UPDATED_REINTENTOS);
    }

    @Test
    @Transactional
    public void updateNonExistingRecaudadorDetalle() throws Exception {
        int databaseSizeBeforeUpdate = recaudadorDetalleRepository.findAll().size();

        // Create the RecaudadorDetalle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecaudadorDetalleMockMvc.perform(put("/api/recaudador-detalles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recaudadorDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the RecaudadorDetalle in the database
        List<RecaudadorDetalle> recaudadorDetalleList = recaudadorDetalleRepository.findAll();
        assertThat(recaudadorDetalleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecaudadorDetalle() throws Exception {
        // Initialize the database
        recaudadorDetalleRepository.saveAndFlush(recaudadorDetalle);

        int databaseSizeBeforeDelete = recaudadorDetalleRepository.findAll().size();

        // Delete the recaudadorDetalle
        restRecaudadorDetalleMockMvc.perform(delete("/api/recaudador-detalles/{id}", recaudadorDetalle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RecaudadorDetalle> recaudadorDetalleList = recaudadorDetalleRepository.findAll();
        assertThat(recaudadorDetalleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecaudadorDetalle.class);
        RecaudadorDetalle recaudadorDetalle1 = new RecaudadorDetalle();
        recaudadorDetalle1.setId(1L);
        RecaudadorDetalle recaudadorDetalle2 = new RecaudadorDetalle();
        recaudadorDetalle2.setId(recaudadorDetalle1.getId());
        assertThat(recaudadorDetalle1).isEqualTo(recaudadorDetalle2);
        recaudadorDetalle2.setId(2L);
        assertThat(recaudadorDetalle1).isNotEqualTo(recaudadorDetalle2);
        recaudadorDetalle1.setId(null);
        assertThat(recaudadorDetalle1).isNotEqualTo(recaudadorDetalle2);
    }
}
