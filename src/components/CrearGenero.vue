<template>
  <v-app>
    <v-card class="mx-auto border-md rounded-lg card" height="auto" width="36%" rounded="0" flat>
      <v-card-title class="ti">
        Crear Género
      </v-card-title>
      <v-toolbar extended prominent class="bar">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-text>
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Buscar"
            variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12">
        <v-row>
          <v-col cols="12">
            <v-form ref="formGenero" v-model="validaGenero" lazy-validation @submit.prevent="guardarGenero">
              <v-text-field v-model="paqueteGe.nombre" :rules="campoRules" label="Nombre del Género" placeholder="Ej: Rock" required></v-text-field>
              <v-card-actions class="justify-center">
                <v-btn type="submit" class="btn-tabla">{{ editMode ? 'Actualizar' : 'Guardar' }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-toolbar flat>
              <v-toolbar-title class="center-title">Lista de Géneros</v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="headers" :items="generos" class="elevation-1">
              <template v-slot:top>
                <v-row class="headers-row">
                  <v-col class="header-col">
                    Nombre
                  </v-col>
                  <v-col class="header-col">
                    Acciones
                  </v-col>
                </v-row>
              </template>
              <template v-slot:item="{ item }">
                <tr class="data-row">
                  <td class="data-cell">{{ item.nombre }}</td>
                  <td class="data-cell">
                    <v-btn small @click="editGenero(item)" class="mx-2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small @click="deleteGenero(item.id)" class="mx-2">
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'CrearGenero',
  data() {
    return {
      paqueteGe: {
        nombre: ''
      },
      generos: [],
      loading: false,
      validaGenero: false,
      campoRules: [(v) => !!v || 'Este campo es requerido'],
      headers: [
        { text: 'Nombre', value: 'nombre', align: 'start' },
        { text: 'Acciones', value: 'actions', align: 'end' },
      ],
      editMode: false,
      editId: null
    };
  },
  methods: {
    async guardarGenero() {
      try {
        if (this.editMode) {
          await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/generos/${this.editId}`, this.paqueteGe);
          Swal.fire({
            title: 'Éxito!',
            text: 'Género actualizado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } else {
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/generos`, this.paqueteGe);
          Swal.fire({
            title: 'Éxito!',
            text: 'Género guardado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
        this.resetForm();
        this.obtenerGeneros();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el género',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error al guardar el género:', error.response ? error.response.data : error.message);
      }
    },
    async obtenerGeneros() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/generos`);
        this.generos = response.data;
      } catch (error) {
        console.error('Error al obtener los géneros:', error.response ? error.response.data : error.message);
      }
    },
    async editGenero(item) {
      this.paqueteGe = { ...item };
      this.editId = item.id;
      this.editMode = true;
    },
    async deleteGenero(id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/generos/${id}`);
        Swal.fire({
          title: 'Éxito!',
          text: 'Género eliminado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.obtenerGeneros();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error al eliminar el género',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error al eliminar el género:', error.response ? error.response.data : error.message);
      }
    },
    resetForm() {
      this.paqueteGe = { nombre: '' };
      this.editMode = false;
      this.editId = null;
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
  mounted() {
    this.obtenerGeneros();
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

.center-title {
  text-align: center;
}

.headers-row {
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0;
}

.header-col {
  flex: 1;
  text-align: center;
  padding: 8px;
}

.data-row {
  text-align: center;
  border-bottom: 1px solid #e0e0e0; /* Opcional: agregar borde inferior para separación de filas */
}

.data-cell {
  padding: 8px; /* Ajustar el relleno si es necesario */
}

.v-btn {
  min-width: 0; /* Ajusta el ancho mínimo de los botones */
}
</style>
