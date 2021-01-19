<template>
  <div class="MainPage">
    <h1>Bienvenue sur le gros site !</h1>
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
  components: {
    summonerForm
  }
}
</script>
