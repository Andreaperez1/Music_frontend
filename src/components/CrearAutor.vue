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
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Buscar"
            variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12">
        <v-row>
          <v-col cols="12">
            <v-form ref="formAutor" v-model="validaAutor" lazy-validation>
              <v-text-field v-model="paqueteAu.nombre" :rules="campoRules" label="Nombre del Autor"
                placeholder="Ej: Adele" required></v-text-field>
              <v-text-field v-model="paqueteAu.pais" :rules="campoRules" label="Pais del Autor" placeholder="Ej: USA"
                required></v-text-field>
                <v-select v-model="paqueteAu.genero[0].id" :items="generos" item-value="id" item-title="nombre"
                                label="Genero" required>
                            </v-select>
              <v-card-actions class="justify-center">
                <v-btn @click="guardarAutor()" class="btn-tabla">
                  {{ editing ? 'Modificar' : 'Guardar' }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12"  >
            <v-toolbar flat class="titulo" >
              <v-toolbar-title class="center-title">Lista de Autores</v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="headers" :items="autores" class="table">
            
              <template v-slot:item="{ item }">
                <tr class="data-row-1 item">
                  <td class="data">{{ item.nombre }}</td>
                  <td class="data">{{ item.pais }}</td>
                  <td class="data">{{ item.generos }}</td>
                  
                  <td class="data">
                    <v-btn small @click="editAutor(item)" class="mx-2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small @click="deleteAutor(item.id)" class="mx-2">
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
  name: 'CrearAutor',
  data() {
    return {
      paqueteAu: {
        nombre: null,
        pais: null ,
        genero:[{id:null}],
      },
      autores: [],
      generos:[],
      loading: false,
      validaAutor: false,
      editing: false, // Estado para editar
      currentId: null, // ID del autor que se está editando
      campoRules: [(v) => !!v || 'Este campo es requerido'],
      headers: [
        { title: 'Nombre', value: 'nombre' },
        { title: 'País', value: 'pais' },
        { title: 'Genero', value: 'genero.nombre' },
        { title: 'Acciones', value: 'actions' },
      ],
    };
  },
  methods: {
    async guardarAutor() {
      try {
        if (this.editing) {
          // Si estamos editando, actualizar el autor
          await axios.put(`${process.env.VUE_APP_API_BASE_URL}/autores/`, this.paqueteAu);
          Swal.fire({
            title: 'Éxito!',
            text: 'Autor modificado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.editing = false; // Cambiar el estado a no editar
        } else {
          // Si estamos creando, guardar un nuevo autor
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/autores`, this.paqueteAu);
          Swal.fire({
            title: 'Éxito!',
            text: 'Autor guardado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        }
        this.paqueteAu.nombre = '';
        this.paqueteAu.pais = '';
        this.obtenerAutores();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el autor',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error al guardar el autor:', error.response ? error.response.data : error.message);
      }
    },
    async obtenerAutores() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/autores`);
        this.autores = response.data;
      } catch (error) {
        console.error('Error al obtener los autores:', error.response ? error.response.data : error.message);
      }
    },

    async editAutor(item) {
      // Preparar el formulario para la edición
      this.paqueteAu = { ...item };
      this.currentId = item.id;
      this.editing = true; // Cambiar el estado a editar
    },
    async deleteAutor(id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/autores/${id}`);
        Swal.fire({
          title: 'Éxito!',
          text: 'Autor eliminado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.obtenerAutores();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error al eliminar el autor',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.error('Error al eliminar el autor:', error.response ? error.response.data : error.message);
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
    this.obtenerAutores();
    
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
}
.titulo{
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
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
.data{
  width: 30px;
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
.table{
  color:#0a0409;
  background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(137, 41, 184, 1) 100%);
}

</style>
