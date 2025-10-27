<template>
  <input
    v-model="searchQuery"
    @input="handleInput"
    placeholder="Найти по ФИО..."
    class="p-2 border rounded w-64"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const searchQuery = ref(store.searchQuery)

const handleInput = () => {
  store.setSearchQuery(searchQuery.value)
}
</script>
