<template>
  <div>
    <b-form inline @submit="onSubmit" class="justify-content-center">
          <b-form-input
                id="summoner_name"
                v-model="summoner_name"
                placeholder="Summoner's Name"
                required
                class="mb-2 mr-sm-2 mb-sm-0"
              ></b-form-input>

          <b-input-group prepend="#">
            <b-form-select
                  id="summoner_region"
                  v-model="summoner_region"
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
</div>
</template>

<script>

export default {
  name: 'summonerForm',
  data() {
    return{
      regions: ['BR','EUNE','EUW','LAN','LAS','NA','OCE','RU','TR','JP','KR'],
      summoner_name: null,
      summoner_region: null,
      formReturn: new Promise(()=>{})
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$emit('formCompleted', {summonerName:this.summoner_name,summonerRegion:this.summoner_region})
    }
  },
  components: {
  }
}
</script>
