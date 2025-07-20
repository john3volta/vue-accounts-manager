<template>
  <v-card class="account-form">
    <v-card-title class="d-flex align-center justify-space-between">
      <h1>Учетные записи</h1>
      <v-btn
        color="primary"
        @click="addAccount"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-alert
        type="info"
        variant="tonal"
        class="mb-4"
      >
        <template #prepend>
          <v-icon>mdi-help-circle</v-icon>
        </template>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </v-alert>

      <v-row class="mb-2 pl-4">
        <v-col cols="12" sm="3">
          Метки
        </v-col>
        <v-col cols="12" sm="2">
          Тип записи
        </v-col>
        <v-col cols="12" sm="3">
          Логин
        </v-col>
        <v-col cols="12" sm="3">
          Пароль
        </v-col>
      </v-row>

      <v-container class="pl-4">
        <AccountRow
          v-for="(account, index) in accounts"
          :key="account.id"
          :account="account"
          @update:account="updateAccount(index, $event)"
          @save="(account) => saveAccount(index, account)"
          @delete="deleteAccount(index)"
        />
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AccountRow from './AccountRow.vue'

interface Account {
  id: string
  parsedLabels: Array<{ text: string }>
  recordType: string
  login: string
  password: string
  isSaved: boolean
}

const accounts = ref<Account[]>([])

const hasUnsavedAccounts = computed(() => 
  accounts.value.some(acc => !acc.isSaved)
)

const addAccount = () => {
  if (!hasUnsavedAccounts.value) {
    accounts.value.push({
      id: Date.now().toString(),
      parsedLabels: [],
      recordType: 'Локальная',
      login: '',
      password: '',
      isSaved: false
    })
  }
}

const updateAccount = (index: number, updatedAccount: Account) => {
  accounts.value[index] = updatedAccount
}

const deleteAccount = (index: number) => {
  accounts.value.splice(index, 1)
}

const saveAccount = (index: number, account: Account) => {
  accounts.value[index] = {
    ...account,
    isSaved: true
  }
  console.log('Аккаунт сохранен:', account.login)
}
</script>

<style scoped>
.account-form {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
