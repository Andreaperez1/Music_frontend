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
<<<<<<< HEAD
              <v-text-field v-model="paqueteAu.nombre" :rules="campoRules" label="Nombre del Autor" placeholder="Ej: Adele" required></v-text-field>
              <v-text-field v-model="paqueteAu.pais" :rules="campoRules" label="Pais del Autor" placeholder="Ej: USA" required></v-text-field>
              <v-card-actions class="justify-center">
                <v-btn @click="guardarAutor()" class="btn-tabla">
                  {{ editing ? 'Modificar' : 'Guardar' }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <v-toolbar flat>
              <v-toolbar-title class="center-title">Lista de Autores</v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="headers" :items="autores" class="elevation-1">
              <template v-slot:top>
                <v-row class="headers-row">
                  <v-col class="header-col">Nombre</v-col>
                  <v-col class="header-col">País</v-col>
                  <v-col class="header-col">Acciones</v-col>
                </v-row>
              </template>
              <template v-slot:item="{ item }">
                <tr class="data-row">
                  <td class="data-cell">{{ item.nombre }}</td>
                  <td class="data-cell">{{ item.pais }}</td>
                  <td class="data-cell">
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

=======
              <v-text-field v-model="paqueteAu.nombre" :rules="campoRules" label="Nombre del Autor"
                placeholder="Ej: Adele" required></v-text-field>
                <v-text-field v-model="paqueteAu.pais" :rules="campoRules" label="Pais del Autor"
                placeholder="Ej: Adele" required></v-text-field>

                <v-card-actions class="justify-center">
                    <v-btn @click="guardarAutor()" class="btn-tabla">Guardar</v-btn>
                </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
         <v-row class="mt-3" justify="center">
            <v-col cols="6">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0"> Autores </h3>
                        </div>
                    </v-card-title>
                    <v-card-text>

                        <v-data-table
                            :headers="headersAutor"
                            :items="itemsAutor"
                            :loading="loadTablaAutor"
                            loading-text="Cargando, por favor
                           espere..."
                            :footer-props="{
                                'show-current-page': true,
                                'items-per-page-options': [5, 10, 15],
                                itemsPerPageText: 'Registros mostrados',
                                pageText: '{0}-{1} de {2}',
                                showFirstLastPage: true,
                                firstIcon: 'mdi-arrow-collapse-left',
                                lastIcon: 'mdi-arrow-collapse-right',
                                prevIcon: 'mdi-minus',
                                nextIcon: 'mdi-plus'
                            }"
                            class="elevation-1">
                            <template >
                                <p class="text-dark">Sin datos</p>
                                <v-btn color="var(--c-orange)" class="mb-2 btn-tabla" @click="obtenerAutores">Recargar</v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
           
        </v-row>
>>>>>>> b13545f590fe8b33636b5ce2f61d15a6e7b1974c
      </v-container>

      <NavMenu />
    </v-card>
  </v-app>
</template>

<script>
<<<<<<< HEAD
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'CrearAutor',
  data() {
    return {
      paqueteAu: {
        nombre: '',
        pais: ''
      },
      autores: [],
      loading: false,
      validaAutor: false,
      editing: false, // Estado para editar
      currentId: null, // ID del autor que se está editando
      campoRules: [(v) => !!v || 'Este campo es requerido'],
      headers: [
        { text: 'Nombre', value: 'nombre', align: 'start' },
        { text: 'País', value: 'pais', align: 'start' },
        { text: 'Acciones', value: 'actions', align: 'end' },
      ],
    };
  },
  methods: {
    async guardarAutor() {
      try {
        if (this.editing) {
          // Si estamos editando, actualizar el autor
          await axios.put(`${process.env.VUE_APP_API_BASE_URL}/autores/${this.currentId}`, this.paqueteAu);
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
=======
import axios from 'axios'



export default {

  data: () => ({
       rutaBackend: `${process.env.VUE_APP_API}`,
  
      valid: true,
      validaAutor: true,
      validEditar: true,
      campoRules: [
        (v) => !!v || "Campo requerido",
      ],
      paqueteAu:{
        nombre: null,
        pais: null
      },
       headersAutor: [
            { text: 'Nombre Autor ', value: 'nombre', align: 'center' },
            { text: 'Pais', value: 'pais', align: 'center' },
        ],
        itemsAutor:[],
        dialogMsj: false,
        detalleMsj: {
            classTitle: 'error',
            title: null,
            body: null
        },
        loadTablaAutor: false,
      loading: false, 
  }),
  
  methods: {
    async guardarAutor() {
      if (this.$refs.formAutor.validate()) {
        this.$emit('loadingManager', 'Creando Autor...');
        try {
          await axios.post(`/autor/crear`, this.paqueteAu);
         
          this.$refs.formAutor.reset();
        } catch (error) {
          this.detalleMsj.title = "Guardar Autor";
          this.detalleMsj.body = "No se pudo guardar Autor, contacta con soporte";
          this.dialogMsj = true;
          console.log(`Error creando tipo: ${error}`);
        } finally {
          this.$emit('loadingManager');
        }
      }
    },
     async obtenerAutores() {
      this.loadTablaAutor = true;
      try {
        const response = await axios.get(`/autor`);
        this.itemsAutor = response.data;
      } catch (error) {
        console.log(`Error obteniendo autores: ${error}`);
      } finally {
        this.loadTablaAutor = false;
>>>>>>> b13545f590fe8b33636b5ce2f61d15a6e7b1974c
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
