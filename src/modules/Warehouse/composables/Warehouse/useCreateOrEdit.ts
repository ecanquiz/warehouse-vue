import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp"; //foreign_table_name
import WarehouseService from "../../services/Warehouse"
import ArticleService from "../../services/Article"
import type { Warehouse } from "../../types/Warehouse"

export default (warehouseId?: string) => {
  const router = useRouter();
  
  const warehouse: Warehouse = reactive({
    uuid: "",
    code: "",
    name: "", 
    description: "",
    categories: []
  })

  type optionsVueMultiselect = {
    name: string;
    code: string
  }[]

  const categories = ref<optionsVueMultiselect>([])   
  
  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(async () => {
    if (warehouseId) {
      pending.value = true

      ArticleService.getDistinctCategoriesByArticleDetail().then(response => {
        categories.value = response.data.map( (r: optionsVueMultiselect) => ({ name: r, code: r }))
      })

      WarehouseService.getWarehouse(warehouseId)
        .then((response) => { 
          // warehouse.uuid = response.data.data.uuid 
          warehouse.code = response.data.data.code 
          warehouse.name = response.data.data.name 
          warehouse.description = response.data.data.description 
          warehouse.categories = JSON.parse(response.data.data.categories).map(r=> ({name: r, code: r})) 

          console.log('dsfdgf', warehouse.categories )
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
    categories,
    warehouse,
    errors,
    
    pending,
    router,

    submit    
  }

}
