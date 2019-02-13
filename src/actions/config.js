import { getURL, getHeaders } from "utils";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

export const CHANGE_SETTINGS = "CHANGE_SETTINGS";
export const TEST_CONNECTION = "TEST_CONNECTION";
export const RECV_LOGIN_STATUS = "RECV_LOGIN_STATUS";

export const setInstanceDetails = (url, apikey) => ({
    type: CHANGE_SETTINGS,
    data: {
        url: url,
        apikey: apikey
    }
});

export const setLoginStatus = (status) => ({
    type: RECV_LOGIN_STATUS,
    data: status
});

function* loginTester() {
    try {
        const response = yield call(fetch, getURL("/servers/getVersion"), getHeaders()).json();
        console.log("GOT", response);
    } catch (e) {
        console.erorr(e);
        yield put(setLoginStatus(false));
    }
}

export function* requestLoginTest() {
    yield takeEvery(TEST_CONNECTION, loginTester);
}
