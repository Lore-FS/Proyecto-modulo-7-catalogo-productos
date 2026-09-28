// modulo favourites.js es una seccion del store global con todo lo asociado a productos marcados como favoritos por el ususario
export default { // no se usa createStore en los modulos
  namespaced: true, // prpopiedad namespaced en valor true para usar modulos
  state: () => ({ // el state es una funcion flecha que retorna objeto
    favourites: [],
  }),
  mutations: {
    addFavourite(state, product) {
      const existe = state.favourites.some(
        favourite => favourite.id === product.id
      )
      if (!existe) {
        state.favourites.push(product)
      }
    },
    removeFavourite(state, id) {
      state.favourites = state.favourites.filter(
        product => product.id !== id
      )
    }
  },
  actions: {
    agregarFavorito({ commit }, product) {
      commit('addFavourite', product)
    },
    removerFavorito({ commit }, id) {
      commit('removeFavourite', id)
    },
  },
  getters: {
    favouritesProducts: state => state.favourites,
    favouritesProductsCount: state => state.favourites.length,
    isFavourite: state => {
      return id => {
        return state.favourites.some(product => product.id === id)
      }
    }
  }
}