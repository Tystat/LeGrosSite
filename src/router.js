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
        path: "/",
        name: "infos",
        alias: "/infos",
        component: summonerInfos,
        props: false
    },
    {
        path: "/match",
        name: "match",
        component: matchInfos,
        props: false
    },
    {
        path: "/masteries",
        name: "masteries",
        component: summonerMasteries,
        props: false
    }
  ]
});
