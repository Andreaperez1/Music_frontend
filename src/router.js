// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import CrearCancion from './components/CrearCancion.vue';
import CrearPlaylist from './components/CrearPlaylist.vue';
import CrearAutor from './components/CrearAutor.vue';
import CrearGenero from './components/CrearGenero.vue';

const routes = [
  { path: '/', name:'1', component: HelloWorld },
  { path: '/crear-cancion', name:'2', component: CrearCancion},
  { path: '/crear-playlist', name:'3', component: CrearPlaylist},
  { path: '/crear-autor',name:'4', component: CrearAutor },
  { path: '/crear-genero',name:'4+1', component: CrearGenero },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
