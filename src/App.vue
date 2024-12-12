<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch.ts'
import { useInfiniteScroll } from '@/composables/useInfinityScroll.ts'
import { URLS } from '@/configs/urls.ts'
import { DATA_PER_PAGE } from '@/configs/configs.ts'
import CryptoTable from '@/components/CryptoTable.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import type { ApiResponse } from '@/interfaces/ApiResponse.ts'
import type { Crypto } from '@/interfaces/Crypo.ts'
import AppHeader from '@/components/AppHeader.vue'

const startFrom = ref(1)
const { fetchData } = useFetch<ApiResponse<Crypto[]>>()
const loadMore = async () => {
  const response = await fetchData(URLS.crypto, {
    query: {
      aux: 'date_added', // minimized over fetching compared to default behavior without changes
      limit: DATA_PER_PAGE,
      start: startFrom.value,
    },
  })
  startFrom.value += DATA_PER_PAGE
  return response?.data ?? []
}
const { data, loading, error } = useInfiniteScroll<Crypto>(loadMore)
</script>

<template>
  <AppHeader />
  <main class="container content">
    <div v-if="error" class="alert alert-danger fixed-top" role="alert">Error: {{ error }}</div>
    <CryptoTable v-if="data.length" :data="data" />
    <SpinnerLoader v-if="loading" />
  </main>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 900px;
}
</style>
