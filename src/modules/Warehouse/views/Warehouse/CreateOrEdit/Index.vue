<script lang="ts" setup>
import FormCreateOrEdit from "./components/FormCreateOrEdit.vue";
import useCreateOrEdit from "./composables/useCreateOrEdit";

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
    <AppPageHeader>Almacenes / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
    <transition name="fade" mode="out-in">
      <div v-if="pending">Cargando...</div>
      <div v-else class="panel mt-6 p-4">          
        <div  class="flex space-x-2">
          <button
            class="btn btn-primary mb-4"
            @click="router.push({ path: '/warehouses' })"
          >
            Ver todos
          </button>
        </div>
        <div class="panel mt-6">
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
      </div>
    </transition>
  </div>
</template>

