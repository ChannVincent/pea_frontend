<template>
  <div>
    <Navigation :title="business ? business.name : ''" />
    <div 
      v-if="business === null"
      class="flex flex-col items-center pt-20"
    >
      <LoadingSpinner size="xxl" />
    </div>
    <div 
      v-else
      class="max-w-7xl m-auto my-10 space-y-20"
    >
      <!-- revenus -->
      <div class="flex flex-col items-center space-y-10">
        <div class="space-y-4">
          <div class="text-primary text-3xl text-center">Revenus</div>
          <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna. Integer gravida a dui dapibus posuere. Aliquam tellus sem, convallis a dui quis, malesuada pretium ligula. Pellentesque mi orci, ultrices non scelerisque vel, luctus consequat felis. Proin quis dui diam. Maecenas eget pulvinar ligula.</div>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-col space-y-2">
            <div class="text-primary text-xl">Bénéfices</div>
            <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="text-primary text-xl">Exploitation</div>
            <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="text-primary text-xl">Chiffre d'Affaire</div>
            <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
          </div>
        </div>
      </div>
      <!-- trésorerie -->
      <div class="flex flex-col items-center space-y-10">
        <div class="space-y-4">
          <div class="text-primary text-3xl text-center">Trésorerie</div>
          <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna. Integer gravida a dui dapibus posuere. Aliquam tellus sem, convallis a dui quis, malesuada pretium ligula. Pellentesque mi orci, ultrices non scelerisque vel, luctus consequat felis. Proin quis dui diam. Maecenas eget pulvinar ligula.</div>
        </div>
        <div class="flex flex-row">
          <div class="flex flex-col space-y-2">
            <div class="text-primary text-xl">Cash</div>
            <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="text-primary text-xl">Dette</div>
            <div class="text-gray-500 text-md max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
          </div>
        </div>
      </div>
      <!-- marché -->

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Navigation from '@/components/NavigationDetail.vue'

export default {
  name: 'BusinessDetailView',
  components: {
    LoadingSpinner,
    Navigation,
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
