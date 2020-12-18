<template>
  <div id="about">
    about板块
    <ul>
      <li>{{params.id}}</li>
      <li>{{a}}</li>
      <li>{{b}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "About",
  props:["params","a","b"],
}
</script>

<style scoped>
#about{
  width: 500px;
  height: 500px;
  background-color: purple;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
  margin: 50px auto;
}
</style>