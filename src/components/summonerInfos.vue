<template>
  <div v-if="parsedInfos">
    <b-card
     :title="parsedInfos.name"
     :img-src="'http://ddragon.leagueoflegends.com/cdn/'+ddragonVersion+'/img/profileicon/'+parsedInfos.profileIconId+'.png'"
     img-alt="Image"
     img-top
     style="max-width: 20rem;"
     class="mb-2 text-dark mx-auto mt-5"
     >
     <b-card-text class="text-dark">
       Awesome, you are lvl {{parsedInfos.summonerLevel}}!
     </b-card-text>
   </b-card>
  </div>
</template>

<script>



export default {
  name: 'summonerInfos',
  data: function() {
    return{
      parsedInfos: "",
      ddragonVersion: 0
    }
  },
  methods: {
    getDdragonVersion() {
      fetch('/api/ddragonVersion')
      .then((response) => {
        return response.json();
      }).then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data);
          this.ddragonVersion = data[0];
      });

    }
  },
  watch: {
    summonerName() {
      console.log("updated");

      fetch(`/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`)
      .then((response) => {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      }).then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data);
          this.parsedInfos = data;
          this.getDdragonVersion();
      });
    }
  },
  props: {
    summonerName: String,
    summonerRegion: String
  }
}
</script>
