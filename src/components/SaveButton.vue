<template>
  <v-btn
    @click="$emit('save')"
    color="success"
    variant="text"
    size="small"
    icon
  >
    <v-icon>mdi-content-save</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
defineEmits<{
  save: []
}>()
</script> 