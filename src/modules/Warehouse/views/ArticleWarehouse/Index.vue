<script setup lang="ts">
import ArticleWarehouseTable from './components/ArticleWarehouseTable/Index.vue';
import ArticleSearchTable from './components/ArticleSearchTable/Index.vue';
import usePanelToggle from './composables/usePanelToggle';
import useIndex from './composables/useIndex';

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleDetail
} = usePanelToggle()

const {
  articleIds,
  componentKey,

  selectArticles,
  submit,
  updateArticleIds
} = useIndex()

</script>

<template>
<div>
  <AppPageHeader> Artículos por almacén </AppPageHeader>
  <div class="grid justify-items-stretch mt-2">
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
      @selectArticles="selectArticles"
      @submit="submit"
      :key="componentKey"
    />
  </div>
  <ArticleWarehouseTable
    :articleIds="articleIds"
    @updateArticleIds="updateArticleIds"
    :key="componentKey"
  />
</div>
</template>
