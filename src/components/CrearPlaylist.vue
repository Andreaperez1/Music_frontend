<template>
  <v-app>
    <v-card class="mx-auto border-md rounded-lg card" height="auto" width="36%" rounded="0" flat>
      <v-card-title class="ti">
        Crear Playlist
      </v-card-title>
      <v-toolbar extended prominent class="bar">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-text>
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Buscar..."
            variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12">
        <v-row>
          <v-col cols="12">
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model="nombre" label="Nombre de la playlist" required></v-text-field>
              <v-textarea v-model="descripcion" label="Descripción"></v-textarea>
              <h3>Agregar Canciones</h3>
              <v-select v-model="cancion" :items="canciones" label="Canción" item-text="titulo" item-value="id" chips
                dense multiple></v-select>

              <v-row justify="center" class="mt-4">
                <v-tooltip v-model="show" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn color="white" icon="mdi mdi-plus-circle" variant="outlined" v-bind="props" @click="agregarCancion">
                    </v-btn>
                  </template>
                  <span>Agregar Cancion</span>
                </v-tooltip>
              </v-row>


              
              <v-list dense class="mt-8">
                <v-list-item v-for="(item, index) in playlist" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.autor }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-btn type="submit" color="primary" class=" mt-8 mx-auto d-block">Guardar</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>

      <NavMenu />
    </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'CrearPlaylist',
  data() {
    return {
      show: false,
      nombre: '',
      descripcion: '',
      cancion: null,
      canciones: [
        { id: 1, titulo: 'Canción 1', autor: 'Autor 1' },
        { id: 2, titulo: 'Canción 2', autor: 'Autor 2' },
        { id: 3, titulo: 'Canción 3', autor: 'Autor 3' },
        { id: 4, titulo: 'Canción 4', autor: 'Autor 4' },
        { id: 5, titulo: 'Canción 5', autor: 'Autor 5' },
      ],
      playlist: [],
      loading: false,

    };
  },
  methods: {
    submitForm() {
      const data = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        playlist: this.playlist,
      };
      console.log('Formulario enviado:', data);
      // Lógica para enviar el formulario a un backend o similar
    },
    agregarCancion() {
      if (this.cancion) {
        const selectedCanciones = this.cancion.map((c) => {
          return {
            id: c.id,
            titulo: c.titulo,
            autor: c.autor,
          };
        });
        this.playlist = this.playlist.concat(selectedCanciones);
        this.cancion = null;
      }
    },
    goBack() {
      this.$router.back(); // Navega hacia atrás en el historial usando Vue Router
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
  margin-top: 30px;
  /* Ajuste para centrar verticalmente el título */
}

.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}
</style>
