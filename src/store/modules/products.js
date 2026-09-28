import axios from 'axios'

// modulo products.js es una seccion del store global con todo lo asociado a productos
export default { // no se usa createStore en los modulos
  namespaced: true, // prpopiedad namespaced en valor true para usar modulos
  state: () => ({ // el state es una funcion flecha que retorna objeto
    products: [],
    loading: false,
    error: null
  }),
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true)
      try { // traer productos desde la API externa
        const { data } = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=20') // axios con metodo get lee una url
        commit('setProducts', data)
        commit('setError', null)
      } catch (err) {
        commit('setError', err.message)
      } finally {
        commit('setLoading', false)
      }
    }
  },
  getters: {
    productsCount: state => state.products.length,
    categoriasProducts: state => state.products.map(product => product.category.name),
    mostrarListaProductos(state) {
      return state.products
    },
    isEmpty: state => {
      return !state.loading && !state.error && state.products.length === 0
    }
  }
}