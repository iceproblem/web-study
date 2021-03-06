import {DEL_ONE_TODO, GET_ALL_TODO} from "../contains/types";

// 存储所有的todo
export const getAllTodoAction = todos => ({ type:GET_ALL_TODO, todos})

// 删除一个todo
export const delOneTodoAction = todoId =>({ type:DEL_ONE_TODO, todoId})