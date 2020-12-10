<template>
  <div id="app">
    <section class="todoapp">
      <AddTodo @addTodo="addTodo"></AddTodo>
      <section class="main" style="">
        <input type="checkbox"
               class="toggle-all"
               :checked="isAllDone"
               @click="toggleAllTodo(!isAllDone)"
        >
        <ul class="todo-list">
          <ListTodo v-for="(item,index) in todos"
              :todo="item"
              :delTodo="delTodo"
              :toggleTodo="toggleTodo"
          ></ListTodo>
        </ul>
      </section>
      <footer class="footer" style="">
        <span class="todo-count"><strong>1</strong> items left</span>
        <ul class="filters">
          <li><a href="" class="selected">all</a></li>
          <li><a href="" class="">active</a></li>
          <li><a href="" class="">completed</a></li>
        </ul>
        <button class="clear-completed">clear completed</button>
      </footer>
    </section>
  </div>
</template>

<script>
import AddTodo from "@/components/AddTodo";
import ListTodo from "@/components/ListTodo";
require("./assets/todo-mvc.css");
export default {
  name: 'App',
  computed:{
    isAllDone(){
      let rs = this.todos.every(item=>item.done === true)
      return rs;
    },
    unDoneNumber(){
      let n = 0;
      this.todos.forEach(item=>{
        if(item.done == false) n++;
      })
      return n;
    }
  },
  methods:{
    addTodo(todo){
      this.todos.push(todo)
    },
    delTodo(todo){
      let index = this.todos.findIndex(item=>item==todo);
      if(index != -1){
        this.todos.splice(index,1)
      }
    },
    toggleTodo(todo){
      let index = this.todos.findIndex(item=>item==todo);
      this.todos[index].done = !todo.done;
    },
    toggleAllTodo(flag){
      this.todos.forEach(item=>item.done=flag)
    }
  },
  data(){
    return {
      todos:[
        {text:"1 vue",done:true},
        {text:"2 react",done:false},
        {text:"3 app",done:false},
        {text:"4 uniapp",done:false},
      ]
    }
  },
  components:{
    ListTodo,
    AddTodo,
  },
}
</script>

