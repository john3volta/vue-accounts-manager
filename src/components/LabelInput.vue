<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="handleInput"
    placeholder="Введите метки"
    maxlength="50"
    variant="outlined"
    density="compact"
    :error="hasError"
    :error-messages="errorMessage"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:model-value': [value: string]
}>()

const hasError = computed(() => {
  return props.modelValue.length >= 50
})

const errorMessage = computed(() => {
  return hasError.value ? 'Максимум 50 символов' : ''
})

const handleInput = (value: string) => {
  emit('update:model-value', value)
}
</script>
