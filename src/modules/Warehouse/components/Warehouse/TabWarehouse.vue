<script setup lang="ts">
import AppPageHeader from "@/components/AppPageHeader.vue";
import FormCreateOrEdit from "../../components/Warehouse/FormCreateOrEdit.vue";
import useCreateOrEdit from "../../composables/Warehouse/useCreateOrEdit";
    
const props = defineProps<{ id?: string }>()

const {
  categories,
  warehouse,
  errors,  
  pending,
  router,
  loadErrors,
  loadPending,


  submit,
  loadArticles   
} = useCreateOrEdit(props.id)
</script>
    
<template>
<div>
  <transition name="fade" mode="out-in">
    <AppPageHeader
      message="pending..."
      v-if="pending && !warehouse"
      key="pending"
    />
    <div v-else class="panel mt-6">
      <FormCreateOrEdit
        class="p-5 border rounded shadow"
        @submit='submit'
        @loadArticles="loadArticles"
        :categories="categories"
        :warehouse='warehouse'
        :pending='pending'
        :errors='errors'
        :loadPending='loadPending'
        :loadErrors='loadErrors'           
      />
      </div>
  </transition>
</div>
</template>
