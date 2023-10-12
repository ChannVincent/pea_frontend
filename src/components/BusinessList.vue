<template>
  <div>
    <div v-if="business === null">
      LOADING
    </div>
    <div v-else>
      <div
        v-for="b in business.businesses"
        :key="b.pk"
      >
        <router-link :to="'/detail/'+ b.pk + '/'">
          {{ b.name }}
          {{ b.symbol }}
          {{ b.country_code }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'BusinessList',
  data () {
    return {
      business: null
    }
  },
  mounted () {
    axios
      .get('https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/api/business_list/')
      .then(data => { this.business = data.data })
  }
}
</script>
