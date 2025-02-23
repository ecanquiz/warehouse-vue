import type { StoreWarehouse } from '@/modules/Warehouse/types/Warehouse/index'

export default (): StoreWarehouse => ({
  uuid: '',
  name: '',
  loading: false,
  error: '',
});
