import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';  
import ordersReducer from './reducers/ordersReducer';
import menuReducer from './reducers/menuReducer';
import activeReducer from './reducers/activeReducer';
import categoriesReducer from './reducers/categoriesReducer';
import activeOrderReducer from './reducers/activeOrderReducer';
import userReducer from './reducers/userReducer';
import {reducer as formReducer} from 'redux-form';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'typeface-roboto';

const rootReducer = combineReducers({
    orders:ordersReducer,
    categories:categoriesReducer,
    active:activeReducer,
    menu:menuReducer,
    activeOrders:activeOrderReducer,
    user:userReducer,
    form:formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
