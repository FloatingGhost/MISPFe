import React from "react";
import ReactDOM from "react-dom";
import Control from "router";

import "styles/index.js";

import store, { history, persistor } from "configure-store";

ReactDOM.render(
    <Control store={store} 
        persistor={persistor}
        history={history}
    />,
    document.getElementById("root")
);
