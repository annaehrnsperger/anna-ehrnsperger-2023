// TODO
export const state = () => ({
  activeCategories: [],
  navItems: [],
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
  setNavItems(state, navItems) {
    state.navItems = navItems
  },
}

export const actions = {
  setNavItems({ commit }, navItems) {
    commit('setNavItems', navItems)
  },
}

export const getters = {
  activeCategories: (state) => state.activeCategories,
}
