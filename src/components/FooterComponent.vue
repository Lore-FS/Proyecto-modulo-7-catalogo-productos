<template>
    <footer>
        <p>&copy; 2026. Vue Product Showcase.</p>
        <p>Catálogo de Productos.</p>
    </footer>
</template>

<style scoped>
footer {
    width: 100%;
    padding: 0.8rem 1.5rem;
    background-color: #06D6A0;
    text-align: center;
    color: #000022;
    font-size: 0.9rem;
    margin-top: auto;
    box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.15);
}

footer p {
    margin: 0.2rem 0;
}

/* ajusta colores del footer cuando está activo el tema oscuro */
.v-theme--darkTheme footer {
    background-color: #047857;
    color: #ffffff;
}
</style>
