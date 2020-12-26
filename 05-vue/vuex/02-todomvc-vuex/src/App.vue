<template>
  <div id="app">
    <section class="todoapp">
      <AddTodo></AddTodo>
      <section class="main" style="">
        <input type="checkbox" class="toggle-all" @click="toggleAllTodo(!isAllDone)" :checked="isAllDone">
        <ul class="todo-list">
          <ListTodo :class="{completed:item.done}" v-for="(item,index) in filterTodo" :key="index" :todo="item"></ListTodo>
        </ul>
      </section>
      <footer class="footer" style="">
        <span class="todo-count"><strong>{{unDoneNumber}}</strong>未完成</span>
        <ul class="filters">
          <li><a href="" @click.prevent="changeVisibility('all')" :class="{selected:visibility == 'all'}">全部</a></li>
          <li><a href="" @click.prevent="changeVisibility('active')" :class="{selected:visibility == 'active'}">未完成</a></li>
          <li><a href="" @click.prevent="changeVisibility('completed')" :class="{selected:visibility == 'completed'}">已完成</a></li>
        </ul>
        <button class="clear-completed" v-show="DoneNumber > 0" @click="delDone">删除已完成</button>
      </footer>
    </section>
  </div>
</template>

<script>
import AddTodo from "@/components/AddTodo";
import ListTodo from "@/components/ListTodo";
import {mapGetters, mapMutations, mapState} from "vuex";

require("./assets/todo-mvc.css");

export default {
  name: 'App',
  computed: {
    ...mapState(["todos","visibility"]),
    ...mapGetters(["unDoneNumber","isAllDone","filterTodo","DoneNumber"])
  },
  methods: {
    ...mapMutations(["toggleAllTodo","delDone","changeVisibility"])
  },
  components: {
    AddTodo,
    ListTodo,
  },
}

</script>

<style lang="scss">

</style>
