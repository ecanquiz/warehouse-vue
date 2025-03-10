import Http from "@/utils/Http";

//export const getArticles = (query: string) => {  
  //return Http.get(`/api/articles/?${query}`);
//}

export const getArticlesWarehouseSearch = (query: string) => {
  return Http.get(`/api/articles-warehouse-search?${query}`);
}
 
//export const getArticle = (articleId: string) => { 
  //return Http.get(`/api/articles/${articleId}`);
//}

/*export const insertArticle = (payload: Article) => {   
  return Http.post("/api/articles", payload);
}
  
export const updateArticle = (articleId: string, payload: Article) => {   
  return Http.put(`/api/articles/${articleId}`, payload);
}
  
export const deleteArticle = (articleId: string) => { 
  return Http.delete(`/api/articles/${articleId}`);
}*/

//export const getHelpArticles = () => {
  //return Http.get(`/api/articles-help`);
//}

export default {
  //getArticles,
  getArticlesWarehouseSearch,
  //getArticle,
  //insertArticle,
  //updateArticle,
  //deleteArticle,
  //getHelpArticles
}
