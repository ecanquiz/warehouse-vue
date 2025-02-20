import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default () => {
  const route = useRoute()
  const routePath = computed(()=> route.path.split("/")[1])
  const movementTypeId = computed(()=>{
    switch (routePath.value) {
      case "inputs": return "1";
      case "outputs": return "2";
      case "input-reverses": return "3";
      case "output-reverses": return "4";
      default: return "1";
    }
  })
    
  return { routePath, movementTypeId }
};
