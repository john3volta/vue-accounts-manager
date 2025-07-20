<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    placeholder="Введите метки"
    maxlength="50"
    variant="outlined"
    density="compact"
    hide-details
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:model-value': [value: string]
}>()
</script>
