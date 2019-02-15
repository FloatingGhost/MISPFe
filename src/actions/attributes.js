import { get, post } from "utils";
import { put, takeLatest } from "redux-saga/effects";

export const SEARCH_ATTRIBUTES = "SEARCH_ATTRIBUTES";
export const SEND_ATTRIBUTE_SEARCH = "START_ATTRIBUTE_SEARCH";
export const RECV_ATTRIBUTE_SEARCH = "RECV_ATTRIBUTE_SEARCH";

function* searchAttributes({data}) {
    const searchParams = Object.assign({}, data, {returnFormat: "json"});
    yield put({type: SEND_ATTRIBUTE_SEARCH, data: searchParams});

    const response = yield post("/attributes/restSearch", searchParams);
    const resultCount = response.headers.get("X-result-count");
    const json = yield response.json();
    const numPages = Math.ceil(resultCount / searchParams.limit);
    yield put({type: RECV_ATTRIBUTE_SEARCH, attributes: json.response.Attribute, pages: numPages });
}

export function* watchAttributeSearch(test) {
    yield takeLatest(SEARCH_ATTRIBUTES, searchAttributes);
}
