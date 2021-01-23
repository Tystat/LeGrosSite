<template>
  <b-container>
    <b-row>
            <b-col>
              <summonerInfos
                :summonerName="summonersNames[0]"
                :summonerRegion="summonerRegion"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNames[1]"
                :summonerRegion="summonerRegion"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNames[2]"
                :summonerRegion="summonerRegion"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNames[3]"
                :summonerRegion="summonerRegion"
              />
            </b-col>
            <b-col>
              <summonerInfos
                :summonerName="summonersNames[4]"
                :summonerRegion="summonerRegion"
              />
            </b-col>
          </b-row>
          <b-row>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNames[5]"
                  :summonerRegion="summonerRegion"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNames[6]"
                  :summonerRegion="summonerRegion"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNames[7]"
                  :summonerRegion="summonerRegion"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNames[8]"
                  :summonerRegion="summonerRegion"
                />
              </b-col>
              <b-col>
                <summonerInfos
                  :summonerName="summonersNames[9]"
                  :summonerRegion="summonerRegion"
                />
              </b-col>
            </b-row>
  </b-container>
</template>

<script>
import summonerInfos from './summonerInfos.vue'


export default {
  name: 'matchInfos',
  data: function() {
    return{
      summonersNames: []
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
  },
  watch: {
    //To detect if either has changed
    summonerNameAndRegion() {
      console.log(`API REQUEST MATCHINFOS1 -- ${this.summonerName}`)
      fetch(`/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`)
      .then((response) => {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      }).then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(`API REQUEST MATCHINFOS2 -- ${data.id}`)
          fetch(`/api/${this.summonerRegion}/lol/spectator/v4/active-games/by-summoner/${data.id}`)
          .then((matchResponse) => {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return matchResponse.json();
          }).then((matchData) => {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            matchData.participants.forEach(participant => this.summonersNames.push(participant.summonerName))
          });
      });
    }
  },
  props: {
    summonerName: String,
    summonerRegion: String
  }
}
</script>
