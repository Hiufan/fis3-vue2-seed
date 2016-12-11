// 引入基础依赖
import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'

// 引入路由配置
import router from './router'

Vue.config.devtools = true

Vue.use(VueRouter)

new Vue({
  router
}).$mount('#app')