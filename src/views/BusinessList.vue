<template>
  <div>
    <div v-if="business === null">
      LOADING
    </div>
    <div clas="flex flex-col items-center" v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mx-5 max-w-5xl self-centers">
        <div 
          v-for="b in business.businesses"
          :key="b.pk"
        >
            <BusinessCard 
              :title="b.name"
              :subtitle="b.symbol"
            />
        </div>
      </div>

      <button style="margin:10px; padding:5px; width: 300px;" @click="syncAllBusinesses()">
        synchronise all businesses
      </button>
      <table style="margin: auto; margin-top:10px;">
        <thead>
          <tr>
            <th style="width:400px">Business</th>
            <th style="width:100px">Updated</th>
            <th style="width:100px">Date</th>
            <th style="width:100px">Synchronise</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in business.businesses"
            :key="b.pk"
          >
            <td>
              <router-link :to="'/business/'+ b.pk + '/'">
                {{ b.name }} [{{ b.symbol }}]
              </router-link>
            </td>
            <td :style="b.is_updated ? 'background-color:green' : 'background-color:red'"></td>
            <td>{{ b.updated }}</td>
            <td>
              <button @click="syncBusiness(b.pk)">
                synchronise
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
      >
      </div>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import BusinessCard from '@/components/BusinessCard.vue'

export default {
  name: 'BusinessList',
  components: {
    BusinessCard,
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
    businesses () {
      axios
        .get('https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/business/')
        .then(data => { this.business = data.data })
    },
    syncAllBusinesses () {
      this.business = null
      axios
        .get('https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/integration/sync_business/')
        .then(data => {
          this.status = data.status
          this.businesses()
        })
    },
    syncBusiness (businessId) {
      this.business = null
      axios
        .get(`https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/integration/sync_business/${businessId}`)
        .then(data => {
          this.status = data.status
          this.businesses()
        })
    }
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
