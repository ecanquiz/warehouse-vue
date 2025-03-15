<script setup lang="ts">
// @ts-nocheck
import useIndex from "../../composables/ArticleWarehouse/useIndex";
import AppPaginationB from "@/components/AppPaginationB.vue";
import AppPageHeader from "@/components/AppPageHeader.vue"
import AppBtn from "@/components/AppBtn.vue"

const {
  errors,
  data,
  router,

  deleteRow,
  setSearch,
  setSort  
} = useIndex()
</script>

<template>
<div>
  <AppPageHeader> Artículos por almacén </AppPageHeader>

  <div class="flex space-x-2">
    <AppLink class="btn btn-primary" to="/article-warehouse/create">
      <span>Crear</span>
    </AppLink>
  </div>
    
  <div class="overflow-hidden panel mt-6">      
    <div class="mb-6 flex justify-between items-center">
      <div class="flex items-center">
        <div class="flex w-full bg-white shadow rounded">
          <input
            class=""
            type="text"
            v-model="data.search"
            @input="setSearch"
            placeholder="Filtrar…"
          />
        </div>
      </div>
    </div>      
    <div class="table-data__wrapper">
      <table class="table-data">
        <thead>
          <tr class="">
            <th class="">
              <AppLink to="#" @click.prevent="setSort('article_warehouse.int_cod')">CÓDIGO</AppLink>
            </th>
            <th class="">
              <AppLink to="#" @click.prevent="setSort('warehouses.name')">ALMACÉN</AppLink>
            </th>
            <th class="">
              <AppLink to="#" @click.prevent="setSort('article_warehouse.name')">ARTÍCULO</AppLink>
            </th>
            <th class="px-4 py-1">Existencia</th> 
            <th class="px-4 py-1">Min</th>
            <th class="px-4 py-1">Max</th>
            <th class="px-4 py-1">Decripción</th>                     
            <th class="">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
            <td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ name: 'article-warehouseEdit', params: { id: row.id }}"
              >
                {{ row.warehouse_code }}-{{ row.int_cod }}
              </AppLink>
            </td>
            <td class="">
              {{ row.warehouse_name }}
            </td>
            <td class="">
              {{ row.name }}
            </td>
            <td class="">
              {{ row.stock_existence }}
            </td>
            <td class="">
              {{ row.stock_min }}
            </td>
            <td class="">
              {{ row.stock_max }}
            </td>
            <td class="">
              {{ row.description }}
            </td>
            <td class="">
              <div class="flex items-center space-x-1">                
                <AppBtn
                  class="btn btn-primary btn-xs"                    
                  @click="router.push({ path: '/article-warehouse/edit/'+row.id })"
                >
                  Editar
                </AppBtn>
                <AppBtn
                  @click="deleteRow(row.id)"                    
                  class="btn btn-danger btn-xs"                    
                >
                  Eliminar
                </AppBtn>
              </div>
            </td>
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Artículos por almacén no encontrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <AppPaginationB v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
