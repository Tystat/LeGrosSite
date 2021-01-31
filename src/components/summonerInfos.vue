<template>
  <div v-if="parsedInfos">
    <b-card
     :img-src="'http://ddragon.leagueoflegends.com/cdn/'+ddragonVersion+'/img/profileicon/'+parsedInfos.profileIconId+'.png'"
     img-alt="Image"
     img-top
     style="max-width: 20rem;"
     class="mb-2 text-dark mx-auto mt-5"
     :header="parsedInfos.name"
     :border-variant="color"
     :header-bg-variant="color"
     :header-text-variant="textColor"
     >
     <b-card-text class="text-dark">
       Awesome, you are lvl {{parsedInfos.summonerLevel}}!
     </b-card-text>
   </b-card>
  </div>
  <div v-else>
    Veuillez entrez un nom d'invocateur valide pour la région choisie
  </div>
</template>

<script>
import {globalAPIQueu} from '../main.js'


export default {
  name: 'summonerInfos',
  data: function() {
    return{
      parsedInfos: "",
      ddragonVersion: 0
    }
  },
  computed: {
    //To detect if either has changed
    summonerNameAndRegion: function (){
      return(this.summonerName+this.summonerRegion);
    },
    textColor: function() {
      return this.color ? "white" : "";
    }
  },
  methods: {
    getDdragonVersion() {
      fetch('/api/ddragonVersion')
      .then((response) => {
        return response.json();
      }).then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
          this.ddragonVersion = data[0];
      });
    },
    getInfos() {
      if(this.summonerRegion!==undefined && this.summonerName!==undefined){

        console.log(`API REQUEST BASIC SUMMONERINFOS -- ${this.summonerName}`)
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
            //https://ddragon.leagueoflegends.com/cdn/11.2.1/data/fr_FR/champion.json
            //https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_4.jpg
            if(data.status===undefined){
              this.parsedInfos = data;
              console.log(`API REQUEST ADVANSUMMONERINFOS -- ${this.summonerName}`)
              globalAPIQueu.APIRequests += 1;
              setTimeout(()=>{
                fetch(`/api/${this.summonerRegion}/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.parsedInfos.id}`)
                .then((masteries) => {
                  globalAPIQueu.APIRequests -= 1;
                  return masteries.json();
                }).then((dataMasteries) => {
                  console.log(dataMasteries);
                });
              }, 50*globalAPIQueu.APIRequests);
              this.getDdragonVersion();
            } else {
              this.parsedInfos = "";
            }
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
