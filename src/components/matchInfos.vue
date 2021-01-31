<template>
  <b-container v-if="summonersNamesRed[0] || summonersNamesBlue[0]">
    <b-row>
            <b-col>
              <summonerInfos
                :summonerName="summonersNamesBlue[0]"
                :summonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNamesBlue[1]"
                :summonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNamesBlue[2]"
                :summonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNamesBlue[3]"
                :summonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNamesBlue[4]"
                :summonerRegion="summonerRegion"
                color="primary"
              />
            </b-col>
          </b-row>
          <b-row>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNamesRed[0]"
                  :summonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNamesRed[1]"
                  :summonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNamesRed[2]"
                  :summonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNamesRed[3]"
                  :summonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNamesRed[4]"
                  :summonerRegion="summonerRegion"
                  color="danger"
                />
              </b-col>
            </b-row>
  </b-container>
  <div v-else>
    Pas de match trouvé pour cet invocateur
  </div>
</template>

<script>
import summonerInfos from './summonerInfos.vue'
import {globalAPIQueu} from '../main.js'

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
          fetch(`/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`)
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
              fetch(`/api/${this.summonerRegion}/lol/spectator/v4/active-games/by-summoner/${data.id}`)
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
    summonerName: String,
    summonerRegion: String
  }
}
</script>
