<template>
  <div class="MainPage">
    <h1>Bienvenue sur le gros site !</h1>
    <p>
      Ce site va vous permettre de consulter vos statistiques sur League of Legends et de les comparer avec celles de vos amis !
    </p>
      <summonerForm
        @formCompleted="updateSummonerInfos"
      />
      <summonerInfos
        :summonerName="summoner_name"
        :summonerRegion="summoner_region"
      />
      <matchInfos
        :summonerName="summoner_name"
        :summonerRegion="summoner_region"
      />
    </div>
</template>

<script>
import summonerForm from './summonerForm.vue'
import summonerInfos from './summonerInfos.vue'
import matchInfos from './matchInfos.vue'

export default {
  name: 'MainPage',
  components: {
    summonerForm,
    summonerInfos,
    matchInfos
  },
  data() {
    return{
      summoner_name: null,
      summoner_region: null,
    }
  },
  methods: {
    updateSummonerInfos(e) {
      this.summoner_name = e.summonerName;
      this.summoner_region = e.summonerRegion;
    }
  },
}
</script>
