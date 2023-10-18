<template>
  <div>
    <div 
      v-if="business === null"
      class="flex flex-col items-center pt-20"
    >
      <LoadingSpinner size="xxl" />
    </div>
    <div v-else>
      <div class="max-w-7xl m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 mx-5">
          <div 
            v-for="b in business.businesses"
            :key="b.pk"
          >
            <BusinessCard 
              :business="b"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BusinessCard from '@/components/BusinessCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'BusinessListView',
  components: {
    BusinessCard,
    LoadingSpinner,
  },
  data () {
    return {
      business: null,
      status: null // unused
    }
  },
  mounted () {
    this.businesses()
  },
  methods: {
    businesses() {
      axios
        .get('https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/api/business/')
        .then(data => { this.business = data.data })
    },
    pushBusiness(business) {
      this.$router.push('/business/' + business.pk)
    },
    syncAllBusinesses() {
      this.business = null
      axios
        .get('https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/integration/sync_business/')
        .then(data => {
          this.status = data.status
          this.businesses()
        })
    },
  }
}
</script>
<style scoped>
table,
td {
  border: 1px solid #333;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}
</style>
