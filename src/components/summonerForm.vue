<template>
  <div>
    <b-form inline @submit="onSubmit" class="justify-content-center">
          <b-form-input
                id="summoner_name"
                v-model="summoner_name_form"
                placeholder="Summoner's Name"
                required
                class="mb-2 mr-sm-2 mb-sm-0"
              ></b-form-input>

          <b-input-group prepend="#">
            <b-form-select
                  id="summoner_region"
                  v-model="summoner_region_form"
                  placeholder="Region"
                  :options="regions"
                  required
                  class="mb-2 mr-sm-2 mb-sm-0"
                ></b-form-select>
          </b-input-group>

          <b-button type="submit" variant="primary">
              Valider
          </b-button>
    </b-form>
    <summonerInfos :summonerName="summoner_name" :summonerRegion="summoner_region"></summonerInfos>
</div>
</template>

<script>
import summonerInfos from './summonerInfos.vue'

export default {
  name: 'summonerForm',
  data() {
    return{
      regions: ['BR','EUNE','EUW','LAN','LAS','NA','OCE','RU','TR','JP','KR'],
      summoner_name_form: null,
      summoner_region_form: null,
      summoner_name: null,
      summoner_region: null,
      formReturn: new Promise(()=>{})
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.summoner_name = this.summoner_name_form;
      this.summoner_region = this.summoner_region_form;
    }
  },
  components: {
    summonerInfos
  }
}
</script>
