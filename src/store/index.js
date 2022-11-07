export const state = () => ({
  activeCategories: [],
})

export const mutations = {
  resetCategories(state) {
    state.activeCategories = []
  },
  addCategory(state, payload) {
    state.activeCategories = [...state.activeCategories, payload.value]
  },
  removeCategory(state, payload) {
    state.activeCategories = state.activeCategories.filter(
      (category) => category !== payload.value
    )
  },
}

export const getters = {
  activeCategories: (state) => state.activeCategories,
}
