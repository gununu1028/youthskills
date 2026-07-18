import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import NewPostView from '../views/NewPostView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/posts/new', name: 'post-new', component: NewPostView },
  { path: '/posts/:id', name: 'post-detail', component: PostDetailView, props: true },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
