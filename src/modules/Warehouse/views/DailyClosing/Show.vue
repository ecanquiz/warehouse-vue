<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import AppPageHeader from '@/components/AppPageHeader.vue';
import useDailyClosings from '../../composables/DailyClosing/useDailyClosing';

const route = useRoute();
const router = useRouter();

const {
  dailyClosing,
  getDailyClosing,
  errors,
  pending,      
  submit    
} = useDailyClosings()

onMounted(()=> getDailyClosing(route.params.close.toString()))

type xyz = {
  date_time: string;
  article_id: number;
  int_cod: string;
  name: string;
  accumulated: number;
  quantity_input: number;
  quantity_output: number;
  quantity_reverse_input: number;
  quantity_reverse_output: number;
}

const getTotalByArticle = (article: xyz) => 
  article.accumulated + (article.quantity_input - article.quantity_reverse_input) - (article.quantity_output - article.quantity_reverse_output);
</script>

<template>
  <div>
    <AppPageHeader>Cierres Diarios / Mostrar / Artículos al "{{ route.params.close }}"</AppPageHeader>
    <div  class="flex space-x-2">
      <button
        class="btn btn-primary mb-4"
        @click="router.push({ path: '/daily-closings' })"
      >
        Ver todos
      </button>
    </div>
    <div class="demo-tab">
      

        <div class="mt-0 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Fecha de cierre</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-100 text-center">Código del Almacén</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Nombre del Almacén</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-100 text-center">Código del Artículo</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Nombre del Artículo</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-100 text-center">Stock</th>
          <th class="px-6 py-3 text-center bg-base-200 text-center">Acumulados</th>
          <th class="px-6 py-3 text-center bg-base-100 text-center">Entradas</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Salidas</th>
          <th class="px-6 py-3 text-center bg-base-100 text-center">Reversos de Entrada</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Reversos de Salida</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="(detail, index) in dailyClosing" :key="index">
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-center">
            {{detail.close}}
          </td>
          <td class="px-6 py-3 bg-base-100 text-center">
            {{detail.warehouse_code}}
          </td>
          <td class="px-6 py-3 bg-base-200 text-left">
            {{detail.warehouse_name }}
          </td>
          <td class="px-6 py-3 bg-base-100 text-center">
            {{ detail.int_cod }}
          </td>
          <td class="px-6 py-3 bg-base-200 text-left">
            {{ detail.name }}
          </td>
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-right">
            {{ getTotalByArticle(detail) }}
          </td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">
            {{detail.accumulated}}
          </td>        
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-right">
            {{detail.quantity_input}}
          </td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">
            {{detail.quantity_output}}
          </td>
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-right">
            {{detail.quantity_reverse_input}}
          </td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">
            {{detail.quantity_reverse_output}}
          </td>
        </tr>
      </tbody>
    </table>    
  </div>  


    </div>
  </div>
</template>

<style scoped>
.demo-tab {
  @apply
    border
    border-solid
    p-2.5;
}
</style>
