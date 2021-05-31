<template>
  <div class="search-page">
    <div class="uk-margin">
      <form
        class="uk-search uk-search-default search-form"
        @submit.prevent="submitHandle"
      >
        <span
          class="uk-search-icon-flip"
          uk-search-icon
        />
        <input
          v-model.trim="searchValue"
          class="uk-search-input"
          type="search"
          placeholder="Search"
        >
      </form>
      <button
        class="uk-button uk-button-default"
        @click="submitHandle"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'SearchPage' })
export default class Search extends Vue {
  private searchValue = ''

  private submitHandle (): void {
    const indexOfEmailSign = this.searchValue.indexOf('@')
    // Zero because nickname can start on "@"

    let value = this.searchValue
    if (indexOfEmailSign > 0) {
      this.$router.push(`email/${value}`)
      return
    }

    const nameCheck = !/[^a-zA-Z0-9]/.test(this.searchValue.split(' ').join(' '))
    if (indexOfEmailSign === 0 || nameCheck) {
      if (indexOfEmailSign !== 0) {
        value = '@' + value
      }
      this.$router.push(`nickname/${value}`)
      return
    }

    const indexOfSpace = this.searchValue.indexOf(' ')
    if (nameCheck && indexOfSpace > -1) {
      this.$router.push(`full-name/${value}`)
      return
    }

    const IPCheck = (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/).test(this.searchValue)
    if (IPCheck) {
      this.$router.push(`ip/${value}`)
      return
    }

    const phoneCheck = /^[+]?[0-9]?[\s]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{2,4}[-\s]?[0-9]{0,2}$/im
      .test(this.searchValue)
    if (phoneCheck) {
      value = value
        .replace(/\D/g, '')
      this.$router.push(`phone/${value}`)
      return undefined
    }
  }
}
</script>
<style>
.search-page {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-form {
  width: 400px;
}
</style>
