<template>
  <div>
    <div 
      v-if="business === null"
      class="flex flex-col items-center pt-20"
    >
      <LoadingSpinner size="xxl" />
    </div>
    <div 
      v-else
      class="max-w-7xl m-auto"
    >
      <div class="text-xl text-gray-600">{{ business.name }}</div>
      <div class="text-sm text-gray-400">{{ business.symbol }}</div>

      <div class="text-xl text-gray-600 mt-5">Fondamentaux</div>

      <div class="text-lg text-gray-500 mt-3">Situation finanicère</div>
      <!-- Trésorerie -->
      <div>
        <div class="text-sm text-gray-500 mt-3">Trésorerie : 76M</div>
        <div class="text-green-600 flex flex-row">
          <div>
            <i class="fa-solid fa-money-bill-1 text-4xl mr-1"/>
          </div>
          <div>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
          </div>
        </div>
      </div>
      <!-- Dette -->
      <div>
        <div class="text-sm text-gray-500 mt-3">Dette : 50M</div>
        <div class="text-red-600 flex flex-row">
          <div>
            <i class="fa-solid fa-money-bill-1 text-4xl mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-4xl mr-1"/>
          </div>
          <div>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
          </div>
        </div>
      </div>
      <!-- Dividend -->
      <div>
        <div class="text-sm text-gray-500 mt-3">Dividend : 20M</div>
        <div class="text-gray-600 flex flex-row">
          <div>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
            <i class="fa-solid fa-money-bill-1 text-lg mr-1"/>
          </div>
        </div>
      </div>

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
