<script setup lang="ts">
import {ref, provide, reactive} from 'vue';
import ArticleWarehouseTable from './components/ArticleWarehouseTable/Index.vue';
import ArticleSearchTable from './components/ArticleSearchTable/Index.vue';
import usePanelToggle from './composables/usePanelToggle';

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleDetail
} = usePanelToggle()

const componentKey = ref(0);

const articleIds = ref<string[]>([]);

const unnamedArray = ref<string[]>([]);

const updateArticleIds = (arr: string[] = []): void => {
  articleIds.value = arr
}

provide('articleIds', {articleIds, updateArticleIds});

type SelectedArticle = {
  [key: string]: boolean;
};

const selectArticle = (selectedArticle) => {
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
    <div>
      <AppButton
        class="btn p-8 justify-self-start m-1"
        type="button"                 
        data-testid="click-btn"
        :class="closeClassOpened"
        :text="`${closeButtonOpened}`"
        @click="panelToogleDetail"
      />
      <!--AppBtn v-if="panelOpened"
        class="btn btn-primary p-8 justify-self-end m-1"
        type="button"                 
        data-testid="click-btn"
        :text="'Aceptar'"
        @click="panelOpened=false"
      /-->
    </div>
    <ArticleSearchTable
      v-if="panelOpened"
      class="bg-base-200 py-4 mt-6 rounded"
      @selectArticle="selectArticle"
    />
  </div>
  <ArticleWarehouseTable />
</div>
</template>
