import { ref, onMounted } from "vue"
import useHttp from "@/composables/useHttp"
import ExistenceService from "../../services/Existences"
import type { Existence } from "@/modules/Warehouse/types/Existence"

export default () => {
  const { errors, getError } = useHttp();
  const existences = ref<Existence[]>([]);

  onMounted(() => {
    ExistenceService.getExistences()
      .then((response) => {
        errors.value = {};
        existences.value=response.data;
      })
      .catch((error) => {
        console.log(error);
      })
  });

  return { existences };
}
