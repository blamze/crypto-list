<script setup lang="ts">
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import type { Crypto } from '@/interfaces/Crypo.ts'

defineProps<{
  data: Crypto[]
}>()
</script>

<template>
  <table class="table align-middle table-striped table-hover align-right table-size">
    <thead>
      <tr>
        <th class="first-column" scope="col"></th>
        <th scope="col">Name</th>
        <th class="desktop-only" scope="col">Market price</th>
        <th class="desktop-only" scope="col">24h volume</th>
        <th scope="col">Change</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="crypto in data" :key="crypto.id">
        <th scope="row" class="first-column">
          <img
            class="icon"
            :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`"
            :alt="crypto.name"
          />
        </th>
        <th scope="row">
          {{ crypto.name }}
        </th>
        <th class="desktop-only" scope="row">{{ crypto.quote.USD.price.toFixed(2) }} USD</th>
        <th class="desktop-only" scope="row">{{ crypto.quote.USD.volume_24h.toFixed() }}</th>
        <th scope="row">
          <div class="center">
            <span> {{ crypto.quote.USD.volume_change_24h.toFixed(1) }} </span>
            <IconArrowUp v-if="crypto.quote.USD.volume_change_24h >= 0" class="icon-size success" />
            <IconArrowDown v-else class="icon-size failure" />
          </div>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.align-right {
  text-align: right;
}

.icon {
  width: 64px;
  height: 64px;
}

.desktop-only {
  display: none;
  @media (min-width: 1024px) {
    display: table-cell;
  }
}

.first-column {
  width: 80px;
}

.table-size {
  table-layout: fixed;
  border-collapse: collapse;
  @media (min-width: 1024px) {
    thead th:nth-child(2),
    thead th:nth-child(3),
    thead th:nth-child(4) {
      width: 25%;
    }
  }
}

.icon-size {
  width: 24px;
  height: 24px;
}

.success {
  color: green;
}

.failure {
  color: red;
}

.center {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
