import Vue from "vue";
import Router from "vue-router";
import summonerInfos from "./components/summonerInfos.vue";
import matchInfos from "./components/matchInfos.vue";
import summonerMasteries from "./components/summonerMasteries.vue"
 
Vue.use(Router);
 
export default new Router({
  // get rid of the hash (#) in Url
  // the hash (#) helps the page not to be reloaded when the URL changes
  mode: "history",
  routes: [
    {
        path: "/:summonerRegion/:summonerName",
        name: "infos",
        alias: "/infos",
        component: summonerInfos,
        props: true
    },
    {
        path: "/match/:summonerRegion/:summonerName",
        name: "match",
        component: matchInfos,
        props: true
    },
    {
        path: "/masteries/:summonerRegion/:summonerName",
        name: "masteries",
        component: summonerMasteries,
        props: true
    }
  ]
});