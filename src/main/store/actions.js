/**
 * @author muwoo
 * Date: 2019/2/24
 */
import helper from './helper'
import {roseApi} from '../assets/js/api'
export const actions = {
  setCurrentPage ({commit, state}, page) {
    commit('setCurrentPage',page)
    helper.postMsgToChild({type: 'syncState', value: state})
  },
  saveConfig ({commit, state}, value = true) {
    commit('saveConfig', value)
  },
  clearWorkbench ({commit}) {
    commit('clearWorkbench')
  },
  selectComponent({commit, state}, index) {
    commit('currentEditor', index)
    commit('saveConfig', false)
    helper.postMsgToParent({type: 'syncState', value: state})
  },
  async addComponent ({commit, state}, value) {
    let res = await roseApi.rose_component_detail_get({
      params: {
        name: value.name
      }
    })
    res.data.style = res.data.style || {container: {}}
    commit('addComponent', Object.assign({} , value, res))
    commit('saveConfig', false)
    helper.postMsgToChild({type: 'syncState', value: state})
  },
  removeComponent({commit, state}, index) {
    commit('removeComponent', index)
    commit('saveConfig', false)
    helper.postMsgToParent({type: 'syncState', value: state})
  },
  updateSortUIProps({commit, state}, {key, value}) {
    commit('updateSortUIProps', {key, value});
    commit('saveConfig', false)
    helper.postMsgToChild({type: 'syncState', value: state})
  },
  syncState({commit, state}, value) {
    commit('syncState', value);
    commit('saveConfig', false)
    helper.postMsgToChild({type: 'syncState', value: state})
  },
  addConfig ({commit, state}) {
    commit('addConfig');
    helper.postMsgToChild({type: 'syncState', value: state})
  }
}
