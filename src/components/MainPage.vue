<template>
  <div class="MainPage">
    <h1>{{ msg }}</h1>
    <p>
      Ce site va vous permettre de consulter vos statistiques sur League of Legends et de les comparer avec celles de vos amis !
    </p>
      <b-form inline @submit="onSubmit" class="justify-content-center">
            <b-form-input
                  id="summoner_name"
                  placeholder="Summoner's Name"
                  required
                  class="mb-2 mr-sm-2 mb-sm-0"
                ></b-form-input>

            <b-input-group prepend="#">
              <b-form-select
                    id="summoner_region"
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
  name: 'MainPage',
  props: {
    msg: String
  },
  data() {
    return {
      regions: ['BR','EUNE','EUW','LAN','LAS','NA','OCE','RU','TR','JP','KR','PBE']
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
    }
  }
}
</script>
