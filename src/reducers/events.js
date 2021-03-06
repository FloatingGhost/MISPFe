import { START_EVENT_SEARCH, SEARCH_EVENTS, RECV_EVENT_SEARCH } from "actions/events";

const initial_state = {
    events: [],
    loading: true,
    pages: -1,
    searchParams: {}
};

const events = (state = initial_state, action) => {
    switch (action.type) {
        case START_EVENT_SEARCH:
            return Object.assign({}, state, { loading: true, searchParams: action.data});
        case SEARCH_EVENTS:
            return Object.assign({}, state, { loading: true });
        case RECV_EVENT_SEARCH:
            return Object.assign({}, state, { loading: false, events: action.events, pages: action.pages });
        default:
            return state;
    }
}

export default events;
