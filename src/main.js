// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// Importe o arquivo de configuração do Firebase

const app = createApp(App);

app.use(vuetify);

app.mount("#app");
