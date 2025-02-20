<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import { useRouter } from 'vue-router';
const router = useRouter();
// 1. Datos de prueba
const mockData = {
  stockLevels: [
    { name: 'Maiz', stock: 50, min_stock: 30 },
    { name: 'Trigo', stock: 30, min_stock: 40 },
    { name: 'Lentejas', stock: 70, min_stock: 20 },
    { name: 'Frijoles', stock: 25, min_stock: 30 },
    { name: 'Arroz', stock: 60, min_stock: 50 }
  ],
  
  categories: [
    { name: 'Alimentos', percentage: 40 },
    { name: 'Higiene del Hogar', percentage: 25 },
    { name: 'Aseo Personal', percentage: 15 },
    { name: 'Otros', percentage: 20 }
  ],
  
  movements: {
    series: [
      { name: 'Entradas', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: 'Salidas', data: [20, 30, 25, 40, 35, 50, 45, 70, 80] }
    ],
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
  },
  
  lowStockItems: [
    { id: 1, name: 'Trigo', stock: 25, min_stock: 40, last_entry: '2024-03-15' },
    { id: 2, name: 'Frijoles', stock: 10, min_stock: 30, last_entry: '2024-03-10' },
    { id: 3, name: 'Azúcar', stock: 15, min_stock: 50, last_entry: '2024-03-20' }
  ],
  
  warehouses: [
    { id: 'alm1', name: 'Almacén Principal' },
    { id: 'alm2', name: 'Almacén Secundario' }
  ]
};
// 2. Configuración de gráficos
const chartColors = {
  bar: {
    ranges: [
      { from: 0, to: 20, color: '#EF4444' },
      { from: 21, to: 50, color: '#F59E0B' },
      { from: 51, color: '#10B981' }
    ]
  },
  pie: ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899']
};
// 3. Variables reactivas
const loading = ref(true);
const filters = ref({
  timeRange: '30d',
  warehouse: 'all'
});
// 4. Datos para gráficos y tablas
const stockByProductSeries = ref([{
  name: 'Stock',
  data: mockData.stockLevels.map(item => item.stock)
}]);
const stockByProductOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: {
        position: 'top',
        formatter: function(val: number) {
          return val > 0 ? val.toString() : '';
        }
      }
    }
  },
  colors: chartColors.bar.ranges.map(r => r.color),
  xaxis: {
    categories: mockData.stockLevels.map(item => item.name),
    title: { text: 'Producto' }
  },
  yaxis: {
    title: { text: 'Unidades' }
  },
  tooltip: {
    y: { formatter: (val: number) => `${val} Unidades` }
  }
});
const categoryDistributionSeries = ref(mockData.categories.map(c => c.percentage));
const categoryDistributionOptions = ref({
  chart: { type: 'pie', toolbar: { show: false } },
  labels: mockData.categories.map(c => c.name),
  colors: chartColors.pie,
  responsive: [{
    breakpoint: 480,
    options: { chart: { width: 200 }, legend: { position: 'bottom' } }
  }]
});
const stockMovementSeries = ref(mockData.movements.series);
const stockMovementOptions = ref({
  chart: {
    height: 350,
    type: "line",
    zoom: { enabled: false },
    toolbar: { show: false }
  },
  stroke: { curve: 'straight' },
  xaxis: {
    categories: mockData.movements.categories,
    title: { text: 'Mes' }
  },
  yaxis: {
    title: { text: 'Unidades' }
  }
});
// 5. Funciones de utilidad
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
const exportLowStock = () => {
  const csvContent = [
    'Producto,Stock Actual,Stock Mínimo,Última Entrada',
    ...mockData.lowStockItems.map(item => 
      `${item.name},${item.stock},${item.min_stock},${formatDate(item.last_entry)}`
    )
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'bajo_stock.csv';
  link.click();
};
// 6. Simular carga inicial
onMounted(() => {
  setTimeout(() => loading.value = false, 1500);
});
// 7. KPIs calculados
const kpis = computed(() => ({
  totalInventory: mockData.stockLevels.reduce((sum, item) => sum + item.stock, 0),
  lowStockItems: mockData.lowStockItems.length,
  nearExpiry: 3 // Valor de ejemplo
}));
</script>

<template>
  <div class="p-4 sm:p-6">
    <h1 class="text-2xl font-semibold mb-6">Panel de Control de Inventario</h1>
    <!-- Filtros -->
    <div class="mb-6 flex gap-4 items-center">
      <select 
        v-model="filters.timeRange"
        class="px-4 py-2 border rounded bg-white"
      >
        <option value="7d">Últimos 7 días</option>
        <option value="30d">Últimos 30 días</option>
        <option value="6m">Últimos 6 meses</option>
      </select>
      
      <select 
        v-model="filters.warehouse"
        class="px-4 py-2 border rounded bg-white"
      >
        <option value="all">Todos los almacenes</option>
        <option 
          v-for="warehouse in mockData.warehouses" 
          :value="warehouse.id"
        >
          {{ warehouse.name }}
        </option>
      </select>
    </div>
    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-sm text-blue-600 font-medium">Inventario Total</h3>
        <p class="text-2xl font-semibold mt-2">{{ kpis.totalInventory }} Unidades</p>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg">
        <h3 class="text-sm text-orange-600 font-medium">Artículos con Bajo Stock</h3>
        <p class="text-2xl font-semibold mt-2">{{ kpis.lowStockItems }}</p>
      </div>
      <div class="bg-red-50 p-4 rounded-lg">
        <h3 class="text-sm text-red-600 font-medium">Próximos a Vencer</h3>
        <p class="text-2xl font-semibold mt-2">{{ kpis.nearExpiry }}</p>
      </div>
    </div>
    <!-- Gráficos -->
    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-64 bg-gray-200 rounded"></div>
      <div class="h-64 bg-gray-200 rounded"></div>
      <div class="h-64 bg-gray-200 rounded"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Gráfico de Barras -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-medium mb-2">Nivel de Stock por Producto</h2>
        <VueApexCharts 
          type="bar" 
          :series="stockByProductSeries" 
          :options="stockByProductOptions"
        />
      </div>

      <!-- Gráfico de Torta -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-medium mb-2">Distribución de Categorías</h2>
        <VueApexCharts 
          type="pie" 
          :series="categoryDistributionSeries" 
          :options="categoryDistributionOptions"
        />
      </div>

      <!-- Gráfico de Línea -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-medium mb-2">Movimiento de Stock</h2>
        <VueApexCharts 
          type="line" 
          :series="stockMovementSeries" 
          :options="stockMovementOptions"
        />
      </div>
    </div>

    <!-- Tabla de Bajo Stock -->
    <div class="mt-6 bg-white shadow rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium">Artículos con Bajo Stock</h2>
        <button 
          @click="exportLowStock"
          class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
        >
          Exportar CSV
        </button>
      </div>
      
      <table class="w-full">
        <thead>
          <tr class="text-left border-b text-sm">
            <th class="pb-2">Producto</th>
            <th class="pb-2">Stock Actual</th>
            <th class="pb-2">Stock Mínimo</th>
            <th class="pb-2">Última Entrada</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="item in mockData.lowStockItems" 
            :key="item.id"
            class="border-b hover:bg-gray-50 text-sm"
            :class="{ 'bg-red-50': item.stock < item.min_stock * 0.5 }"
          >
            <td class="py-3">
              <router-link 
                :to="`/products/${item.id}`" 
                class="text-blue-600 hover:underline"
              >
                {{ item.name }}
              </router-link>
            </td>
            <td class="py-3">{{ item.stock }}</td>
            <td class="py-3">{{ item.min_stock }}</td>
            <td class="py-3">{{ formatDate(item.last_entry) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* Estilos adicionales para mejorar la accesibilidad */
.chart-container .apexcharts-tooltip {
  @apply bg-white shadow-lg rounded border border-gray-200;
}
.apexcharts-menu-item:hover {
  @apply bg-gray-100;
}
</style>