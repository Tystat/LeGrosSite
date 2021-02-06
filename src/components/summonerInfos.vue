<template>
  <!--If there is infos to display-->
  <div v-if="parsedInfos">
    <b-card
     no-body
     style="max-width: 16rem; min-width: 16rem;"
     class="mb-2 text-dark mx-auto mt-5"
     :header="parsedInfos.name"
     :border-variant="this.color ? this.color : 'dark'"
     :header-bg-variant="this.color ? this.color : 'dark'"
     header-text-variant="white"
    >
      <!--Profile icon, level and last activity -->
      <b-list-group flush>

        <b-list-group-item variant="secondary" class="py-0 px-0">
          <b-img left height="100%" :src="'http://ddragon.leagueoflegends.com/cdn/'+ddragonVersion+'/img/profileicon/'+parsedInfos.profileIconId+'.png'"></b-img>
          <p class="mt-3">
            Level : {{parsedInfos.summonerLevel}}
          </p>
          <p>
            Last activity : {{readableDate}}
          </p>
        </b-list-group-item>

      </b-list-group>

      <!--Ranks-->
      <b-card-footer :footer-bg-variant="this.color ? this.color : 'dark'" footer-text-variant="white">Ranks</b-card-footer>

      <b-list-group flush>
        <!--Ranked Solo/Duo-->
        <b-list-group-item variant="secondary" class="py-1 px-2">
          <b-row no-gutters class="py-0">
            <!--Title-->
            <b-col class="my-auto text-left">
              Solo/Duo
            </b-col>
            <!--League-->
            <b-col class="my-auto">
              <b-img height="50%" :title="ranks.RANKED_SOLO_5x5.tier?ranks.RANKED_SOLO_5x5.tier:''" :src="ranks.RANKED_SOLO_5x5.tier?'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/'+ranks.RANKED_SOLO_5x5.tier.toLowerCase()+'.png':''"></b-img>
              {{ranks.RANKED_SOLO_5x5.tier?'':'Unranked'}}
            </b-col>
            <!--Win/Loose-->
            <b-col class="my-auto text-right">
              {{ranks.RANKED_SOLO_5x5.wins?ranks.RANKED_SOLO_5x5.wins:'0'}}W/{{ranks.RANKED_SOLO_5x5.losses?ranks.RANKED_SOLO_5x5.losses:'0'}}L
            </b-col>

          </b-row>
        </b-list-group-item>
        <!--Ranked Flex-->
        <b-list-group-item variant="secondary" class="py-1 px-2">
          <b-row no-gutters class="py-0">
            <!--Title-->
            <b-col class="my-auto text-left">
              Flex
            </b-col>
            <!--League-->
            <b-col class="my-auto">
              <b-img height="50%" :title="ranks.RANKED_FLEX_SR.tier?ranks.RANKED_FLEX_SR.tier:''" :src="ranks.RANKED_FLEX_SR.tier?'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/'+ranks.RANKED_FLEX_SR.tier.toLowerCase()+'.png':''"></b-img>
              {{ranks.RANKED_FLEX_SR.tier?'':'Unranked'}}
            </b-col>
            <!--Win/Loose-->
            <b-col class="my-auto text-right">
              {{ranks.RANKED_FLEX_SR.wins?ranks.RANKED_FLEX_SR.wins:'0'}}W/{{ranks.RANKED_FLEX_SR.losses?ranks.RANKED_FLEX_SR.losses:'0'}}L
            </b-col>

          </b-row>
        </b-list-group-item>

      </b-list-group>
      <!--Masteries-->
      <b-card-footer :footer-bg-variant="this.color ? this.color : 'dark'" footer-text-variant="white">Champion Masteries</b-card-footer>

      <b-list-group class="bg-secondary" flush>

        <b-list-group-item variant="secondary" v-for="champ in bestChamps" :key="champ.name" class="py-1 px-2">
          <b-row no-gutters class="py-0">
            <!--Champion-->
            <b-col class="my-auto">
              <b-img rounded :title="champ.name" left :src="'https://ddragon.leagueoflegends.com/cdn/'+ddragonVersion+'/img/champion/'+champ.name+'.png'" width="50%"/>
            </b-col>
            <!--Mastery Level-->
            <b-col class="my-auto">
                <b-img :title="'Mastery '+champ.mastery" :src="champ.mastery>=4 ? 'https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_'+champ.mastery+'.png' : 'https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_default.png'" width="50%"/>
            </b-col>
            <!--Mastery Points-->
            <b-col class="my-auto text-right">
              {{champ.points}} pts
            </b-col>

          </b-row>
        </b-list-group-item>

      </b-list-group>

    </b-card>
  </div>
  <!--If there is no infos to display-->
  <div v-else>
    Veuillez entrez un nom d'invocateur valide pour la région choisie
  </div>

