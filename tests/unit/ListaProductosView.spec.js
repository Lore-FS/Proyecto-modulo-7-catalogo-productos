import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises' // permite esperar a que se resuelvan todas las promesas pendientes
import { createStore } from 'vuex'
import ListaProductosView from '@/views/ListaProductosView.vue'

const mockFetchProducts = jest.fn(async ({ commit }) => {
    // simula un proceso asincrono
    await Promise.resolve()

    // simula qie la API produjo un error
    commit('setError', 'Error de conexión con la API')
})

describe('Pruebas unitarias de ListaProductosView', () => {
    test('1era Prueba: muestra mensaje visual cuando ocurre un error de API', async () => {
        const store = createStore({
            modules: {
                products: {
                    namespaced: true,
                    state: () => ({
                        products: [],
                        loading: false,
                        error: null
                    }),
                    mutations: {
                        setError(state, payload) {
                            state.error = payload
                        }
                    },
                    getters: {
                        productsCount: state => state.products.length
                    },
                    actions: {
                        fetchProducts: mockFetchProducts
                    }
                },
                filters: {
                    namespaced: true,
                    state: () => ({
                        category: ''
                    }),
                    getters: {
                        filteredProducts: (state, getters, rootState) => {
                            return rootState.products.products
                        }
                    }
                }
            }
        })

        const wrapper = mount(ListaProductosView, {
            global: {
                plugins: [store],
                stubs: {
                    VAlert: {
                        template: `<div class="v-alert-simulado"><slot /></div>`
                    },
                    VSelect: true,
                    VProgressCircular: true,
                    ProductCardComponent: true,
                }
            }
        })

        console.log('Antes de esperar las promesas: ', wrapper.html())

        await flushPromises()

        console.log('Después de esperar las promesas: ', wrapper.html())
        console.log('Texto renderizado real en ListaProductosView: ', wrapper.text())

        // verificar que al montar la vista se llamó una vez a la funcion que simula la carga de productos desde la API
        expect(mockFetchProducts).toHaveBeenCalledTimes(1)

        // verificar la respuesta visual ante el error
        expect(wrapper.text()).toContain('No fue posible cargar el catálogo de productos')
        expect(wrapper.text()).toContain('Error de conexión con la API')
    })
})