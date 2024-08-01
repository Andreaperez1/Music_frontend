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
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
            label="Buscar" variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
        </v-card-text>
      </v-toolbar>

      <v-container class="mt-12"> 
        <v-row>
          <v-col cols="12">
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model="nombre" label="Nombre del género" required></v-text-field>
              <v-btn type="submit" color="primary" class="mx-auto d-block">Guardar</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
<NavMenu/>
    </v-card>
  </v-app>
</template>

<script>
export default {
  
  data() {
    return {
      nombre: '',
      loading: false,
     
    };
  },
  methods: {
    submitForm() {
      const data = {
        nombre: this.nombre,
      };
      console.log('Formulario enviado:', data);
      // Lógica para enviar el formulario a un backend o similar
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
  margin-top: 30px; /* Ajuste para centrar verticalmente el título */
}

.custom-tooltip .v-tooltip__content {
  background-color: rgb(62, 223, 196) !important;
}
</style>
