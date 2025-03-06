import type { StoreWarehouse } from '@/modules/Warehouse/types/Warehouse/index'

export default (): StoreWarehouse => ({
  uuid: '',
  code: '',
  name: '',
  loading: false,
  error: '',
});
