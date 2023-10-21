<template>
  <div>
    <div 
      v-if="business === null"
      class="flex flex-col items-center pt-20"
    >
      <LoadingSpinner size="xxl" />
    </div>
    <div v-else>
      <div class="text-xl text-gray-600">{{ business.name }}</div>
      <div class="text-sm text-gray-400">{{ business.symbol }}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'BusinessDetailView',
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      business: null,
      business_pk: this.$route.params.id,
      business_ratios: null
    }
  },
  mounted() {
    axios
      .get(`https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/api/business/${this.business_pk}/`)
      .then(data => {
        console.log(data)
        this.business = data.data.business
        this.business_ratios = data.data.business_ratios
      })
  }
}
</script>
