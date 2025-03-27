import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/core/composables/useHttp"; //foreign_table_name
import WarehouseService from "../../services/Warehouse"
import ArticleService from "../../services/Article"
import type { Warehouse } from "../../types/Warehouse"

export default (propsId?: string) => {
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

  const {  
    errors: loadErrors,
    pending: loadPending,

    getError: loadGetError
  } = useHttp()
  
  onMounted(async () => {
    pending.value = true

    ArticleService.getDistinctCategoriesByArticleDetail().then(response => {
      categories.value = response.data.map((r: optionsVueMultiselect) => ({name: r, code: r}))
    })

    if (propsId) {
      WarehouseService.getWarehouse(propsId)
        .then((response) => { 
          // warehouse.uuid = response.data.data.uuid 
          warehouse.code = response.data.data.code 
          warehouse.name = response.data.data.name 
          warehouse.description = response.data.data.description 
          warehouse.categories = JSON.parse(response.data.data.categories).map((r: optionsVueMultiselect) => ({name: r, code: r}))
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
    }
    pending.value = false;
  })

  const insertWarehouse = async (warehouse: Warehouse) => {  
    pending.value = true
    return WarehouseService.insertWarehouse(warehouse)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: `/warehouses/edit/${response.data.id}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateWarehouse = async (warehouse: Warehouse) => {
    pending.value= true
    return WarehouseService.updateWarehouse(propsId, warehouse)
      .then((response) => {
        alert( response.data.message )
        //router.push( { path: '/warehouses' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (warehouse: Warehouse) => {
    !propsId ? insertWarehouse(warehouse) : updateWarehouse(warehouse)
  }

  const loadArticles = (payload: {categories : string[]}) => {
    pending.value= true
    return WarehouseService.loadArticles(propsId, payload)
      .then((response) => {
        alert( response.data.message )
        //router.push( { path: '/warehouses' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  return {
    categories,
    warehouse,
    errors,    
    pending,
    router,
    loadErrors,
    loadPending,

    submit,
    loadArticles   
  }

}


