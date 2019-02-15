import { SEND_ATTRIBUTE_SEARCH, SEARCH_ATTRIBUTES, RECV_ATTRIBUTE_SEARCH } from "actions/attributes";

const initial_state = {
    attributes: [],
    loading: false,
    pages: -1,
    searchParams: {}
}

const attributeReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SEARCH_ATTRIBUTES:
            return Object.assign({}, state, { loading: true});
        case SEND_ATTRIBUTE_SEARCH:
            return Object.assign({}, state, { searchParams: action.data }); 
        case RECV_ATTRIBUTE_SEARCH:
            return Object.assign({}, state, { loading: false, attributes: action.attributes, pages: action.pages });        
        default:
            return state;
    }
}

export default attributeReducer;
