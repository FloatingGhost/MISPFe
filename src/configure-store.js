import thunkMiddleware from "redux-thunk";
import mispReducers from "reducers";
import { createStore, applyMiddleware } from "redux"
import { persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import { routerMiddleware } from 'connected-react-router';
import createBrowserHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";

import { requestLoginTest } from "actions/config";

export let history = createBrowserHistory();
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

let middlewares = [
        routerMiddleware(history),
        thunkMiddleware,
        sagaMiddleware
];

if (process.env.NODE_ENV != "production") {
    middlewares.push(loggerMiddleware);
}

export let store = createStore(
    mispReducers(history),
    applyMiddleware(...middlewares)
);

const runningSagas = [requestLoginTest];
runningSagas.forEach(saga => sagaMiddleware.run(saga));

export let persistor = persistStore(store);

export default store;

