// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./input.css"; // Certifique-se de que este caminho está correto

const app = createApp(App);

app.use(vuetify);

app.mount("#app");
