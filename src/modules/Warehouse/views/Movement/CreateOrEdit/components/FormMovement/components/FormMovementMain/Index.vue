<script setup lang="ts">
import { inject, computed } from 'vue'
import { useDark } from "@vueuse/core"
import VueDatePicker from '@vuepic/vue-datepicker';
import useFormMovementMain from "./composables/useFormMovementMain";
import type { Movement } from "@/modules/Warehouse/types/Movement";
import '@vuepic/vue-datepicker/dist/main.css'

const isDark = useDark({
  selector: 'body',
  attribute: 'data-theme',
  valueDark: 'night',
  valueLight: 'winter'
});

const { movement: { main, details } }: {
  movement: Movement
} = inject('movement');

const { isReverse, v$, options, search } = useFormMovementMain()
const onlyShow = main.id ? true : false;
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-4">

     <AppInput
       type="hidden"
       v-model="main.type_id"
     />
      <div class="block">
        <label class="block">Fecha</label>
        <VueDatePicker
          v-model="main.date_time"
          :dark="isDark"
          :format="'dd/MM/yyyy HH:mm'"
          :max-date="new Date()"
          placeholder="Seleccionar fecha"
          required
          utc
          :enable-time-picker="true"
          input-class-name="dp-custom"
          menu-class-name="dp-custom"
          :disabled="onlyShow"
        ></VueDatePicker>
        <AppErrorMessage v-if="v$.date_time.$error" :id="`1-error`">{{ v$.date_time.$errors[0].$message }}</AppErrorMessage>
      </div>

      <div class="block">
        <label class="block">Número</label>
        <span class="showSpan">
          {{ main.number ? main.number : "##########"}}
        </span>
        <!--AppInput           
          v-model="main.number"
          label="Number"
          type="text"
          :error="v$.number.$error ? v$.number.$errors[0].$message : null"
        /-->
      </div>      

      <div class="block">
        <AppInput
          v-model="main.subject"
          label="Asunto"
          type="text"
          :error="v$.subject.$error ? v$.subject.$errors[0].$message : null"
          :disabled="onlyShow"
        />
      </div>
        
      <div class="block">   
        <AppTextarea
          label="Descripción"
          v-model="main.description"
          :error="v$.description.$error ? v$.description.$errors[0].$message : null"
          :disabled="onlyShow"
        />
      </div>
        
      <div class="block">
        <AppSelect
          :options="options"
          v-model="main.support_type_id"
          label="Tipo de soporte"
          :error="v$.support_type_id.$error ? v$.support_type_id.$errors[0].$message : null"
          :disabled="onlyShow"
        />
      </div>   
      
      <div class="block flex flex-row">
        <div :class="isReverse ? 'w-4/5' : 'w-full'">
          <AppInput                 
          v-model="main.support_number"
          label="Número de soporte"
          type="text"
          :error="v$.support_number.$error ? v$.support_number.$errors[0].$message : null"
          :disabled="onlyShow"
          />
        </div>
        <div class="flex justify-center w-1/5 my-6" v-if="isReverse">
          <AppButton type="button" text="Buscar" @click="search(main.support_number)"/>
        </div>

      </div>

      <div class="block">     
        <AppTextarea
          label="Observación"
          v-model="main.observation"
          :error="v$.observation.$error ? v$.observation.$errors[0].$message : null"
          :disabled="onlyShow"
        />
      </div>      
        
  </div>
</template>

<style>
[data-theme="winter"] .dp-custom{
  @apply bg-gray-100 text-gray-900 py-2.5;
}

[data-theme="night"] .dp-custom {
  @apply bg-gray-900 text-gray-100 py-2.5;
}

.showSpan {
  @apply block p-2.5 border;
}
</style>