import Http from "@/core/utils/Http";
import type { ArticleWarehouse, AddArticles } from "../types/ArticleWarehouse";

export const getArticleWarehouses = (query: string) => {  
  return Http.get(`/api/article-warehouse/?${query}`);
}
 
export const getArticleWarehouse = (article_warehouseId: string) => { 
  return Http.get(`/api/article-warehouse/${article_warehouseId}`);
}

export const insertArticleWarehouse = (payload: ArticleWarehouse) => {  
  return Http.post("/api/article_warehouse", payload); // route not found 
}
  
export const updateArticleWarehouse = (article_warehouseId: string, payload: ArticleWarehouse) => {   
  return Http.put(`/api/article_warehouse/${article_warehouseId}`, payload);
}
  
export const deleteArticleWarehouse = (article_warehouseId: string) => { 
  return Http.delete(`/api/article_warehouse/${article_warehouseId}`);
}

export const getHelpArticleWarehouse = () => {
  return Http.get(`/api/article_warehouse-help`);
}

export const getArticlesWarehouseSearch = (query: string) => {
  return Http.get(`/api/articles-warehouse-search?${query}`);
}

export const addArticleWarehouse = (payload: AddArticles) => {   
  return Http.post("/api/article-warehouse", payload);
}

export default {
  getArticlesWarehouseSearch,
  getArticleWarehouses,
  getArticleWarehouse,
  insertArticleWarehouse,
  updateArticleWarehouse,
  deleteArticleWarehouse,
  getHelpArticleWarehouse,
  addArticleWarehouse
}
