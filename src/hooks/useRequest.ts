import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

enum ActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  DATA = 'DATA',
  CLEAR = 'CLEAR'
}

type Actions =
  | { type: ActionTypes.LOADING; status: boolean; }
  | { type: ActionTypes.ERROR; error: any; }
  | { type: ActionTypes.DATA; data: any; }
  | { type: ActionTypes.CLEAR; }

export type State = {
  loading: boolean;
  error: string | null;
  data: Record<string, any> | null;
}

export type Options =
  | null
  | {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      url: string;
      data?: any;
    }

const initialState: State = {
  data: null,
  error: null,
  loading: false
};

const requestReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        error: null,
        data: null,
        loading: action.status
      };
    case 'ERROR':
      return {
        ...state,
        data: null,
        loading: false,
        error: action.error
      };
    case 'DATA':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data
      };
    case 'CLEAR':
      return {
        ...initialState
      };
    default:
      throw new Error(`[useRequest reducer] unknown action: ${action.type}`);
  }
};

export default (options: Options) => {
  const [requestState, dispatch] = useReducer(requestReducer, initialState);

  let baseURL: string = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      baseURL = <string>process.env.REACT_APP_PROD_API;
      break;
    case 'development':
      baseURL = <string>process.env.REACT_APP_DEV_API;
      break;
    default:
      break;
  }

  const fetchData = useCallback(async () => {
    dispatch({ type: ActionTypes.LOADING, status: true });
    try {
      const request = await axios({
        ...options,
        responseType: 'json',
        baseURL
      });
      dispatch({ type: ActionTypes.DATA, data: request.data });
    } catch (err) {
      if (err.response) {
        dispatch({ type: ActionTypes.ERROR, error: err.response.data });
      } else if (err.request) {
        dispatch({ type: ActionTypes.ERROR, error: 'Couldn\'t reach server.' });
      } else {
        dispatch({ type: ActionTypes.ERROR, error: 'Couldn\'t reach server.' });
      }
    } finally {
      dispatch({ type: ActionTypes.LOADING, status: false });
    }
  }, [options]);

  const clearState = () => dispatch({ type: ActionTypes.CLEAR });

  useEffect(() => {
    if (options && options.method) {
      fetchData();
    }
  }, [options, fetchData]);

  return [requestState, clearState];
};
