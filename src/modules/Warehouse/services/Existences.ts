import Http from "@/utils/Http";

export const getExistences = (query: string) => {  
  return Http.get(`/api/summary/?${query}`);
}

export default {
  getExistences
}
