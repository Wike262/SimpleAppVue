<template>
  <div class="result-search-page">
      <div v-if="loading">
        <p>Идет загрузка...</p>
      </div>
      <template
        v-else
        v-for="dataItem in searchResult"
      >
        <div
          class="uk-card uk-card-default uk-card-body custom-card"
          :key="dataItem.id"
        >
          <h3 class="uk-card-title custom-card-title">{{ dataItem.title }}</h3>
          <p class="custom-card-body"> {{ dataItem.body }}</p>
        </div>
      </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RootActions from '@/store/actions'
import { Data } from '@/types'

@Component({ name: 'SearchResultPage' })
export default class SearchResult extends Vue {
  private loading = true

  private get params () {
    return this.$route.params
  }

  private get searchResult (): Data[] {
    return this.$store.getters.data
  }

  protected async mounted (): Promise<void> {
    await this.$store.dispatch(RootActions.FETCH_DATA, this.params)
    this.loading = false
  }
}
</script>
<style>
.result-search-page {
  margin: 20px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.custom-card {
  height: 180px;
  width: 350px;
  margin: 20px 10px;
}
.custom-card-title {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
  text-overflow: ellipsis;
}
.custom-card-body {
  width: 200px;
  height: 70px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
