import { computed, onMounted, ref, toRaw } from 'vue'
import useHttp from "@/composables/useHttp";
import ArticleWarehouseService from "@/modules/Warehouse/services/ArticleWarehouse";
import type { Ref } from "vue";
import type { ArticleWarehouse } from "../../types/Article/ArticleWarehouse";

export default (articleId: string) => {  
  const article_details: Ref<ArticleWarehouse[]>  = ref([])
  const panelOpened = ref(false)
  const closeButtonOpened = computed(()=> panelOpened.value ? "Cerrar" : "Abrir")
  const closeClassOpened = computed(()=> panelOpened.value ? "btn-default" : "btn-primary")
  const {  
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(    
    () => {
      getArticlesWarehouse()
    }
  )

  const panelToogleArticleDetail = ()=> {
    panelOpened.value =! panelOpened.value    
  }
  
  const getArticlesWarehouse = async () => {
    if (!articleId)
      return null 
    pending.value = true
    ArticleWarehouseService.getArticlesWarehouse(articleId)
      .then(res => {
        console.log(res)
        article_details.value = res.data;
      })
      .catch(err => errors.value = getError(err))
      .finally(() => pending.value = false) 
  }

  

  return {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,
    article_details,

    getArticlesWarehouse,
    panelToogleArticleDetail
  }
}
