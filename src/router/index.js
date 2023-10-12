import Vue from 'vue'
import Router from 'vue-router'
import BusinessList from '@/components/BusinessList'
import BusinessDetail from '@/components/BusinessDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BusinessList',
      component: BusinessList
    },
    {
      path: '/detail/:id',
      name: 'BusinessDetail',
      component: BusinessDetail
    }
  ]
})
