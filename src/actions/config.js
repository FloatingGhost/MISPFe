export const CHANGE_SETTINGS = "CHANGE_SETTINGS";
export const TEST_CONNECTION = "TEST_CONNECTION";
export const RECV_LOGIN_STATUS = "RECV_LOGIN_STATUS";
export const RECV_CONFIG = "RECV_CONFIG";

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
