import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import mainReducer from './reducers';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom'

const store = createStore(mainReducer, applyMiddleware(thunk))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store} >
                <App />
        </Provider>
    </BrowserRouter>
);