<template>
  <v-btn
    @click="$emit('delete')"
    color="error"
    variant="text"
    size="small"
    icon
  >
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
defineEmits<{
  delete: []
}>()
</script>
