import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import configReducer from "reducers/config";
import eventReducer from "reducers/events";
import attributeReducer from "reducers/attributes";

const configPersistence = {
    key: "config",
    storage,
    stateReconciler: autoMergeLevel2
};


const mispReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        config: persistReducer(configPersistence, configReducer),
        events: eventReducer,
        attributes: attributeReducer
    });
};

export default mispReducers;
