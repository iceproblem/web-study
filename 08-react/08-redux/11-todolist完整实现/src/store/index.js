import { createStore,applyMiddleware } from "redux";

import reducer from "./reducers";

// 增强redux功能中间件
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let createStoreWithMiddleWare = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleWare(reducer, composeEnhancers());

export default store;