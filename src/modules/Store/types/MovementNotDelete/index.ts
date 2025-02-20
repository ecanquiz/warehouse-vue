

export type Movement = {
  id?: any; 
  type_id?: any; 
  number?: string; 
  date_time?: string; 
  subject?: string; 
  description?: string; 
  observation?: string; 
  close?: any; 
  support_type_id?: any; 
  support_number?: string; 
  support_date?: any; 
  user_insert_id?: any; 
  user_update_id?: any; 
  user_edit_id?: any; 
  editing?: boolean | ""; 
  
  _method?: 'PUT';
}

export type MovementTG = {
  rows: Rows;
  sort: null | string;
  direction: null | string;
  search: null | string;
}

export type Rows = {
  current_page: number;
  data: MovementRow[];
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

export type MovementRow = {
  type_id?: any; 
  number?: string; 
  date_time?: Date; 
  subject?: string; 
  description?: string; 
  observation?: string; 
  close?: any; 
  support_type_id?: any; 
  support_number?: string; 
  support_date?: any; 
  user_insert_id?: any; 
  user_update_id?: any; 
  user_edit_id?: any; 
  editing?: boolean; 
}

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
}

