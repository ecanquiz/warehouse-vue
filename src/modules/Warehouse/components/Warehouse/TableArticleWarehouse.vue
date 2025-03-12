<script setup lang="ts">
//import IconCamera from "@/components/icons/IconCamera.vue"
import type { ArticleWarehouse } from "../../types/Warehouse/ArticleWarehouse";
import AppPaginationC from "@/components/AppPaginationC.vue";

const props = defineProps<{ data: any[] }>()

const classTr = (index: number): string => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}
</script>

<template>
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-base text-gray-700 capitalize dark:text-gray-400">
        <tr class="bg-base-100">
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('warehouses.code')">
                CÓDIGO DEL ALMACÉN
            </AppBtn>
          </th>
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('warehouses.name')">
              ALMACÉN
            </AppBtn>
          </th>
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('article_warehouse.int_cod')">
                CÓDIGO INTERNO
            </AppBtn>
          </th>      
          <th class="px-4 py-1">
            <AppBtn
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('article_warehouse.name')">
              NOMBRE DEL ARTÍCULO
            </AppBtn>
          </th>
          <th class="px-4 py-1">Existencia</th> 
          <th class="px-4 py-1">Min</th>
          <th class="px-4 py-1">Max</th>
          <th class="px-4 py-1">Decripción</th>

        </tr>
      </thead>
      <tbody>      
        <tr v-for="(article, index) in data.rows" :key="index" :class="classTr(index)">          
          <td class="px-4 py-1 text-center">{{article.warehouse_code}}</td>
          <td class="px-4 py-1 text-justify">{{article.warehouse_name}}</td>
          <td class="px-4 py-1 text-center">{{article.int_cod}}</td>
          <td class="px-4 py-1 text-justify">{{article.name}}</td>
          <td class="px-4 py-1 text-right">{{article.stock_existence}}</td>
          <td class="px-4 py-1 text-right">{{article.stock_min}}</td>
          <td class="px-4 py-1 text-right">{{article.stock_max}}</td>
          <td class="px-4 py-1 text-left">{{article.description}}</td>
        </tr>
      </tbody>
    </table>    
  </div>
  <AppPaginationC
    v-if="data.links"
    :links="data.links"
    @getSearch="getSearch"
  />
</template>
