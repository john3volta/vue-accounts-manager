<template>
  <v-row>
    <v-col cols="12" sm="3">
      <LabelInput
        :model-value="labelsString"
        @update:model-value="updateLabels"
      />
    </v-col>
    <v-col cols="12" sm="2">
      <RecordTypeSelect
        :model-value="account.recordType"
        @update:model-value="updateRecordType"
      />
    </v-col>
    <v-col cols="12" sm="3">
      <ValidatedInput
        ref="loginInputRef"
        :model-value="account.login"
        field-name="login"
        placeholder="Введите логин"
        label="Логин"
        @update:model-value="updateLogin"
        @validation="handleLoginValidation"
      />
    </v-col>
    <v-col cols="12" sm="3">
      <ValidatedInput
        ref="passwordInputRef"
        v-if="account.recordType === 'Локальная'"
        :model-value="account.password"
        field-name="password"
        placeholder="Введите пароль"
        type="password"
        label="Пароль"
        @update:model-value="updatePassword"
        @validation="handlePasswordValidation"
      />
    </v-col>
    <v-col cols="12" sm="1" class="d-flex gap-2">
      <SaveButton @save="saveAccount" />
      <DeleteButton @delete="$emit('delete')" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LabelInput from './LabelInput.vue'
import RecordTypeSelect from './RecordTypeSelect.vue'
import ValidatedInput from './ValidatedInput.vue'
import DeleteButton from './DeleteButton.vue'
import SaveButton from './SaveButton.vue'

const props = defineProps<{
  account: {
    id: string
    parsedLabels: Array<{ text: string }>
    recordType: string
    login: string
    password: string
    isSaved: boolean
  }
}>()

const emit = defineEmits<{
  'update:account': [account: typeof props.account]
  'save': [account: typeof props.account]
  delete: []
}>()

const loginValid = ref(false)
const passwordValid = ref(false)

const loginInputRef = ref()
const passwordInputRef = ref()

const parseLabels = (value: string): Array<{ text: string }> => {
  if (!value.trim()) return []
  
  return value
    .split(';')
    .map(label => label.trim())
    .filter(label => label.length > 0 && label.length <= 50)
    .filter((label, index, arr) => arr.indexOf(label) === index)
    .map(text => ({ text }))
}

const labelsString = computed(() => {
  return props.account.parsedLabels.map(label => label.text).join('; ')
})

const updateField = (field: keyof typeof props.account, value: any) => {
  emit('update:account', { 
    ...props.account, 
    [field]: value, 
    isSaved: false 
  })
}

const updateLabels = (value: string) => {
  const parsedLabels = parseLabels(value)
  
  emit('update:account', { 
    ...props.account, 
    parsedLabels,
    isSaved: false
  })
}

const updateRecordType = (value: string) => updateField('recordType', value)
const updateLogin = (value: string) => updateField('login', value)
const updatePassword = (value: string) => updateField('password', value)

const handleLoginValidation = (isValid: boolean) => {
  loginValid.value = isValid
}

const handlePasswordValidation = (isValid: boolean) => {
  passwordValid.value = isValid
}

const saveAccount = () => {
  loginInputRef.value?.showErrors()
  passwordInputRef.value?.showErrors()
  
  const isLocalAccount = props.account.recordType === 'Локальная'
  const loginIsValid = loginValid.value
  const passwordIsValid = isLocalAccount ? passwordValid.value : true
  
  if (loginIsValid && passwordIsValid) {
    console.log('Сохраняем аккаунт:', props.account)
    emit('save', props.account)
  } else {
    console.log('Валидация не пройдена')
  }
}
</script>
