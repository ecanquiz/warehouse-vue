import { ref, toRaw } from 'vue';
import { useRouter } from "vue-router"
import { useStoreWarehouse } from "@/modules/Warehouse/stores"
import { addArticleWarehouse } from "@/modules/Warehouse/services/ArticleWarehouse"
import type { CheckedArticles,  AddArticles } from '@/modules/Warehouse/types/ArticleWarehouse'


const storeWarehouse = useStoreWarehouse()

export default () => {
  const router = useRouter()

  const articleIds = ref<string>("");
  const selectedArticles = ref<string[]>([]);
  const componentKey = ref(0)

  const updateArticleIds = (arr: string = "[]"): void => {
    articleIds.value = arr
  }

  const selectArticles = (checkedArticle: CheckedArticles) => {
    for (let key in checkedArticle) 
      if (checkedArticle[key]) {
        if (!selectedArticles.value.find(item => item === key)) 
          selectedArticles.value.push(key);
      }
      else 
        selectedArticles.value = selectedArticles.value.filter(item => item !== key);  
  }

  const addArticles = (payload: AddArticles) => {
    addArticleWarehouse(payload).then(
      response => {
        selectedArticles.value= []
        alert(response.data.message)
        console.log(response)
        componentKey.value += 1 
        router.push('/article-warehouse')
        

      }
    )
  }

  const submit = (): void => {
    const payload = {
      warehouseUuid: storeWarehouse.uuid, 
      articleIds: toRaw(selectedArticles.value)
    }
  
    addArticles(payload)
  }

  return {
    articleIds,
    componentKey,

    selectArticles,
    submit,
    updateArticleIds
  }
}
