<script setup lang="ts">
import { inject } from "vue"
import TableSearchDetail from "./TableSearchDetail.vue"
import type { Movement, Detail } from '../../types/Movement';

const { movement: { details } }: {
  movement: Movement
} = inject('movement');

const selectPresentation = (presentation) => {
  const indexFound = details.findIndex((i)=> i.id === presentation.id);
  (indexFound===-1) 
    ? details.push(presentation)
    : details.splice(indexFound,1);
}

const qtyPresentation = (presentation) => {
  const indexFound = details.findIndex((i)=> i.id === presentation.id);
  if (indexFound===-1) { return; } 
  details[indexFound].quantity = presentation.qty 
}
</script>

<template>
  <div class="overflow-x-auto demo-tab">
    <TableSearchDetail
       :selectedPresentations="details"
       @selectPresentation="selectPresentation"
       @qtyPresentation="qtyPresentation"
     />      
  </div>
</template>
