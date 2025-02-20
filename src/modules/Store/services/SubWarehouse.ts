import Http from "@/utils/Http";
import type { SubWarehouse } from "../types/SubWarehouse";

export const getSubWarehouses = (query: string) => {  
  return Http.get(`/api/sub_warehouses/?${query}`);
}
 
export const getSubWarehouse = (sub_warehouseId: string) => { 
  return Http.get(`/api/sub_warehouses/${sub_warehouseId}`);
}

export const insertSubWarehouse = (payload: SubWarehouse) => {   
  return Http.post("/api/sub_warehouses", payload);
}
  
export const updateSubWarehouse = (sub_warehouseId: string, payload: SubWarehouse) => {   
  return Http.put(`/api/sub_warehouses/${sub_warehouseId}`, payload);
}
  
export const deleteSubWarehouse = (sub_warehouseId: string) => { 
  return Http.delete(`/api/sub_warehouses/${sub_warehouseId}`);
}

export const getHelpSubWarehouses = () => {
  return Http.get(`/api/sub_warehouses-help`);
}

export default {
  getSubWarehouses,
  getSubWarehouse,
  insertSubWarehouse,
  updateSubWarehouse,
  deleteSubWarehouse,
  getHelpSubWarehouses
}
