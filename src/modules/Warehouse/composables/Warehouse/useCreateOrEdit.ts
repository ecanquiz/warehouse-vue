import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp"; //foreign_table_name
import WarehouseService from "../../services/Warehouse"

import type { Warehouse } from "../../types/Warehouse"


export default (warehouseId?: string) => {
  const router = useRouter();
  
  const warehouse: Warehouse = reactive({
    uuid: "", 
    name: "", 
    description: "", 
  })

  
  
  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(async () => {
    if (warehouseId) {
      pending.value = true
      WarehouseService.getWarehouse(warehouseId)
        .then((response) => { 
          // warehouse.uuid = response.data.data.uuid 
          warehouse.name = response.data.data.name 
          warehouse.description = response.data.data.description 
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }    
    
  })

  const insertWarehouse = async (warehouse: Warehouse) => {  
    pending.value = true
    return WarehouseService.insertWarehouse(warehouse)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: '/warehouses' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateWarehouse = async (warehouse: Warehouse, warehouseId: string) => {
    pending.value= true
    return WarehouseService.updateWarehouse(warehouseId, warehouse)
      .then((response) => {
        alert( response.data.message )
        router.push( { path: '/warehouses' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (warehouse: Warehouse, warehouseId?: string) => {  
    !warehouseId ? insertWarehouse(warehouse) : updateWarehouse(warehouse, warehouseId)
  }

  return {
    warehouse,
    errors,
    
    pending,
    router,

    submit    
  }

}
