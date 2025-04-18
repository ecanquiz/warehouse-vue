import { reactive, onMounted, watch} from "vue"
import { onBeforeRouteUpdate } from "vue-router"
import { useStoreWarehouse } from "@/modules/Warehouse/stores"
import useTableGrid from "@/core/composables/useTableGrid"
import useHttp from "@/core/composables/useHttp"
import ArticleWarehouseService from "@/modules/Warehouse/services/ArticleWarehouse"

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined

export default (articleIds, updateArticleIds) => {
  const store = useStoreWarehouse ()  

  const data = reactive({
    rows: [],
    links: [],
    search: "",
    sort: "",
    direction: "",
    uuid: "",
    articleIds: "[]"
  })

  const {errors, getError} = useHttp()

  const {
    route,
    router,

    setLoad,
    setSearch,
    setSort, 
  } = useTableGrid(data, "/article-warehouse")

  const getArticleWarehouses = (routeQuery: string) => {
    return ArticleWarehouseService.getArticleWarehouses(routeQuery)
      .then((response) => {
        errors.value = {}
        data.rows = response.data.rows.data
        data.links = response.data.rows.links
        data.search = response.data.search
        data.sort = response.data.sort
        data.direction = response.data.direction
        data.uuid = response.data.uuid
        updateArticleIds(response.data.article_ids)
      })
      .catch((error) => {
        if (error.response.status)
          alert(error.response.data.message)
        console.error('aqui', error)
      })
  }

  const deleteRow = (rowId?: string) => {
    if (rowId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${rowId}?`)) {    
      return ArticleWarehouseService.deleteArticleWarehouse(rowId)
        .then((response) => {
          errors.value = {}
          getArticleWarehouses(
            new URLSearchParams(route.query as Params).toString()
          )
        })
        .catch((err) => {                
          console.log( err.response.data )
          errors.value = getError(err)
        })
    }
  }

  onBeforeRouteUpdate(async (to, from) => {      
    if (to.query !== from.query) {        
      await getArticleWarehouses(
        new URLSearchParams(to.query as Params).toString()
      )
    }
  })

  onMounted(() => {
    setLoad({ uuid: store.uuid})
    getArticleWarehouses(
      new URLSearchParams(route.query as Params).toString()
    )
  })

  watch(() => store.uuid, uuid => setLoad({uuid: store.uuid}))

  return {
    errors,
    data,
    router,

    deleteRow,
    setSearch,
    setSort
  }
}

