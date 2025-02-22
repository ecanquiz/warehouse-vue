import type { StoreWarehouse } from '@/modules/Store/types/Warehouse/index'

export default (): StoreWarehouse => ({
  uuid: '',
  name: '',
  loading: false,
  error: '',
});
