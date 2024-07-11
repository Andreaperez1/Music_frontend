<template>
  <v-app>
    <v-card class="mx-auto border-md rounded-lg card" height="auto" width="36%" rounded="0" flat>
      <v-card-title class="ti">
        Crear Autor
      </v-card-title>
      <v-toolbar extended prominent class="bar">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-text>
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
            label="Buscar " variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12"> 
        <v-row>
          <v-col cols="12">
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model="nombre" label="Nombre del autor" required></v-text-field>
              <v-text-field v-model="pais" label="País"></v-text-field>
              <v-btn type="submit" color="primary" class="mx-auto d-block">Guardar</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>

      <v-footer class="card" padless>
        <v-tooltip class="custom-tooltip" location="top" v-for="icon in icons" :key="icon.name">
          <template v-slot:activator="{ props }">
            <v-btn class="mx-8 icono" icon v-bind="props" @click="goToView(icon.route)">
              <v-icon size="24px" color="#9C75D1">
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
  name: 'CrearAutor',
  data() {
    return {
      nombre: '',
      pais: '',
      loading: false,
      icons: [
        { icon: 'mdi-playlist-plus', name: 'Crear Playlist', route: '/crear-playlist' },
        { icon: 'mdi-harddisk', name: 'Crear Genero', route: '/crear-genero' },
        { icon: 'mdi-account', name: 'Crear Autor', route: '/crear-autor' },
        { icon: 'mdi-package-up', name: 'Crear Cancion', route: '/crear-cancion' },
      ],
    };
  },
  methods: {
    submitForm() {
      const data = {
        nombre: this.nombre,
        pais: this.pais,
      };
      console.log('Formulario enviado:', data);
      // Aquí iría la lógica para enviar el formulario a un backend o similar
    },
    goBack() {
      this.$router.back(); 
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    goToView(route) {
      this.$router.push(route); // Navega a la ruta especificada usando Vue Router
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda+SC:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.card {
  margin-top: 20px;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
}

.bar {
  height: 5px;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
}

.ti {
  text-align: center;
  font-size: 30px;
  font-family: "Noto Serif", serif;
  font-optical-sizing: auto;
  color: aliceblue;
  font-weight: bold;
  margin-top: 30px; /* Ajuste para centrar verticalmente el título */
}

.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}
</style>
