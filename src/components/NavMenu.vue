<template>
    <v-footer class="card" padless>
        <v-tooltip class="custom-tooltip" location="top" v-for="(icon, index) in icons" :key="index">
          <template v-slot:activator="{on, props }">
            <router-link :to="icon.route">
              <v-btn class="mx-11 icono" icon v-on="on" v-bind="props">
              <v-icon size="23px" color="#9C75D1">
                {{ icon.icon }}
              </v-icon>
            </v-btn>
            </router-link>
            
          </template>
          <span>{{ icon.name }}</span>
        </v-tooltip>
      </v-footer>
</template>
<script>
export default {
data(){
    return{
      icons: [
      { icon: 'mdi-playlist-plus', name: 'Crear Playlist', route: '/crear-playlist' },
      { icon: 'mdi-harddisk', name: 'Crear Genero', route: '/crear-genero' },
      { icon: 'mdi-account', name: 'Crear Autor', route: '/crear-autor' },
      { icon: 'mdi-package-up', name: 'Crear Cancion', route: '/crear-cancion'},
      ],
    }
}
  }
</script>
<style scoped >
.card {
  height: auto;
  margin-top: 20px;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
}
.bar {
  height: 10px;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
}
.card2 {
  margin-top: 20px;
}
.ti {
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda+SC:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
  text-align: center;
  font-size: 30px;
  font-family: "Noto Serif", serif;
  font-optical-sizing: auto;
  color: aliceblue;
  font-weight: bold;
}
.color {
  background-color: #B45BC8;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 10px;
}
.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}
</style>
