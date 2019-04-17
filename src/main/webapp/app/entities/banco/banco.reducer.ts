import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBanco, defaultValue } from 'app/shared/model/banco.model';

export const ACTION_TYPES = {
  FETCH_BANCO_LIST: 'banco/FETCH_BANCO_LIST',
  FETCH_BANCO: 'banco/FETCH_BANCO',
  CREATE_BANCO: 'banco/CREATE_BANCO',
  UPDATE_BANCO: 'banco/UPDATE_BANCO',
  DELETE_BANCO: 'banco/DELETE_BANCO',
  RESET: 'banco/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBanco>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BancoState = Readonly<typeof initialState>;

// Reducer

export default (state: BancoState = initialState, action): BancoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BANCO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BANCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BANCO):
    case REQUEST(ACTION_TYPES.UPDATE_BANCO):
    case REQUEST(ACTION_TYPES.DELETE_BANCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BANCO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BANCO):
    case FAILURE(ACTION_TYPES.CREATE_BANCO):
    case FAILURE(ACTION_TYPES.UPDATE_BANCO):
    case FAILURE(ACTION_TYPES.DELETE_BANCO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANCO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANCO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BANCO):
    case SUCCESS(ACTION_TYPES.UPDATE_BANCO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BANCO):
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

const apiUrl = 'api/bancos';

// Actions

export const getEntities: ICrudGetAllAction<IBanco> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BANCO_LIST,
  payload: axios.get<IBanco>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBanco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BANCO,
    payload: axios.get<IBanco>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBanco> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BANCO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBanco> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BANCO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBanco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BANCO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
