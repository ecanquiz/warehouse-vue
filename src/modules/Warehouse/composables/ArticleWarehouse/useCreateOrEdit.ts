import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStoreWarehouse } from "@/modules/Warehouse/stores/"
import useHttp from "@/composables/useHttp"; //foreign_table_name
import ArticleService from "../../services/Article"
import ArticleWarehouseService from "../../services/ArticleWarehouse"
import WarehouseService from  "../../services/Warehouse"
import type { ArticleWarehouse } from "../../types/ArticleWarehouse"
import type { Warehouse } from  "../../types/Warehouse"

export default (article_warehouseId?: string) => {
  const storeWarehouse = useStoreWarehouse()
  const router = useRouter();
  
  const articles: any = ref([])
  
  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(async () => {

    pending.value = true

    const x = await WarehouseService.getWarehouseByUuid(storeWarehouse.uuid)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error(error);        
      })
      pending.value = false
      pending.value = true

      console.log(x)
    
    ArticleService.getArticlesByCategories()
      .then((response) => {
        articles.value=response.data
      })
      .catch((error) => {
        console.error(error);        
      })
      pending.value = false

    /*if (article_warehouseId) {
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
    }*/
    
    /*pending.value = true
    WarehouseService.getHelpWarehouses()
      .then((response) => {
        warehouses.value = response.data
       })
       .catch((err) => {
         errors.value = getError(err)
       })
       .finally(() => {
         pending.value = false
       })*/
  })

  /*const insertArticleWarehouse = async (article_warehouse: ArticleWarehouse) => {  
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
  }*/

  /*const updateArticleWarehouse = async (article_warehouse: ArticleWarehouse, article_warehouseId: string) => {
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
  }*/
  
  const submit = (article_warehouse: ArticleWarehouse, article_warehouseId?: string) => {  
    //!article_warehouseId ? insertArticleWarehouse(article_warehouse)  : updateArticleWarehouse(article_warehouse, article_warehouseId)
  }

  return {
    //article_warehouse,
    articles,
    errors,
    //warehouses,
    pending,
    router,

    submit    
  }

}
