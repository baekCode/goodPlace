import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import loading from './loading';
import search from './search';

const rootReducer = combineReducers({
  loading,
  search
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;