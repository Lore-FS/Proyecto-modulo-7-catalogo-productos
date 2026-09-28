import { createStore } from 'vuex'

// importan los js que representaran a cada modulo con sus propios state, mutations, actions y getters
import products from './modules/products'
import filters from './modules/filters'
import favourites from './modules/favourites'

// solo indicamos en el store global los modulos que se van a usar
export default createStore({
  modules: {
    products,
    filters,
    favourites
  }
})