<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Справочник организаций</h1>

    <div class="mb-4 flex justify-between items-center">
      <SearchFilter />
      <button
        @click="openAddModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Добавить
      </button>
    </div>

    <Table />
    <Pagination />

    <Modal v-if="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import Table from '@/components/VTable.vue'
import Pagination from '@/components/VPagination.vue'
import Modal from '@/components/VModal.vue'
import SearchFilter from '@/components/VSearchFilter.vue'
import { storeToRefs } from 'pinia'

const store = useUsersStore()
const { isModalOpen } = storeToRefs(store)
const { openAddModal, closeModal, fetchUsers } = store

onMounted(() => {
  fetchUsers()
})
</script>
