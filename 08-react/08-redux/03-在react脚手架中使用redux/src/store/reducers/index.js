import { combineReducers } from 'redux'

import counter from "./counter";
import todos from "./todos";

let reducer = combineReducers({
    counter,
    todos
})

export default reducer;