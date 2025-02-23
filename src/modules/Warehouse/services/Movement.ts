import Http from "@/utils/Http";
import type { Movement, MovementTypeId } from "../types/Movement";

export const getMovements = (query: string, movementTypeId:number=0) => {  
  return Http.get(`/api/movements/${movementTypeId.toString()}?${query}`);
}
 
export const getMovement = (movementId: string, typeId:number) => { 
  return Http.get(`/api/movements/${movementId}/${typeId.toString()}`);
}

export const insertMovement = (movementTypeId: MovementTypeId, payload: Movement) => {
  return Http.post(`/api/movements/${movementTypeId}`, payload);
}
  
/*export const updateMovement = (movementId: string, payload: Movement) => {   
  return Http.put(`/api/movements/${movementId}`, payload);
}
  
export const deleteMovement = (movementId: string) => { 
  return Http.delete(`/api/movements/${movementId}`);
}

export const getHelpMovements = () => {
  return Http.get(`/api/movements-help`);
}*/

export default {
  getMovements,
  getMovement,
  insertMovement,
  /*updateMovement,
  deleteMovement,
  getHelpMovements*/
}
