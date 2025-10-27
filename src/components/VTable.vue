<template>
  <table class="min-w-full bg-white border">
    <thead>
      <tr>
        <th
          @click="setSortField('company')"
          class="py-2 px-4 border cursor-pointer hover:bg-gray-100"
        >
          Название {{ sortField === 'company' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
        </th>
        <th
          @click="setSortField('directorFullName')"
          class="py-2 px-4 border cursor-pointer hover:bg-gray-100"
        >
          ФИО директора
          {{ sortField === 'directorFullName' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
        </th>
        <th class="py-2 px-4 border">Телефон</th>
        <th class="py-2 px-4 border">Адрес</th>
        <th class="py-2 px-4 border">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in paginatedUsers"
        :key="user.id"
        class="hover:bg-gray-50 cursor-pointer"
      >
        <td class="py-2 px-4 border">{{ user.company.name }}</td>
        <td class="py-2 px-4 border">{{ user.directorFullName }}</td>
        <td class="py-2 px-4 border">{{ user.phone }}</td>
        <td class="py-2 px-4 border">
          {{ user.address.city }}, {{ user.address.street }}, {{ user.address.suite }}
        </td>
        <td class="py-2 px-4 border">
          <button @click.stop="deleteUser(user.id)" class="text-red-500 hover:text-red-700">
            ❌
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

const store = useUsersStore()

// Используем storeToRefs для реактивности
const { paginatedUsers, sortField, sortOrder } = storeToRefs(store)
const { setSortField, deleteUser } = store
</script>
