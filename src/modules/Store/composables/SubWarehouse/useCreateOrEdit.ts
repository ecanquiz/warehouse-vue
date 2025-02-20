import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp"; //foreign_table_name
import SubWarehouseService from "../../services/SubWarehouse"

import type { SubWarehouse } from "../../types/SubWarehouse"


export default (sub_warehouseId?: string) => {
  const router = useRouter();
  
  const sub_warehouse: SubWarehouse = reactive({
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
    if (sub_warehouseId) {
      pending.value = true
      SubWarehouseService.getSubWarehouse(sub_warehouseId)
        .then((response) => { 
          // sub_warehouse.uuid = response.data.data.uuid 
          sub_warehouse.name = response.data.data.name 
          sub_warehouse.description = response.data.data.description 
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }    
    
  })

  const insertSubWarehouse = async (sub_warehouse: SubWarehouse) => {  
    pending.value = true
    return SubWarehouseService.insertSubWarehouse(sub_warehouse)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: '/sub_warehouses' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateSubWarehouse = async (sub_warehouse: SubWarehouse, sub_warehouseId: string) => {
    pending.value= true
    return SubWarehouseService.updateSubWarehouse(sub_warehouseId, sub_warehouse)
      .then((response) => {
        alert( response.data.message )
        router.push( { path: '/sub_warehouses' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (sub_warehouse: SubWarehouse, sub_warehouseId?: string) => {  
    !sub_warehouseId ? insertSubWarehouse(sub_warehouse)  : updateSubWarehouse(sub_warehouse, sub_warehouseId)
  }

  return {
    sub_warehouse,
    errors,
    
    pending,
    router,

    submit    
  }

}
