/**
 * @author monkeywang
 * Date: 2018/2/1
 */
import Vuex from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store

window.addEventListener('message',(e) => {
  // 不接受消息源来自于当前窗口的消息
  if (e.source === window || e.data === 'loaded') {
    return
  }
  store.dispatch(e.data.type, e.data.value)
})
