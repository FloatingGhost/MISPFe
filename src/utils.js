import { store } from "configure-store";
import urljoin from "urljoin";

export const getURL = (path = "") => (
    urljoin(store.getState().config.url, path)
);

export const getHeaders = (otherHeaders = {}) => {
    const state = store.getState();

    return {headers: Object.assign({},
                                   {
                                    "Authorization": state.config.apikey,
                                    "Accept": "application/json",
                                    "Content-Type": "application/json"
                                   },
                                   otherHeaders)
            };
}

export const post = (url, body) => fetch(getURL(url), {method: "POST", body: JSON.stringify(body), ...getHeaders()})

export const get = (url) => fetch(getURL(url), {method: "GET", ...getHeaders()})
