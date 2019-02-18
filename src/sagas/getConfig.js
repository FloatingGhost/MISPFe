import { get, post } from "utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { CHANGE_SETTINGS, TEST_CONNECTION, RECV_LOGIN_STATUS, setLoginStatus, RECV_CONFIG } from "actions/config";

function* loginTester() {
    try {
        toast.info("Checking connection...");
        const response = yield get("/servers/getVersion");
        const json = yield response.json();

        if (response.status == 200) {
            toast.success(`Connected to server running ${json.version}`);
            yield put(setLoginStatus(true));
        } else {
            toast.error(json.message);
            yield put(setLoginStatus(false));
        }

        const typeResponse = yield get("/attributes/describeTypes");
        const typeJson = yield typeResponse.json();
        yield put({type: RECV_CONFIG, data: {attributeTypes: typeJson.result}});
    } catch (e) {
        console.error(e);
        toast.error("There was an error confirming your credentials");
        toast.error(e.toString());
        yield put(setLoginStatus(false));
    }
}

export default function* requestLoginTest() {
    yield takeLatest([CHANGE_SETTINGS, TEST_CONNECTION], loginTester);
}
