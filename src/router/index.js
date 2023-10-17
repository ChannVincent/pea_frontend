import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BusinessList from '../views/BusinessList.vue'
import BusinessDetail from '../views/BusinessDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todo/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'BusinessList',
      component: BusinessList
    },
    {
      path: '/business/:id',
      name: 'BusinessDetail',
      component: BusinessDetail
    }
  ]
})

export default router
