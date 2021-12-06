import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
// import './assets/style/styles.scss'
import './assets/stylee/main.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false


// Vue.use(ElementUI);
Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
