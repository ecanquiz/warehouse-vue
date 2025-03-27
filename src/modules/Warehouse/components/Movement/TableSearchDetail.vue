<script setup lang="ts">
//https://dev.to/razi91/vue-arrays-and-v-model-17e0
import { reactive, watch, inject} from "vue"
import useTableGrid from "@/modules/Warehouse/composables/Movement/useTableGrid"
import type { Movement, Detail } from '../../types/Movement';
import type { Article, QtyArticle } from '../../types/Article';

const { movement: { details } }: {
  movement: Movement
} = inject('movement');

const emits = defineEmits<{
  (e: 'selectArticle', article: Article): void
  (e: 'qtyArticle', qtyArticle: QtyArticle): void
}>()

const selectedArticle = reactive({})
const quantityArticle = reactive({})
  
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

const selectArticle =  async(article: Article, quantity: number = 1 ) => {
  emits("selectArticle", {
    id: article.id,
    warehouse_code: article.warehouse_code,
    warehouse_name: article.warehouse_name,
    int_cod: article.int_cod,
    name: article.name,
    quantity
  })
  quantityArticle[article.id] = !selectedArticle[article.id] === false ? 0 : quantity;
  selectedArticle[article.id] = !selectedArticle[article.id];
}

const convertToNumber = (qtyStr: string): void|number => {
  const qtyNumber = parseInt(qtyStr)
  return (!qtyNumber) ? alert("Error: Ingrese números") : qtyNumber; 
}

const setQuantity = (articleId: string): void => {
  const qtyStr: string = prompt('Por favor ingrese la cantidad') 
  const qtyNumber: void|number = convertToNumber(qtyStr)
  if (qtyNumber)
    emits("qtyArticle", { id: articleId , qty: qtyNumber })
}

watch(details as Detail[], (details: Detail[]) => {
  details.forEach((detail: Detail )=> {
    quantityArticle[detail.id] = detail.quantity
  })
}, { deep: true })
</script>

<template>
  <div class="overflow-x-auto panel">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex w-full bg-white shadow rounded">
          <input
            class=""
            type="text"
            v-model="data.search"
            @input="setSearch"
            placeholder="Buscar…"
          />
        </div>
      </div>
    </div>
      
  <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">     
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr class="bg-base-100">
          <th class="px-4 py-1">Acción(es)</th>
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('warehouses.code')">
                CÓDIGO DEL ALMACÉN
            </AppButton>
          </th>
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('warehouses.name')">
              ALMACÉN
            </AppButton>
          </th>
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('article_warehouse.int_cod')">
                CÓDIGO INTERNO
            </AppButton>
          </th>      
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('article_warehouse.name')">
              NOMBRE DEL ARTÍCULO
            </AppButton>
          </th>
          <th class="px-4 py-1">Existencia</th> 
          <th class="px-4 py-1">Min</th>
          <th class="px-4 py-1">Max</th>
          <th class="px-4 py-1">Decripción</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in data.rows" :key="index" :class="classTr(index)">
          <td class="px-4 py-1">
            <div class="flex items-center space-x-1">
              <label>Seleccionar</label>
              <input
                class="my-3"
                type="checkbox"
                v-model="selectedArticle[article.id]"
                :value="article.id"
                @click="selectArticle(article, 1)"
              />
                        
              <AppButton
                v-show="selectedArticle[article.id]"
                @click="setQuantity(article.id)"
                type="button"
                class="btn btn-primary btn-xs"
              >ModQty|{{ quantityArticle[article.id]}}</AppButton>
            </div>
          </td>
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
  <div class="hidden">{{ details }}</div>
  </div>
</template>
