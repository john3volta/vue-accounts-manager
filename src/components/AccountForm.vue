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
          @save="(account) => handleSaveAccount(index, account)"
          @delete="deleteAccount(index)"
        />
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAccountsStore } from '../stores/accounts'
import AccountRow from './AccountRow.vue'

const store = useAccountsStore()

const { accounts, addAccount, updateAccount, deleteAccount, saveAccount } = store

const handleSaveAccount = (index: number, account: any) => {
  const result = saveAccount(index, account)
  alert(result.message)
}
</script>

<style scoped>
.account-form {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
