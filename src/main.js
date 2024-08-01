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



// Cargar las fuentes
loadFonts();

// Crear la aplicación
const app = createApp(App);
app.use(VueAxios, axios)



// Configurar componentes y plugins
app.component("NavMenu", NavMenu);
app.use(router);

app.use(vuetify);




// Montar la aplicación
app.mount('#app');
