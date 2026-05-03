import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Landing from './views/Landing.vue'

const app = createApp(Landing)
app.use(createPinia())
app.mount('#app')
