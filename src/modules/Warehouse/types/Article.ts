export type Article = {
  id: string | number;
  warehouse_code: string;
  warehouse_name: string;
  int_cod: string; 
  name: string;
  quantity: number;
}

export type QtyArticle = {
  id: string;
  qty: number;
}
