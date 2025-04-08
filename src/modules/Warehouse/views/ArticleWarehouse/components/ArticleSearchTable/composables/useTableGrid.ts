import { onMounted, watch  } from "vue"
import { useStoreWarehouse } from "@/modules/Warehouse/stores/"
import { getArticlesSearchByCategories } from "@/modules/Warehouse/services/Article"
import WarehouseService from  "@/modules/Warehouse/services/Warehouse"
import type { Ref  } from "vue"

import type {
  TableGrid,
  Data as TableGridData,
  Params, SetTimeout
} from "@/core/types/TablaGrid"

interface Data extends TableGridData {
  categories: string[];
  articleIds: string; // "[]"
}

export default (data: Data, articleIds: Ref<string>): TableGrid => {
  const store = useStoreWarehouse()
  
  onMounted(async () => await getSearch({
    page: "1",
    search: "",
    sort: "",
    direction: ""    
  }))

  let searchDebounceTimer: SetTimeout

  const setSearch = (e: Event): void => {
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = setTimeout(() => {
       setLoad({ search: (e.target as HTMLInputElement).value })      
    }, 300)
  }

  const setSort = (sort: "asc" | "des"): void => {    
    let direction = "asc";         
    if (data.sort == sort) {
      direction = data.direction == "asc" ? "desc" : "asc";
    } 
    setLoad({direction, sort})
  };

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
    data.articleIds = articleIds.value ?? "[]";
    
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
    data.articleIds = articleIds.value ?? "[]";
  }

  watch(() => store.uuid, () => setLoad({}))
  watch( articleIds, () => setLoad({ articleIds: articleIds.value }))



  return {
    getSearch,
    setSearch,
    setSort,
    setLoad
  }
}
