import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import ElementUI from 'element-ui';
import Video from 'video.js'

import 'video.js/dist/video-js.css'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$video = Video

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
