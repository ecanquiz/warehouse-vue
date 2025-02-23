<script lang="ts" setup>
import { computed, provide } from 'vue'
import { useRouter } from 'vue-router'
import FormMovement from '../../components/Movement/FormMovement.vue';
import useMovement from '../../composables/Movement/useMovement';
import useRoutePath from '../../composables/Movement/useRoutePath';

const router = useRouter();
const { routePath } = useRoutePath()

const props = defineProps<{ id?: string }>()

const {  
  movement,
  errors,
  pending,

  submit,
  updateDetails 
} = useMovement(props.id)

provide('movement', { movement, updateDetails })

const isTrue = computed(
  () => movement && movement.main.id || !props.id
)
</script>

<template>
  <div>
    <AppPageHeader>{{routePath.toLocaleUpperCase()}} / {{ !props.id ? "Crear" : "Editar" }}</AppPageHeader>
    <div  class="flex space-x-2">
      <button
        class="btn btn-primary mb-4"
        @click="router.push({ path: `/${routePath}` })"
      >
        Ver todos
      </button>
    </div>
    <div class="demo-tab">
      <div>
      <FormMovement
        v-if="isTrue"        
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
