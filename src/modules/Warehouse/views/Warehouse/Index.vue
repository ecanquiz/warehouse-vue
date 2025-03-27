<script setup lang="ts">
// @ts-nocheck
import useIndex from "../../composables/Warehouse/useIndex";

const {
  errors,
  data,
  router,

  deleteRow,
  setSearch,
  setSort  
} = useIndex()


const toString = (arr) => {
  return arr ? JSON.parse(arr).toString().replace(/,/g, ", ") : '';
}
</script>

<template>
<div>
  <AppPageHeader> Almacenes </AppPageHeader>

  <div class="flex space-x-2">
    <AppLink class="btn btn-primary" to="/warehouses/create">
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
            
              <!--th class="">
                <AppLink to="#" @click.prevent="setSort('id')">id</AppLink>
              </th-->
              <!--th class="">
                <AppLink to="#" @click.prevent="setSort('uuid')">uuid</AppLink>
              </th-->
              <th class="">
                <AppLink to="#" @click.prevent="setSort('code')">code</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('name')">name</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('description')">description</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('categories')">categorías</AppLink>
              </th>
                                     
            <th class="">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
             <!--td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ name: 'warehouseEdit', params: { id: row.id }}"
              >
                {{ row.id }}
              </AppLink>
            </td-->
            <!--td class="">
              {{ row.uuid }}
            </td-->
            <td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ name: 'warehouseEdit', params: { id: row.id }}"
              >
                {{ row.code }}
              </AppLink>
            </td>
            <td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ name: 'warehouseEdit', params: { id: row.id }}"
              >
                {{ row.name }}
              </AppLink>
            </td>
            <td class="">
              {{ row.description }}
            </td>
            <td class="">
              {{ toString(row.categories) }}
            </td>
            <td class="">
              <div class="flex items-center space-x-1">                
                <AppButton
                  class="btn btn-primary btn-xs"                    
                  @click="router.push({ path: '/warehouses/edit/'+row.id })"
                >
                  Editar
                </AppButton>
                <AppButton
                  @click="deleteRow(row.id)"                    
                  class="btn btn-danger btn-xs"                    
                >
                  Eliminar
                </AppButton>
              </div>
            </td>
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Warehouses not found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <AppPaginationB v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
