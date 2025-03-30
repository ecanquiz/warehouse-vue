<script setup lang="ts">
import { reactive} from "vue"
import useTableGrid from "../composables/useTableGrid"
import type { Movement, Detail } from '../../../types/Movement';
import type { Article, QtyArticle } from '../../../types/Article';

const details = reactive([])

const emits = defineEmits<{
  (e: 'selectArticle'
  //, article: Article
  ): void
}>()

const selectedArticle = reactive({})
  
const data = reactive({
  rows: [],
  page: "1",
  search: "",
  sort: "",
  direction: "",
  links: [],
  categories: [],
  articleIds: []
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
  emits("selectArticle",/* {
    id: article.id,
    warehouse_code: article.warehouse_code,
    warehouse_name: article.warehouse_name,
    int_cod: article.int_cod,
    name: article.name,
    quantity
  }*/)
  selectedArticle[article.id] = !selectedArticle[article.id];
}
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
              @click.prevent="setSort('warehouses.name')">
              CÓDIGO
            </AppButton>
          </th>
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('article_warehouse.int_cod')">
              ARTÍCULO
            </AppButton>
          </th>      
          <th class="px-4 py-1">
            <AppButton
              class="bg-base-100 hover:text-gray-500"
              @click.prevent="setSort('article_warehouse.name')">
              DECRIPCIÓN
            </AppButton>
          </th>
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
            </div>
          </td>
          <td class="px-4 py-1 text-justify">{{article.int_cod}}</td>
          <td class="px-4 py-1 text-justify">{{article.name}}</td>
          <td class="px-4 py-1 text-justify">{{article.description}}</td>
        </tr>
        <tr v-if="data.rows.length === 0">
            <td class="px-4 py-1 text-justify" colspan="4">Artículos no encontrados.</td>
          </tr>
      </tbody>
    </table>
  </div>
  <AppPaginationComponent
    v-if="data.links"
    :links="data.links"
    @getSearch="getSearch"
  />
  <div class="hidden">{{ details }}</div>
  </div>
</template>

