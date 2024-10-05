<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" src="https://your-image-source.com/image.jpg">
      <v-avatar color="primary" size="56">
        <img
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          alt="Avatar"
        />
      </v-avatar>
      <v-card-title>
        <div><strong>Autor:</strong> </div>
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div><strong>Autor: </strong>Diego Paulinho Amarilla Mercado</div>
      <div><strong>Especialidad: </strong>Ingeniero Agronomo</div>
      <div><strong>Lista de tutoriales
      </strong><ul>
        <li>Plantacion de soja</li>
        <li>Plantacion de trigo</li>
        <li>Plantacion de maiz</li>
        <li>Plantacion de girasol</li>
      </ul></div>
      <div><strong>Numero de telefono:</strong>+5953278974</div>
      <div><strong>Correo: </strong>ejemplo234@gmail.com</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Share
      </v-btn>
      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import expertoService from "@/services/expertoService.js";

export default {
  name: 'Experto',
  data() {
    return {
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our community...',
        },
        {
          color: 'red',
          icon: 'mdi-account-multiple',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter',
        },
        {
          color: 'teal',
          icon: 'mdi-tag',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          excerpt: 'New deals available, Join Today',
        },
      ],
      valid: true,
      buscador: '',
      expertos: [],
      experto: {
        id: '',
        nombre: '',
        apellido: '',
        especialidad: '',
      },
      rules: {
        required: (value) => !!value || 'Campo Requerido',
        min: (v) => v.length >= 5 || 'Minimo 5 caracteres',
        emailMatch: () => 'The email and password you entered don\'t match',
      },
    };
  },
  computed: {
    expertosBuscados() {
      return this.expertos.filter((experto) =>
        experto.nombre.toLowerCase().includes(this.buscador.toLowerCase())
      );
    },
  },
  mounted() {
    this.listarExpertos();
  },
  methods: {
    listarExpertos() {
      expertoService.listarExpertos()
        .then((respuesta) => {
          this.expertos = respuesta.data;
        })
        .catch((error) => {
          console.error("Error fetching expertos:", error);
        });
    },
    limpiar() {
      this.experto = {
        id: '',
        nombre: '',
        apellido: '',
        especialidad: '',
      };
    },
  },
};
</script>
