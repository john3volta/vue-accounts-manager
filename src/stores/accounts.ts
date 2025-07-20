import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Account {
  id: string
  parsedLabels: Array<{ text: string }>
  recordType: string
  login: string
  password: string
  isSaved: boolean
}

const STORAGE_KEY = 'vue-accounts-manager'
const DEFAULT_RECORD_TYPE = 'Локальная'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const loadAccounts = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        accounts.value = JSON.parse(stored)
      }
    } catch (error) {
    }
  }

  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
    } catch (error) {
    }
  }

  const addAccount = () => {
    if (!hasUnsavedAccounts.value) {
      const newAccount: Account = {
        id: Date.now().toString(),
        parsedLabels: [],
        recordType: DEFAULT_RECORD_TYPE,
        login: '',
        password: '',
        isSaved: false
      }
      accounts.value.push(newAccount)
      saveToStorage()
    }
  }

  const updateAccount = (index: number, updatedAccount: Account) => {
    accounts.value[index] = updatedAccount
  }

  const deleteAccount = (index: number) => {
    accounts.value.splice(index, 1)
    saveToStorage()
  }

  const saveAccount = (index: number, account: Account) => {
    const existingIndex = accounts.value.findIndex(acc => 
      acc.login === account.login && 
      acc.id !== account.id && 
      acc.login.trim() !== ''
    )
    
    if (existingIndex !== -1) {
      return { success: false, message: 'Аккаунт с таким логином уже существует' }
    }
    
    accounts.value[index] = {
      ...account,
      isSaved: true
    }
    saveToStorage()
    return { success: true, message: 'Аккаунт успешно сохранен' }
  }

  const hasUnsavedAccounts = computed(() => 
    accounts.value.some(acc => !acc.isSaved)
  )

  const cancelAccountChanges = () => {
    loadAccounts()
  }

  loadAccounts()

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    saveAccount,
    cancelAccountChanges,
    hasUnsavedAccounts,
    loadAccounts
  }
})
