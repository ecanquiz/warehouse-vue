<script setup lang="ts">
import { reactive, toRaw } from "vue"
import VueMultiselect from 'vue-multiselect'
import type { Warehouse } from "../../types/Warehouse"
// import type Errors from "../types/Errors"

type optionsVueMultiselect = {
    name: string;
    code: string
}[]

const props = defineProps<{
  //id?: string
  warehouse: Warehouse
  categories: optionsVueMultiselect
   
  pending: boolean
  errors: any
  loadPending: boolean
  loadErrors: any
}>()

const emit = defineEmits<{
  (e: 'submit', warehouse: Warehouse): void
  (e: 'loadArticles', payload: {categories: string[]}): void
}>()

const form: Warehouse = reactive(props.warehouse)

const submit = async () => {
  emit('submit', {
    uuid: form.uuid,
    name: form.name,
    description: form.description,
    categories: form.categories.map(r => r.name)    
  })
}

const loadArticles = () => {
  emit('loadArticles', {categories: form.categories.map(r => r.name)});
}
</script>

<template>
<form @submit.prevent="submit" class="p-4">
  <div class="grid lg:grid-cols-2 gap-4">
    <div class="block">
        <label class="block">Número</label>
        <span class="showSpan">
          {{ form.code ? form.code : "###"}}
        </span>
        <!--AppInput           
          v-model="main.number"
          label="Number"
          type="text"
          :error="v$.number.$error ? v$.number.$errors[0].$message : null"
        /-->
      </div>  
  
    <div class="block">     
      <AppInput           
        v-model="form.name"
        label="Name"
        type="text"
        :error="errors && errors.name ? errors.name[0] : ''"
      />
    </div>
    
    <div class="block">     
      <AppTextarea
        label="Description"
        v-model="form.description"
        :error="errors && errors.description ? errors.description[0] : ''"
      />
    </div>

    <div class="block">
      <label class="typo__label">Categorias</label>
      <VueMultiselect
        v-model="form.categories"      
        :close-on-select="false"
        :options="categories"
        :multiple="true"
        :allow-empty="true"
        deselectLabel="Eliminar"      
        selectLabel="Seleccionar"
        selectedLabel="Seleccionado"
        tag-placeholder="Add this as new tag"
        placeholder="Buscar o agregar una categoria"
        label="name"
        track-by="name"
      >   
        <template v-slot:noOptions>    
          La lista está vacía.
        </template>
        <template v-slot:noResult>    
          No se encontraron elementos. Considere cambiar la consulta de búsqueda.
        </template>
      </VueMultiselect>
      <!--pre class="language-json"><code>{{ form.categories }}</code></pre-->
    </div>
  </div>

  <div class="mt-4 px-2 border-gray-100 flex justify-end space-x-2">
    <AppBtn
      type="submit"
      :text="pending ? 'Guardando...' : 'Guardar'"
      :isDisabled='pending'
    />

    <AppBtn
      type="button"
      :text="loadPending ? 'Cargando artículos...' : 'Cargar artículos'"
      :isDisabled='loadPending'
      @click="loadArticles"
    />
  </div>
</form>  
</template>

<style scoped>
  .showSpan { @apply block p-2.5 border; }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  [data-theme="winter"] .multiselect__tags { @apply bg-gray-100 text-gray-900; }
  [data-theme="night"] .multiselect__tags { @apply bg-gray-900 text-gray-100; }    
  [data-theme="winter"] .multiselect__content-wrapper { @apply bg-gray-100 text-gray-900; }
  [data-theme="night"] .multiselect__content-wrapper { @apply bg-gray-900 text-gray-100; }
  [data-theme="winter"] .multiselect__option--selected { @apply bg-gray-200 text-gray-800; }
  [data-theme="night"] .multiselect__option--selected { @apply bg-gray-800 text-gray-200; }  
</style>

