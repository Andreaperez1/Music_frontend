import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router.js';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import NavMenu from './components/NavMenu.vue';
import VueAxios from 'vue-axios';
import { Axios } from 'axios';


loadFonts();

const app = createApp(App);
app.component(
  "NavMenu", NavMenu
)
app.use(VueAxios,Axios)
app.use(router)
  .use(vuetify)
  .mount('#app');
