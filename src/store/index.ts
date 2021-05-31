import Vue from 'vue'
import Vuex from 'vuex'
import Actions from './actions'
import Constants from './constants'
import { Data, RootStore } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store<RootStore>({
  state: {
    data: []
  },
  mutations: {
    [Constants.SET_DATA] (state, fetchedData: Data[]) {
      state.data = fetchedData
    }
  },
  getters: {
    data: state => {
      return state.data
    }
  },
  actions: {
    async [Actions.FETCH_DATA] (store, payload) {
      try {
        const result = await fetch('https://jsonplaceholder.typicode.com/posts?' + new URLSearchParams(payload))
        const fetchedData = await result.json()
        store.commit(Constants.SET_DATA, fetchedData)
      } catch (error) {
        console.error(error)
      }
    },
    async [Actions.FETCH_DATA_BY_EMAIL] (store, payload) {
      await store.dispatch(Actions.FETCH_DATA, payload)
    },
    async [Actions.FETCH_DATA_BY_IP] (store, payload) {
      await store.dispatch(Actions.FETCH_DATA, payload)
    },
    async [Actions.FETCH_DATA_BY_NAME] (store, payload) {
      await store.dispatch(Actions.FETCH_DATA, payload)
    },
    async [Actions.FETCH_DATA_BY_NICKNAME] (store, payload) {
      await store.dispatch(Actions.FETCH_DATA, payload)
    },
    async [Actions.FETCH_DATA_BY_PHONE] (store, payload) {
      await store.dispatch(Actions.FETCH_DATA, payload)
    }
  }
})
