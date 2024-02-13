// import { createApp } from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify'
// import { loadFonts } from './plugins/webfontloader'

// loadFonts()

// createApp(App)
//   .use(vuetify)
//   .mount('#app')
// src/main.js

//===================================

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import vuetify from './plugins/vuetify'; // Se você já configurou o Vuetify
// // import { initializeDb } from './fakeDb';

// initializeDb();
// const app = createApp(App);

// app.use(router);
// app.use(vuetify);

// app.mount('#app');

//===================================

// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
// Importe o arquivo de configuração do Firebase

// O Firebase é inicializado no próprio firebaseConfig, portanto, não é necessário chamá-lo aqui novamente.

const app = createApp(App);

app.use(vuetify);

app.mount("#app");