</template>

<script>
import {riotAPICall} from '../library.js'


export default {
  name: 'summonerInfos',
  data: function() {
    return{
      parsedInfos: undefined,
      bestChamps: [],
      ranks: {"RANKED_FLEX_SR":{},"RANKED_SOLO_5x5":{}},
      ddragonVersion: 0
    }
  },
  computed: {
    //To detect if either has changed
    summonerNameAndRegion: function (){
      return(this.summonerName+this.summonerRegion);
    },
    readableDate: function() {
      var date = new Date(this.parsedInfos.revisionDate);
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()-2000}`;
    },
  },
  methods: {
    getDdragonVersion() {
      fetch('/api/DD/api/versions.json')
      .then((response) => {
        return response.json();
      }).then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
          this.ddragonVersion = data[0];
      });
    },
    getInfos() {
      //Execute only if the summoner region or summonerName has changed
      if(this.summonerRegion!==undefined && this.summonerName!==undefined){
        //Clear the bestChamps and ranks if any are stored
        this.bestChamps = [];
        this.ranks = {RANKED_FLEX_SR:{},RANKED_SOLO_5x5:{}};
        console.log(`API REQUEST BASIC SUMMONERINFOS -- ${this.summonerName}`)
        //Request the summoner data from Riot
        riotAPICall(`/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`,(dataSummoner) => {
          //If a summoner is found (status object is only return if no summoner was found)
          if(dataSummoner.status===undefined){
            //Store the summoner data
            this.parsedInfos = dataSummoner;
            console.log(`API REQUEST ADVANSUMMONERINFOS -- ${this.summonerName}`)
            //Request the mastery infos from Riot
            riotAPICall(`/api/${this.summonerRegion}/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.parsedInfos.id}`,(dataMasteries) => {
              //Request the list of champion from Data Dragon (no limit on the number of call so we don't use riotAPICall())

              //Sort the dataMasteries array to be sorted by mastery level then mastery point if the masteries are the same (currently sorted only by championPoints)
              dataMasteries.sort(function(a,b) {
                var x = b.championLevel-a.championLevel;
                return x==0 ? b.championPoints-a.championPoints : x;
              });
              fetch(`/api/DD/cdn/${this.ddragonVersion}/data/en_US/champion.json`)
              .then((champions) => {
                //Parse the API response
                return champions.json();
              }).then((dataChampions) => {
                //Store the three champions with the highest mastery
                for(var champion in dataChampions.data) {
                  if(dataChampions.data[champion].key == dataMasteries[0].championId)
                    this.bestChamps.push({name: champion, mastery: dataMasteries[0].championLevel, points :dataMasteries[0].championPoints});
                  if(dataChampions.data[champion].key == dataMasteries[1].championId)
                    this.bestChamps.push({name: champion, mastery: dataMasteries[1].championLevel, points :dataMasteries[1].championPoints});
                  if(dataChampions.data[champion].key == dataMasteries[2].championId)
                    this.bestChamps.push({name: champion, mastery: dataMasteries[2].championLevel, points :dataMasteries[2].championPoints});
                }
                //Sort the bestChamps array to be sorted by mastery level then mastery point if the masteries are the same (currently sorted alphabetically because dataChampions is sorted alphabetically)
                this.bestChamps.sort(function(a,b) {
                  var x = b.mastery-a.mastery;
                  return x==0 ? b.points-a.points : x;
                });
                riotAPICall(`/api/${this.summonerRegion}/lol/league/v4/entries/by-summoner/${this.parsedInfos.id}`,(dataRanks) => {
                  //Store the ranks
                  for(var queue in dataRanks) {
                    this.ranks[dataRanks[queue].queueType]=dataRanks[queue];
                  }
                });
              });
            });
            //Request the data dragon version as it is needed for the summoner icon
            this.getDdragonVersion();
          } else {
            //If no summoner was found we clear the current summoner infos
            this.parsedInfos = undefined;
          }
        });
      }
    },
  },
  mounted(){
    this.getInfos();
  },
  watch: {
    //To detect if either has changed
    summonerNameAndRegion() {
      //Prevent useless call to the API (usefull when component just mounted and summoner name or region not fully set)
      this.getInfos();
    }
  },
  props: {
    summonerName: String,
    summonerRegion: String,
    color: String
  }
}
</script>
