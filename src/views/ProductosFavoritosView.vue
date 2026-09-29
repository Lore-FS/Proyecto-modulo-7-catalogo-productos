<script setup>
import ProductCard from '../components/ProductCardComponent.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// obtiene desde Vuex la lista de productos marcados como favoritos
const favoritos = computed(() => store.getters['favourites/favouritesProducts'])

</script>

<template>
    <section class="productos-view">
        <!-- encabezado de la vista de productos favoritos -->
        <div class="encabezado-productos">
            <h2>Mis Productos Favoritos</h2>
            <p>Revise los productos dentro del catálogo que ha marcado como favoritos.</p>
        </div>

        <!-- muestra un aviso cuando el usuario aún no tiene productos favoritos -->
        <v-alert v-if="favoritos.length === 0" type="warning" variant="tonal" class="mensaje-vacio">
            <h3>No se han encontrado favoritos</h3>
            <p>Aún no ha seleccionado algún producto como favorito.</p>     
        </v-alert>

        <!-- renderiza una tarjeta por cada producto marcado como favorito, usando ProductCardComponent -->
        <ul v-else class="lista-productos">
            <ProductCard v-for="product in favoritos" :key="product.id" :product="product"/>
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

.v-theme--darkTheme .encabezado-productos h2  {
    color: #f8fafc;
}

.encabezado-productos p {
    margin: 0;
    color: #475569;
}

.v-theme--darkTheme .encabezado-productos p {
    color: #CBD5E1;
}

.lista-productos {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.mensaje-vacio {
    max-width: 500px;
    margin: 3rem auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
    text-align: center;
}

.v-theme--darkTheme .mensaje-vacio {
    background-color: #c7a361;
    border: 1px solid #3a2f1f;
}

.mensaje-vacio h3 {
    margin: 0 0 0.8rem;
    color: #000022;
    font-size: 1.1rem;
    font-weight: 600;
}

.v-theme--darkTheme .mensaje-vacio h3 {
    color: #35230b;
}

.mensaje-vacio p {
    color: #475569;
    margin: 0;
    line-height: 1.5;
}

.v-theme--darkTheme .mensaje-vacio p {
    color: #000022;
}

@media (max-width: 700px) {
    .lista-productos {
        grid-template-columns: 1fr;
    }

}
</style>
