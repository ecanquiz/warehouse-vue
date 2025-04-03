import { computed, reactive, onMounted } from "vue"
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import useTableGrid from "@/core/composables/useTableGrid"
import useHttp from "@/core/composables/useHttp"
import DaylyClosingService from "@/modules/Warehouse/services/DaylyClosing"

type Params =  string | string[][] | Record<string, string> | URLSearchParams | undefined

export default () => {

  const route = useRoute()
  const routePath = computed(()=> route.path.split("/")[1])

  const movementTypeId = computed(() => {
    switch (routePath.value) {
      case "inputs": return 1;
      case "outputs": return 2;
      case "input-reverses": return 3;
      case "output-reverses": return 4;
    }
  })

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
    router,// route,

    setSearch,
    setSort, 
  } = useTableGrid(data, `/${routePath.value}`)

  const getMovements = (routeQuery: string) => {
    return DaylyClosingService.getDailyClosings()
      .then((response) => {
        //console.log(response)
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

  /*const deleteRow = (rowId?: string) => {
    if (rowId === undefined)
      return
    else if (confirm(`¿Estás seguro que desea eliminar el registro ${rowId}?`)) {    
      return MovementService.deleteMovement(rowId)
        .then((response) => {
          errors.value = {}
          getMovements(
            new URLSearchParams(route.query as Params).toString()
          )
        })
        .catch((err) => {                
          console.log( err.response.data )
          errors.value = getError(err)
        })
    }
  }*/

  onBeforeRouteUpdate(async (to, from) => {      
    if (to.query !== from.query) {        
      await getMovements(
        new URLSearchParams(to.query as Params).toString()
      )
    }
  })

  onMounted(() => {
    getMovements(
      new URLSearchParams(route.query as Params).toString()
    )
  })

  return {
    errors,
    data,
    router,
    route,
    routePath,

    //deleteRow,
    setSearch,
    setSort
  }
}

