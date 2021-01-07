import { createStore } from 'redux';

import reducer from "./reducers/index";

// let initState = { counter:0 }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

let store = createStore(reducer,composeEnhancers())

export default store;