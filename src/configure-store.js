import mispReducers from "reducers";
import { createStore, applyMiddleware } from "redux"
import { persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import { routerMiddleware } from 'connected-react-router';
import createBrowserHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";


export let history = createBrowserHistory();
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

let middlewares = [
        routerMiddleware(history),
        sagaMiddleware
];

if (process.env.NODE_ENV != "production") {
    middlewares.push(loggerMiddleware);
}

export let store = createStore(
    mispReducers(history),
    applyMiddleware(...middlewares)
);

import { requestLoginTest } from "actions/config";
import { watchEventSearch } from "actions/events";
import { watchAttributeSearch } from "actions/attributes";

const runningSagas = [requestLoginTest, watchEventSearch, watchAttributeSearch];
runningSagas.forEach(saga => sagaMiddleware.run(saga));

export let persistor = persistStore(store);

export default store;

