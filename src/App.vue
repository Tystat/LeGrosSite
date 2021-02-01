<template>
  <div id="app" class="mt-0">
    <div class="row">

      <!-- Sidebar -->
      <div class="col-1" style="background-color: #1c2e40">
        <ul class="nav nav-pills justify-content-center flex-column">
          <li class="nav-item m-2">
            <router-link :to="{name: 'infos', params: { summonerRegion: summonerRegion, summonerName: summonerName }}"
              class="nav-link">
              <div class="h3"> Infos </div>
            </router-link>
          </li>
          <li class="nav-item m-2">
            <router-link :to="{name: 'match', params: { summonerRegion: summonerRegion, summonerName: summonerName }}"
              class="nav-link">
              <div class="h3"> Match </div>
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- Body -->
      <div class="col-11 mt-3">
        <MainPage />
        <summonerForm 
          @formCompleted="updateSummonerInfos"/>
        <router-view/>
      </div>
    </div>
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
