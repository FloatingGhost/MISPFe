import { getURL, getHeaders } from "utils";
import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

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
        toast.info("Checking connection...");
        const response = yield call(fetch, getURL("/servers/getVersion"), getHeaders());
        const json = yield response.json();

        if (response.status == 200) {
            toast.success(`Connected to server running ${json.version}`);
            yield put(setLoginStatus(true));
        } else { 
            toast.error(json.message);
            yield put(setLoginStatus(false));
        }
    } catch (e) {
        console.error(e);
        toast.error("There was an error confirming your credentials");
        toast.error(e.toString());
        yield put(setLoginStatus(false));
    }
}

export function* requestLoginTest() {
    yield takeEvery([CHANGE_SETTINGS, TEST_CONNECTION], loginTester);
}
