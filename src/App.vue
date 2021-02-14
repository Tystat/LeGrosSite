<template>
  <div id="app" class="mt-0">
    <b-row>

      <!-- Sidebar -->
      <b-col cols="1">
        <div>
          <b-button v-b-toggle.sidebar-no-header>
            <b-col md="6" class="mb-0">
              <b-icon icon="list" font-scale="2"></b-icon>
            </b-col>
          </b-button>
            <b-sidebar id="sidebar-no-header" backdrop no-header>
              <template #default="{hide}">
                <b-nav vertical>
                  <b-nav-item active @click="hide">
                    <router-link :to="{name: 'infos'}"
                      class="nav-link bg-light btn btn-outline-secondary">
                      <div class="h3"> Infos </div>
                    </router-link>
                  </b-nav-item>
                  <!--</li>
                  <li class="nav-item">-->
                  <b-nav-item @click="hide">
                    <router-link :to="{name: 'match'}"
                      class="nav-link bg-light btn btn-outline-secondary" >
                      <div class="h3"> Match </div>
                    </router-link>
                  </b-nav-item>
                  <b-nav-item @click="hide">
                  <!--</li>
                  <li class="navbar-item">-->
                    <router-link :to="{name: 'masteries'}"
                      class="nav-link bg-light btn btn-outline-secondary">
                      <div class="h3"> Maîtrises </div>
                    </router-link>
                  </b-nav-item>
                  <!--</li>-->

                </b-nav>
              </template>

              <template #footer="{ hide }">
                <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                  <div id="Credits">
                    <p id="title">Credits : </p>
                    <p id="text">Thomas Tabuteau <br> Jean-Baptiste Martineau <br> Adrien Chotard <br> Laura Texier <br></p>
                    <a href="https://github.com/Tystat/LeGrosSite" id="text"> <img src="./assets/GitHub_Logo.png" alt="GitHub" height="30%" width="30%"> </a>
                  </div>
                  <b-button size="sm" @click="hide">Close</b-button>
                </div>
              </template>
            </b-Sidebar>
        </div>
      </b-col>

      <!-- Body -->
      <b-col cols="12">
        <MainPage />
        <summonerForm/>
        <router-view/>
        <champion-rotation/>
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
    }
  },
  components: {
    summonerForm,
    MainPage,
    championRotation
  },
  methods: {
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
