<template>
  <v-container>
    <v-card>
      <v-card-title>Cadastro</v-card-title>
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
        <v-btn color="primary" @click="signup">Cadastrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const signup = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;
        // Opcional: Salvar informações adicionais do usuário no Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
        alert("Cadastro realizado com sucesso!");
        // Redirecionar o usuário ou limpar o formulário
        email.value = "";
        password.value = "";
      } catch (error) {
        alert("Erro no cadastro: " + error.message);
      }
    };

    return { email, password, signup };
  },
};
</script>
