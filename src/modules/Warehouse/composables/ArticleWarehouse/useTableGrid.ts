import { onMounted, watch, inject } from "vue"
import { useStoreWarehouse } from "@/modules/Warehouse/stores/"
import { getArticlesSearchByCategories } from "../../services/Article"
import WarehouseService from  "../../services/Warehouse"
import type {
  TableGrid,
  Data as TableGridData,
  Params, SetTimeout
} from "@/types/TablaGrid"

interface Data extends TableGridData {
  categories: string[];
  articleIds: string[]
}

export default (data: Data): TableGrid => {
  const store = useStoreWarehouse()
  const {articleIds}: {articleIds: string[] } = inject('articleIds');
  
  onMounted(async () => await getSearch({
    page: "1",
    search: "",
    sort: "",
    direction: ""    
  }))

  // search
  let searchDebounceTimer: SetTimeout

  const setSearch = (e: Event): void => {
    // clear previous timer and set new
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = setTimeout(() => {
       setLoad({ search: (e.target as HTMLInputElement).value })      
    }, 300)
  }

  // sort (reverse direction if clicked twice on column)
  const setSort = (sort: "asc" | "des"): void => {    
    let direction = "asc";         
    if (data.sort == sort) {
      direction = data.direction == "asc" ? "desc" : "asc";
    } 
    setLoad({direction, sort})
  };

  // setLoad
  const setLoad = (newParams: object): void => {
    const params = {
      page: data.links || "1",
      search: data.search || "",
      sort: data.sort || "",
      direction: data.direction || "",
      ...newParams,
    }
    getSearch(params)
  }
  
  const getSearch = async (params) => {    
    const {categories} = await WarehouseService.getWarehouseByUuid(store.uuid)
      .then(response => response.data)
      .catch(error => {console.error(error);})    

    data.page = params.page ?? "1";
    data.search = params.search ?? "";
    data.sort = params.sort ?? "";
    data.direction = params.direction ?? "";
    data.categories = categories ?? [];
    data.articleIds = articleIds ?? [];
    
    const {data: { rows }} = await getArticlesSearchByCategories(
      new URLSearchParams(data as unknown as Params).toString()
    )
    
    data.rows = rows.data ?? []
    data.links = rows.links ?? []
    data.page = rows.page ?? "1"
    data.search = data.search ?? ""
    data.sort = data.sort ?? ""
    data.direction = rows.direction ?? ""
    data.categories = categories ?? []
    data.articleIds = articleIds ?? [];
  }

  watch(() => store.uuid, () => setLoad({}))
  watch(articleIds, () => setLoad({articleIds}))

  return {
    getSearch,
    setSearch,
    setSort,
    setLoad
  }
}
