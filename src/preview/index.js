/**
 * @author muwoo
 * Date: 2019/2/24
 */
import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import '../main/assets/style/index.scss'
import store from '../main/store'

import RButton from '@muwoo.cn/r-button'

Vue.use(RButton)

Vue.use(iView)

Vue.config.productionTip = false

/* tslint:disable */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
