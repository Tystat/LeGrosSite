<template>
  <div id="app">
    <img alt="LGC logo" width="200" src="./assets/logo_lgc_final.png">
    <MainPage msg="Bienvenu sur le gros site !"/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
body {
  background-color: #2c3e50;
}
</style>
