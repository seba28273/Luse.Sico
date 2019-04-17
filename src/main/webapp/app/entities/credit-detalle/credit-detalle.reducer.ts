import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICreditDetalle, defaultValue } from 'app/shared/model/credit-detalle.model';

export const ACTION_TYPES = {
  FETCH_CREDITDETALLE_LIST: 'creditDetalle/FETCH_CREDITDETALLE_LIST',
  FETCH_CREDITDETALLE: 'creditDetalle/FETCH_CREDITDETALLE',
  CREATE_CREDITDETALLE: 'creditDetalle/CREATE_CREDITDETALLE',
  UPDATE_CREDITDETALLE: 'creditDetalle/UPDATE_CREDITDETALLE',
  DELETE_CREDITDETALLE: 'creditDetalle/DELETE_CREDITDETALLE',
  RESET: 'creditDetalle/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICreditDetalle>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CreditDetalleState = Readonly<typeof initialState>;

// Reducer

export default (state: CreditDetalleState = initialState, action): CreditDetalleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CREDITDETALLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CREDITDETALLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CREDITDETALLE):
    case REQUEST(ACTION_TYPES.UPDATE_CREDITDETALLE):
    case REQUEST(ACTION_TYPES.DELETE_CREDITDETALLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CREDITDETALLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CREDITDETALLE):
    case FAILURE(ACTION_TYPES.CREATE_CREDITDETALLE):
    case FAILURE(ACTION_TYPES.UPDATE_CREDITDETALLE):
    case FAILURE(ACTION_TYPES.DELETE_CREDITDETALLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CREDITDETALLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CREDITDETALLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CREDITDETALLE):
    case SUCCESS(ACTION_TYPES.UPDATE_CREDITDETALLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CREDITDETALLE):
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

const apiUrl = 'api/credit-detalles';

// Actions

export const getEntities: ICrudGetAllAction<ICreditDetalle> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CREDITDETALLE_LIST,
  payload: axios.get<ICreditDetalle>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICreditDetalle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CREDITDETALLE,
    payload: axios.get<ICreditDetalle>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICreditDetalle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CREDITDETALLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICreditDetalle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CREDITDETALLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICreditDetalle> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CREDITDETALLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
