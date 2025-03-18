<script setup lang="ts">
import {reactive} from "vue"
import useArticleSearch from "../../composables/ArticleWarehouse/useArticleSearch";
    
const props = defineProps<{ id?: string }>()
const selectedArticle = reactive({})


const {
  //article_warehouse,
  articles,
  errors,
  //warehouses,
  pending,
  router,

  submit    
} = useArticleSearch(props.id)

const classTr = (index: number): string => {
  let num = (index%2 == 1) ? '100' : '200'
  return  `bg-base-${num}`
}

const selectArticle =  () => {

}
</script>
    
<template>
<div>
  <transition name="fade" mode="out-in">
    <div class="panel mt-0 p-4">           


      <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">     
    <table id="id_tab_presentacion" class="w-full text-sm text-left text-gray-500 dark:text-gray-400" width="100%">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr class="bg-base-100">
          <th class="px-4 py-1">Acción(es)</th>
          <th class="px-4 py-1">
            id
          </th>
          <th class="px-4 py-1">
            int_cod
          </th>
          <th class="px-4 py-1">
            name
          </th>      
          <th class="px-4 py-1">
            description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="index" :class="classTr(index)">
          <td class="px-4 py-1">
            <div class="flex items-center space-x-1">
              <label>Seleccionar</label>
              <input
                class="my-3"
                type="checkbox"
                v-model="selectedArticle[article.id]"
                :value="article.id"
                @click="selectArticle()"
              />
            </div>
          </td>
          <td class="px-4 py-1 text-center">{{article.id}}</td>
          <td class="px-4 py-1 text-justify">{{article.int_cod}}</td>
          <td class="px-4 py-1 text-center">{{article.name}}</td>
          <td class="px-4 py-1 text-justify">{{article.description}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!--AppPaginationC
    v-if="data.links"
    :links="data.links"
    @getSearch="getSearch"
  /-->
        
        <!--FormCreateOrEdit
          class="p-5 border rounded shadow"
          @submit='submit'
          :id="props.id"
          :article_warehouse='article_warehouse'
          :pending='pending'
          :errors='errors'
          :warehouses="warehouses"        
        /-->
      </div>
  </transition>
</div>
</template>
