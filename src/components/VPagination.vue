<template>
  <div class="flex justify-center mt-4">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setCurrentPage(page)"
      :class="{
        'bg-blue-500 text-white': currentPage === page,
        'bg-gray-200': currentPage !== page,
      }"
      class="px-3 py-1 mx-1 rounded"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const store = useUsersStore()
const { currentPage, totalPages } = storeToRefs(store)
const { setCurrentPage } = store
</script>
