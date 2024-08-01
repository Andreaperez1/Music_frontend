// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import CrearCancion from './components/CrearCancion.vue';
import CrearPlaylist from './components/CrearPlaylist.vue';
import CrearAutor from './components/CrearAutor.vue';
import CrearGenero from './components/CrearGenero.vue';

const routes = [
  { path: '/', name:'app', component: HelloWorld },
  { path: '/crear-cancion',  component: CrearCancion},
  { path: '/crear-playlist',  component: CrearPlaylist},
  { path: '/crear-autor', component: CrearAutor },
  { path: '/crear-genero', component: CrearGenero },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
