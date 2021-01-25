import Vue from "vue";
import Router from "vue-router";
import summonerInfos from "./components/summonerInfos.vue";
import matchInfos from "./components/matchInfos.vue"
 
Vue.use(Router);
 
export default new Router({
  // get rid of the hash (#) in Url
  // the hash (#) helps the page not to be reloaded when the URL changes
  mode: "history",
  routes: [
    {
        path: "/:summonerRegion/:summonerName",
        name: "infos",
        alias: "/infos", // go '/', the URL remains '/', but it wcill be matched if visiting '/customer'
        component: summonerInfos,
        props: true
    },
    {
        path: "/match/:summonerRegion/:summonerName",
        name: "match",
        component: matchInfos,
        props: true
    }
  ]
});