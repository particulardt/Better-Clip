import { createRouter, createWebHistory } from 'vue-router'
import StreamerPage from '../components/StreamerPage.vue'
import ClipViewer from '../components/ClipViewer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ClipViewer
  },
  {
    path: '/:name',
    name: 'StreamerPage',
    component: StreamerPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 