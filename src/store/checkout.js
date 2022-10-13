
// TODO
export const state = () => ({
  product: {},
  products: [],
  checkout: {},
  isCartOpen: false,
  isNavOpen: false,
  loading: true,
})

export const mutations = {
  setCheckout(state, checkout) {
    state.checkout = checkout
  },
  updateLoading(state, loading) {
    state.loading = loading
  },
  handleCart(state) {
    state.isCartOpen = !state.isCartOpen
  }
}

export const actions = {
  async createCheckout({ commit }) {
    commit('updateLoading', true)

    const checkout = await this.$shopify.checkout.create()
    localStorage.setItem('checkoutId', checkout.id)
    commit('setCheckout', checkout)

    commit('updateLoading', false)
  },
  async fetchCheckout({ commit, getters, dispatch }, checkoutId) {
    commit('updateLoading', true)

    const checkout = await this.$shopify.checkout.fetch(checkoutId)
    commit('setCheckout', checkout)

    if (getters.isCheckoutComplete) {
      dispatch('createCheckout')
    } else {
      commit('updateLoading', false)
    }
  },
  async addItemToCheckout({ commit, state }, payload) {
    const lineItemsToAdd = [{ variantId: payload.variantId, quantity: payload.quantity }];

    const checkout = await this.$shopify.checkout.addLineItems(state.checkout.id, lineItemsToAdd)
    commit('setCheckout', checkout)
  },
  async removeLineItem({ commit, state }, lineItemIdsToRemove) {
    const checkout = await this.$shopify.checkout.removeLineItems(state.checkout.id, [lineItemIdsToRemove])
    commit('setCheckout', checkout)
  },
  async updateLineItem({ commit, state }, payload) {
    const lineItemsToUpdate = [{ id: payload.id, quantity: payload.quantity }];

    const checkout = await this.$shopify.checkout.updateLineItems(state.checkout.id, lineItemsToUpdate)
    commit('setCheckout', checkout)
  },
  handleCart({ commit }) {
    commit('handleCart')
  }
}

export const getters = {
  checkout: (state) => state.checkout,
  loading: (state) => state.loading,
  isCartOpen: (state) => state.isCartOpen,
  isCheckoutComplete: (state) => state.checkout?.completedAt,
  lineItems: (state) => state.checkout?.lineItems,
  cartCount(state) {
    return state.checkout.lineItems?.reduce(
      (total, item) => total + item.quantity,
      0
    )
  }
}

