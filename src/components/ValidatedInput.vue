<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="handleInput"
    @blur="handleBlur"
    :placeholder="placeholder"
    maxlength="100"
    variant="outlined"
    density="compact"
    :type="type"
    :error="hasError"
    :error-messages="errorMessage"
    required
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import * as yup from 'yup'

interface Props {
  modelValue: string
  fieldName: 'login' | 'password'
  placeholder: string
  type?: 'text' | 'password'
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  'update:model-value': [value: string]
  'validation': [isValid: boolean]
}>()

const hasError = computed(() => {
  if (props.modelValue.length >= 100) {
    return true
  }
  
  if ((shouldShowError.value || hasBeenTouched.value) && validationError.value) {
    return true
  }
  
  return false
})

const errorMessage = computed(() => {
  if (props.modelValue.length >= 100) {
    return 'Максимум 100 символов'
  }
  return shouldShowError.value ? validationError.value : ''
})

const validationError = ref('')
const shouldShowError = ref(false)
const hasBeenTouched = ref(false)

const schema = yup.object({
  [props.fieldName]: yup.string().required(`${props.label} обязателен`).max(100, 'Максимум 100 символов')
})

const handleInput = (value: string) => {
  emit('update:model-value', value)
  
  hasBeenTouched.value = true
  
  if (shouldShowError.value) {
    shouldShowError.value = false
    validationError.value = ''
  }
  
  validate()
}

const handleBlur = () => {
  hasBeenTouched.value = true
  
  if (!props.modelValue.trim() && hasBeenTouched.value) {
    shouldShowError.value = true
  }
  
  validate()
}

const validate = async () => {
  try {
    await schema.validateAt(props.fieldName, { [props.fieldName]: props.modelValue })
    validationError.value = ''
    emit('validation', true)
  } catch (error: any) {
    validationError.value = error.message
    emit('validation', false)
  }
}

const showErrors = () => {
  shouldShowError.value = true
  validate()
}

watch(() => props.modelValue, () => {
  validate()
}, { immediate: true })

onMounted(() => {
  validate()
})

defineExpose({
  showErrors
})
</script> 