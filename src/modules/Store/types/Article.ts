

export type Article = {
  id?: string | number;
  int_cod?: string; 
  name?: string;
  description?: string;
  price?: any; 
  stock_min?: any; 
  stock_max?: any; 
  status?: any; 
  photo?: string; 
  id_user_insert?: any; 
  id_user_update?: any; 
  
  _method?: 'PUT';
}

export type ArticleTG = {
  rows: Rows;
  sort: null | string;
  direction: null | string;
  search: null | string;
}

export type Rows = {
  current_page: number;
  data: ArticleRow[];
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

export type ArticleRow = {
  int_cod?: string; 
  name?: string;
  description?: string;
  price?: any; 
  stock_min?: any; 
  stock_max?: any; 
  status?: any; 
  photo?: string; 
  id_user_insert?: any; 
  id_user_update?: any; 
}

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
}

