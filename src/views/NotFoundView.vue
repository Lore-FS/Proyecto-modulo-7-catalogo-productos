<template>
    <section class="error-view">
        <!-- mensaje de error mostrado cuando la ruta seleccionada no existe -->
        <v-alert type="error" variant="tonal" class="mensaje-error">
            <h3>Error 404: Página no encontrada</h3>
            <p>No fue posible encontrar la ruta especificada.</p>
            
            <!-- para volver a la vista principal o home -->
            <RouterLink class="link-volver" :to="{ name: 'home' }">⬅ Volver al inicio</RouterLink>
        </v-alert>
    </section>
</template>

<style scoped>
.error-view {
    max-width: 720px;
    margin: 0 auto;
}

.link-volver {
    color: #2F39A9;
    text-decoration: none;
}

.v-theme--darkTheme .link-volver {
    color: #235345;
}

.link-volver:hover {
    text-decoration: underline;
    font-weight: 600;
}

.mensaje-error {
    max-width: 500px;
    margin: 3rem auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.12);
    text-align: center;
}

.v-theme--darkTheme .mensaje-error  {
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
    margin: 0 0 1rem;
    line-height: 1.5;
}

.v-theme--darkTheme .mensaje-error p {
    color: #000022;
}
</style>
