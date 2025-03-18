<script setup lang="ts">
import {ref} from 'vue';
import ArticleWarehouseTable from '../../components/ArticleWarehouse/ArticleWarehouseTable.vue';
import ArticleSearchTable from '../../components/ArticleWarehouse/ArticleSearchTable.vue';
import usePanelToggle from '../../composables/ArticleWarehouse/usePanelToggle';

const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleDetail
} = usePanelToggle()
const componentKey = ref(0);
</script>

<template>
<div>
  <AppPageHeader> Artículos por almacén </AppPageHeader>
  <div class="grid justify-items-stretch mt-2">
    <div>
      <AppBtn
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
    />
  </div>
  <ArticleWarehouseTable />
</div>
</template>
