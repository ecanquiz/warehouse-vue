<script setup lang="ts">
//https://dev.to/razi91/vue-arrays-and-v-model-17e0
import { reactive, watch, inject} from "vue"
import useTableGrid from "@/modules/Warehouse/composables/Movement/useTableGrid"
import AppPaginationC from "@/components/AppPaginationC.vue";
//import IconCamera from "@/components/icons/menu/icon-products.vue"
//import type { ArticleDetail } from "@/modules/Article/types/Article/ArticleDetail";

const { movement: { details } }: {
  movement: any //Movement
} = inject('movement');

const emits = defineEmits<{
  (e: 'selectPresentation', article_detailId: object): void
  (e: 'qtyPresentation', article_detailId: object): void
}>()

const selectedPresentation = reactive([])
const quantityPresentation = reactive([])
  
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

const classTr = (index) => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}

const selectPresentation =  async(presentation: any, quantity: number=1 ) => {
  emits("selectPresentation", {
    id: presentation.id,
    int_cod: presentation.int_cod,
    name: presentation.name,
    warehouse_code: presentation.warehouse_code,
    warehouse_name: presentation.warehouse_name,
    quantity
  })
  quantityPresentation.values[presentation.id] = quantity;
  selectedPresentation[presentation.id] = !selectedPresentation[presentation.id];
}

const convertToNumber = (qtyStr: string): void|number => {
  const qtyNumber = parseInt(qtyStr)
  return (!qtyNumber) ? alert("Error: Ingrese números") : qtyNumber; 
}

const setQuantity = (presentationId): void => {
  const qtyStr: string = prompt('Por favor ingrese la cantidad') 
  const qtyNumber: void|number = convertToNumber(qtyStr)
  if (qtyNumber)
    emits("qtyPresentation", { id: presentationId , qty: qtyNumber })
}

watch(details, (details) => {
  details.forEach((sp)=> {
    quantityPresentation.values[sp.id] = sp.quantity
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
          <!--th class="px-4 py-1">Imagen</th-->
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
        <tr v-for="(presentation, index) in data.rows" :key="index" :class="classTr(index)">
          <td class="px-4 py-1">
            <div class="flex items-center space-x-1">
              <label>Seleccionar</label>      
              <input
                class="my-3"
                type="checkbox"
                v-model="selectedPresentation[presentation.id]"
                :value="presentation.id"
                @click="selectPresentation(presentation, 1)"
              />
                        
              <AppBtn
                v-show="selectedPresentation[presentation.id]"
                @click="setQuantity(presentation.id)"
                type="button"
                class="btn btn-primary btn-xs"
              >ModQty|{{ quantityPresentation.values[presentation.id]}}</AppBtn>
            </div>
          </td>
          <!--td class="px-4 py-1">
            <img
              v-if="presentation.photo_path"
              class="m-auto hover:cursor-pointer w-7 h-7"
              :src=imgPath(presentation)              
            />
            <IconCamera
              v-else
              class="w-7 h-7 m-auto fill-current hover:cursor-pointer"              
            />
          </td-->
          <td class="px-4 py-1 text-center">{{presentation.warehouse_code}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.warehouse_name}}</td>
          <td class="px-4 py-1 text-center">{{presentation.int_cod}}</td>
          <td class="px-4 py-1 text-justify">{{presentation.name}}</td>
          <td class="px-4 py-1 text-right">{{presentation.stock_existence}}</td>
          <td class="px-4 py-1 text-right">{{presentation.stock_min}}</td>
          <td class="px-4 py-1 text-right">{{presentation.stock_max}}</td>
          <td class="px-4 py-1 text-left">{{presentation.description}}</td>
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
