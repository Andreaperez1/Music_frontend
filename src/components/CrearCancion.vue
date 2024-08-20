<template>
  <v-app>
    <v-card
      class="mx-auto border-md rounded-lg card"
      height="auto"
      width="36%"
      rounded="0"
      flat
    >
      <v-card-title class="ti"> Crear Canción </v-card-title>
      <v-toolbar extended prominent class="bar">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-text>
          <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density="compact"
            label="Buscar"
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12">
        <v-row>
          <v-col>
            <v-form ref="formCancion">
              <v-text-field
                v-model="paqueteCancion.nombre"
                label="Nombrede la canción"
                required
              ></v-text-field>
              <v-btn
                v-on:click="openWidgetCancion"
                id="upload_widget"
                class="cloudinary-button d-flex justify-center align-center archivo"
                append-icon="mdi mdi-music"
              >
                Subir Cancion
              </v-btn>
              <br />
              <v-select
                v-model="paqueteCancion.autor"
                :items="autores"
                item-value="id"
                item-title="nombre"
                label="Autor"
                required
              
              >
              </v-select>

              <v-combobox
                v-model="paqueteCancion.genero"
                :items="generos"
                item-value="id"
                item-title="nombre"
                label="Genero"
                required
                
              ></v-combobox>

              <v-text-field
                v-model="paqueteCancion.year"
                label="Año de la canción"
                type="number"
                required
              >
              </v-text-field>

              <v-btn
                v-on:click="openWidget"
                id="upload_widget"
                class="cloudinary-button d-flex justify-center align-center archivo"
                append-icon="mdi-cloud-upload"
              >
                Subir Portada
              </v-btn>
              <v-card-actions class="justify-center">
                <v-btn @click="guardarCancion()" class="btn-tabla">
                  {{ editing ? "Modificar" : "Guardar" }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-toolbar flat class="titulo">
              <v-toolbar-title class="center-title"
                >Lista de Canciones</v-toolbar-title
              >
            </v-toolbar>
            <v-data-table :headers="headers" :items="cancion" class="table">
              <template v-slot:item="{ item }">
                <tr class="data-row-1 item">
                  <td class="data"><img  class="img" :src="item.portada" alt="Portada"></td>
                  <td class="data">{{ item.nombre }}</td>
                  <td class="data">
                    {{ item.autor.nombre }}
                  </td>
                  <td class="data">
                    {{ item.genero.nombre }}
                  </td>
                 
                  <td class="data">{{ item.year}}</td>
                  
                

                  <td class="data">
                    <v-btn small @click="editCancion(item)" class="mx-2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small @click="deleteCancion(item.id)" class="mx-2">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>

      <NavMenu />
    </v-card>
  </v-app>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      paqueteCancion: {
        nombre: null,
        cancion: null,
        portada: null,
        year: null,
        autor: null,
        genero: [],
      },
      cancion: [],

      cloudName: "dyyph7teq",
      uploadPreset: "PortadaCancion",
      cancionPreset: "japzop9u",
      imagenDefault: require("@/assets/disco.jpg"),
      autores: [],
      nuevoAutor: false,
      nuevoAutorNombre: "",

      generos: [],
      loading: false,
      editing: false,
      editId: null,
      widgetUpload: null,
      urlCloudinary: null,
      campoRules: [(v) => !!v || "Este campo es requerido"],
      headers: [
        { title: "Portada", value: "portada" },
        { title: "Nombre", value: "nombre" },
        { title: "Autor", value: "autor" },
        { title: "Genero", value: "genero" },
        { title: "Año", value: "year" },
        { title: "Acciones", value: "actions" },
      ],
    };
  },
  methods: {
    async guardarCancion() {
      try {
        if (this.editing) {
          await axios.put(
            `${process.env.VUE_APP_API_BASE_URL}/cancion/${this.currentId}`,
            this.paqueteCancion
          );
          this.ObtenerCancion();
          Swal.fire({
            title: "Éxito!",
            text: "Cancion actualizado con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          this.editing = false;
        } else {
          console.log(this.paqueteCancion);

          await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/cancion/crear`,
            this.paqueteCancion,
          );
          this.ObtenerCancion();
          Swal.fire({
            title: "Éxito!",
            text: "Cancion guardado con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
        this.$refs.formCancion.reset();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al guardar el Cancion",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error(
          "Error al guardar el Cancion:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async ObtenerCancion() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/cancion`
        );
        this.cancion = response.data;
      } catch (error) {
        console.error(
          "Error al obtener los autores:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async editCancion(item) {
      // Preparar el formulario para la edición
      this.paqueteCancion = { ...item };
      this.currentId = item.id;
      this.editing = true; // Cambiar el estado a editar
    },
    openWidget() {
      this.widgetUpload = window.cloudinary.openUploadWidget(
        {
          cloudName: this.cloudName,
          uploadPreset: this.uploadPreset,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);

            this.paqueteCancion.portada = result.info.secure_url;
          }
        }
      );
    },
    openWidgetCancion() {
      this.widgetUpload = window.cloudinary.openUploadWidget(
        {
          clientAllowedFormats: ["mp3"],
          cloudName: this.cloudName,
          uploadPreset: this.cancionPreset,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);

            this.paqueteCancion.cancion = result.info.secure_url;
          }
        }
      );
    },
    async ObtenerAutores() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/autores`
        );
        this.autores = response.data;
        console.log(this.autores);
      } catch (error) {
        console.error(
          "Error al obtener los autores:",
          error.response ? error.response.data : error.message
        );
      }
    },
    asignarAutor(sel) {
      console.log(sel);
      
      this.paqueteCancion.autor = sel.id;
      this.paqueteCancion.genero= sel.genero.flatMap(gen=>gen.id);
    },
    async obtenerGeneros() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/generos`
        );
        this.generos = response.data;
      } catch (error) {
        console.error(
          "Error al obtener los géneros:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async deleteCancion(id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/cancion/${id}`);
        Swal.fire({
          title: "Éxito!",
          text: "Cancion eliminada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        this.ObtenerCancion();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al eliminar la Cancion",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error(
          "Error al eliminar la cancion:",
          error.response ? error.response.data : error.message
        );
      }
    },

    checkAutor() {
      if (this.autor === "Nuevo Autor") {
        this.nuevoAutor = true;
      } else {
        this.nuevoAutor = false;
      }
    },
    goBack() {
      this.$router.back();
    },
    goToView(route) {
      this.$router.push(route);
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  created() {
    this.obtenerGeneros();
    this.ObtenerAutores();
    this.ObtenerCancion();
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
.archivo {
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

.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}
.table {
  color: #0a0409;
  width: 100%;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(137, 41, 184, 1) 100%
  );
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
.titulo {
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(137, 41, 184, 1) 100%
  );
  color: aliceblue;
  font-size: 200px;
  font-family: "Noto Serif", serif;
  font-weight: bold;
  margin-top: 30px;
}

.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}

.center-title {
  text-align: center;
}

.headers-row {
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0;
}
.data {
  width: 10px;
}

.header-col {
  flex: 1;
  text-align: center;
  padding: 8px;
}

.data-row {
  text-align: center;
  border-bottom: 1px solid #c33cac;
  /* Opcional: agregar borde inferior para separación de filas */
}

.v-btn {
  min-width: 0;
  /* Ajusta el ancho mínimo de los botones */
}

.center-title {
  margin-top: 10px;
}
.table {
  color: #0a0409;
  width: 100%;
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(137, 41, 184, 1) 100%
  );
}
.img{
  width: 80px;
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
