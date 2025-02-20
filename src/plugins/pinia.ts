import app from '@/plugins/app'
import { createPinia } from 'pinia'

const pinia = createPinia();

app.use(pinia)

