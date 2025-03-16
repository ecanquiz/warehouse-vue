import Http from "@/utils/Http";
import type { Warehouse } from "../types/Warehouse";

export const getWarehouses = (query: string) => {  
  return Http.get(`/api/warehouses/?${query}`);
}
 
export const getWarehouse = (warehouseId: string) => { 
  return Http.get(`/api/warehouses/${warehouseId}`);
}

export const getWarehouseByUuid = (warehouseUuid: string) => { 
  return Http.get(`/api/warehouses/${warehouseUuid}/uuid`);
}

export const insertWarehouse = (payload: Warehouse) => {   
  return Http.post("/api/warehouses", payload);
}
  
export const updateWarehouse = (warehouseId: string, payload: Warehouse) => {   
  return Http.put(`/api/warehouses/${warehouseId}`, payload);
}
  
export const deleteWarehouse = (warehouseId: string) => { 
  return Http.delete(`/api/warehouses/${warehouseId}`);
}

export const getHelpWarehouses = () => {
  return Http.get(`/api/warehouses-help`);
}

export const loadArticles = (warehouseId: string, payload: {categories: string[]}) => {   
  return Http.put(`/api/warehouses-load-articles/${warehouseId}`, payload);
}

export default {
  getWarehouses,
  getWarehouse,
  getWarehouseByUuid,
  insertWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getHelpWarehouses,
  loadArticles
}
