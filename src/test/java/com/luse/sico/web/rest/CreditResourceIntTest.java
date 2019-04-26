package com.luse.sico.web.rest;

import com.luse.sico.SicoApp;

import com.luse.sico.domain.Credit;
import com.luse.sico.repository.CreditRepository;
import com.luse.sico.service.CreditService;
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
 * Test class for the CreditResource REST controller.
 *
 * @see CreditResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicoApp.class)
public class CreditResourceIntTest {

    private static final Periodicidad DEFAULT_PERIODICIDAD = Periodicidad.DIARIO;
    private static final Periodicidad UPDATED_PERIODICIDAD = Periodicidad.SEMANAL;

    private static final Long DEFAULT_DIA_HORA_EJECUCION = 1L;
    private static final Long UPDATED_DIA_HORA_EJECUCION = 2L;

    private static final TipoCobro DEFAULT_TIPO_COBRO = TipoCobro.PRESTAMO;
    private static final TipoCobro UPDATED_TIPO_COBRO = TipoCobro.INSUMOINFORMATICO;

    private static final Long DEFAULT_MONTO = 1L;
    private static final Long UPDATED_MONTO = 2L;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final Long DEFAULT_CANT_CUOTAS = 1L;
    private static final Long UPDATED_CANT_CUOTAS = 2L;

    private static final Long DEFAULT_CUOTA_COBRADA = 1L;
    private static final Long UPDATED_CUOTA_COBRADA = 2L;

    private static final Instant DEFAULT_FECHA_CREACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_CREACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_VENCIMIENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_VENCIMIENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_EXCLUIR_FINDE_SEMANAS = false;
    private static final Boolean UPDATED_EXCLUIR_FINDE_SEMANAS = true;

    private static final Long DEFAULT_PORC_PARTICIPACION = 1L;
    private static final Long UPDATED_PORC_PARTICIPACION = 2L;

    private static final Long DEFAULT_CAPITAL_PRESTAMO = 1L;
    private static final Long UPDATED_CAPITAL_PRESTAMO = 2L;

    private static final Long DEFAULT_INTERESES_PRESTAMOS = 1L;
    private static final Long UPDATED_INTERESES_PRESTAMOS = 2L;

    private static final Long DEFAULT_CUOTA_PURA = 1L;
    private static final Long UPDATED_CUOTA_PURA = 2L;

    private static final Long DEFAULT_INTERESES_CUOTA = 1L;
    private static final Long UPDATED_INTERESES_CUOTA = 2L;

    private static final Long DEFAULT_CUOTA_RECUPERO_CAPITAL = 1L;
    private static final Long UPDATED_CUOTA_RECUPERO_CAPITAL = 2L;

    private static final Long DEFAULT_CANTIDAD_RENEGOCIADO = 1L;
    private static final Long UPDATED_CANTIDAD_RENEGOCIADO = 2L;

    private static final Boolean DEFAULT_INCOBRABLE = false;
    private static final Boolean UPDATED_INCOBRABLE = true;

    private static final Boolean DEFAULT_PAGO_MANUAL = false;
    private static final Boolean UPDATED_PAGO_MANUAL = true;

    private static final Boolean DEFAULT_ES_PERSONAL = false;
    private static final Boolean UPDATED_ES_PERSONAL = true;

    @Autowired
    private CreditRepository creditRepository;

    @Autowired
    private CreditService creditService;

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

    private MockMvc restCreditMockMvc;

    private Credit credit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CreditResource creditResource = new CreditResource(creditService);
        this.restCreditMockMvc = MockMvcBuilders.standaloneSetup(creditResource)
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
    public static Credit createEntity(EntityManager em) {
        Credit credit = new Credit()
            .periodicidad(DEFAULT_PERIODICIDAD)
            .diaHoraEjecucion(DEFAULT_DIA_HORA_EJECUCION)
            .tipoCobro(DEFAULT_TIPO_COBRO)
            .monto(DEFAULT_MONTO)
            .observaciones(DEFAULT_OBSERVACIONES)
            .activo(DEFAULT_ACTIVO)
            .cantCuotas(DEFAULT_CANT_CUOTAS)
            .cuotaCobrada(DEFAULT_CUOTA_COBRADA)
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaVencimiento(DEFAULT_FECHA_VENCIMIENTO)
            .excluirFindeSemanas(DEFAULT_EXCLUIR_FINDE_SEMANAS)
            .porcParticipacion(DEFAULT_PORC_PARTICIPACION)
            .capitalPrestamo(DEFAULT_CAPITAL_PRESTAMO)
            .interesesPrestamos(DEFAULT_INTERESES_PRESTAMOS)
            .cuotaPura(DEFAULT_CUOTA_PURA)
            .interesesCuota(DEFAULT_INTERESES_CUOTA)
            .cuotaRecuperoCapital(DEFAULT_CUOTA_RECUPERO_CAPITAL)
            .cantidadRenegociado(DEFAULT_CANTIDAD_RENEGOCIADO)
            .incobrable(DEFAULT_INCOBRABLE)
            .pagoManual(DEFAULT_PAGO_MANUAL)
            .esPersonal(DEFAULT_ES_PERSONAL);
        return credit;
    }

