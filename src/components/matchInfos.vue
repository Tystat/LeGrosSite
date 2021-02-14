<template>
  <div v-if="summonersNamesRed[0] || summonersNamesBlue[0]">
    <b-row no-gutters>
            <b-col no-gutters>
              <summonerInfos
                :customSummonerName="summonersNamesBlue[0]"
                :customSummonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col no-gutters>
              <summonerInfos
                :customSummonerName="summonersNamesBlue[1]"
                :customSummonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col no-gutters>
              <summonerInfos
                :customSummonerName="summonersNamesBlue[2]"
                :customSummonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col no-gutters>
              <summonerInfos
                :customSummonerName="summonersNamesBlue[3]"
                :customSummonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col no-gutters>
              <summonerInfos
                :customSummonerName="summonersNamesBlue[4]"
                :customSummonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
          </b-row>
          <b-row>
              <b-col>
                <summonerInfos
                  :customSummonerName="summonersNamesRed[0]"
                  :customSummonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :customSummonerName="summonersNamesRed[1]"
                  :customSummonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :customSummonerName="summonersNamesRed[2]"
                  :customSummonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :customSummonerName="summonersNamesRed[3]"
                  :customSummonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :customSummonerName="summonersNamesRed[4]"
                  :customSummonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
            </b-row>
  </div>
  <div v-else>
    Pas de match trouvé pour cet invocateur
  </div>
</template>

<script>
import summonerInfos from './summonerInfos.vue'
import {riotAPICall} from '../library.js'
import {summonerCredentials} from '../main.js'

export default {
  name: 'matchInfos',
  data: function() {
    return{
      summonersNamesRed: [],
      summonersNamesBlue: []
    }
  },
  components: {
    summonerInfos
  },
  computed: {
    //To detect if either has changed
    summonerNameAndRegion: function (){
      return(this.summonerName+this.summonerRegion);
    },
    summonerName: function(){
      return(summonerCredentials.summonerName);
    },
    summonerRegion: function(){
      return(summonerCredentials.summonerRegion);
    }
  },
  methods: {

    getInfos(){
      if(this.summonerRegion!==undefined && this.summonerName!==undefined){
        this.summonersNamesRed = [];
        this.summonersNamesBlue = [];
        console.log(`API REQUEST MATCHINFOS1 -- ${this.summonerName}`);
        riotAPICall(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`,(data) => {
          riotAPICall(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/spectator/v4/active-games/by-summoner/${data.id}`,(matchData) => {
              matchData.participants.forEach((participant) => {
                if(participant.teamId === 100)
                  this.summonersNamesBlue.push(participant.summonerName);
                else
                  this.summonersNamesRed.push(participant.summonerName);
              })
            });
        });
      }
    }
  },
  mounted(){
    this.getInfos();
  },
  watch: {
    //To detect if either has changed
    summonerNameAndRegion() {
      this.getInfos();
    }
  },
  props: {
  }
}
</script>
