<script setup lang="ts">
import useUniqueId from '@/composables/useUniqueId'

withDefaults(defineProps<{
  options: { label: string; value: number; }[] 
  name: string
  modelValue: string | number
  vertical?: boolean
  error?: string
}>(), {
  vertical: false,
  error: ''

})

const uuid = useUniqueId().getID()
</script>

<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical
    }"
  >
    <AppRadio
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component>
  <AppErrorMessage
    v-if="error"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </AppErrorMessage>
</template>

<style scoped>
.horizontal {
  @apply mr-5;
}
</style>

