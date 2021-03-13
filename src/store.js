import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./reducers/rootReducer";

import pizzasSaga from "./sagas/pizzasSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const sagaMiddleware = createSagaMiddleware();
const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(
    rootReducer,
    middleware
);

sagaMiddleware.run(pizzasSaga);

export default store;