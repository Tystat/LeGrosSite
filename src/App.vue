<template>
  <div id="app">
    <MainPage />	
    <summonerForm 
      @formCompleted="updateSummonerInfos"/>
    <template>
        <div id="app">
          <nav>
            <router-link :to="{name: 'infos', params: { summonerRegion: summonerRegion, summonerName: summonerName }}">Infos</router-link>
            <router-link :to="{name: 'match', params: { summonerRegion: summonerRegion, summonerName: summonerName }}">Match</router-link>
          </nav>
          <router-view/>
        </div>
    </template>
  </div>
</template>

<script>
import summonerForm from './components/summonerForm.vue'
import MainPage from './components/MainPage.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  data: function() {
    return {
      summonerName: null,
      summonerRegion: null
    }
  },
  components: {
    summonerForm,
    MainPage
  },
  methods: {
    updateSummonerInfos(e) {
      this.summonerName = e.summonerName;
      this.summonerRegion = e.summonerRegion;
    }
  },
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
