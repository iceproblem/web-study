<template>
  <header class="header">
    <h1>目标</h1>
    <input
        v-model.trim="txt"
        type="text"
        placeholder="需要做什么?" class="new-todo"
        @keyup.enter="add"
    >
  </header>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "AddTodo",
  data() {
    return{
      txt:""
    }
  },
  methods:{
    ...mapMutations(["addTodo"]),
    add(){
      this.addTodo(this.txt);
      this.txt = "";
    },

  },
}
</script>

<style scoped>

</style>