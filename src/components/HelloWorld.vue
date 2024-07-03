<template>
  <v-card
    class="mx-auto border-md rounded-lg card"
    height="80%"
    width="40%"
    rounded="0"
    flat
  >
    <v-toolbar
      extended
      prominent
      class="bar"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-card-text>
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search templates"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="onClick"
        ></v-text-field>
      </v-card-text>
    </v-toolbar>

    <v-card class="mx-auto my-15 card2" max-width="444">
      <v-card-text>
        <v-carousel
    v-model="activeSlide"
    :cycle="true"
    :interval="5000"
    height="400"
    hide-delimiters
    show-arrows="false"
  >
    <v-carousel-item v-for="(item, index) in items" :key="index">
      <v-img :src="require(`@/assets/${item.src}`)" :alt="item.alt" height="400"></v-img>
    </v-carousel-item>
  </v-carousel>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      loading: false,
      activeSlide: 1, // Índice de la diapositiva activa
      items: [
        { src: 'adele.jpg', alt: 'Imagen 1' },
        { src: 'rihana.jpg', alt: 'Imagen 2' },
        // Agrega más objetos según sea necesario
      ]
    };
  },

  methods: {
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 20px;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
}
.bar {
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
  height: 5%;
}
.card2 {
  margin-top: 20px;
}
</style>
