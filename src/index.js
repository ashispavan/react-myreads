import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers';
import ReduxPromise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,  composeEnhancers(
    applyMiddleware(thunk,ReduxPromise)
  ));
console.log(store.getState());


ReactDOM.render(<Provider store={store}><BrowserRouter><App store={store} /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
