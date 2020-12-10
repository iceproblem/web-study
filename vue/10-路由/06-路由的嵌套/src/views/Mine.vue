<template>
<div id="mine">
  Mine版块
  <ul>
    <li>{{name}}</li>
    <li>{{age}}</li>
    <li>{{sex}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: "Mine",
  data(){
    return{
      name:"",
      age:0,
      sex:"",
    }
  },
  created() {

    this.name = this.$route.params.name;
    this.age = this.$route.params.age;
    this.sex = this.$route.params.sex;
  }
}
</script>

<style scoped>
#mine{
  width: 500px;
  height: 500px;
  background-color: gold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
  margin: 50px auto;
}
</style>