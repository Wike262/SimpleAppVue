import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

const Search = () => import('@/views/Search.vue')
const SearchResult = () => import('@/views/SearchResult.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/email/:email',
    name: 'SearchResultEmail',
    component: SearchResult
  },
  {
    path: '/phone/:phone',
    name: 'SearchResultPhone',
    component: SearchResult
  },
  {
    path: '/ip/:ip',
    name: 'SearchResultIP',
    component: SearchResult
  },
  {
    path: '/name/:name',
    name: 'SearchResultName',
    component: SearchResult
  },
  {
    path: '/nickname/:nickname',
    name: 'SearchResultNickName',
    component: SearchResult
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
