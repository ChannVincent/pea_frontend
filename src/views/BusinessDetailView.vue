<template>
  <div>
    <Navigation :title="business_name()" />
    <div 
      v-if="business === null"
      class="flex flex-col items-center pt-20"
    >
      <LoadingSpinner size="xxl" />
    </div>
    <div 
      v-else
      class="max-w-7xl m-auto my-10 space-y-20 p-4"
    >
      <!-- revenus -->
      <div class="flex flex-col items-center space-y-10">
        <div class="space-y-4">
          <div class="text-primary text-3xl text-center">Revenus</div>
              <div class="text-primary text-lg text-center">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
              </div>
          <div class="text-gray-500 text-md max-w-2xl text-center" v-html="global_revenue_interpretation()"></div>
        </div>
        <div class="flex flex-row space-x-10">
          <div class="flex flex-col space-y-2 w-1/3">
            <div>
              <div class="text-primary text-xl">
                Chiffre d'Affaire
              </div>
            </div>
            <div class="text-gray-500 text-xl">{{ price(revenue()) }}</div>
            <div class="flex flex-col">
              <div class="text-gray-500 text-md">{{ revenue_definition() }}</div>
              <div class="text-gray-500 text-md" v-html="revenue_trend()"></div>
            </div>
          </div>
          <div class="flex flex-col space-y-2 w-1/3">
            <div>
              <div class="text-primary text-xl">
                Bénéfices d'exploitation
              </div>
            </div>
            <div class="text-gray-500 text-xl">{{ price(operating_cash_flow()) }}</div>
            <div class="text-gray-500 text-md">{{ operating_cash_flow_percent() }}</div>
            <div class="text-gray-500 text-md">{{ operating_cash_flow_definition() }}</div>
            <div class="text-gray-500 text-md" v-html="operating_cash_flow_trend()"></div>
          </div>
          <div class="flex flex-col space-y-2 w-1/3">
            <div>
              <div class="text-primary text-xl">
                Bénéfices nets
              </div>
            </div>
            <div class="text-gray-500 text-xl">{{ price(earnings()) }}</div>
            <div class="text-gray-500 text-md">{{ earnings_percent() }}</div>
            <div class="text-gray-500 text-md">{{ earnings_definition() }}</div>
            <div class="text-gray-500 text-md" v-html="earnings_trend()"></div>
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
            <div class="text-gray-500 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="text-primary text-xl">Dette</div>
            <div class="text-gray-500 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu justo euismod, viverra est at, sagittis magna.</div>
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
      business_ratios: null,
      business_ratio: null
    }
  },
  mounted() {
    axios
      .get(`https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/api/business/${this.business_pk}/`)
      .then(data => {
        console.log(data)
        this.business = data.data.business
        this.business_ratios = data.data.business_ratios
        this.business_ratio = data.data.business.business_ratio
      })
  },
  methods: {
    business_name() {
      return this.business ? this.business.name : ''
    },
    business_industry() {
      return this.business ? this.business.business_info.industry : ''
    }, 
    price(price) {
      if (price < 1000) {
        return `${price} Millions €`
      }
      price = parseInt(price / 1000)
      return `${price} Milliards €`
    },
    
    global_revenue_interpretation() {
      return `<p>Total des revenus en croissance année après année.</p><p>Activité avec des marges élevées (${this.operating_cash_flow_percent()}) qui indiquent un avantage concurrentiel fort et une capacité à imposer ses prix.</p><p>Des marges élevées permettent de faire face aux variations dût à l'inflation.</p>`
    },

    revenue() {
      return this.business_ratio.revenue
    },
    revenue_definition() {
      return "Total des revenus sur une année."
    },
    revenue_trend() {
      // TODO backend
      return "En <u>croissance</u> sur les dernières années."
    },

    operating_cash_flow() {
      return this.business_ratio.operating_cash_flow
    },
    operating_cash_flow_percent() {
      return `${parseInt(this.operating_cash_flow() * 100 / this.revenue())}% de marge opérationnelle`
    },
    operating_cash_flow_definition() {
      return `Bénéfices issue uniquement de l'activité de ${this.business_name()}. Sans prendre en compte impôts et revenus exceptionnels.`
    },
    operating_cash_flow_trend() {
      // TODO backend
      return `Marge opérationnelles comfortable et stable sur les dernières années.`
    },

    earnings() {
      return this.business_ratio.earnings
    },
    earnings_percent() {
      return `${parseInt(this.earnings() * 100 / this.revenue())}% de marge net`
    },
    earnings_definition() {
      return `Bénéfices total en prenant en compte l'activité, revenus exceptionnels (ex: achat concurrent) et impôts.`
    },
    earnings_trend() {
      return `Bénéfices comfortable et stable sur les dernières années.`
    },
    
    debt() {
      return this.business_ratio.debt
    },
    cash_position() {
      return this.business_ratio.cash_position
    },
  }
}
</script>
