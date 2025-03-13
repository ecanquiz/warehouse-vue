import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useHttp from "@/composables/useHttp"; //foreign_table_name
import ArticleWarehouseService from "../../services/ArticleWarehouse"
import WarehouseService from  "../../services/Warehouse"
import type { ArticleWarehouse } from "../../types/ArticleWarehouse"
import type { Warehouse } from  "../../types/Warehouse"

export default (article_warehouseId?: string) => {
  const router = useRouter();
  
  const article_warehouse: ArticleWarehouse = reactive({
    article_id: "", 
    warehouse_uuid: "", 
    stock_min: "", 
    stock_max: "", 
    status: "", 
    id_user_insert: "", 
    id_user_update: "", 
  })

  const warehouses = ref<Warehouse[]>()
  
  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(async () => {
    if (article_warehouseId) {
      pending.value = true
      ArticleWarehouseService.getArticleWarehouse(article_warehouseId)
        .then((response) => { 
          article_warehouse.article_id = response.data.data.article_id 
          article_warehouse.warehouse_uuid = response.data.data.warehouse_uuid 
          article_warehouse.stock_min = response.data.data.stock_min 
          article_warehouse.stock_max = response.data.data.stock_max 
          article_warehouse.status = response.data.data.status 
          article_warehouse.id_user_insert = response.data.data.id_user_insert 
          article_warehouse.id_user_update = response.data.data.id_user_update 
        })
        .catch((err) => {        
          errors.value = getError(err)
        })
        .finally(() => {
          pending.value = false;
        })
    }    
    
    pending.value = true
    WarehouseService.getHelpWarehouses()
      .then((response) => {
        warehouses.value = response.data
       })
       .catch((err) => {
         errors.value = getError(err)
       })
       .finally(() => {
         pending.value = false
       })
  })

  const insertArticleWarehouse = async (article_warehouse: ArticleWarehouse) => {  
    pending.value = true
    return ArticleWarehouseService.insertArticleWarehouse(article_warehouse)
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: '/article_warehouse' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateArticleWarehouse = async (article_warehouse: ArticleWarehouse, article_warehouseId: string) => {
    pending.value= true
    return ArticleWarehouseService.updateArticleWarehouse(article_warehouseId, article_warehouse)
      .then((response) => {
        alert( response.data.message )
        router.push( { path: '/article_warehouse' } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }
  
  const submit = (article_warehouse: ArticleWarehouse, article_warehouseId?: string) => {  
    !article_warehouseId ? insertArticleWarehouse(article_warehouse)  : updateArticleWarehouse(article_warehouse, article_warehouseId)
  }

  return {
    article_warehouse,
    errors,
    warehouses,
    pending,
    router,

    submit    
  }

}
