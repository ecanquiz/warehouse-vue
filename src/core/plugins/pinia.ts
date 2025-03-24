import app from '@/core/plugins/app'
import { createPinia } from 'pinia'

const pinia = createPinia();

app.use(pinia)

