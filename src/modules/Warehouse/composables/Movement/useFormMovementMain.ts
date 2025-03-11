import { ref, computed, inject } from 'vue' // reactive
import { useVuelidate } from "@vuelidate/core";
import useRoutePath from "./useRoutePath"
import { required, helpers } from "@vuelidate/validators";
import type { Main, Detail } from "../../types/Movement"
import useHttp from "@/composables/useHttp";
import MovementDetailService from "@/modules/Warehouse/services/MovementDetail";
import type { Movement } from "../../types/Movement";


export default () => {
  const {
    movement: { main },
    updateDetails
  } : {
    movement: Movement ,
    updateDetails: (details: Detail[]) => void
  } = inject('movement');

  const { movementTypeId } = useRoutePath()
  const options = ref([]);

  if (movementTypeId.value === '1' ) {
    options.value.push(
      { id: '1', name: 'Orden de Compra' },
      { id: '2', name: 'Orden de Entrada' },
      { id: '3', name: 'Reposición' }
    )
  } else if (movementTypeId.value === '2' ) {
    options.value.push(
      { id: '4', name: 'Factura' },
      { id: '5', name: 'Orden de Salida' },
      { id: '6', name: 'Requisición' }
    )
  } else if (movementTypeId.value === '3' ) {
    options.value.push({ id: '7', name: 'Movimiento de Entrada' })
    main.support_type_id = "7"
  } else if (movementTypeId.value === '4' ) {
    options.value.push({ id: '8', name: 'Movimiento de Salida' })
    main.support_type_id = "8"
  }

  const rules = computed(() => {
    return {
      date_time: {
        required: helpers.withMessage("Campo requerido", required),
      },
      subject: {
        required: helpers.withMessage("Campo requerido", required),
      },
      description: {
        required: helpers.withMessage("Campo requerido", required),
      },
      observation: {},      
      support_type_id: {
        required: helpers.withMessage("Campo requerido", required),
      },
      support_number: {
        required: helpers.withMessage("Campo requerido", required),
      },
      //support_date: {
      //  required: helpers.withMessage("Campo requerido", required),
      //}      
    }
  })

  const v$ = useVuelidate(rules, (main as any));

  const search = (supportNumber: string) => {
    if (!supportNumber) {
      alert('Debe ingresar un número válido.')
      return
    }
    
    MovementDetailService.getMovementDetailsByNumber(supportNumber, main.type_id)
      .then((response)=> {
        updateDetails(response.data)
      })
  }

  const isReverse = computed(() => ['3' , '4'].includes(main.type_id))

  return { isReverse, options, v$, search }
}
 