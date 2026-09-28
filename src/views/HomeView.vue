<template>
    <section class="home">
        <!-- encabezado principal de la vista de inicio -->
        <div class="home-encabezado">
            <img src="../assets/logo-mini.png" alt="Logo Vue Product Showcase" class="logo">
            <h2>Bienvenido Vue Products Showcase</h2>
        </div>

        <!-- tarjeta vuetify con descripcion general y acceso al catálogo -->
        <v-card class="tarjeta" elevation="4">
            <v-card-text>
                <p>Aplicación SPA (Single Page Application) que consiste en un catálogo interactivo de
                    productos, que permite visualizar su información, filtrar por categorías y ver detalles
                    individuales. Esta aplicación cuenta con una interfaz robusta que consume datos desde una API
                    REST externa y gestiona el estado de forma centralizada.</p>
            </v-card-text>

            <v-card-actions class="acciones-home">
                <RouterLink class="link-productos" :to="{ name: 'productos' }">Ir a la lista de productos ➡
                </RouterLink>
            </v-card-actions>
        </v-card>

    </section>
</template>

<style scoped>
/* contenedor principal de la vista de inicio */
.home {
    max-width: 1000px;
    margin: 0 auto;
}

.logo {
    width: 200px;
    height: auto;
    display: block;
    margin: 0 auto 1rem;
}

.home-encabezado {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.home-encabezado h2 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: #000022;
}

/* ajuste visual de título para el tema oscuro */
.v-theme--darkTheme .home-encabezado h2 {
    color: #f8fafc;
}

.tarjeta {
    padding: 2rem;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

.acciones-home {
    justify-content: center;
}

.link-productos {
    color: #2F39A9;
    text-decoration: none;
}

.link-productos:hover {
    text-decoration: underline;
    font-weight: 600;
}

/* ajuste visual de link para el tema oscuro */
.v-theme--darkTheme .link-productos {
    color: #5ac4a6;
}

@media (max-width: 700px) {
    .tarjeta {
        padding: 1.5rem;
    }
}
</style>
