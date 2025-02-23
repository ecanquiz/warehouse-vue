import {computed} from 'vue'
import type {ComputedRef} from 'vue'
import type {RouteLocationNormalizedLoadedGeneric} from 'vue-router'

export default (route: RouteLocationNormalizedLoadedGeneric, routePath: ComputedRef<string>) => {
  const pageHeader = computed(() => {
    switch (routePath.value) {
      case "inputs"         : return 'Entradas';
      case "outputs"        : return 'Salidas';
      case "input-reverses" : return 'Reversos de Entrada';
      case "output-reverses": return 'Reversos de Salida';
      case "movements"      : return 'Movimientos';
    }
  })

  const formatMovementTypeId = (movementTypeId: number) => {
    switch (movementTypeId) {
      case 1: return 'Entrada';
      case 2: return 'Salida';
      case 3: return 'Reverso de Entrada';
      case 4: return 'Reverso de Salida';
    }
  };
  
  const isMovementTypeNameValid = () => [
    'inputs',
    'outputs',
    'input-reverses',
    'output-reverses'
  ].includes(
    (route as RouteLocationNormalizedLoadedGeneric).name as string
  );
  
  return {
    pageHeader,

    formatMovementTypeId,
    isMovementTypeNameValid
  }
}
