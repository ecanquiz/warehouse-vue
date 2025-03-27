<script setup lang="ts">

type PreDailyClosing = {
  date_time: string;
  article_id: number;
  warehouse_code: string;
  warehouse_name: string;
  int_cod: string;
  name: string;
  quantity_input: number;
  quantity_output: number;
  quantity_reverse_input: number;
  quantity_reverse_output: number;
}

const props = defineProps<{
    preDailyClosings: PreDailyClosing[]
}>()

const getTotalByArticle = article =>  (article.quantity_input - article.quantity_reverse_input) - (article.quantity_output - article.quantity_reverse_output);

</script>

<template>
  <h1>Pre Cierre Diario</h1>

  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Fecha de cierre</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-100 text-center">Código del Almacén</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Nombre del Almacén</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-100 text-center">Código del Artículo</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Nombre del Artículo</th>
          <th class="px-6 py-3 text-center bg-base-100 text-center">Entradas</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Salidas</th>
          <th class="px-6 py-3 text-center bg-base-100 text-center">Reversos de Entrada</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-200 text-center">Reversos de Entrada</th>
          <th class="px-6 py-3 bg-gray-50 bg-base-100 text-center">Total</th>
        </tr>
      </thead>
      <tbody>      
        <tr v-for="(detail, index) in preDailyClosings" :key="index">
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-center">{{detail.date_time.split(' ')[0]}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-center">{{ detail.warehouse_code }}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-left">{{ detail.warehouse_name }}</td>   
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-center">{{ detail.int_cod }}</td>   
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-left">{{ detail.name }}</td>        
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-right">{{detail.quantity_input}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">{{detail.quantity_output}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-right">{{detail.quantity_reverse_input}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-200 text-right">{{detail.quantity_reverse_output}}</td>
          <td class="px-6 py-3 bg-gray-50 bg-base-100 text-right">{{ getTotalByArticle(detail) }}</td>
        </tr>
      </tbody>
    </table>    
  </div>  
</template>