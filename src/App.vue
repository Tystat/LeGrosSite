<template>
  <div id="app" class="mt-0">
    <b-row>

      <!-- Sidebar -->
      <b-col style="background-color: #1c2e40" cols="2">
        <ul class="nav nav-pills justify-content-center flex-column">
          <li class="nav-item m-2">
            <router-link :to="{name: 'infos', params: { summonerRegion: summonerRegion, summonerName: summonerName }}"
              class="list-group-item list-group-item-action bg-light">
              <div class="h3"> Infos </div>
            </router-link>
          </li>
          <li class="nav-item m-2">
            <router-link :to="{name: 'match', params: { summonerRegion: summonerRegion, summonerName: summonerName }}"
              class="list-group-item list-group-item-action bg-light">
              <div class="h3"> Match </div>
            </router-link>
          </li>
          <li class="nav-item m-2">
            <router-link :to="{name: 'masteries', params: { summonerRegion: summonerRegion, summonerName: summonerName }}"
              class="list-group-item list-group-item-action bg-light">
              <div class="h3"> Maîtrises </div>
            </router-link>
          </li>
        </ul>
        <div id="Credits">
          <p id="title">Credits : </p>
          <p id="text">Thomas Tabuteau <br> Jean-Baptiste Martineau <br> Adrien Chotard <br> Laura Texier <br></p>
          <a href="https://github.com/Tystat/LeGrosSite" id="text"> <img src="./assets/GitHub_Logo.png" alt="GitHub" height="30%" width="30%"> </a>
        </div>
        
      </b-col>
      
      <!-- Body -->
      <b-col cols="10">
        <MainPage />
        <summonerForm 
          @formCompleted="updateSummonerInfos"/>
        <router-view/>
        <champion-rotation :summonerRegion="summonerRegion" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import summonerForm from './components/summonerForm.vue'
import MainPage from './components/MainPage.vue'
import championRotation from './components/championRotation.vue'
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
    MainPage,
    championRotation
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
#Credit{
  position:absolute;
  bottom:0;
}
#title{
  font-size:18px;
}
#text{
  font-size:13px;
}

</style>