    @Before
    public void initTest() {
        credit = createEntity(em);
    }

    @Test
    @Transactional
    public void createCredit() throws Exception {
        int databaseSizeBeforeCreate = creditRepository.findAll().size();

        // Create the Credit
        restCreditMockMvc.perform(post("/api/credits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(credit)))
            .andExpect(status().isCreated());

        // Validate the Credit in the database
        List<Credit> creditList = creditRepository.findAll();
        assertThat(creditList).hasSize(databaseSizeBeforeCreate + 1);
        Credit testCredit = creditList.get(creditList.size() - 1);
        assertThat(testCredit.getPeriodicidad()).isEqualTo(DEFAULT_PERIODICIDAD);
        assertThat(testCredit.getDiaHoraEjecucion()).isEqualTo(DEFAULT_DIA_HORA_EJECUCION);
        assertThat(testCredit.getTipoCobro()).isEqualTo(DEFAULT_TIPO_COBRO);
        assertThat(testCredit.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testCredit.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testCredit.isActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testCredit.getCantCuotas()).isEqualTo(DEFAULT_CANT_CUOTAS);
        assertThat(testCredit.getCuotaCobrada()).isEqualTo(DEFAULT_CUOTA_COBRADA);
        assertThat(testCredit.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testCredit.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testCredit.getFechaVencimiento()).isEqualTo(DEFAULT_FECHA_VENCIMIENTO);
        assertThat(testCredit.isExcluirFindeSemanas()).isEqualTo(DEFAULT_EXCLUIR_FINDE_SEMANAS);
        assertThat(testCredit.getPorcParticipacion()).isEqualTo(DEFAULT_PORC_PARTICIPACION);
        assertThat(testCredit.getCapitalPrestamo()).isEqualTo(DEFAULT_CAPITAL_PRESTAMO);
        assertThat(testCredit.getInteresesPrestamos()).isEqualTo(DEFAULT_INTERESES_PRESTAMOS);
        assertThat(testCredit.getCuotaPura()).isEqualTo(DEFAULT_CUOTA_PURA);
        assertThat(testCredit.getInteresesCuota()).isEqualTo(DEFAULT_INTERESES_CUOTA);
        assertThat(testCredit.getCuotaRecuperoCapital()).isEqualTo(DEFAULT_CUOTA_RECUPERO_CAPITAL);
        assertThat(testCredit.getCantidadRenegociado()).isEqualTo(DEFAULT_CANTIDAD_RENEGOCIADO);
        assertThat(testCredit.isIncobrable()).isEqualTo(DEFAULT_INCOBRABLE);
        assertThat(testCredit.isPagoManual()).isEqualTo(DEFAULT_PAGO_MANUAL);
        assertThat(testCredit.isEsPersonal()).isEqualTo(DEFAULT_ES_PERSONAL);
    }

    @Test
    @Transactional
    public void createCreditWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = creditRepository.findAll().size();

        // Create the Credit with an existing ID
        credit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCreditMockMvc.perform(post("/api/credits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(credit)))
            .andExpect(status().isBadRequest());

        // Validate the Credit in the database
        List<Credit> creditList = creditRepository.findAll();
        assertThat(creditList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCredits() throws Exception {
        // Initialize the database
        creditRepository.saveAndFlush(credit);

        // Get all the creditList
        restCreditMockMvc.perform(get("/api/credits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(credit.getId().intValue())))
            .andExpect(jsonPath("$.[*].periodicidad").value(hasItem(DEFAULT_PERIODICIDAD.toString())))
            .andExpect(jsonPath("$.[*].diaHoraEjecucion").value(hasItem(DEFAULT_DIA_HORA_EJECUCION.intValue())))
            .andExpect(jsonPath("$.[*].tipoCobro").value(hasItem(DEFAULT_TIPO_COBRO.toString())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.intValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].cantCuotas").value(hasItem(DEFAULT_CANT_CUOTAS.intValue())))
            .andExpect(jsonPath("$.[*].cuotaCobrada").value(hasItem(DEFAULT_CUOTA_COBRADA.intValue())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaVencimiento").value(hasItem(DEFAULT_FECHA_VENCIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].excluirFindeSemanas").value(hasItem(DEFAULT_EXCLUIR_FINDE_SEMANAS.booleanValue())))
            .andExpect(jsonPath("$.[*].porcParticipacion").value(hasItem(DEFAULT_PORC_PARTICIPACION.intValue())))
            .andExpect(jsonPath("$.[*].capitalPrestamo").value(hasItem(DEFAULT_CAPITAL_PRESTAMO.intValue())))
            .andExpect(jsonPath("$.[*].interesesPrestamos").value(hasItem(DEFAULT_INTERESES_PRESTAMOS.intValue())))
            .andExpect(jsonPath("$.[*].cuotaPura").value(hasItem(DEFAULT_CUOTA_PURA.intValue())))
            .andExpect(jsonPath("$.[*].interesesCuota").value(hasItem(DEFAULT_INTERESES_CUOTA.intValue())))
            .andExpect(jsonPath("$.[*].cuotaRecuperoCapital").value(hasItem(DEFAULT_CUOTA_RECUPERO_CAPITAL.intValue())))
            .andExpect(jsonPath("$.[*].cantidadRenegociado").value(hasItem(DEFAULT_CANTIDAD_RENEGOCIADO.intValue())))
            .andExpect(jsonPath("$.[*].incobrable").value(hasItem(DEFAULT_INCOBRABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].pagoManual").value(hasItem(DEFAULT_PAGO_MANUAL.booleanValue())))
            .andExpect(jsonPath("$.[*].esPersonal").value(hasItem(DEFAULT_ES_PERSONAL.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCredit() throws Exception {
        // Initialize the database
        creditRepository.saveAndFlush(credit);

        // Get the credit
        restCreditMockMvc.perform(get("/api/credits/{id}", credit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(credit.getId().intValue()))
            .andExpect(jsonPath("$.periodicidad").value(DEFAULT_PERIODICIDAD.toString()))
            .andExpect(jsonPath("$.diaHoraEjecucion").value(DEFAULT_DIA_HORA_EJECUCION.intValue()))
            .andExpect(jsonPath("$.tipoCobro").value(DEFAULT_TIPO_COBRO.toString()))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.intValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()))
            .andExpect(jsonPath("$.cantCuotas").value(DEFAULT_CANT_CUOTAS.intValue()))
            .andExpect(jsonPath("$.cuotaCobrada").value(DEFAULT_CUOTA_COBRADA.intValue()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaVencimiento").value(DEFAULT_FECHA_VENCIMIENTO.toString()))
            .andExpect(jsonPath("$.excluirFindeSemanas").value(DEFAULT_EXCLUIR_FINDE_SEMANAS.booleanValue()))
            .andExpect(jsonPath("$.porcParticipacion").value(DEFAULT_PORC_PARTICIPACION.intValue()))
            .andExpect(jsonPath("$.capitalPrestamo").value(DEFAULT_CAPITAL_PRESTAMO.intValue()))
            .andExpect(jsonPath("$.interesesPrestamos").value(DEFAULT_INTERESES_PRESTAMOS.intValue()))
            .andExpect(jsonPath("$.cuotaPura").value(DEFAULT_CUOTA_PURA.intValue()))
            .andExpect(jsonPath("$.interesesCuota").value(DEFAULT_INTERESES_CUOTA.intValue()))
            .andExpect(jsonPath("$.cuotaRecuperoCapital").value(DEFAULT_CUOTA_RECUPERO_CAPITAL.intValue()))
            .andExpect(jsonPath("$.cantidadRenegociado").value(DEFAULT_CANTIDAD_RENEGOCIADO.intValue()))
            .andExpect(jsonPath("$.incobrable").value(DEFAULT_INCOBRABLE.booleanValue()))
            .andExpect(jsonPath("$.pagoManual").value(DEFAULT_PAGO_MANUAL.booleanValue()))
            .andExpect(jsonPath("$.esPersonal").value(DEFAULT_ES_PERSONAL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCredit() throws Exception {
        // Get the credit
        restCreditMockMvc.perform(get("/api/credits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCredit() throws Exception {
        // Initialize the database
        creditService.save(credit);

        int databaseSizeBeforeUpdate = creditRepository.findAll().size();

        // Update the credit
        Credit updatedCredit = creditRepository.findById(credit.getId()).get();
        // Disconnect from session so that the updates on updatedCredit are not directly saved in db
        em.detach(updatedCredit);
        updatedCredit
            .periodicidad(UPDATED_PERIODICIDAD)
            .diaHoraEjecucion(UPDATED_DIA_HORA_EJECUCION)
            .tipoCobro(UPDATED_TIPO_COBRO)
            .monto(UPDATED_MONTO)
            .observaciones(UPDATED_OBSERVACIONES)
            .activo(UPDATED_ACTIVO)
            .cantCuotas(UPDATED_CANT_CUOTAS)
            .cuotaCobrada(UPDATED_CUOTA_COBRADA)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaVencimiento(UPDATED_FECHA_VENCIMIENTO)
            .excluirFindeSemanas(UPDATED_EXCLUIR_FINDE_SEMANAS)
            .porcParticipacion(UPDATED_PORC_PARTICIPACION)
            .capitalPrestamo(UPDATED_CAPITAL_PRESTAMO)
            .interesesPrestamos(UPDATED_INTERESES_PRESTAMOS)
            .cuotaPura(UPDATED_CUOTA_PURA)
            .interesesCuota(UPDATED_INTERESES_CUOTA)
            .cuotaRecuperoCapital(UPDATED_CUOTA_RECUPERO_CAPITAL)
            .cantidadRenegociado(UPDATED_CANTIDAD_RENEGOCIADO)
            .incobrable(UPDATED_INCOBRABLE)
            .pagoManual(UPDATED_PAGO_MANUAL)
            .esPersonal(UPDATED_ES_PERSONAL);

        restCreditMockMvc.perform(put("/api/credits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCredit)))
            .andExpect(status().isOk());

        // Validate the Credit in the database
        List<Credit> creditList = creditRepository.findAll();
        assertThat(creditList).hasSize(databaseSizeBeforeUpdate);
        Credit testCredit = creditList.get(creditList.size() - 1);
        assertThat(testCredit.getPeriodicidad()).isEqualTo(UPDATED_PERIODICIDAD);
        assertThat(testCredit.getDiaHoraEjecucion()).isEqualTo(UPDATED_DIA_HORA_EJECUCION);
        assertThat(testCredit.getTipoCobro()).isEqualTo(UPDATED_TIPO_COBRO);
        assertThat(testCredit.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testCredit.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testCredit.isActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testCredit.getCantCuotas()).isEqualTo(UPDATED_CANT_CUOTAS);
        assertThat(testCredit.getCuotaCobrada()).isEqualTo(UPDATED_CUOTA_COBRADA);
        assertThat(testCredit.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testCredit.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testCredit.getFechaVencimiento()).isEqualTo(UPDATED_FECHA_VENCIMIENTO);
        assertThat(testCredit.isExcluirFindeSemanas()).isEqualTo(UPDATED_EXCLUIR_FINDE_SEMANAS);
        assertThat(testCredit.getPorcParticipacion()).isEqualTo(UPDATED_PORC_PARTICIPACION);
        assertThat(testCredit.getCapitalPrestamo()).isEqualTo(UPDATED_CAPITAL_PRESTAMO);
        assertThat(testCredit.getInteresesPrestamos()).isEqualTo(UPDATED_INTERESES_PRESTAMOS);
        assertThat(testCredit.getCuotaPura()).isEqualTo(UPDATED_CUOTA_PURA);
        assertThat(testCredit.getInteresesCuota()).isEqualTo(UPDATED_INTERESES_CUOTA);
        assertThat(testCredit.getCuotaRecuperoCapital()).isEqualTo(UPDATED_CUOTA_RECUPERO_CAPITAL);
        assertThat(testCredit.getCantidadRenegociado()).isEqualTo(UPDATED_CANTIDAD_RENEGOCIADO);
        assertThat(testCredit.isIncobrable()).isEqualTo(UPDATED_INCOBRABLE);
        assertThat(testCredit.isPagoManual()).isEqualTo(UPDATED_PAGO_MANUAL);
        assertThat(testCredit.isEsPersonal()).isEqualTo(UPDATED_ES_PERSONAL);
    }

    @Test
    @Transactional
    public void updateNonExistingCredit() throws Exception {
        int databaseSizeBeforeUpdate = creditRepository.findAll().size();

        // Create the Credit

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCreditMockMvc.perform(put("/api/credits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(credit)))
            .andExpect(status().isBadRequest());

        // Validate the Credit in the database
        List<Credit> creditList = creditRepository.findAll();
        assertThat(creditList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCredit() throws Exception {
        // Initialize the database
        creditService.save(credit);

        int databaseSizeBeforeDelete = creditRepository.findAll().size();

        // Delete the credit
        restCreditMockMvc.perform(delete("/api/credits/{id}", credit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Credit> creditList = creditRepository.findAll();
        assertThat(creditList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Credit.class);
        Credit credit1 = new Credit();
        credit1.setId(1L);
        Credit credit2 = new Credit();
        credit2.setId(credit1.getId());
        assertThat(credit1).isEqualTo(credit2);
        credit2.setId(2L);
        assertThat(credit1).isNotEqualTo(credit2);
        credit1.setId(null);
        assertThat(credit1).isNotEqualTo(credit2);
    }
}
