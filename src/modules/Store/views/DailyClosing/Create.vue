<script lang="ts" setup>
import { computed, provide } from 'vue';
import { useRouter } from 'vue-router';
import AppPageHeader from '@/components/AppPageHeader.vue';
import PreDailyClosing from "../../components/DailyClosing/PreDailyClosing.vue";
import FormDailyClosing from '../../components/DailyClosing/FormDailyClosing.vue';
import useDailyClosings from '../../composables/DailyClosing/useDailyClosing';

const router = useRouter();

const {
  preDailyClosings,
  errors,
  pending,      
  submit    
} = useDailyClosings()
</script>

<template>
  <div>
    <AppPageHeader>Cierres Diarios / Crear</AppPageHeader>
    <div  class="flex space-x-2">
      <button
        class="btn btn-primary mb-4"
        @click="router.push({ path: '/daily-closings' })"
      >
        Ver todos
      </button>
    </div>
    <div class="demo-tab">
      <PreDailyClosing
        v-if="preDailyClosings && preDailyClosings.length"
        :preDailyClosings="preDailyClosings"
      />
      <div v-else>Loading...</div>
      <div>
      <FormDailyClosing
        :errors="errors"
        :pending="pending"
        @submit="submit"
      />      
    </div>
    </div>
  </div>
</template>

<style scoped>
.demo-tab {
  @apply
    border
    border-solid
    p-2.5;
}
</style>
