export const getters = {
  currentEditor: (state) => state.currentEditor,
  components: (state) => { return state.sortUI[state.currentPage] ? state.sortUI[state.currentPage].components : [] },
  sortUI: (state) => state.sortUI[state.currentPage],
  state: (state) => state,
  currentPage: (state) => state.currentPage,
  save: (state) => state.save
}
