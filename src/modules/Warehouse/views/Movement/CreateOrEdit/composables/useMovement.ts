import { onMounted, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import useRoutePath from "./useRoutePath"
import useHttp from "@/core/composables/useHttp";
// import { useStoreWarehouse } from "@/modules/Warehouse/stores/"
import MovementService from "@/modules/Warehouse/services/Movement";
import MovementDetailService from "@/modules/Warehouse/services/MovementDetail";
import type { Movement, Detail } from "@/modules/Warehouse/types/Movement";

export default (movementId?: string) => {
  const router = useRouter();
  const { routePath, movementTypeId } = useRoutePath();
  // const storeWarehouse = useStoreWarehouse();

  const movement = reactive<Movement>({
    main: {
      type_id: movementTypeId.value,
      number: "",
      date_time: "",
      subject: "", 
      description: "", 
      observation: "",
      support_type_id: "",
      support_number: "",
      support_date: "",
     // warehouse_uuid: "" No more needed
    },
    details: []
  })

  const {  
    errors,
    pending,

    getError
  } = useHttp()
  
  onMounted(() => {
    if (movementId) {
      pending.value = true
      Promise.all([
        MovementService.getMovement(movementId, 1),
        MovementDetailService.getMovementDetails(movementId)
      ]).then((response) => {
        movement.main.id = response[0].data.data.id 
        movement.main.type_id = response[0].data.data.type_id 
        movement.main.number = response[0].data.data.number 
        movement.main.date_time = response[0].data.data.date_time 
        movement.main.subject = response[0].data.data.subject 
        movement.main.description = response[0].data.data.description 
        movement.main.observation = response[0].data.data.observation 
        movement.main.close = response[0].data.data.close 
        movement.main.support_type_id = response[0].data.data.support_type_id
        movement.main.support_number = response[0].data.data.support_number
        movement.main.support_date = response[0].data.data.support_date
        
        movement.details = response[1].data.map((detail: Detail) => ({
          article_id: detail.article_id,
          close: detail.close,
          id: detail.id,
          int_cod: detail.int_cod,
          warehouse_code: detail.warehouse_code,
          warehouse_name: detail.warehouse_name,
          name: detail.name,
          quantity: detail.quantity,
          status: detail.status,
          stock_max: detail.stock_max,
          stock_min: detail.stock_min
        }))
      })
      .catch((err) => {        
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      });      
    }    
  });  
    
  const submit = async () => {    
    pending.value = true
    // movement.main.warehouse_uuid = storeWarehouse.uuid // It is not needed
    return await MovementService.insertMovement(movementTypeId.value, toRaw(movement))
      .then((response) => {         
        alert( response.data.message )
        router.push( { path: `/${routePath.value}/edit/${response.data.id}` } )
      })
      .catch((err) => {                
        console.log( err.response.data )
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })
  }

  const updateDetails = (details: Detail[]) => {
    movement.details = details.map((detail: Detail) => ({
      close: detail.close,
      id: detail.article_id,
      int_cod: detail.int_cod,
      name: detail.name,
      warehouse_code: detail.warehouse_code,
      warehouse_name: detail.warehouse_name,
      quantity: detail.quantity,
      status: detail.status,
      stock_max: detail.stock_max,
      stock_min: detail.stock_min
    }))  
  }

  return {    
    movement,
    errors,
    pending,

    submit,
    updateDetails
  }
}
