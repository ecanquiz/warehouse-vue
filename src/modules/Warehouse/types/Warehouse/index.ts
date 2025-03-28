

export type Warehouse = {
  id?: string | number;
  uuid?: any;
  code?: string; 
  name?: string; 
  description?: string;
  categories?: any[]
  
  _method?: 'PUT';
}

export type WarehouseTG = {
  rows: Rows;
  sort: null | string;
  direction: null | string;
  search: null | string;
}

export type Rows = {
  current_page: number;
  data: WarehouseRow[];
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

export type WarehouseRow = {
  uuid?: any;
  code?: string; 
  name?: string; 
  description?: string; 
}

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
}

export type StoreWarehouse = {
  uuid: string
  code?: string;
  name: string
  loading: boolean
  error: string
}
