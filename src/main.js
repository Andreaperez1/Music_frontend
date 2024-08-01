import { createApp } from 'vue';
import App from './App.vue';
 // Importa la instancia personalizada de Axios
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios';
import NavMenu from './components/NavMenu.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
<<<<<<< HEAD
import NavMenu from './components/NavMenu.vue';
import VueAxios from 'vue-axios';
import { Axios } from 'axios';
=======
>>>>>>> b13545f590fe8b33636b5ce2f61d15a6e7b1974c



// Cargar las fuentes
loadFonts();

// Crear la aplicación
const app = createApp(App);
<<<<<<< HEAD
app.component(
  "NavMenu", NavMenu
)
app.use(VueAxios,Axios)
app.use(router)
  .use(vuetify)
  .mount('#app');
=======
app.use(VueAxios, axios)



// Configurar componentes y plugins
app.component("NavMenu", NavMenu);
app.use(router);

app.use(vuetify);




// Montar la aplicación
app.mount('#app');
>>>>>>> b13545f590fe8b33636b5ce2f61d15a6e7b1974c
