<template>
    <v-app>
        <v-card class="mx-auto border-md rounded-lg card" height="auto" width="36%" rounded="0" flat>
            <v-card-title class="ti">
                Crear Canción
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
                    <v-col>
                        <v-form>
                            <v-text-field v-model="paqueteCancion.nombre" label="Nombrede la canción"
                                required></v-text-field>
                            <v-select v-model="paqueteCancion.autor" :items="autores" item-value="id"
                                item-title="nombre" label="Autor" required>
                            </v-select>

                            <v-select v-model="paqueteCancion.genero" :items="generos" item-value="id"
                                item-title="nombre" label="Genero" required></v-select>

                            <v-text-field v-model="paqueteCancion.anio" label="Año de la canción" type="number"
                                required>
                            </v-text-field>
                            <v-btn v-on:click="openWidget" id="upload_widget"
                                class="cloudinary-button d-flex justify-center align-center" icon text>
                                <v-icon>mdi-cloud-upload</v-icon>
                            </v-btn>

                            <v-btn color="primary" class="mx-auto d-block" @click="guardarCancion">Guardar</v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>

            <NavMenu />
        </v-card>
    </v-app>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            paqueteCancion: {
                nombre: null,
                portada: null,
                ano: null,
                autor: null,
                genero: null,

            },

            cloudName: "dyyph7teq",
            uploadPreset: "Cancion",
            imagenDefault: require('@/assets/disco.jpg'),
            autores: [],
            nuevoAutor: false,
            nuevoAutorNombre: '',
            anio: '',
            generos: [],
            loading: false,
            widgetUpload: null,
            urlCloudinary: null
        };
    },
    methods: {

        async guardarCancion() {
            try {
                if (this.editMode) {
                    await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/cancion/crear/${this.editId}`, this.paquetecancion);
                    Swal.fire({
                        title: 'Éxito!',
                        text: 'Género actualizado con éxito',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                } else {
                    console.log(this.paqueteCancion)
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/cancion/crear`, this.paquetecancion);
                    Swal.fire({
                        title: 'Éxito!',
                        text: 'Género guardado con éxito',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                }
                this.resetForm();

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
        async ObtenerAutores() {
            console.log('ObtenerAutores llamado');
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/autores`);
                console.log('Respuesta de la API:', response.data);
                this.autores = response.data;
            } catch (error) {
                console.error('Error al obtener los autores:', error.response ? error.response.data : error.message);
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

        checkAutor() {
            if (this.autor === 'Nuevo Autor') {
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
        submitForm() {
            const data = {
                nombre: this.titulo,
                portada: this.imagen || this.imagenDefault,
                autor: this.nuevoAutor ? this.nuevoAutorNombre : this.autor,
                anio: this.anio,
                genero: this.genero,
            };
            console.log('Formulario enviado:', data);
            // Aquí iría la lógica para enviar el formulario a un backend o similar
        },
    },
    created() {
        this.obtenerGeneros();
        this.ObtenerAutores();
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
</style>
