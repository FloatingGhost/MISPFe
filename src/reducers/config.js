import { CHANGE_SETTINGS, RECV_LOGIN_STATUS, RECV_CONFIG } from "actions/config";

const initial_state = {
    url: "http://localhost",
    apikey: "myapi",
    loggedIn: false,
    attributeTypes: {}
}

const config = (state = initial_state, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS:
        case RECV_CONFIG:
            return Object.assign({}, state, action.data);
        case RECV_LOGIN_STATUS:
            return Object.assign({}, state, { loggedIn: action.data });
        default:
            return state;
    }
}

export default config;
