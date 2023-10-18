import { createRouter, createWebHistory } from 'vue-router'
import BusinessListView from '../views/BusinessListView.vue'
import BusinessDetailView from '../views/BusinessDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BusinessListView',
      component: BusinessListView
    },
    {
      path: '/business/:id',
      name: 'BusinessDetailView',
      component: BusinessDetailView
    }
  ]
})

export default router
