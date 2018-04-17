import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.js'
import reduxThunk from 'redux-thunk';
import App from './components/App';
import './css/style.css';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
<Provider store={store}><App /></Provider>,
document.querySelector('#root'));

