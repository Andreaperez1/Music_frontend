import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import NavMenu from './components/NavMenu.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

// Cargar las fuentes
loadFonts();



// Crear la aplicación
const app = createApp(App);

// Usar los plugins y componentes
app.use(VueAxios, axios);
app.use(vuetify);
app.use(router);
app.component('NavMenu', NavMenu);

// Montar la aplicación
app.mount('#app');
