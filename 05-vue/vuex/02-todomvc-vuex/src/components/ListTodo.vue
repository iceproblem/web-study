<template>
  <li class="todo" :class="{editing:isEdit}">
    <div class="view">
      <input
          type="checkbox"
          class="toggle"
          :checked="todo.done"
          @click="toggleTodo(todo)"
      >
      <label @dblclick="isEdit=true">{{ todo.text }}</label>
      <button class="destroy" @click="delTodo(todo)"></button>
    </div>
    <input type="text" ref="content" class="edit" style="display: none;" :value="todo.text" v-show="isEdit" @blur="finishEdit(todo)" @keyup.enter="finishEdit(todo)">
  </li>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "ListTodo",
  data(){
    return{
      // 编辑状态
      isEdit:false
    }
  },
  props: {
    todo: {
      type: Object,
    },
  },
  methods:{
    ...mapMutations(["delTodo","toggleTodo","editTodo"]),
    finishEdit(obj){
      // this.isEdit = false; // 编辑结束
      let newText = this.$refs.content.value.trim();
      this.editTodo({todo:obj,txt:newText});
      this.isEdit = false;
    },
  },
}
</script>

<style scoped>

</style>