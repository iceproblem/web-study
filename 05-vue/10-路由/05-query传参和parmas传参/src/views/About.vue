<template>
  <div id="about">
    about板块
  </div>
</template>

<script>
export default {
  name: "About",
  created() {
    console.log(this.$route.params.id)
  }
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