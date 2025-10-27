<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div id="crud-modal" class="flex justify-center items-center w-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ isEditMode ? 'Редактировать организацию' : 'Добавить организацию' }}
            </h3>
            <button
              @click="closeModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Закрыть</span>
            </button>
          </div>
          <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Наименование организации
                </label>
                <input
                  v-model="form.company.name"
                  type="text"
                  name="company"
                  id="company"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder='ООО "Скат Холдинг"'
                  required="true"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ФИО директора
                </label>
                <input
                  v-model="form.directorFullName"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Труман Марина Васильевна"
                  required="true"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Телефон
                </label>
                <input
                  v-model="form.phone"
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="493-170-9623 x156"
                  required="true"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="city"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Город
                </label>
                <input
                  v-model="form.address.city"
                  type="text"
                  name="city"
                  id="city"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Будапешт"
                  required="true"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="street"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Улица
                </label>
                <input
                  v-model="form.address.street"
                  type="text"
                  name="street"
                  id="street"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Мира"
                  required="true"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="suite"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Дом
                </label>
                <input
                  v-model="form.address.suite"
                  type="text"
                  name="suite"
                  id="suite"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="99"
                  required="true"
                />
              </div>
            </div>
            <button
              @click="handleSubmit"
              data-modal-hide="static-modal"
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Сохранить
            </button>
            <button
              @click="closeModal"
              data-modal-hide="static-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Отменить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const { isEditMode, currentUser, closeModal, addUser, updateUser } = store

const form = ref({
  id: currentUser?.id || Date.now(),
  name: currentUser?.directorFullName || '',
  username: currentUser?.username || '',
  email: currentUser?.email || '',
  phone: currentUser?.phone || '',
  address: {
    city: currentUser?.address.city || '',
    street: currentUser?.address.street || '',
    suite: currentUser?.address.suite || '',
  },
  company: {
    name: currentUser?.company.name || '',
  },
  directorFullName: currentUser?.directorFullName || '',
})

const isFormValid = computed(() => {
  return (
    form.value.company.name &&
    form.value.directorFullName &&
    form.value.phone &&
    form.value.address.city &&
    form.value.address.street &&
    form.value.address.suite
  )
})

const handleSubmit = () => {
  if (!isFormValid.value) return

  if (isEditMode && currentUser) {
    updateUser({ ...form.value, id: currentUser.id })
  } else {
    addUser(form.value)
  }
}
</script>
