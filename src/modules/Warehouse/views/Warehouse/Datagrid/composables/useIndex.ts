import { reactive, onMounted } from "vue"
import { onBeforeRouteUpdate } from "vue-router"
import useTableGrid from "@/core/composables/useTableGrid"
import useHttp from "@/core/composables/useHttp"
import WarehouseService from "@/modules/Warehouse/services/Warehouse"

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined

export default () => {
  const data = reactive({
    rows: [],
    links: [],
    search: "",
    sort: "",
    direction: ""
  })

  const {  
    errors,

    getError     
  } = useHttp()

  const {
    route,
    router,

    setSearch,
    setSort, 
  } = useTableGrid(data, "/warehouses")

  const getWarehouses = (routeQuery: string) => {
    return WarehouseService.getWarehouses(routeQuery)
      .then((response) => {
        errors.value = {}
        data.rows = response.data.rows.data
        data.links = response.data.rows.links
        data.search = response.data.search
        data.sort = response.data.sort
        data.direction = response.data.direction      
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteRow = (rowId?: string) => {
    if (rowId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${rowId}?`)) {    
      return WarehouseService.deleteWarehouse(rowId)
        .then((response) => {
          errors.value = {}
          getWarehouses(
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
      await getWarehouses(
        new URLSearchParams(to.query as Params).toString()
      )
    }
  })

  onMounted(() => {
    getWarehouses(
      new URLSearchParams(route.query as Params).toString()
    )
  })

  return {
    errors,
    data,
    router,

    deleteRow,
    setSearch,
    setSort
  }
}

