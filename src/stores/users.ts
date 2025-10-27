import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: {
    city: string
    street: string
    suite: string
  }
  company: {
    name: string
  }
  directorFullName: string
}

interface UsersState {
  users: User[]
  filteredUsers: User[]
  currentPage: number
  itemsPerPage: number
  sortField: keyof User | null
  sortOrder: 'asc' | 'desc' | null
  searchQuery: string
  isModalOpen: boolean
  isEditMode: boolean
  currentUser: User | null
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    filteredUsers: [],
    currentPage: 1,
    itemsPerPage: 5,
    sortField: null,
    sortOrder: null,
    searchQuery: '',
    isModalOpen: false,
    isEditMode: false,
    currentUser: null,
  }),

  getters: {
    paginatedUsers(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.filteredUsers.slice(start, end)
    },
    totalPages(state) {
      return Math.ceil(state.filteredUsers.length / state.itemsPerPage)
    },
  },

  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()

        this.users = data.map((user: User) => ({
          id: user.id,
          name: user.name,
          directorFullName: user.name,
          phone: user.phone,
          address: {
            city: user.address.city,
            street: user.address.street,
            suite: user.address.suite,
          },
          company: {
            name: user.company.name,
          },
        }))

        this.filteredUsers = [...this.users]
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.filterUsers()
    },

    setSortField(field: keyof User) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortOrder = 'asc'
      }
      this.filterUsers()
    },

    filterUsers() {
      let result = [...this.users]

      if (this.searchQuery) {
        result = result.filter((user) =>
          user.directorFullName.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }

      if (this.sortField) {
        result.sort((a, b) => {
          const aValue =
            this.sortField === 'directorFullName'
              ? a.directorFullName
              : this.sortField === 'company'
                ? a.company.name
                : ''
          const bValue =
            this.sortField === 'directorFullName'
              ? b.directorFullName
              : this.sortField === 'company'
                ? b.company.name
                : ''
          if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1
          return 0
        })
      }

      this.filteredUsers = result
      this.currentPage = 1
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    },

    openAddModal() {
      this.isEditMode = false
      this.currentUser = {
        id: Date.now(),
        name: '',
        username: '',
        email: '',
        phone: '',
        address: {
          city: '',
          street: '',
          suite: '',
        },
        company: {
          name: '',
        },
        directorFullName: '',
      }
      this.isModalOpen = true // Устанавливаем флаг открытия модального окна
    },

    openEditModal(user: User) {
      this.isEditMode = true
      this.currentUser = { ...user }
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
    },

    async addUser(user: Omit<User, 'id'> & { id: number }) {
      try {
        // Отправляем POST-запрос (симуляция)
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })

        if (response.ok) {
          // Добавляем пользователя локально после "успешного" запроса
          this.users.push(user)
          this.filterUsers()
          console.log('User added successfully (simulated).')
        } else {
          console.error('Failed to add user:', response.status)
        }
      } catch (error) {
        console.error('Error adding user:', error)
      }
    },

    async updateUser(user: User) {
      try {
        // Фейковый запрос на обновление (симуляция)
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })

        if (response.ok) {
          // Обновляем данные локально после "успешного" запроса
          const index = this.users.findIndex((u) => u.id === user.id)
          if (index !== -1) {
            this.users[index] = user
            this.filterUsers()
          }
          this.closeModal()
          console.log(`User with ID ${user.id} updated successfully (simulated).`)
        } else {
          console.error('Failed to update user:', response.status)
        }
      } catch (error) {
        console.error('Error updating user:', error)
      }
    },

    async deleteUser(id: number) {
      try {
        // Отправляем DELETE-запрос (симуляция)
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          // Удаляем запись локально
          this.users = this.users.filter((user) => user.id !== id)
          this.filterUsers()
          console.log(`User with ID ${id} deleted successfully (simulated).`)
        } else {
          console.error('Failed to delete user:', response.status)
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    },
  },
})
