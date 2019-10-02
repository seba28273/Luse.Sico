package com.luse.sico.web.rest;

import com.luse.sico.SicoApp;

import com.luse.sico.domain.Recaudador;
import com.luse.sico.repository.RecaudadorRepository;
import com.luse.sico.service.RecaudadorService;
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

import com.luse.sico.domain.enumeration.Periodicidad;
import com.luse.sico.domain.enumeration.TipoCobro;
/**
 * Test class for the RecaudadorResource REST controller.
 *
 * @see RecaudadorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicoApp.class)
public class RecaudadorResourceIntTest {

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final Long DEFAULT_CANT_CUOTAS = 1L;
    private static final Long UPDATED_CANT_CUOTAS = 2L;

    private static final Long DEFAULT_CANTIDAD_RENEGOCIADO = 1L;
    private static final Long UPDATED_CANTIDAD_RENEGOCIADO = 2L;

    private static final Double DEFAULT_CAPITAL_PRESTAMO = Double.valueOf(0);
    private static final Double UPDATED_CAPITAL_PRESTAMO = Double.valueOf(0);

    private static final Long DEFAULT_CUOTA_COBRADA = 1L;
    private static final Long UPDATED_CUOTA_COBRADA = 2L;

    private static final Double DEFAULT_CUOTA_PURA = Double.valueOf(0);
    private static final Double UPDATED_CUOTA_PURA = Double.valueOf(0);

    private static final Long DEFAULT_CUOTA_RECUPERO_CAPITAL = 1L;
    private static final Long UPDATED_CUOTA_RECUPERO_CAPITAL = 2L;

    private static final Long DEFAULT_DIA_HORA_EJECUCION = 1L;
    private static final Long UPDATED_DIA_HORA_EJECUCION = 2L;

    private static final Boolean DEFAULT_ES_PERSONAL = false;
    private static final Boolean UPDATED_ES_PERSONAL = true;

    private static final Boolean DEFAULT_EXCLUIR_FINDE_SEMANAS = false;
    private static final Boolean UPDATED_EXCLUIR_FINDE_SEMANAS = true;

    private static final Instant DEFAULT_FECHA_CREACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_CREACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_VENCIMIENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_VENCIMIENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_INCOBRABLE = false;
    private static final Boolean UPDATED_INCOBRABLE = false;

    private static final Double DEFAULT_INTERESES_CUOTA = Double.valueOf(0);
    private static final Double UPDATED_INTERESES_CUOTA = Double.valueOf(0);

    private static final Double DEFAULT_INTERESES_PRESTAMOS = Double.valueOf(0);
    private static final Double UPDATED_INTERESES_PRESTAMOS= Double.valueOf(0);

    private static final Double DEFAULT_MONTO = Double.valueOf(0);
    private static final Double UPDATED_MONTO = Double.valueOf(0);

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Long DEFAULT_PAGO_MANUAL = 1L;
    private static final Long UPDATED_PAGO_MANUAL = 2L;

    private static final Periodicidad DEFAULT_PERIODICIDAD = Periodicidad.DIARIO;
    private static final Periodicidad UPDATED_PERIODICIDAD = Periodicidad.SEMANAL;

    private static final Long DEFAULT_PORC_PARTICIPACION = 1L;
    private static final Long UPDATED_PORC_PARTICIPACION = 2L;

    private static final TipoCobro DEFAULT_TIPO_COBRO = TipoCobro.PRESTAMO;
    private static final TipoCobro UPDATED_TIPO_COBRO = TipoCobro.INSUMOINFORMATICO;

    private static final Long DEFAULT_ID_CLIENTE = 1L;
    private static final Long UPDATED_ID_CLIENTE = 2L;

    @Autowired
    private RecaudadorRepository recaudadorRepository;

    @Autowired
    private RecaudadorService recaudadorService;

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

    private MockMvc restRecaudadorMockMvc;

    private Recaudador recaudador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecaudadorResource recaudadorResource = new RecaudadorResource(recaudadorService);
        this.restRecaudadorMockMvc = MockMvcBuilders.standaloneSetup(recaudadorResource)
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
    public static Recaudador createEntity(EntityManager em) {
        Recaudador recaudador = new Recaudador()
            .activo(DEFAULT_ACTIVO)
            .cantCuotas(DEFAULT_CANT_CUOTAS)
            .cantidadRenegociado(DEFAULT_CANTIDAD_RENEGOCIADO)
            .capitalPrestamo(DEFAULT_CAPITAL_PRESTAMO)
            .cuotaCobrada(DEFAULT_CUOTA_COBRADA)
            .cuotaPura(DEFAULT_CUOTA_PURA)
            .cuotaRecuperoCapital(DEFAULT_CUOTA_RECUPERO_CAPITAL)
            .diaHoraEjecucion(DEFAULT_DIA_HORA_EJECUCION)
            .esPersonal(DEFAULT_ES_PERSONAL)
            .excluirFindeSemanas(DEFAULT_EXCLUIR_FINDE_SEMANAS)
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaVencimiento(DEFAULT_FECHA_VENCIMIENTO)
            .incobrable(DEFAULT_INCOBRABLE)
            .interesesCuota(DEFAULT_INTERESES_CUOTA)
            .interesesPrestamos(DEFAULT_INTERESES_PRESTAMOS)
            .monto(DEFAULT_MONTO)
            .observaciones(DEFAULT_OBSERVACIONES)
            .pagoManual(DEFAULT_PAGO_MANUAL)
            .periodicidad(DEFAULT_PERIODICIDAD)
            .porcParticipacion(DEFAULT_PORC_PARTICIPACION)
            .tipoCobro(DEFAULT_TIPO_COBRO)
            .idCliente(DEFAULT_ID_CLIENTE);
        return recaudador;
    }

    @Before
    public void initTest() {
        recaudador = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecaudador() throws Exception {
        int databaseSizeBeforeCreate = recaudadorRepository.findAll().size();

        // Create the Recaudador
        restRecaudadorMockMvc.perform(post("/api/recaudadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recaudador)))
            .andExpect(status().isCreated());

        // Validate the Recaudador in the database
        List<Recaudador> recaudadorList = recaudadorRepository.findAll();
        assertThat(recaudadorList).hasSize(databaseSizeBeforeCreate + 1);
        Recaudador testRecaudador = recaudadorList.get(recaudadorList.size() - 1);
        assertThat(testRecaudador.isActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testRecaudador.getCantCuotas()).isEqualTo(DEFAULT_CANT_CUOTAS);
        assertThat(testRecaudador.getCantidadRenegociado()).isEqualTo(DEFAULT_CANTIDAD_RENEGOCIADO);
        assertThat(testRecaudador.getCapitalPrestamo()).isEqualTo(DEFAULT_CAPITAL_PRESTAMO);
        assertThat(testRecaudador.getCuotaCobrada()).isEqualTo(DEFAULT_CUOTA_COBRADA);
        assertThat(testRecaudador.getCuotaPura()).isEqualTo(DEFAULT_CUOTA_PURA);
        assertThat(testRecaudador.getCuotaRecuperoCapital()).isEqualTo(DEFAULT_CUOTA_RECUPERO_CAPITAL);
        assertThat(testRecaudador.getDiaHoraEjecucion()).isEqualTo(DEFAULT_DIA_HORA_EJECUCION);
        assertThat(testRecaudador.isEsPersonal()).isEqualTo(DEFAULT_ES_PERSONAL);
        assertThat(testRecaudador.isExcluirFindeSemanas()).isEqualTo(DEFAULT_EXCLUIR_FINDE_SEMANAS);
        assertThat(testRecaudador.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testRecaudador.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testRecaudador.getFechaVencimiento()).isEqualTo(DEFAULT_FECHA_VENCIMIENTO);
        assertThat(testRecaudador.isIncobrable()).isEqualTo(DEFAULT_INCOBRABLE);
        assertThat(testRecaudador.getInteresesCuota()).isEqualTo(DEFAULT_INTERESES_CUOTA);
        assertThat(testRecaudador.getInteresesPrestamos()).isEqualTo(DEFAULT_INTERESES_PRESTAMOS);
        assertThat(testRecaudador.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testRecaudador.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testRecaudador.getPagoManual()).isEqualTo(DEFAULT_PAGO_MANUAL);
        assertThat(testRecaudador.getPeriodicidad()).isEqualTo(DEFAULT_PERIODICIDAD);
        assertThat(testRecaudador.getPorcParticipacion()).isEqualTo(DEFAULT_PORC_PARTICIPACION);
        assertThat(testRecaudador.getTipoCobro()).isEqualTo(DEFAULT_TIPO_COBRO);
        assertThat(testRecaudador.getIdCliente()).isEqualTo(DEFAULT_ID_CLIENTE);
    }

    @Test
    @Transactional
    public void createRecaudadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recaudadorRepository.findAll().size();

        // Create the Recaudador with an existing ID
        recaudador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecaudadorMockMvc.perform(post("/api/recaudadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recaudador)))
            .andExpect(status().isBadRequest());

        // Validate the Recaudador in the database
        List<Recaudador> recaudadorList = recaudadorRepository.findAll();
        assertThat(recaudadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecaudadors() throws Exception {
        // Initialize the database
        recaudadorRepository.saveAndFlush(recaudador);

        // Get all the recaudadorList
        restRecaudadorMockMvc.perform(get("/api/recaudadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recaudador.getId().intValue())))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].cantCuotas").value(hasItem(DEFAULT_CANT_CUOTAS.intValue())))
            .andExpect(jsonPath("$.[*].cantidadRenegociado").value(hasItem(DEFAULT_CANTIDAD_RENEGOCIADO.intValue())))
            .andExpect(jsonPath("$.[*].capitalPrestamo").value(hasItem(DEFAULT_CAPITAL_PRESTAMO.doubleValue())))
            .andExpect(jsonPath("$.[*].cuotaCobrada").value(hasItem(DEFAULT_CUOTA_COBRADA.intValue())))
            .andExpect(jsonPath("$.[*].cuotaPura").value(hasItem(DEFAULT_CUOTA_PURA.doubleValue())))
            .andExpect(jsonPath("$.[*].cuotaRecuperoCapital").value(hasItem(DEFAULT_CUOTA_RECUPERO_CAPITAL.intValue())))
            .andExpect(jsonPath("$.[*].diaHoraEjecucion").value(hasItem(DEFAULT_DIA_HORA_EJECUCION.intValue())))
            .andExpect(jsonPath("$.[*].esPersonal").value(hasItem(DEFAULT_ES_PERSONAL.booleanValue())))
            .andExpect(jsonPath("$.[*].excluirFindeSemanas").value(hasItem(DEFAULT_EXCLUIR_FINDE_SEMANAS.booleanValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaVencimiento").value(hasItem(DEFAULT_FECHA_VENCIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].incobrable").value(hasItem(DEFAULT_INCOBRABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].interesesCuota").value(hasItem(DEFAULT_INTERESES_CUOTA.doubleValue())))
            .andExpect(jsonPath("$.[*].interesesPrestamos").value(hasItem(DEFAULT_INTERESES_PRESTAMOS.doubleValue())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].pagoManual").value(hasItem(DEFAULT_PAGO_MANUAL.intValue())))
            .andExpect(jsonPath("$.[*].periodicidad").value(hasItem(DEFAULT_PERIODICIDAD.toString())))
            .andExpect(jsonPath("$.[*].porcParticipacion").value(hasItem(DEFAULT_PORC_PARTICIPACION.intValue())))
            .andExpect(jsonPath("$.[*].tipoCobro").value(hasItem(DEFAULT_TIPO_COBRO.toString())))
            .andExpect(jsonPath("$.[*].idCliente").value(hasItem(DEFAULT_ID_CLIENTE.intValue())));
    }
    
    @Test
    @Transactional
    public void getRecaudador() throws Exception {
        // Initialize the database
        recaudadorRepository.saveAndFlush(recaudador);

        // Get the recaudador
        restRecaudadorMockMvc.perform(get("/api/recaudadors/{id}", recaudador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recaudador.getId().intValue()))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()))
            .andExpect(jsonPath("$.cantCuotas").value(DEFAULT_CANT_CUOTAS.intValue()))
            .andExpect(jsonPath("$.cantidadRenegociado").value(DEFAULT_CANTIDAD_RENEGOCIADO.intValue()))
            .andExpect(jsonPath("$.capitalPrestamo").value(DEFAULT_CAPITAL_PRESTAMO.doubleValue()))
            .andExpect(jsonPath("$.cuotaCobrada").value(DEFAULT_CUOTA_COBRADA.intValue()))
            .andExpect(jsonPath("$.cuotaPura").value(DEFAULT_CUOTA_PURA.doubleValue()))
            .andExpect(jsonPath("$.cuotaRecuperoCapital").value(DEFAULT_CUOTA_RECUPERO_CAPITAL.intValue()))
            .andExpect(jsonPath("$.diaHoraEjecucion").value(DEFAULT_DIA_HORA_EJECUCION.intValue()))
            .andExpect(jsonPath("$.esPersonal").value(DEFAULT_ES_PERSONAL.booleanValue()))
            .andExpect(jsonPath("$.excluirFindeSemanas").value(DEFAULT_EXCLUIR_FINDE_SEMANAS.booleanValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaVencimiento").value(DEFAULT_FECHA_VENCIMIENTO.toString()))
            .andExpect(jsonPath("$.incobrable").value(DEFAULT_INCOBRABLE.booleanValue()))
            .andExpect(jsonPath("$.interesesCuota").value(DEFAULT_INTERESES_CUOTA.doubleValue()))
            .andExpect(jsonPath("$.interesesPrestamos").value(DEFAULT_INTERESES_PRESTAMOS.doubleValue()))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.pagoManual").value(DEFAULT_PAGO_MANUAL.intValue()))
            .andExpect(jsonPath("$.periodicidad").value(DEFAULT_PERIODICIDAD.toString()))
            .andExpect(jsonPath("$.porcParticipacion").value(DEFAULT_PORC_PARTICIPACION.intValue()))
            .andExpect(jsonPath("$.tipoCobro").value(DEFAULT_TIPO_COBRO.toString()))
            .andExpect(jsonPath("$.idCliente").value(DEFAULT_ID_CLIENTE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRecaudador() throws Exception {
        // Get the recaudador
        restRecaudadorMockMvc.perform(get("/api/recaudadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecaudador() throws Exception {
        // Initialize the database
        recaudadorService.save(recaudador);

        int databaseSizeBeforeUpdate = recaudadorRepository.findAll().size();

        // Update the recaudador
        Recaudador updatedRecaudador = recaudadorRepository.findById(recaudador.getId()).get();
        // Disconnect from session so that the updates on updatedRecaudador are not directly saved in db
        em.detach(updatedRecaudador);
        updatedRecaudador
            .activo(UPDATED_ACTIVO)
            .cantCuotas(UPDATED_CANT_CUOTAS)
            .cantidadRenegociado(UPDATED_CANTIDAD_RENEGOCIADO)
            .capitalPrestamo(UPDATED_CAPITAL_PRESTAMO)
            .cuotaCobrada(UPDATED_CUOTA_COBRADA)
            .cuotaPura(UPDATED_CUOTA_PURA)
            .cuotaRecuperoCapital(UPDATED_CUOTA_RECUPERO_CAPITAL)
            .diaHoraEjecucion(UPDATED_DIA_HORA_EJECUCION)
            .esPersonal(UPDATED_ES_PERSONAL)
            .excluirFindeSemanas(UPDATED_EXCLUIR_FINDE_SEMANAS)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaVencimiento(UPDATED_FECHA_VENCIMIENTO)
            .incobrable(UPDATED_INCOBRABLE)
            .interesesCuota(UPDATED_INTERESES_CUOTA)
            .interesesPrestamos(UPDATED_INTERESES_PRESTAMOS)
            .monto(UPDATED_MONTO)
            .observaciones(UPDATED_OBSERVACIONES)
            .pagoManual(UPDATED_PAGO_MANUAL)
            .periodicidad(UPDATED_PERIODICIDAD)
            .porcParticipacion(UPDATED_PORC_PARTICIPACION)
            .tipoCobro(UPDATED_TIPO_COBRO)
            .idCliente(UPDATED_ID_CLIENTE);

        restRecaudadorMockMvc.perform(put("/api/recaudadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecaudador)))
            .andExpect(status().isOk());

        // Validate the Recaudador in the database
        List<Recaudador> recaudadorList = recaudadorRepository.findAll();
        assertThat(recaudadorList).hasSize(databaseSizeBeforeUpdate);
        Recaudador testRecaudador = recaudadorList.get(recaudadorList.size() - 1);
        assertThat(testRecaudador.isActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testRecaudador.getCantCuotas()).isEqualTo(UPDATED_CANT_CUOTAS);
        assertThat(testRecaudador.getCantidadRenegociado()).isEqualTo(UPDATED_CANTIDAD_RENEGOCIADO);
        assertThat(testRecaudador.getCapitalPrestamo()).isEqualTo(UPDATED_CAPITAL_PRESTAMO);
        assertThat(testRecaudador.getCuotaCobrada()).isEqualTo(UPDATED_CUOTA_COBRADA);
        assertThat(testRecaudador.getCuotaPura()).isEqualTo(UPDATED_CUOTA_PURA);
        assertThat(testRecaudador.getCuotaRecuperoCapital()).isEqualTo(UPDATED_CUOTA_RECUPERO_CAPITAL);
        assertThat(testRecaudador.getDiaHoraEjecucion()).isEqualTo(UPDATED_DIA_HORA_EJECUCION);
        assertThat(testRecaudador.isEsPersonal()).isEqualTo(UPDATED_ES_PERSONAL);
        assertThat(testRecaudador.isExcluirFindeSemanas()).isEqualTo(UPDATED_EXCLUIR_FINDE_SEMANAS);
        assertThat(testRecaudador.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testRecaudador.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testRecaudador.getFechaVencimiento()).isEqualTo(UPDATED_FECHA_VENCIMIENTO);
        assertThat(testRecaudador.isIncobrable()).isEqualTo(UPDATED_INCOBRABLE);
        assertThat(testRecaudador.getInteresesCuota()).isEqualTo(UPDATED_INTERESES_CUOTA);
        assertThat(testRecaudador.getInteresesPrestamos()).isEqualTo(UPDATED_INTERESES_PRESTAMOS);
        assertThat(testRecaudador.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testRecaudador.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testRecaudador.getPagoManual()).isEqualTo(UPDATED_PAGO_MANUAL);
        assertThat(testRecaudador.getPeriodicidad()).isEqualTo(UPDATED_PERIODICIDAD);
        assertThat(testRecaudador.getPorcParticipacion()).isEqualTo(UPDATED_PORC_PARTICIPACION);
        assertThat(testRecaudador.getTipoCobro()).isEqualTo(UPDATED_TIPO_COBRO);
        assertThat(testRecaudador.getIdCliente()).isEqualTo(UPDATED_ID_CLIENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingRecaudador() throws Exception {
        int databaseSizeBeforeUpdate = recaudadorRepository.findAll().size();

        // Create the Recaudador

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecaudadorMockMvc.perform(put("/api/recaudadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recaudador)))
            .andExpect(status().isBadRequest());

        // Validate the Recaudador in the database
        List<Recaudador> recaudadorList = recaudadorRepository.findAll();
        assertThat(recaudadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecaudador() throws Exception {
        // Initialize the database
        recaudadorService.save(recaudador);

        int databaseSizeBeforeDelete = recaudadorRepository.findAll().size();

        // Delete the recaudador
        restRecaudadorMockMvc.perform(delete("/api/recaudadors/{id}", recaudador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Recaudador> recaudadorList = recaudadorRepository.findAll();
        assertThat(recaudadorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recaudador.class);
        Recaudador recaudador1 = new Recaudador();
        recaudador1.setId(1L);
        Recaudador recaudador2 = new Recaudador();
        recaudador2.setId(recaudador1.getId());
        assertThat(recaudador1).isEqualTo(recaudador2);
        recaudador2.setId(2L);
        assertThat(recaudador1).isNotEqualTo(recaudador2);
        recaudador1.setId(null);
        assertThat(recaudador1).isNotEqualTo(recaudador2);
    }
}
