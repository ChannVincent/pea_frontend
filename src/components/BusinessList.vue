<template>
  <div>
    <div v-if="business === null">
      LOADING
    </div>
    <div v-else>

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
              <router-link :to="'/detail/'+ b.pk + '/'">
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

export default {
  name: 'BusinessList',
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
        .get('https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/sync_business/')
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
