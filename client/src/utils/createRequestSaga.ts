import {call, put} from 'redux-saga/effects';
import {finishLoading, startLoading} from '../store/loading';

interface ISagaResponse {
  data: any
}

export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type: string, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: any) {
    yield put(startLoading(type));
    try {
      const response: ISagaResponse = yield call(request, action.payload);
      console.log('[createReqSaga : response]', response);
      yield put({
        type   : SUCCESS,
        payload: response.data,
        meta   : response
      });
    } catch (e) {
      yield put({
        type   : FAILURE,
        payload: e,
        error  : true
      });
    }
    yield put(finishLoading(type));
  };
}