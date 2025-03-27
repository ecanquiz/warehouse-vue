<script setup lang="ts">
// @ts-nocheck
import useIndex from "../../composables/DailyClosing/useIndex";

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


/*const title = computed(
*  () => route.name.replace('movements-', '').toUpperCase()
)*/
const formatMovementTypeId = (movementTypeId: number) => {
  if (movementTypeId===1)
    return 'Input';
  else if (movementTypeId===2)
    return 'Output';
  else if (movementTypeId===3)
    return 'Reverse-Input';
  else if (movementTypeId===4)
    return 'Reverse-Output';


}

</script>

<template>
<div>
  <AppPageHeader> Cierres Diarios </AppPageHeader>

  <div class="flex space-x-2">
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
            
              <th class="">
                <AppLink to="#" @click.prevent="setSort('close')">Cierre</AppLink>
              </th>
              <!--th class="">
                <AppLink to="#" @click.prevent="setSort('quantity_input')">Entradas</AppLink>
              </th>
              
              <th class="">
                <AppLink to="#" @click.prevent="setSort('quantity_output')">Salidas</AppLink>
              </th>
              <th class="">
                <AppLink to="#" @click.prevent="setSort('quantity_reverse_input')">Reverso de Entradas</AppLink>
              </th>
              
              <th class="">
                <AppLink to="#" @click.prevent="setSort('quantity_reverse_output')">Reverso de Salidas</AppLink>
              </th-->                    
            <!--th class="">Acción</th-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data.rows" :key="row.id" class="">
             <td class="">
              <AppLink
                class="text-indigo-600 hover:text-indigo-800 underline"
                :to="{ path: `/${routePath}/show/${row.close}`, params: { close: row.close }}"
              >
                {{ row.close }}
              </AppLink>
            </td>
            <!--td class="text-right">
              {{ row.quantity_input }}
            </td>
            <td class="text-right">
              {{ row.quantity_output }}
            </td>
            <td class="text-right">
              {{ row.quantity_reverse_input }}
            </td>
            <td class="text-right">
              {{ row.quantity_reverse_output }}
            </td-->            
            <!--td class="">
              <div class="flex items-center space-x-1">                
                <AppBtn
                  class="btn btn-primary btn-xs"                    
                  @click="router.push({ path: `/${routePath}/edit/${row.id}` })"
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
            </td-->
          </tr>
          <tr v-if="data.rows.length === 0">
            <td class="" colspan="4">Cierres Diarios no encontrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span v-if="Object.keys(errors).length > 0" class="text-red-500">{{ errors }}</span>
    <AppPaginationB v-if="data.links" :links="data.links" />      
  </div>
</div>
</template>
