import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransferencia, defaultValue } from 'app/shared/model/transferencia.model';

export const ACTION_TYPES = {
  FETCH_TRANSFERENCIA_LIST: 'transferencia/FETCH_TRANSFERENCIA_LIST',
  FETCH_TRANSFERENCIA: 'transferencia/FETCH_TRANSFERENCIA',
  CREATE_TRANSFERENCIA: 'transferencia/CREATE_TRANSFERENCIA',
  UPDATE_TRANSFERENCIA: 'transferencia/UPDATE_TRANSFERENCIA',
  DELETE_TRANSFERENCIA: 'transferencia/DELETE_TRANSFERENCIA',
  RESET: 'transferencia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITransferencia>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TransferenciaState = Readonly<typeof initialState>;

// Reducer

export default (state: TransferenciaState = initialState, action): TransferenciaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSFERENCIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSFERENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSFERENCIA):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSFERENCIA):
    case REQUEST(ACTION_TYPES.DELETE_TRANSFERENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSFERENCIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSFERENCIA):
    case FAILURE(ACTION_TYPES.CREATE_TRANSFERENCIA):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSFERENCIA):
    case FAILURE(ACTION_TYPES.DELETE_TRANSFERENCIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSFERENCIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSFERENCIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSFERENCIA):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSFERENCIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSFERENCIA):
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

const apiUrl = 'api/transferencias';

// Actions
export const getEntities: ICrudGetAllAction<ITransferencia> = (page, size, sort) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_TRANSFERENCIA_LIST,
        payload: axios.get<ITransferencia>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
    };
};

export const getEntitiesByDate = (page, size, sort, fromDate, toDate) => {
    let requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    if (fromDate) {
        requestUrl += `&fechainicio=${fromDate}`;
    }
    if (toDate) {
        requestUrl += `&fechato=${toDate}`;
    }
    return {
        type: ACTION_TYPES.FETCH_TRANSFERENCIA_LIST,
        payload: axios.get(requestUrl)
    };
};

export const getEntity: ICrudGetAction<ITransferencia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSFERENCIA,
    payload: axios.get<ITransferencia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITransferencia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSFERENCIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransferencia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSFERENCIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransferencia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSFERENCIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
