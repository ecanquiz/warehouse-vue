import type { Warehouse } from  "../Warehouse"

export type ArticleWarehouse = {
  id?: string | number;
  article_id?: any; 
  warehouse_uuid?: any; 
  stock_min?: any; 
  stock_max?: any; 
  status?: any; 
  id_user_insert?: any; 
  id_user_update?: any; 
  warehouse?: Warehouse;
  _method?: 'PUT';
}

export type ArticleWarehouseTG = {
  rows: Rows;
  sort: null | string;
  direction: null | string;
  search: null | string;
}

export type Rows = {
  current_page: number;
  data: ArticleWarehouseRow[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

export type ArticleWarehouseRow = {
  article_id?: any; 
  warehouse_uuid?: any; 
  stock_min?: any; 
  stock_max?: any; 
  status?: any; 
  id_user_insert?: any; 
  id_user_update?: any; 
}

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
}

export type CheckedArticles = {
  [key: string]: boolean;
};

export type AddArticles = {
  warehouseUuid: string;
  articleIds: string[]
}
