<template>
  <header class="header">
    <h1>todos</h1>
    <input
        type="text"
        placeholder="what need to be done?"
        class="new-todo"
        v-model="text"
        @keyup.enter="add"
    >
  </header>
</template>

<script>
export default {
  name: "AddTodo",
  data(){
    return{
      text:""
    }
  },
  methods:{
    add(){
      this.$emit("addTodo",{text:this.text,done:false})
      this.text = "";
    }
  }
}
</script>