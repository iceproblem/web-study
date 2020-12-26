import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import localStorage from "@/store/localStorage";

export default new Vuex.Store({
    // state: {
    //     visibility: "all",
    //     todos: [
    //         {text: "学习vuex", done: false},
    //         {text: "学习uniapp", done: true},
    //     ],
    //
    // },
    state:localStorage.get(),
    getters:{
        filterTodo(state){
            if(state.visibility == "all") { // 全部
                return state.todos;
            }else if(state.visibility == "active"){ // 未完成
                return state.todos.filter(item => item.done == false);
            }else if(state.visibility == 'completed'){ // 已完成
                return state.todos.filter(item => item.done == true);
            }
        },
        // 全选标记
        isAllDone(state){
            let rs = state.todos.every(item => item.done == true);
            return rs;
        },
        // 统计没有完成的数量
        unDoneNumber(state){
            let n = 0;
            state.todos.forEach(item=>{
                if(item.done == false){
                    n++;
                }
            })
            return n;
        },
        // 统计完成的数量
        DoneNumber(state){
            let n = 0;
            state.todos.forEach(item=>{
                if(item.done == true){
                    n++;
                }
            })
            return n;
        },
    },
    mutations: {
        // 添加todo
        addTodo(state,txt){
            state.todos.push({text:txt,done:false});
            localStorage.save(state);
        },
        // 删除todo
        delTodo(state,todo){
            let index = state.todos.findIndex(item => item == todo);
            if(index != -1){
                state.todos.splice(index,1);
            }
            localStorage.save(state);
        },
        // 修改一个todo的状态
        toggleTodo(state,todo){
            let index = state.todos.findIndex(item => item == todo);
            if(index != -1){
                state.todos[index].done = !todo.done;
            }
        },
        // 批量修改todo的状态
        toggleAllTodo(state,flag){
            state.todos.forEach(item => item.done = flag);
            localStorage.save(state);
        },
        // 删除已完成
        delDone(state){
            let rs = state.todos.filter(item => item.done == false);
            state.todos = rs;
            localStorage.save(state);
        },
        // 点击筛选时，获取到visibility
        changeVisibility(state,v){
          state.visibility = v;
        },
        // 编辑状态
        editTodo(state,obj){
            obj.todo.text = obj.txt;

            // 保存到localStorage
            localStorage.save(state);
        },

    },
    actions: {},
    modules: {}
})
