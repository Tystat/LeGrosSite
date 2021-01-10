<template>
  <div class="MainPage">
    <h1>Bienvenu sur le gros site !</h1>
    <p>
      Ce site va vous permettre de consulter vos statistiques sur League of Legends et de les comparer avec celles de vos amis !
    </p>
      <summonerForm/>
    </div>
</template>

<script>
import summonerForm from './summonerForm.vue'

export default {
  name: 'MainPage',
  data() {
    return{
      regions: ['BR','EUNE','EUW','LAN','LAS','NA','OCE','RU','TR','JP','KR'],
      summoner_name: null,
      summoner_region: null,
    }
  },
  components: {
    summonerForm
  }

}
</script>
