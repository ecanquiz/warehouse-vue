<script setup lang="ts">
import {ref} from 'vue'
import FormPresentation from './FormPresentation.vue'
//import TablePresentation from './TablePresentation.vue'
//import useTabPresentation from '../../composables/Product/useTabPresentation'
const componentKey = ref(0);

const props = defineProps<{ id?: string }>()

/*const {
  panelOpened,
  closeButtonOpened,
  closeClassOpened,  
  presentations,
  presentation,
  saleTypeOptions,
  statusOptions,

  edit,
  getPresentations,
  remove,  
  submit,
  togglePanel
} = useTabPresentation(props.id)*/
</script>

<template>
  <div class="demo-tab">
    <div class="form-group row">
      <div class="col-sm-12">
        <div align="center">
          <!--AppBtn
            class="btn p-8"
            type="text"                 
            data-testid="click-btn"
            :class="closeClassOpened"
            :text="`${closeButtonOpened} panel para agregar Presentación`"
            @click="togglePanel"
          />
          <FormPresentation
            v-if="panelOpened"
            class="bg-base-200 py-4 mt-2 rounded"
            :presentation="presentation"
            :saleTypeOptions="saleTypeOptions"
            :statusOptions="statusOptions"
            @submit="submit"
          />
          <TablePresentation
            :key="componentKey"
            v-if="presentations"
            :presentations="presentations"
            @edit="edit"
            @getPresentations="getPresentations"
            @remove="remove"            
          /-->
        </div>
      </div>
    </div>
  </div>
</template>
