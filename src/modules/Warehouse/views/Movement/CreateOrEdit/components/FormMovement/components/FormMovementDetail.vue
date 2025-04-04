<script setup lang="ts">
import { inject } from "vue"
import TableSearchDetail from "./TableSearchDetail.vue"
import type { Movement, Detail } from '@/modules/Warehouse/types/Movement';
import type { Article, QtyArticle } from '@/modules/Warehouse/types/Article';

const { movement: { details } }: {
  movement: Movement
} = inject('movement');

const selectArticle = (article: Article) => {
  const indexFound = details.findIndex((i)=> i.id === article.id);
  (indexFound===-1) 
    ? details.push(article as Article as Detail)
    : details.splice(indexFound,1);
}

const qtyArticle = (qtyArticle: QtyArticle) => {
  const indexFound = details.findIndex((i)=> i.id === qtyArticle.id);
  if (indexFound===-1) { return; } 
  details[indexFound].quantity = qtyArticle.qty 
}
</script>

<template>
  <div class="overflow-x-auto demo-tab">
    <TableSearchDetail
       @selectArticle="selectArticle"
       @qtyArticle="qtyArticle"
     />      
  </div>
</template>
