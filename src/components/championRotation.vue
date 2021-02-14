<template>
  <div v-if="summonerRegion">
    <b-card no-body class="text-dark">
      <b-card-header>Free</b-card-header>
      <b-card-body>
        <div v-for="free in freeChampions" :key="free.name">
          <b-img left :src="'https://ddragon.leagueoflegends.com/cdn/'+ddragonVersion+'/img/champion/'+free.name+'.png'" width="50%"/>
        </div>
      </b-card-body>
    </b-card>
    <b-card no-body class="text-dark">
      <b-card-header>Given before level {{maxNewPlayerLevel}}</b-card-header>
      <b-card-body>
      <div v-for="given in givenChampions" :key="given.name">
        <b-img left :src="'https://ddragon.leagueoflegends.com/cdn/'+ddragonVersion+'/img/champion/'+given.name+'.png'" width="50%"/>
      </div>
      </b-card-body>
    </b-card>
  </div>
  <div v-else>
    Waiting for a summoner to provide champions rotation
  </div>
</template>

<script>
import { riotAPICall } from '../library'
import {summonerCredentials} from '../main.js'

export default {
  name: 'championRotation',
  data() {
    return{
      freeChampions: [],
      givenChampions: [],
      maxNewPlayerLevel: 0,
      ddragonVersion: undefined
    }
  },
  computed: {
    summonerRegion: function(){
      //If a custom summoner region is given we use it, else we use the current summoner credentials
      return(summonerCredentials.summonerRegion);
    }
  },
  methods: {
    getDdragonVersion() {
      fetch('http://127.0.0.1:8081/api/DD/api/versions.json')
      .then((response) => {
        return response.json();
      }).then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        this.ddragonVersion = data[0];
      });
    },
    getRotation(){
      if(this.summonerRegion != undefined)
        riotAPICall(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/platform/v3/champion-rotations`, (dataRotation) => {
          var freeChampionsIds = dataRotation.freeChampionIds
          var givenChampionsIds = dataRotation.freeChampionIdsForNewPlayers
          this.maxNewPlayerLevel = dataRotation.maxNewPlayerLevel
          fetch(`http://127.0.0.1:8081/api/DD/cdn/${this.ddragonVersion}/data/en_US/champion.json`)
            .then((champs) => {
              return champs.json();
            }).then((dataChampions) => {
              this.freeChampions = []
              this.givenChampions = []
              for(var champion in dataChampions.data){
                for(var fid in freeChampionsIds)
                  if(dataChampions.data[champion].key == fid){
                    this.freeChampions.push({name: champion})
                    break;
                  }
                for(var gid in givenChampionsIds)
                  if(dataChampions.data[champion].key == gid){
                    this.givenChampions.push({name: champion})
                    break;
                  }
              }
            });
        });
    }
  },
  mounted(){
    this.getDdragonVersion();
    this.getRotation();
  },
  watch: {
    summonerRegion: function() {
      this.getRotation()
    }
  },
  props: {
  }
}
</script>
