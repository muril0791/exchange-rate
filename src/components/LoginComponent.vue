<template>
    <v-dialog v-model="show" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Login</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="login.username"
              :rules="usernameRules"
              label="Usuário"
              required
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              :rules="passwordRules"
              label="Senha"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="loginUser">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        show: this.value,
        valid: false,
        login: {
          username: '',
          password: '',
        },
        usernameRules: [
          v => !!v || 'O nome de usuário é obrigatório',
          v => (v && v.length >= 3) || 'O nome de usuário deve ter pelo menos 3 caracteres',
        ],
        passwordRules: [
          v => !!v || 'A senha é obrigatória',
          v => (v && v.length >= 8) || 'A senha deve ter pelo menos 8 caracteres',
        ],
      };
    },
    methods: {
      loginUser() {
        // Implemente sua lógica de autenticação aqui
        this.$emit('input', false); // Fechar o diálogo após o login
      },
      close() {
        this.$emit('input', false);
      }
    },
    watch: {
      value(newVal) {
        this.show = newVal;
      }
    }
  };
  </script>
  