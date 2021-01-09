import {
    ADD_TODO,
    CHANGE_ONE_TODO,
    DEL_DONE_TODO,
    DEL_ONE_TODO,
    GET_ALL_TODO,
    IS_CHECKED_ALL_TODO
} from "../contains/types";

import ajax from "../../api/index";

// 存储所有的todo
export const getAllTodoAction = todos => ({ type:GET_ALL_TODO, todos})

// 删除一个todo
export const delOneTodoAction = todoId =>({ type:DEL_ONE_TODO, todoId})

// 修改一个todo的状态
export const changeOneTodoAction = (todoId,flag) =>({ type:CHANGE_ONE_TODO, todoId, flag})

// 添加一个todo
export const addOneTodoAction = todo =>({ type:ADD_TODO, todo})

// 清除已完成的todo
export const delDoneTodoAction = () => ({type:DEL_DONE_TODO})

// 实现全选和反选
export const isCheckedAllTodo = (flag) =>({ type:IS_CHECKED_ALL_TODO, flag})

// 异步获取所有的todos
export const getAllTodoActionAsync = ()=>{
    return (dispatch)=>{
        ajax("/api/todos").then(res=>{
            if (res.status === 200){
                let todos = res.data
                // 派发一个同步的action
                dispatch(getAllTodoAction(todos))
            }
        })
    }
}