<script setup>
import ProductCard from '../components/ProductCardComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// carga los productos al montar la vista sólo si aún no existen en el store
onMounted(async () => {
    if (store.state.products.products.length === 0) {
        await store.dispatch('products/fetchProducts')
    }
})

// estados reactivos de carga y error entregado por el módulo products
const loading = computed(() => store.state.products.loading)
const error = computed(() => store.state.products.error)

// obtener todos las categorias existentes, sin repetirlas, según el arreglo de productos usando funcion computada
const categorias = computed(() => {
    const categoriasProductos = store.state.products.products.map(product => product.category.name)

    return categoriasProductos.filter((categoria, indice) => {
        return categoriasProductos.indexOf(categoria) === indice
    })
})

const categoriaSeleccionada = ref('')

// funcion que actualiza la categoria seleccionada mediante el módulo filters de Vuex
function cambiarCategoria() {
    store.dispatch('filters/changeCategory', categoriaSeleccionada.value || '')
}

// obtiene desde Vuex la lista de productos filtrada
const productosFiltrados = computed(() => store.getters['filters/filteredProducts'])

</script>

<template>
    <section class="productos-view">
        <div class="encabezado-productos">
            <h2>Catálogo de Productos</h2>
            <p>Consulte los productos registrados en el catálogo y acceda a sus detalles.</p>
        </div>

        <!-- muestra el filtro sólo cuando existen productos cargados -->
        <div v-show="store.getters['products/productsCount'] > 0" class="filtros-busqueda-productos">
            <h3>🔍 Selección personalizada con filtro de búsqueda</h3>

            <div class="campo-filtro">
                <v-select id="categoria" v-model="categoriaSeleccionada" :items="categorias" @update:model-value="cambiarCategoria"
                    label="Categoría" clearable />
            </div>
        </div>

        <div v-if="loading" class="cargando">
            <v-progress-circular indeterminate color="primary" />
            <p>Cargando Catálogo de Productos...</p>
        </div>
        <v-alert v-else-if="error" type="error" variant="tonal" class="mensaje-error">
            <h3>No fue posible cargar el catálogo de productos</h3>
            <p>Error: {{ error }}</p>
        </v-alert>

        <!-- renderiza una tarjeta por cada producto filtrado, usando ProductCardComponent -->
        <ul v-else class="lista-productos">
            <ProductCard v-for="product in productosFiltrados" :key="product.id" :product="product">
            </ProductCard>
        </ul>
    </section>
</template>

<style scoped>
.productos-view {
    max-width: 1000px;
    margin: 0 auto;
}

.encabezado-productos {
    margin-bottom: 2rem;
    text-align: center;
}

.encabezado-productos h2 {
    margin: 0 0 0.4rem;
    color: #000022;
    font-size: 2rem;
}

/* ajustes de encabezados para el tema oscuro */
.v-theme--darkTheme .encabezado-productos h2, 
.v-theme--darkTheme .filtros-busqueda-productos h3 {
    color: #f8fafc;
}

.encabezado-productos p {
    margin: 0;
    color: #475569;
}

/* ajustes de parrafo para el tema oscuro */
.v-theme--darkTheme .encabezado-productos p  {
    color: #CBD5E1;
}

.filtros-busqueda-productos {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(30, 64, 175, 0.1);
}

.v-theme--darkTheme .filtros-busqueda-productos {
    background-color: #1e293b;
}

.filtros-busqueda-productos h3 {
    margin: 0 0 1.2rem;
    color: #000022;
    font-size: 1.1rem;
    text-align: center;
}

.campo-filtro {
    width: 100%;
}

.cargando {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 3rem 0;
}

.cargando p {
    margin: 0;
}

.v-theme--darkTheme .cargando {
    color: #f1f5f9;
}

.lista-productos {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.mensaje-error {
    max-width: 500px;
    margin: 3rem auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
    text-align: center;
}

.v-theme--darkTheme .mensaje-error {
    background-color: #b69797;
    border: 1px solid #793232;
}

.mensaje-error h3 {
    margin: 0 0 0.8rem;
    color: #000022;
    font-size: 1.1rem;
    font-weight: 600;
}

.v-theme--darkTheme .mensaje-error h3{
    color: #461b1b;
}

.mensaje-error p {
    color: #475569;
    margin: 0;
    line-height: 1.5;
}

.v-theme--darkTheme .mensaje-error p {
    color: #000022;
}

@media (max-width: 700px) {
    .lista-productos {
        grid-template-columns: 1fr;
    }

}
</style>
