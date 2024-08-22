<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <v-card
      class="mx-auto border-md rounded-lg card"
      height="auto"
      width="36%"
      rounded="0"
      flat
    >
      <v-card-title class="ti"> Crear Playlist </v-card-title>
      <v-toolbar extended prominent class="bar">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-text>
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Buscar..."
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12">
        <v-row>
          <v-col cols="12">
            <v-form ref="formPlaylist" v-model="validaPlaylist" lazy-validation>
              <v-text-field
                v-model="paquetePlaylist.nombre"
                :rules="campoRules"
                label="Nombre de la playlist"
                placeholder="Ej: mis favory"
                required
              ></v-text-field>

              <h3 class="agregar">Agregar Canciones</h3>

              <v-combobox
                v-model="paquetePlaylist.cancion"
                :items="canciones"
                item-value="id"
                item-title="nombre"
                label="Canción"
                required
                @change="agregarCancion"
              ></v-combobox>
              <div>
                <v-row justify="center" class="mt-4">
                <v-tooltip v-model="show" location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="white"
                      icon="mdi mdi-plus-circle"
                      variant="outlined"
                      v-bind="props"
                      @click="agregarCancion"
                    >
                    </v-btn>
                  </template>
                  <span>Agregar Cancion</span>
                </v-tooltip>
              </v-row>
                <br />
                <v-list dense class="mt-8">
                <v-list-item v-for="(item, index) in playlist" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.titulo }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.autor
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              </div>

              <v-card-actions class="justify-center">
                <v-btn @click="guardarCancion()" class="btn-tabla">
                  {{ editing ? "Modificar" : "Guardar" }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
      </v-container>

      <NavMenu />
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      paquetePlaylist: {
        nombre: null,
        cancion: [],
      },
      canciones: [],
      selectedCancion: null,
      cancionesSeleccionadas: [],
      loading: false,
      campoRules: [(v) => !!v || "Este campo es requerido"],
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Autor", value: "autor" },
      ],
    };
  },

  methods: {
    async obtenerCancion() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/cancion`
        );

        this.canciones = response.data;
      } catch (error) {
        console.error(
          "Error al obtener las canciones:",
          error.response ? error.response.data : error.message
        );
      }
    },
    agregarCancion() {
      if (this.selectedCancion) {
        const cancion = this.canciones.find(
          (c) => c.id === this.selectedCancion
        );
        if (
          cancion &&
          !this.cancionesSeleccionadas.some((c) => c.id === cancion.id)
        ) {
          this.cancionesSeleccionadas.push(cancion);
        }
        this.selectedCancion = null; // Limpiar la selección
      }
    },
    agregarCancionManualmente() {
      if (this.selectedCancion) {
        const cancion = this.canciones.find(
          (c) => c.id === this.selectedCancion
        );
        if (
          cancion &&
          !this.cancionesSeleccionadas.some((c) => c.id === cancion.id)
        ) {
          this.cancionesSeleccionadas.push(cancion);
        }
        this.selectedCancion = null; // Limpiar la selección
      }
    },

    guardarPlaylist() {
      console.log(
        "Guardando Playlist:",
        this.paquetePlaylist.nombre,
        this.cancionesSeleccionadas
      );
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
  },

  created() {
    this.obtenerCancion();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bodoni+Moda+SC:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");

.card {
  margin-top: 20px;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(137, 41, 184, 1) 100%
  );
}

.bar {
  height: 5px;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(137, 41, 184, 1) 100%
  );
}

.ti {
  text-align: center;
  font-size: 30px;
  font-family: "Noto Serif", serif;
  font-optical-sizing: auto;
  color: aliceblue;
  font-weight: bold;
  margin-top: 30px;
}
.agregar {
  text-align: center;
  font-size: 20px;
  font-family: "Noto Serif", serif;
  font-optical-sizing: auto;
  color: aliceblue;
  font-weight: bold;
  margin-top: 30px;
}
.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}
.btn-tabla {
  background-color: purple;
  color: aliceblue;
  font-weight: bold;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
</style>
