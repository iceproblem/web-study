// action creators

import { INCREMENT,DECREMENT} from "../constans/types";

export function increment() { return { type:INCREMENT } }
export function decrement() { return { type:DECREMENT } }