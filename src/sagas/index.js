import { put, takeEvery, fork, all } from "redux-saga/effects";
import getConfig from "sagas/getConfig";
import searchAttributes from "sagas/searchAttributes";
import searchEvents from "sagas/searchEvents";

export default function* rootSaga() {
    yield all([
        fork(getConfig),
        fork(searchEvents),
        fork(searchAttributes)
    ])
}
