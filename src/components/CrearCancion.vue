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
                        <v-form @submit.prevent="submitForm">
                            <v-text-field v-model="titulo" label="Título de la canción" required></v-text-field>
                            <v-file-input v-model="imagen" label="Imagen de la canción" accept="image/*"></v-file-input>
                            <v-select v-model="autor" :items="autores" label="Autor" required
                                @change="checkAutor"></v-select>
                            <v-text-field v-if="nuevoAutor" v-model="nuevoAutorNombre" label="Nombre del nuevo autor"
                                required></v-text-field>
                            <v-select v-model="genero" :items="generos" label="Género" required></v-select>
                            <v-text-field v-model="anio" label="Año de la canción" type="number"
                                required></v-text-field>
                            <v-btn type="submit" color="primary" class="mx-auto d-block">Guardar</v-btn>
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
   
    data() {
        return {
            titulo: '',
            imagen: null,
            imagenDefault: require('@/assets/disco.jpg'),
            autores: [], // Lista de autores traída de CrearAutor.vue
            nuevoAutor: false,
            nuevoAutorNombre: '',
            anio: '',
            genero: '',
            generos: [], // Lista de géneros traída de CrearGenero.vue
            loading: false,

        };
    },
    methods:
    {
        fetchAutores() {
            this.autores = ['John Doe', 'Jane Smith', 'Mark Johnson', 'Anna Lee'];
        },
        fetchGeneros() {
            this.generos = ['Pop', 'Rock', 'Electrónica', 'Hip Hop'];
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
            this.$router.push(route); // Navega a la ruta especificada usando Vue Router
        },
        onClick() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        submitForm() {
            const data = {
                titulo: this.titulo,
                imagen: this.imagen || this.imagenDefault,
                autor: this.nuevoAutor ? this.nuevoAutorNombre : this.autor,
                anio: this.anio,
                genero: this.genero,
            };
            console.log('Formulario enviado:', data);
            // Aquí iría la lógica para enviar el formulario a un backend o similar
        },

    },
    created() {
        this.fetchAutores();
        this.fetchGeneros();
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
    /* Ajuste para bajar un poco más el título */
}

.custom-tooltip .v-tooltip__content {
    background-color: rgb(62, 223, 196) !important;
}
</style>