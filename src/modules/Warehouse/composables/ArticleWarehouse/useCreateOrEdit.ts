import { onMounted, watch, ref } from 'vue'
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
  const articles: any = ref([]);
  
  const {errors, pending} = useHttp()
  
  const getWarehouseByUuid = async () => {
    pending.value = true

    const {categories} = await WarehouseService.getWarehouseByUuid(storeWarehouse.uuid)
      .then(response => response.data)
      .catch(error => {console.error(error);})
    
    ArticleService.getArticlesByCategories(categories)
      .then(response => {articles.value=response.data;})
      .catch(error => {console.error(error);})
      pending.value = false
  }

  onMounted(async () => await getWarehouseByUuid())

  watch(() => storeWarehouse.uuid, () => getWarehouseByUuid())
  
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
