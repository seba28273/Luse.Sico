import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecaudador, defaultValue } from 'app/shared/model/recaudador.model';

export const ACTION_TYPES = {
  FETCH_RECAUDADOR_LIST: 'recaudador/FETCH_RECAUDADOR_LIST',
  FETCH_RECAUDADOR: 'recaudador/FETCH_RECAUDADOR',
  CREATE_RECAUDADOR: 'recaudador/CREATE_RECAUDADOR',
  UPDATE_RECAUDADOR: 'recaudador/UPDATE_RECAUDADOR',
  DELETE_RECAUDADOR: 'recaudador/DELETE_RECAUDADOR',
  RESET: 'recaudador/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecaudador>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RecaudadorState = Readonly<typeof initialState>;

// Reducer

export default (state: RecaudadorState = initialState, action): RecaudadorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RECAUDADOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECAUDADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECAUDADOR):
    case REQUEST(ACTION_TYPES.UPDATE_RECAUDADOR):
    case REQUEST(ACTION_TYPES.DELETE_RECAUDADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RECAUDADOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECAUDADOR):
    case FAILURE(ACTION_TYPES.CREATE_RECAUDADOR):
    case FAILURE(ACTION_TYPES.UPDATE_RECAUDADOR):
    case FAILURE(ACTION_TYPES.DELETE_RECAUDADOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECAUDADOR_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECAUDADOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECAUDADOR):
    case SUCCESS(ACTION_TYPES.UPDATE_RECAUDADOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECAUDADOR):
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

const apiUrl = 'api/recaudadors';

// Actions

export const getEntities: ICrudGetAllAction<IRecaudador> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECAUDADOR_LIST,
    payload: axios.get<IRecaudador>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRecaudador> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECAUDADOR,
    payload: axios.get<IRecaudador>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecaudador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECAUDADOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecaudador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECAUDADOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecaudador> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECAUDADOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
