<template>
  <div id="app">
    <img alt="LGC logo" width="200" src="./assets/logo_lgc_final.png">
    <HelloWorld msg="Bienvenu sur le gros site !"/>
  </div>
</template>

<script>
import HelloWorld from './components/MainPage.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  components: {
    HelloWorld
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
