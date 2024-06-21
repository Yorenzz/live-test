import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
createApp(App).use(PrimeVue, { /* options */ }).mount('#app')
