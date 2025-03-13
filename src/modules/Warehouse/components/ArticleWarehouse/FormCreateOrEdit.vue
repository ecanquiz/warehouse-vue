<script setup lang="ts">
import { reactive } from "vue"
import type { ArticleWarehouse } from "../../types/ArticleWarehouse"
import type { Warehouse } from  "../../types/Warehouse"
// import type Errors from "../types/Errors"

const props = defineProps<{
  id?: string
  article_warehouse: ArticleWarehouse
  warehouses?: Warehouse[] 
  pending: boolean
  errors: any
}>()

const emit = defineEmits<{
  (e: 'submit', article_warehouse: ArticleWarehouse, article_warehouseId?: string): void
}>()

const form: ArticleWarehouse = reactive(props.article_warehouse)

const submit = async () => {
  emit('submit', {
    article_id: form.article_id,
    warehouse_uuid: form.warehouse_uuid,
    stock_min: form.stock_min,
    stock_max: form.stock_max,
    status: form.status,
    id_user_insert: form.id_user_insert,
    id_user_update: form.id_user_update,
    
  }, props.id)
}
</script>

<template>
<form @submit.prevent="submit" class="p-4">
  <div class="grid lg:grid-cols-2 gap-4">
  
  
  
  
  TODO
  
  
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
