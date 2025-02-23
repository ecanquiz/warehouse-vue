<script setup lang="ts">
  import AppPageHeader from "@/components/AppPageHeader.vue"
  import ExistenceTable from "@/modules/Store/components/Existence/Table.vue"
  import useExistence from "@/modules/Store/composables/Existence/useExistence"

  const { existences } = useExistence()
</script>

<template>
  <div>
    <AppPageHeader> Resumen </AppPageHeader>
    <ExistenceTable :existences="existences" />
  </div>
</template>
