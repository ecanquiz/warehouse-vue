<script setup lang="ts">
import AppPageHeader from "@/components/AppPageHeader.vue";
import FormCreateOrEdit from "../../components/ArticleWarehouse/FormCreateOrEdit.vue";
import useCreateOrEdit from "../../composables/ArticleWarehouse/useCreateOrEdit";
    
const props = defineProps<{ id?: string }>()

const {
  //article_warehouse,
  articles,
  errors,
  //warehouses,
  pending,
  router,

  submit    
} = useCreateOrEdit(props.id)
</script>
    
<template>
<div>
  <AppPageHeader>Artículos por almacén / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
  <transition name="fade" mode="out-in">
    <AppPageHeader
      message="pending..."
      v-if="pending"
      key="pending"
    />
    <div v-else class="panel mt-6 p-4">           
      <div  class="flex space-x-2">
        <button
          class="btn btn-primary mb-4"
          @click="router.push({ path: '/article-warehouse' })"
        >
          Ver todos
        </button>
      </div>
      <div class="panel mt-6">

      <ul>
        <li v-for="article in articles" :key="articles.id">
         {{ article.id }} | {{ article.int_cod }} | {{ article.name }} | {{ article.description }}

        </li>

      </ul>
        
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
    </div>
  </transition>
</div>
</template>
