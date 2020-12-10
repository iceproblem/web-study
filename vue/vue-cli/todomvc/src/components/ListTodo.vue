<template>
  <li class="todo" :class="{completed:todo.done}">
    <div class="view">
      <input
          type="checkbox" class="toggle"
          :checked="todo.done"
          @click="toggleTodo(todo)"
      >
      <label>{{ todo.text }}</label>
      <button class="destroy" @click="delTodo(todo)"></button>
    </div>
    <input type="text" class="edit" style="display: none;">
  </li>
</template>

<script>
export default {
  name: "ListTodo",
  props:{
    todo:{
      type:Object,
      require:true
    },
    delTodo:{
      type:Function,
    },
    toggleTodo:{
      type:Function,
    },
  },
}
</script>
