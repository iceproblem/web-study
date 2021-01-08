import {
    ADD_TODO,
    CHANGE_ONE_TODO,
    DEL_DONE_TODO,
    DEL_ONE_TODO,
    GET_ALL_TODO,
    IS_CHECKED_ALL_TODO
} from "../contains/types";

let initState = {
    todos:[],
    // 已完成的todo计数
    finishedCount:0
}

export default function reducer (state=initState, action) {

    // 获取todo存储在仓库
    if(action.type === GET_ALL_TODO){
        let newState = JSON.parse(JSON.stringify(state)); // 深COPY
        newState.todos =action.todos;

        return newState
    }
    // 删除一个todo
    if(action.type === DEL_ONE_TODO){
        let newState = JSON.parse(JSON.stringify(state));
        newState.todos.forEach((todo,index)=>{
            if(action.todoId === todo.id){
                newState.todos.splice(index,1)
            }
        })
        //统计完成的todo个数
        let temp = 0;
        newState.todos.forEach((todo,index)=>{
            if(todo.done){
                temp += 1
            }
        })
        newState.finishedCount = temp;
        return newState;
    }

    //修改一个todo的状态
    if(action.type === CHANGE_ONE_TODO){
        let newState = JSON.parse(JSON.stringify(state));
        newState.todos.forEach((todo, index)=>{
            if(action.todoId === todo.id){
                todo.done = action.flag
            }
        })
        //统计完成的todo个数
        let temp = 0;
        newState.todos.forEach((todo,index)=>{
            if(todo.done){
                temp += 1
            }
        })
        newState.finishedCount = temp;
        return newState;
    }

    // 添加一个todo
    if(action.type === ADD_TODO){
        let newState = JSON.parse(JSON.stringify(state));
        newState.todos.push(action.todo);
        return newState;
    }

    // 清除已完成的todo
    if(action.type === DEL_DONE_TODO){
        let newState = JSON.parse(JSON.stringify(state));
        // 用于保存不删除的todo
        let arr = [];
        newState.todos.forEach((todo,index)=>{
            if(!todo.done){
                // 没有完成的
                arr.push(todo);
            }
        })
        newState.finishedCount = 0;
        newState.todos = arr;
        return newState;
    }

    // 实现全选和反选
    if(action.type === IS_CHECKED_ALL_TODO){
        let newState = JSON.parse(JSON.stringify(state));
        newState.todos.forEach((todo,index)=>{
            todo.done = action.flag;
        })
        //统计完成的todo个数
        let temp = 0;
        newState.todos.forEach((todo,index)=>{
            if(todo.done){
                temp += 1
            }
        })
        newState.finishedCount = temp;
        return newState;
    }

    return state;
}