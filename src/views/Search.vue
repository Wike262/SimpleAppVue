<template>
  <div class="search-page">
    <div class="uk-margin">
      <form @submit.prevent="submitHandle">
        <div class="uk-search uk-search-default search-form">
          <span
            class="uk-search-icon-flip"
            uk-search-icon
          />
          <input
            v-model.trim="searchValue"
            autofocus
            :class="`uk-input ${hasError ? 'uk-form-danger' : ''}`"
            type="search"
            placeholder="Search"
          >
        </div>
        <button
          class="uk-button uk-button-primary"
          :disabled="searchValue.length === 0"
        >
          Search
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import UIkit from 'uikit/dist/js/uikit.min'

@Component({ name: 'SearchPage' })
export default class Search extends Vue {
  private searchValue = ''
  private hasError = false

  @Watch('searchValue')
  private searchValueChange () {
    this.hasError = false
    UIkit.notification.closeAll()
  }

  private searchTypes = [
    {
      searchType: 'email',
      normalize: (text: string): string => {
        return text
      },
      validation: (text: string): boolean => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(text)
      }
    },
    {
      searchType: 'name',
      normalize: (text: string): string => {
        return text.replace(' ', '_')
      },
      validation: (text: string): boolean => {
        const indexOfSpace = text.indexOf(' ')
        return indexOfSpace > -1 && text.length > 3 && !/[^a-zA-Z0-9]/.test(text.replace(' ', ''))
      }
    },
    {
      searchType: 'ip',
      normalize: (text: string): string => {
        return text
      },
      validation: (text: string): boolean => {
        return (/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/).test(text)
      }
    },
    {
      searchType: 'phone',
      normalize: (text: string): string => {
        return text.replace(/\D/g, '')
      },
      validation: (text: string): boolean => {
        return /^[+]?[0-9]?[\s]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{2,4}[-\s]?[0-9]{0,2}$/im
          .test(text)
      }
    },
    {
      searchType: 'nickname',
      normalize: (text: string): string => {
        return text[0] === '@' ? text : `@${text}`
      },
      validation: (text: string): boolean => {
        return text.length > 2 && !/[^a-zA-Z0-9]/.test(text)
      }
    }
  ]

  private submitHandle (): void {
    let typeOverlap = false

    for (let i = 0; i < this.searchTypes.length; i++) {
      if (this.searchTypes[i].validation(this.searchValue)) {
        typeOverlap = true
        this.$router.push(`${this.searchTypes[i].searchType}/${this.searchTypes[i].normalize(this.searchValue)}`)
        break
      }
    }
    // If type hasn't overlap
    if (!typeOverlap) {
      this.hasError = true
      UIkit.notification({
        message: 'Parsing Error',
        status: 'danger',
        pos: 'top-center',
        timeout: 5000
      })
    }
  }
}
</script>
<style>
.search-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-form {
  width: 400px;
}
</style>
