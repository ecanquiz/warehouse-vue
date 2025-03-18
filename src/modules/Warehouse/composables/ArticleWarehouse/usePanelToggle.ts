import { computed, ref } from 'vue'

export default () => {  
  const panelOpened = ref(false)
  const closeButtonOpened = computed(()=> panelOpened.value ? "Cancelar" : "Agregar")
  const closeClassOpened = computed(()=> panelOpened.value ? "btn-default" : "btn-primary")

  const panelToogleDetail = ()=> {
    panelOpened.value =! panelOpened.value    
  }  

  return {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleDetail
  }
}
