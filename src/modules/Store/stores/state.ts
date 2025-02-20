import type { SubStore } from '@/modules/Store/types/Store/SubStore'

export default (): SubStore => ({
  uuid: '',
  name: '',
  loading: false,
  error: '',
});
