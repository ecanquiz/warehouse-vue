<script setup lang="ts">
import { reactive } from "vue"
import type { SubWarehouse } from "../../types/SubWarehouse"

// import type Errors from "../types/Errors"

const props = defineProps<{
  id?: string
  sub_warehouse: SubWarehouse
   
  pending: boolean
  errors: any
}>()

const emit = defineEmits<{
  (e: 'submit', sub_warehouse: SubWarehouse, sub_warehouseId?: string): void
}>()

const form: SubWarehouse = reactive(props.sub_warehouse)

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
