<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Entrar</v-btn>
        <v-btn text @click="toggleForm">{{
          showSignup ? "Entrar" : "Cadastrar"
        }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-fade-transition mode="out-in">
      <signup-component v-if="showSignup" key="signup" />
    </v-fade-transition>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignupComponent from "./SignupComponent.vue";

export default {
  components: {
    SignupComponent,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const showSignup = ref(false);

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert("Login bem-sucedido!");
        // Redirecionar o usuário ou limpar o formulário
        email.value = "";
        password.value = "";
      } catch (error) {
        alert("Erro ao fazer login: " + error.message);
      }
    };

    const toggleForm = () => {
      showSignup.value = !showSignup.value;
    };

    return { email, password, login, showSignup, toggleForm };
  },
};
</script>
