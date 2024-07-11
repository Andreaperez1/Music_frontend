<template>
  <v-app>
    <v-card class="mx-auto border-md rounded-lg card" height="auto" width="36%" rounded="0" flat>
      <v-card-title class="ti">
        REPRODUCTOR ANDLEY
      </v-card-title>
      <v-toolbar extended prominent class="bar">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-card-text>
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Search templates"
            variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-card class="mx-auto my-15 card2" max-width="444">
        <v-card-text>
          <v-carousel v-model="activeSlide" :cycle="true" :interval="5000" height="400" hide-delimiters
            show-arrows="false">
            <v-carousel-item v-for="(item, index) in items" :key="index">
              <v-img :src="require(`@/assets/${item.src}`)" :alt="item.alt" height="400"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>

      <v-footer class="card" padless>
        <v-tooltip class="custom-tooltip" location="top" v-for="icon in icons" :key="icon.name">
          <template v-slot:activator="{ props }">
            <v-btn class="mx-8 icono" icon v-bind="props" @click="navigate(icon.route)">
              <v-icon size="23px" color="#9C75D1">
                {{ icon.icon }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ icon.name }}</span>
        </v-tooltip>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      loading: false,
      activeSlide: 1,
      items: [
        { src: 'adele.jpg', alt: 'Imagen 1' },
        { src: 'rihana.jpg', alt: 'Imagen 2' },
      ],
      icons: [
      { icon: 'mdi-playlist-plus', name: 'Crear Playlist', route: '/crear-playlist' },
      { icon: 'mdi-harddisk', name: 'Crear Genero', route: '/crear-genero' },
      { icon: 'mdi-account', name: 'Crear Autor', route: '/crear-autor' },
      { icon: 'mdi-package-up', name: 'Crear Cancion', route: '/crear-cancion' },
      ],
    };
  },
  methods: {
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    navigate(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.card {
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
