import { store } from "configure-store";
import urljoin from "urljoin";

export const getURL = (path = "") => (
    urljoin(store.getState().config.url, path)
);

export const getHeaders = (otherHeaders = {}) => {
    const state = store.getState();

    return {headers: Object.assign({},
                                   {"Authorization": state.config.apikey,
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"},
                                   otherHeaders)
            };
}