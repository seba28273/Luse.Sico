import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecaudadorDetalle, defaultValue } from 'app/shared/model/recaudador-detalle.model';

export const ACTION_TYPES = {
  FETCH_RECAUDADORDETALLE_LIST: 'recaudadorDetalle/FETCH_RECAUDADORDETALLE_LIST',
  FETCH_RECAUDADORDETALLE: 'recaudadorDetalle/FETCH_RECAUDADORDETALLE',
  CREATE_RECAUDADORDETALLE: 'recaudadorDetalle/CREATE_RECAUDADORDETALLE',
  UPDATE_RECAUDADORDETALLE: 'recaudadorDetalle/UPDATE_RECAUDADORDETALLE',
  DELETE_RECAUDADORDETALLE: 'recaudadorDetalle/DELETE_RECAUDADORDETALLE',
  RESET: 'recaudadorDetalle/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecaudadorDetalle>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RecaudadorDetalleState = Readonly<typeof initialState>;

// Reducer

export default (state: RecaudadorDetalleState = initialState, action): RecaudadorDetalleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECAUDADORDETALLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECAUDADORDETALLE):
    case REQUEST(ACTION_TYPES.UPDATE_RECAUDADORDETALLE):
    case REQUEST(ACTION_TYPES.DELETE_RECAUDADORDETALLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECAUDADORDETALLE):
    case FAILURE(ACTION_TYPES.CREATE_RECAUDADORDETALLE):
    case FAILURE(ACTION_TYPES.UPDATE_RECAUDADORDETALLE):
    case FAILURE(ACTION_TYPES.DELETE_RECAUDADORDETALLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECAUDADORDETALLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECAUDADORDETALLE):
    case SUCCESS(ACTION_TYPES.UPDATE_RECAUDADORDETALLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECAUDADORDETALLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/recaudador-detalles';

// Actions

export const getEntities: ICrudGetAllAction<IRecaudadorDetalle> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST,
  payload: axios.get<IRecaudadorDetalle>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRecaudadorDetalle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECAUDADORDETALLE,
    payload: axios.get<IRecaudadorDetalle>(requestUrl)
  };
};

export const getCuotasByDate = (fromDate) => {
    let requestUrl = `${apiUrl}/listcuotasvencidas`;
    if (fromDate) {
        requestUrl += `?fechaProgramada=${fromDate}`;
    }
    return {
        type: ACTION_TYPES.FETCH_RECAUDADORDETALLE_LIST,
        payload: axios.get(requestUrl)
    };
};

export const createEntity: ICrudPutAction<IRecaudadorDetalle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECAUDADORDETALLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecaudadorDetalle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECAUDADORDETALLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecaudadorDetalle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECAUDADORDETALLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
