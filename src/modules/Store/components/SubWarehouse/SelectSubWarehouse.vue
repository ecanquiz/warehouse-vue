<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSubStore } from "@/modules/Store/stores/"
import useHttp from '@/composables/useHttp';
import { getHelpSubWarehouses } from '@/modules/Store/services/SubWarehouse';

const {
    errors,
    pending,
    getError
} = useHttp()

const subStore = useSubStore()
subStore.getSubStoreIni()
const options = ref([])

onMounted(() => {
  pending.value = true
  getHelpSubWarehouses()
    .then((response) => { 
      options.value = response.data.map(r => ({
        id: r.uuid,
        name: r.name  
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
      v-model="subStore.uuid"
      @change="subStore.handleChange"
      v-if="!pending"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option key="" value="" disabled selected>Seleccione...</option>
      <option
        v-for="option in options"
        :value="option.id"
        :selected="option.id === subStore.uuid"
      >{{ option.name }}</option>
    </select>
    <div v-else>Loading...</div>
  </div>
</template>