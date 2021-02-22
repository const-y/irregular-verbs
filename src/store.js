import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    {},
    composeEnhancers(
        applyMiddleware(reduxThunk),
    ),
);

export default store;
