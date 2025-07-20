<template>
  <v-select
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    :items="recordTypes"
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

const recordTypes = ['Локальная', 'LDAP']
</script>
