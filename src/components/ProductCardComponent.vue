<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

// ListaProductosView.vue pasa cada producto al componente hijo ProductCardComponent mediante props
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const verDetalle = () => {
    router.push(`/productos/${props.product.id}`)
}

// funcion para verificar si un producto esta marcado como favortio
const esFavorito = computed(() => store.getters['favourites/isFavourite'](props.product.id)
)

// funcion que agrega o elimina el producto de favoritos según sea su estado actual
const modificarFavorito = () => {
    if (esFavorito.value) {
        store.dispatch('favourites/removerFavorito', props.product.id)
    } else {
        store.dispatch('favourites/agregarFavorito', props.product)
    }
}
</script>

<template>
    <li>
        <v-card class="tarjeta-producto" elevation="4">
            <v-card-title class="titulo-producto">{{ props.product.title }}</v-card-title>
            <v-img :src="props.product.images[0]" :alt="props.product.title" class="product-image" width="180" height="180" cover />

            <v-card-text class="datos-producto">
                <p><span>Precio: </span>${{ props.product.price }}</p>
                <p><span>Categoría: </span>{{ props.product.category.name }}</p>
            </v-card-text>

            <v-card-actions class="acciones-producto">
                <v-btn color="primary" variant="outlined" @click="verDetalle">Ver Detalle producto</v-btn>
                <v-btn color="error" variant="outlined" @click="modificarFavorito">{{ esFavorito ? 'Quitar de Favoritos 💔':'Añadir a Favoritos ❤'}}</v-btn>
            </v-card-actions>
        </v-card>
    </li>
</template>

<style scoped>
.tarjeta-producto {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    /* box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12); */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tarjeta-producto:hover {
    transform: translateY(-3px);
    /* box-shadow: 0 12px 24px rgba(30, 64, 175, 0.18); */
}

.titulo-producto {
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2E6FA0;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    white-space: normal;
    word-break: break-word;
}

.v-theme--darkTheme .titulo-producto {
    color: #70baf3;
}

.product-image {
    /* width: 180px;
    height: 180px; */
    object-fit: cover;
    border-radius: 8px;
}

.datos-producto {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    text-align: center;
}

.datos-producto p {
    margin: 0;
    color: #475569;
}

.v-theme--darkTheme .datos-producto p {
    color: #cbd5e1;
}

.datos-producto span {
    color: #1e293b;
    font-weight: 600;
}

.v-theme--darkTheme .datos-producto span {
    color: #f1f5f9;
}

.acciones-producto {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: nowrap;
}

.acciones-producto .v-btn {
    font-size: 0.9rem;
    padding: 0 0.6rem;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.acciones-producto .v-btn:hover {
    transform: translateY(-1px);
}

.v-theme--darkTheme .acciones-producto .v-btn:first-child {
    background-color: #e1eefa;
    color: #1d4ed8  !important;
}

.v-theme--darkTheme .acciones-producto .v-btn:first-child:hover {
    background-color: #bfdbfe;
}

.v-theme--darkTheme .acciones-producto .v-btn:last-child {
    background-color: #fcd6d6;
    color: #991b1b !important;
}

.v-theme--darkTheme .acciones-producto .v-btn:last-child:hover {
    background-color: #fecaca;
}

@media (max-width: 950px) {
    .acciones-producto{
        flex-wrap: wrap;
    }
}

@media (max-width: 700px) {
    .tarjeta-producto {
        min-height: auto;
    }
}

@media (max-width: 550px) {
    .acciones-producto{
        flex-direction: column;
        align-items: center;
    }
}
</style>
