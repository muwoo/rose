/**
 * @author muwoo
 * Date: 2019/2/24
 */

export const mutations = {
  setCurrentPage (state, page) {
    state.currentPage = page
    state.currentEditor = -1
  },
  saveConfig (state, value) {
    state.save = value
  },
  /**
   * 设置当前正在编辑组建的序号
   * @param {State} state
   * @param {number} value
   */
  currentEditor (state, value) {
    state.currentEditor = value
  },
  /**
   * 根据选择组建的类型来新增组件
   * @param {State} state
   * @param {any} value
   */
  addComponent (state, value) {
    state.currentEditor >= 0 ?
      state.sortUI[state.currentPage].components.splice(state.currentEditor + 1, 0, JSON.parse(JSON.stringify(value))) :
      state.sortUI[state.currentPage].components.push(JSON.parse(JSON.stringify(value)))
    state.currentEditor = state.currentEditor >= 0 ?
      state.currentEditor + 1 :
      state.sortUI[state.currentPage].components.length - 1;
  },
  /**
   * 通过 sortUI 的 属性
   * @param {State} state
   * @param {any} key
   * @param {any} value
   */
  updateSortUIProps (state, {key, value}) {
    state.sortUI[state.currentPage][key] = value
  },
  /**
   * 删除特定组件
   * @param {State} state
   * @param {number} index
   */
  removeComponent (state, index) {
    state.currentEditor = -1
    state.sortUI[state.currentPage].components.splice(index, 1)
  },
  /**
   * 同步 state 状态
   * @param {State} state
   * @param {State} value
   */
  syncState (state, value) {
    value.currentPage !== undefined ? state.currentPage = value.currentPage : 0
    value.currentEditor !== undefined ? state.currentEditor = value.currentEditor : ''
    value.sortUI !== undefined ? state.sortUI = value.sortUI : ''
  },
  clearWorkbench (state) {
    state.currentEditor = -1
    state.save = true
    state.currentPage = 0
    state.sortUI = [{
      title: '标题',
      bgColor: '#fe2f41',
      bgImage: '',
      bgSize: null,
      service: '',
      channel: '',
      components: []
    }]
  },
  addConfig (state) {
    state.sortUI.push({
      title: '标题',
      bgColor: '#fe2f41',
      bgImage: '',
      bgSize: null,
      service: '',
      channel: '',
      components: []
    })
  }
};
