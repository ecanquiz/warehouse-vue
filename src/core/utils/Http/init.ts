import { useAuthStore } from '@/modules/Auth/stores'
import type { Init } from "./Http"
import type { AxiosError } from "axios";

export default<Init> {
  baseURL: import.meta.env.VITE_APP_API_URL, //process.env.VUE_APP_API_URL,  
  withCredentials: true,
  withXSRFToken: true,
  handleError(error: AxiosError) {
    const storeAuth = useAuthStore()
    
    if (error.response
      && [401, 419].includes(error.response.status)    
      && storeAuth.authUser 
      && !storeAuth.guest
    ) {
      storeAuth.logout();
    }
    
    return Promise.reject(error);
  }
}

export const articleInit: Init = {
  baseURL: import.meta.env.VITE_ARTICLE_API_URL, //process.env.VITE_ARTICLE_API_URL,  
  withCredentials: false,
  withXSRFToken: false,
  customHeaders: { 
    //'Content-Type': 'application/json', 
    'Authorization': `Bearer ${import.meta.env.VITE_ARTICLE_API_SHARED_TOKEN}`
  }
}