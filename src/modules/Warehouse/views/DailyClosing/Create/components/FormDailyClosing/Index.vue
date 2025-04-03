<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useDark } from "@vueuse/core"
import useFormDailyClosing from "./composables/useFormDailyClosing";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const isDark = useDark({
  selector: 'body',
  attribute: 'data-theme',
  valueDark: 'night',
  valueLight: 'winter'
});

const props = defineProps<{
  errors?: String | Object
  pending: Boolean  
}>()

const emits = defineEmits<{ (e: 'submit', form: object): void }>()

const form = reactive({
  date_time: ''
})

const { v$ } = useFormDailyClosing(form);


/*const {
    panelOpened,
    closeButtonOpened,
    closeClassOpened,

    panelToogleMovementDetail
} = useMovementDetail()*/

const submit = async () => {
  const result = await v$.value.$validate();  
  if (result) {
    emits("submit", {date: form.date_time.split('T')[0]});
  }
};


</script>

<template>
  <div class="m-5">
    <AppFlashMessage :error="errors"/>
    <form @submit.prevent="submit">
      <div class="grid lg:grid-cols-2 gap-4">
        <div class="block">
          <label class="block">Fecha de Cierre de Movimientos</label>
          <VueDatePicker
            v-model="form.date_time"
            :dark="isDark"
            :format="'dd/MM/yyyy HH:mm'"
            :max-date="new Date()"
            placeholder="Seleccione Fecha de Cierre de Movimientos"
            required
            utc
            :enable-time-picker="true"
            input-class-name="dp-custom"
            menu-class-name="dp-custom"
          ></VueDatePicker>
          <AppErrorMessage v-if="v$.date_time.$error" :id="`1-error`">{{ v$.date_time.$errors[0].$message }}</AppErrorMessage>
        </div>
      </div>
      <AppButton
        class="btn btn-primary mt-5 justify-self-start"
        type="submit"
        :text="pending ? 'Cerrando...' : 'Cerrar'"
        :isDisabled='pending'
        @submit="submit" 
      />
    </form>
  </div>
</template>
