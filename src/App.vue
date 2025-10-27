<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Справочник организаций</h1>

    <div class="mb-4 flex justify-between items-center">
      <SearchFilter />
    </div>

    <Table />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import Table from '@/components/VTable.vue'
import SearchFilter from '@/components/VSearchFilter.vue'

const store = useUsersStore()
const {  fetchUsers } = store

onMounted(() => {
  fetchUsers()
})
</script>
