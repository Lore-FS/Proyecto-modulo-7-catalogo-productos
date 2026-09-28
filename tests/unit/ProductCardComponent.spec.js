import { mount } from '@vue/test-utils'
import ProductCardComponent from '@/components/ProductCardComponent.vue'

const mockPush = jest.fn() // mock de la función push() del router para simular navegación

const mockDispatch = jest.fn() // mock de la función dispatch() de vuex para simular el llamado a la accion del store

// Mock de vue-router para reemplazar useRouter() con un objeto falso que contiene pushMock
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush
    })
}))

// Mock de vuex para reemplazar useStore() con un store falso que contiene sólo lo que ProductCardComponent necesita, por lo que se usa mockDispatch para simular el dispatch para agregar o quitar favoritos y el getter que simula qie el producto no está marcado como favorito
jest.mock('vuex', () => ({
    useStore: () => ({
        getters: {
            'favourites/isFavourite': () => false
        },
        dispatch: mockDispatch
    })
}))

describe('Pruebas unitarias de ProductCardComponent', () => {
    const product = {
        id: 1,
        title: 'Producto de prueba',
        price: 1500000,
        images: ['https://imagen-prueba.com/imagen-prueba.jpg'],
        category: {
            name: 'Electronics'
        }
    }

    test('1era Prueba: debe renderizar correctamente los datos del producto', () => {
        const wrapper = mount(ProductCardComponent, {
            props: {
                product
            },
            global: {
                // se stubean los componentes de Vuetify en ProductCardComponent, por lo que no se renderriza el componente real de Vuetify, pero se usan slots para sí poder conservar el contenido que ProductCardComponent habría puesto dentro de cada etiqueta
                stubs: {
                    VCard: {
                        template: `<div class="v-card-simulada"><slot /></div>`
                    },
                    VCardTitle: {
                        template: `<div class="v-card-title-simulada"><slot /></div>`
                    },
                    VImg: {
                        template: `<img class="v-img-simulada"/>`
                    },
                    VCardText: {
                        template: `<div class="v-card-text-simulada"><slot /></div>`
                    },
                    VCardActions: {
                        template: `<div class="v-card-actions-simulada"><slot /></div>`
                    },
                    VBtn: {
                        template: `<button class="v-btn-simulada"><slot /></button>`
                    }
                }
            }
        })

        expect(wrapper.text()).toContain('Producto de prueba')
        expect(wrapper.text()).toContain('1500000')
        expect(wrapper.text()).toContain('Electronics')
    })

    test('2da Prueba: debe navegar al detalle de producto al hacer click', async () => {
        const wrapper = mount(ProductCardComponent, {
            props: {
                product
            },
            global: {
                // se stubean los componentes de Vuetify en ProductCardComponent, por lo que no se renderriza el componente real de Vuetify, pero se usan slots para sí poder conservar el contenido que ProductCardComponent habría puesto dentro de cada etiqueta
                stubs: {
                    VCard: {
                        template: `<div class="v-card-simulada"><slot /></div>`
                    },
                    VCardTitle: {
                        template: `<div class="v-card-title-simulada"><slot /></div>`
                    },
                    VImg: {
                        template: `<img class="v-img-simulada"/>`
                    },
                    VCardText: {
                        template: `<div class="v-card-text-simulada"><slot /></div>`
                    },
                    VCardActions: {
                        template: `<div class="v-card-actions-simulada"><slot /></div>`
                    },
                    VBtn: {
                        template: `<button class="v-btn-simulada"><slot /></button>`
                    }
                }
            }
        })

        // como el componete tiene 2 botones, primero se usafindAll y luego con botones[0] se selecciona el boton de ver detalle
        const botones = wrapper.findAll('button')

        // proceso asincrono para simular el click en boton de ver detalle y espera que Vue procese la actualizacion asociada al evento
        await botones[0].trigger('click')

        console.log('HTML renderizado del componente ProductCardComponent en 2da prueba: ', wrapper.html())
        
        // asercion para verificar que mockPush fue llamado una vez y con el argumento '/productos/1'
        expect(mockPush).toHaveBeenCalledTimes(1)
        expect(mockPush).toHaveBeenCalledWith('/productos/1')
    })
})