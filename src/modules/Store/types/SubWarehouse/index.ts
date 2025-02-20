

export type SubWarehouse = {
  id?: string | number;
  uuid?: any; 
  name?: string; 
  description?: string; 
  
  _method?: 'PUT';
}

export type SubWarehouseTG = {
  rows: Rows;
  sort: null | string;
  direction: null | string;
  search: null | string;
}

export type Rows = {
  current_page: number;
  data: SubWarehouseRow[];
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

export type SubWarehouseRow = {
  uuid?: any; 
  name?: string; 
  description?: string; 
}

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
}

