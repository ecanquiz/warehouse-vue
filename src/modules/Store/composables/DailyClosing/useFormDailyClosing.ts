import { ref, computed } from 'vue' // reactive
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default (form) => {


  const rules = computed(() => {
    return {
      //type_id: {
      //  required: helpers.withMessage("Campo requerido", required),
      //},
      //number: {
      //  required: helpers.withMessage("Campo requerido", required),
      //},
      date_time: {
        required: helpers.withMessage("Campo requerido", required),
      }
      
    }
  })


  const v$ = useVuelidate(rules, form);

  
  
  return { v$ }

}
