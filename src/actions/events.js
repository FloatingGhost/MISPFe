import { get, post } from "utils";
import { put, takeLatest } from "redux-saga/effects";

export const SEARCH_EVENTS = "SEARCH_EVENTS";
export const START_EVENT_SEARCH = "START_EVENT_SEARCH";
export const RECV_EVENT_SEARCH = "RECV_EVENT_SEARCH";

function* searchEvents({data}) {
    const searchParams = Object.assign({}, data, {returnFormat: "json"});
    yield put({type: START_EVENT_SEARCH, data: searchParams});
    const response = yield post("/events/restSearch", searchParams);
    const resultCount = response.headers.get("X-result-count");
    const json = yield response.json();
    const numPages = Math.ceil(resultCount / searchParams.limit);
    yield put({type: RECV_EVENT_SEARCH, events: json.response, pages: numPages });
}

export function* watchEventSearch(test) {
    yield takeLatest(SEARCH_EVENTS, searchEvents);
}
