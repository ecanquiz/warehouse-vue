<script setup lang="ts">
import { reactive } from "vue"
import type { Warehouse } from "../../types/Warehouse"

// import type Errors from "../types/Errors"

const props = defineProps<{
  id?: string
  warehouse: Warehouse
   
  pending: boolean
  errors: any
}>()

const emit = defineEmits<{
  (e: 'submit', warehouse: Warehouse, warehouseId?: string): void
}>()

const form: Warehouse = reactive(props.warehouse)

const submit = async () => {
  emit('submit', {
    uuid: form.uuid,
    name: form.name,
    description: form.description,
    
  }, props.id)
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
    
  </div>

  <div class="mt-4 px-2 border-gray-100 flex justify-end space-x-2">
    <AppBtn
      type="submit"
      :text="pending ? 'Guardando...' : 'Guardar'"
      :isDisabled='pending'
    />
  </div>
</form>  
</template>

<style>
.showSpan {
  @apply block p-2.5 border;
}
</style>
