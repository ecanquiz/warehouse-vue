<script setup lang="ts">

// @ts-nocheck
import Pagination from './components/Pagination.vue';
import useIndex from "./composables/useIndex";
import useMovementType from "./composables/useMovementType";

const {
  errors,
  data,
  router,
  route,
  routePath,

  deleteRow,
  setSearch,
  setSort  
} = useIndex()

const {
    pageHeader,
    formatMovementTypeId,
    isMovementTypeNameValid
  } = useMovementType(route, routePath);
</script>

<template>
<div>
  <AppPageHeader> {{pageHeader}} </AppPageHeader>

  <div class="flex space-x-2" v-if="isMovementTypeNameValid()">
    <AppLink class="btn btn-primary" :to="`/${routePath}/create`">
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
              <th class="">
                <AppLink to="#" @click.prevent="setSort('number')">Número</AppLink>
              </th>
              <th class="" v-if="routePath==='movements'">
                <AppLink to="#" @click.prevent="setSort('type_id')">Tipo</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('date_time')">Fecha</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('subject')">Asunto</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('description')">Descripción</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('observation')">Observación</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('close')">Cierre</AppLink>
              </th>
              
              <th class="">
                <AppLink to="#" @click.prevent="setSort('support_number')">Número de soporte</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('support_date')">Fecha de soporte</AppLink>
              </th>              
              <!--th class="">
                <AppLink to="#" @click.prevent="setSort('editing')">editing</AppLink>
              </th-->
                                     
            <th class="">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
             <!--td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ path: `/${routePath}/edit/${row.id}`, params: { id: row.id }}"
              >
                {{ row.id }}
              </AppLink>
            </td-->
            <td class="">              
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ path: `/${routePath}/edit/${row.id}`}"
              >
                {{ row.number }}
              </AppLink>
            </td>
            <td class="" v-if="routePath==='movements'">
              {{ formatMovementTypeId(row.type_id) }}
            </td>
            <td class="">
              {{ row.date_time }}
            </td>
            <td class="">
              {{ row.subject }}
            </td>
            <td class="">
              {{ row.description }}
            </td>
            <td class="">
              {{ row.observation }}
            </td>
            <td class="">
              {{ row.close }}
            </td>
            <td class="">
              {{ row.support_number }}
            </td>
            <td class="">
              {{ row.support_date }}
            </td>
            <!--td class="">
              {{ row.editing }}
            </td--> 
            <td class="">
              <div class="flex items-center space-x-1">                
                <AppButton
                  class="btn btn-success btn-xs"                    
                  @click="router.push({ path: `/${routePath}/edit/${row.id}` })"
                >
                  Mostrar
                </AppButton> 
              </div>
            </td>
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Movements not found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <Pagination v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
