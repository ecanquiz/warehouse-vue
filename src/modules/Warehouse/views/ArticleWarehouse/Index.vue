<script setup lang="ts">
import { ref } from 'vue';
import ArticleWarehouseTable from './components/ArticleWarehouseTable/Index.vue';
import ArticleSearchTable from './components/ArticleSearchTable/Index.vue';
import usePanelToggle from './composables/usePanelToggle';
import type { ArticleSelected } from '@/modules/Warehouse/types/ArticleWarehouse'

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleDetail
} = usePanelToggle()

const componentKey = ref(0);

const articleIds = ref<string>("");

const unnamedArray = ref<string[]>([]);

const updateArticleIds = (arr: string = "[]"): void => {
  articleIds.value = arr
}

const selectArticle = (selectedArticle: ArticleSelected) => {
  for (let key in selectedArticle) 
    if (selectedArticle[key]) {
      if (!unnamedArray.value.find(i => i === key)) 
        unnamedArray.value.push(key);
    }
    else 
      unnamedArray.value = unnamedArray.value.filter(item => item !== key);  
}
</script>

<template>
<div>
  <AppPageHeader> Artículos por almacén </AppPageHeader> {{ articleIds }}
  <div class="grid justify-items-stretch mt-2">{{ unnamedArray }}
      <AppButton
        class="btn p-8 justify-self-start m-1"
        type="button"                 
        data-testid="click-btn"
        :class="closeClassOpened"
        :text="`${closeButtonOpened}`"
        @click="panelToogleDetail"
      />
    <ArticleSearchTable
      v-if="panelOpened"
      class="bg-base-200 py-4 mt-6 rounded"
      :articleIds="articleIds"
      @selectArticle="selectArticle"
    />
  </div>
  <ArticleWarehouseTable
    :articleIds="articleIds"
    @updateArticleIds="updateArticleIds"
  />
</div>
</template>
