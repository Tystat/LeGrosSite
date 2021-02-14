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
import {globalAPIQueu,summonerCredentials} from '../main.js'

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
        console.log(`API REQUEST MATCHINFOS1 -- ${this.summonerName}`)
        globalAPIQueu.APIRequests += 1;
        setTimeout(()=>{
          fetch(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`)
          .then((response) => {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            globalAPIQueu.APIRequests -= 1;
            return response.json();
          }).then((data) => {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            console.log(`API REQUEST MATCHINFOS2 -- ${data.id}`)
            globalAPIQueu.APIRequests += 1;
            setTimeout(()=>{
              fetch(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/spectator/v4/active-games/by-summoner/${data.id}`)
              .then((matchResponse) => {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                globalAPIQueu.APIRequests -= 1;
                return matchResponse.json();
              }).then((matchData) => {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                matchData.participants.forEach((participant) => {
                  if(participant.teamId === 100)
                    this.summonersNamesBlue.push(participant.summonerName);
                  else
                    this.summonersNamesRed.push(participant.summonerName);
                })
              });
            }, 50*globalAPIQueu.APIRequests);
          });
        }, 50*globalAPIQueu.APIRequests);
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
