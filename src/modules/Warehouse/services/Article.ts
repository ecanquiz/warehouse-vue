import { Http as h } from "@/utils/Http";
import { articleInit } from "@/utils/Http/init";
import type { Article } from "../types/Article";

const Http = new h( articleInit );

export const getDistinctCategoriesByArticleDetail = () => {  
  return Http.get("/api/distinct-categories-by-article-detail");
}

//export const getArticles = (query: string) => {  
  //return Http.get(`/api/articles/?${query}`);
//}

export const getArticlesSearch = (query: string) => {
  return Http.get(`/api/articles-search?${query}`);
}
 
export const getArticle = (articleId: string) => { 
  //return Http.get(`/api/articles/${articleId}`);
}

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
  getDistinctCategoriesByArticleDetail,
  getArticlesSearch,
  //getArticle,
  //insertArticle,
  //updateArticle,
  //deleteArticle,
  //getHelpArticles
}
