// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import CrearCancion from './components/CrearCancion.vue';
import CrearPlaylist from './components/CrearPlaylist.vue';
import CrearAutor from './components/CrearAutor.vue';
import CrearGenero from './components/CrearGenero.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/crear-cancion', component: CrearCancion },
  { path: '/crear-playlist', component: CrearPlaylist},
  { path: '/crear-autor', component: CrearAutor },
  { path: '/crear-gene', component: CrearGenero },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
