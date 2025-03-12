<script setup lang="ts">
import {ref, reactive} from 'vue'

// import FormPresentation from './FormPresentation.vue'
//import useTabeArticleWarehouse from '../../composables/Warehouse/useTableArticleWarehouse'
import useTableGrid from "@/modules/Warehouse/composables/Warehouse/useTableGrid"
//import TableArticleWarehouse from './TableArticleWarehouse.vue'
import AppPaginationC from "@/components/AppPaginationC.vue";

const componentKey = ref(0);

const props = defineProps<{ id?: string }>()

/*const {
  panelOpened,
  closeButtonOpened,
  closeClassOpened,  
  presentations,
  presentation,
  saleTypeOptions,
  statusOptions,

  edit,
  getPresentations,
  remove,  
  submit,
  togglePanel
  article_details
} = useTabeArticleWarehouse(props.id)*/


const data = reactive({
  rows: [],
  page: "1",
  search: "",
  sort: "",
  direction: "",
  links: []  
})

const {
  getSearch,
  setSearch,
  setSort, 
} = useTableGrid(data)

const classTr = (index: number): string => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}
</script>

<template>
  <div class="demo-tab ">

  <div class="panel mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">
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
  </div>
</template>