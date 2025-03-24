<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStoreWarehouse } from "@/modules/Warehouse/stores/"
import useHttp from '@/core/composables/useHttp';
import { getHelpWarehouses } from '@/modules/Warehouse/services/Warehouse';

const {
    errors,
    pending,
    getError
} = useHttp()

const storeWarehouse = useStoreWarehouse()
storeWarehouse.getSubStoreIni()
const options = ref([])

onMounted(() => {
  pending.value = true
  getHelpWarehouses()
    .then((response) => { 
      options.value = response.data.map(r => ({
        id: r.uuid,
        name: `${r.code} - ${r.name}`
      }));
      errors.value = {}
    })
    .catch((err) => {        
      errors.value = getError(err)
    })
    .finally(() => {
      pending.value = false;
    })
})
</script>

<template>
  
  <div class="relative flex justify-center">
    <h1 class="text-4xl place-self-end p-3">Almacén</h1>
    <select
      v-model="storeWarehouse.uuid"
      @change="storeWarehouse.handleChange"
      v-if="!pending"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option key="" value="" disabled selected>Seleccione...</option>
      <option
        v-for="option in options"
        :value="option.id"
        :selected="option.id === storeWarehouse.uuid"
      >{{ option.name }}</option>
    </select>
    <div v-else>Loading...</div>
  </div>
</template>