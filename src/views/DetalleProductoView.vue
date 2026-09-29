<script setup>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

// carga los productos solo si el store todavía no tiene informacion
onMounted(async () => {
    if (store.state.products.products.length === 0) {
        await store.dispatch('products/fetchProducts')
    }
})

// recibe el ID dinámico de la ruta mediante props:true del router
const props = defineProps({
    id: { // este id proviene del parámetro dinámico :id de la ruta y VueRouter lo entrega como props gracias a props:true
        type: String,
        required: true
    }
})

// busca en Vuex el producto cuyo ID coincide con el recibido por la ruta
const producto = computed(() => {
    return store.state.products.products.find(product => {
        return product.id === Number(props.id)
    })
})

</script>

<template>
    <section class="detalle-view">
        <!-- muestra un mensaje cuando el ID de la URL no corresponde a ningún producto (caso excepcional, en que el usuario manipula manualmente la URL con un ID que no corresponde a ningún producto registrado) -->
        <v-alert v-if="!producto" type="error" variant="tonal" class="mensaje-no-encontrado" >
            <h3>Producto no encontrado</h3>
            <p>No existe actualmente un producto registrado en el catálogo con el ID: {{ props.id }}.</p>
            <div class="mt-3">
                <RouterLink class="link-volver-home" :to="{ name: 'home' }">⬅ Volver al inicio</RouterLink>
            </div>
        </v-alert>

        <div v-else>
            <div class="encabezado-detalle">
                <h2>Detalle del producto</h2>
                <p>Información registrada del producto seleccionado.</p>
            </div>

            <!-- tarjeta con la informacion completa del producto seleccionado -->
            <v-card class="tarjeta-detalle">
                <v-card-title class="titulo-producto">{{ producto.title }}</v-card-title>

                <div class="detalle-contenido">
                    <div class="detalle-izquierda">
                        <v-img :src="producto.images[0]" :alt="producto.title" class="product-image" width="220"
                            height="220" cover />
                    </div>

                    <v-card-text class="detalle-derecha">
                        <p><span>Precio: </span>${{ producto.price }}</p>

                        <p><span>Categoría: </span>{{ producto.category.name }}</p>
                        <p class="descripcion"><span>Descripción: </span>{{ producto.description }}</p>
                    </v-card-text>
                </div>
              
                <!-- acciones de navegación del producto -->
                <v-card-actions class="acciones-producto">
                    <RouterLink :to="{name: 'productos'}" class="link-volver-listado">
                        ⬅ Volver al listado
                    </RouterLink>
                </v-card-actions>
            </v-card>

        </div>
    </section>
</template>

<style scoped>
.detalle-view {
    max-width: 720px;
    margin: 0 auto;
}

.encabezado-detalle {
    margin-bottom: 2rem;
    text-align: center;
}

.encabezado-detalle h2 {
    margin: 0 0 0.4rem;
    color: #000022;
    font-size: 2rem;
}

.v-theme--darkTheme .encabezado-detalle h2  {
    color: #f8fafc;
}

.encabezado-detalle p {
    margin: 0;
    color: #475569;
}

.v-theme--darkTheme .encabezado-detalle p  {
    color: #CBD5E1;
}

.tarjeta-detalle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    padding: 2.2rem;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

.titulo-producto {
    margin: 0;
    color: #2E6FA0;
    font-size: 1.8rem;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    line-height: 1.3;
}

.v-theme--darkTheme .titulo-producto {
    color: #70baf3;
}

.detalle-contenido {
    display: flex;
    gap: 2.8rem;
    align-items: flex-start;
    margin-top: 2rem;
}

.detalle-izquierda {
    flex: 0 0 220px;
}

.detalle-derecha {
    flex: 1;
    text-align: left;
    max-width: 420px;
}

.detalle-derecha p {
    margin-bottom: 1rem;
    color: #475569;
    line-height: 1.5;
}

.v-theme--darkTheme .detalle-derecha p {
    color: #cbd5e1;
}

.detalle-derecha span {
    color: #1e293b;
    font-weight: 600;
}

.v-theme--darkTheme .detalle-derecha span {
    color: #f1f5f9;
}

.product-image {
    object-fit: cover;
    border-radius: 8px;
}

.link-volver-home,
.link-volver-listado {
    color: #2F39A9;
    text-decoration: none;
}

.link-volver-listado {
    display: inline-block;
    margin: 0;
}

.link-volver-home:hover,
.link-volver-listado:hover {
    text-decoration: underline;
    font-weight: 600;
}

.v-theme--darkTheme .link-volver-home {
    color: #235345;
}

.v-theme--darkTheme .link-volver-listado {
    color: #5ac4a6;
}

.mensaje-no-encontrado {
    max-width: 500px;
    margin: 3rem auto;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
    text-align: center;
}

.v-theme--darkTheme .mensaje-no-encontrado {
    background-color: #b69797;
    border: 1px solid #793232;
}

.mensaje-no-encontrado h3 {
    margin: 0 0 0.8rem;
    color: #000022;
    font-size: 1.1rem;
    font-weight: 600;
}

.v-theme--darkTheme .mensaje-no-encontrado h3 {
    color: #461b1b;
}

.mensaje-no-encontrado p {
    color: #475569;
    margin: 0;
    line-height: 1.5;
}

.v-theme--darkTheme .mensaje-no-encontrado p {
    color: #000022;
}

.acciones-producto {
    width: 100%;
    margin-top: 1rem;
    justify-content: center;
}

@media (max-width: 700px) {
    .tarjeta-detalle {
        padding: 1.5rem;
    }

    .titulo-producto {
        font-size: 1.4rem;
    }

    .product-image {
        width: 250px;
        height: 250px;
    }

    .detalle-contenido {
        flex-direction: column;
        align-items: center;
    }

    .detalle-derecha {
        text-align: left;
        width: 100%;
    }

}

</style>
