import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import rootReducer, {rootSaga} from './store';
import {Global} from '@emotion/react';
import GlobalStyle from './utils/GlobalStyle';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={GlobalStyle}/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);