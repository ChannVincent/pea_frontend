<template>
  <div>
    <div v-if="quarter_reports === null">
      LOADING
    </div>
    <div v-else>
      <div
        v-for="q in quarter_reports"
        :key="q.year + '_' + q.quarter"
      >
        <div>================</div>
        <div>{{ q.year }} - Q{{ q.quarter }}</div>
        <div>----------------</div>
        <div>{{ q.earning }}</div>
        <div>{{ q.revenue }}</div>
      </div>
    </div>
    <div v-if="yearly_reports === null">
      LOADING
    </div>
    <div v-else>
      <div
        v-for="y in yearly_reports"
        :key="y.year"
      >
        <div>================</div>
        <div>{{ y.year }}</div>
        <div>----------------</div>
        <div>{{ y.capital_expenditure }}</div>
        <div>{{ y.debt_repayment }}</div>
        <div>{{ y.depreciation_and_ammortization }}</div>
        <div>{{ y.earning }}</div>
        <div>{{ y.end_cash_position }}</div>
        <div>{{ y.free_cash_flow }}</div>
        <div>{{ y.investing_cashflow }}</div>
        <div>{{ y.net_income }}</div>
        <div>{{ y.net_other_financing_charges }}</div>
        <div>{{ y.operating_cash_flow }}</div>
        <div>{{ y.other_non_cash_items }}</div>
        <div>{{ y.purchase_of_investment }}</div>
        <div>{{ y.revenue }}</div>
        <div>{{ y.sale_of_investment }}</div>
        <div>{{ y.start_cash_position }}</div>
        <div>{{ y.stock_based_compensation }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'BusinessDetail',
  data () {
    return {
      business: null,
      quarter_reports: null,
      yearly_reports: null,
      business_pk: this.$route.params.id
    }
  },
  mounted () {
    axios
      .get(`https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/business/${this.business_pk}/`)
      .then(data => {
        this.business = data.data
        this.quarter_reports = this.business.quarter_reports
        this.yearly_reports = this.business.yearly_reports
      })
  }
}
</script>
