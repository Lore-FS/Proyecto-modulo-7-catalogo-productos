// modulo filters.js es una seccion del store global con todo lo asociado a filtros
export default { // no se usa createStore en los modulos
  namespaced: true, // propiedad namespaced en valor true para usar modulos
  state: () => ({ // el state es una funcion flecha que retorna objeto
    category: ''
  }),
  mutations: {
    setCategory(state, category) {
      state.category = category
    }
  },
  actions: {
    changeCategory({ commit }, category) {
      commit('setCategory', category)
    }
  },
  getters: {
    selectedCategory: state => state.category,
    filteredProducts: (state, getters, rootState) => {
      const products = rootState.products.products
      if (!state.category) {
        return products
      }
      return products.filter(
        product => product.category.name === state.category
      )
    }

  }
}