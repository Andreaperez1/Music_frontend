import { createApp } from 'vue';
import App from './App.vue';
 // Importa la instancia personalizada de Axios
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';


import NavMenu from './components/NavMenu.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import VueAxios from 'vue-axios';
import { Axios } from 'axios';



// Cargar las fuentes
loadFonts();

// Crear la aplicación
const app = createApp(App);
app.component(
  "NavMenu", NavMenu

)
app.use(VueAxios,Axios)
app.use(router)
  .use(vuetify)
  .mount('#app');
