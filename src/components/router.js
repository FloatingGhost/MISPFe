import React from "react";
import { Router as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from "react-toastify";
import { Container, Segment } from "semantic-ui-react";

import routemap from "routemap";
import NavBar from "navbar/index";

const App = ({ store, persistor, history}) => (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <div className="main-content">
                        <NavBar />
                        <ToastContainer />
                        <Switch>
                            { routemap.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact
                                    render={(props) => <Container><Segment inverted><route.component {...props} /></Segment></Container>}
                                />
                            ))}
                        </Switch>
                     </div>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
);

export default App;
