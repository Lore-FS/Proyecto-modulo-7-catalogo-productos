<script setup>
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'

import logoClaro from '../assets/logo-claro.png'
import logoOscuro from '../assets/logo-oscuro2.png'

// controla la apertura y cierre del menú
const menuAbierto = ref(false)

const toggleMenu = () => {
    menuAbierto.value = !menuAbierto.value
}

// accede al sistema de temas configurado en Vuetify
const theme = useTheme()

// detecta si actualmente está activo el tema oscro
const temaOscuro = computed(() => {
    return theme.global.name.value === 'darkTheme'
})

// funcion para alternar entre el tema claro y el tema oscuro
function cambiarTema() {
    theme.global.name.value = temaOscuro.value ? 'lightTheme' : 'darkTheme'
}

// funcion para cambiar el logo renderizado segun el tema activo actual para mantener buen contraste
const logoActual = computed(() => {
    return temaOscuro.value ? logoOscuro : logoClaro
})
</script>

<template>
    <header class="header">
        <div class="header-contenido">
            <img :src="logoActual" alt="Logo Vue Product Showcase" class="logo-header" />

            <v-btn class="menu-toggle" icon variant="text" @click="toggleMenu"
                :aria-label="menuAbierto ? 'Cerrar menú' : 'Abrir menú'">
                <v-icon>{{ menuAbierto ? 'mdi-close' : 'mdi-menu' }}</v-icon>
            </v-btn>

            <nav aria-label="Navegación principal" :class="{ 'menu-abierto': menuAbierto }">
                <ul class="nav-list">
                    <li>
                        <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
                    </li>

                    <li>
                        <RouterLink class="link" :to="{ name: 'productos' }">Productos</RouterLink>
                    </li>

                    <li>
                        <RouterLink class="link" :to="{ name: 'favoritos' }">Favoritos</RouterLink>
                    </li>

                    <li class="tema-item">
                        <v-btn icon @click="cambiarTema"
                            :aria-label="temaOscuro ? 'Activar tema claro' : 'Activar tema oscuro'">
                            <v-icon>
                                {{ temaOscuro ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
                            </v-icon>
                        </v-btn>
                    </li>

                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: #06D6A0;
    color: #000022;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
}

.header-contenido {
    min-height: 86px;
    padding: 0.8rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-header {
    width: 190px;
    height: auto;
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.tema-item {
    display: flex;
    align-items: center;
}

.link {
    padding: 0.65rem 1rem;
    color: #000022;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.link:hover {
    background-color: #557c9b;
    color: #ffffff;
}

.v-theme--darkTheme .header .link:hover {
    background-color: #304163;
}

.link.router-link-active {
    background-color: #2E6FA0;
    color: #ffffff;
}

.v-theme--darkTheme .header .link.router-link-active {
    background-color: #162949;
}

.menu-toggle {
    display: none;
}

.v-theme--darkTheme .header {
    background-color: #047857;
    color: #ffffff;
}

.v-theme--darkTheme .header .link {
    color: #ffffff;
}

@media (max-width: 600px) {
    .header-contenido {
        padding: 0.7rem 0.8rem;
    }

    .logo-header {
        width: 150px;
    }

    .nav-list {
        gap: 0.25rem;
    }

    .link {
        padding: 0.5rem 0.4rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 500px) {
    .header-contenido {
        position: relative;
    }

    .logo-header {
        width: 160px;
    }

    .menu-toggle {
        display: flex;
    }

    nav {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        width: 100%;
        background-color: #06D6A0;
        z-index: 10;
    }

    .v-theme--darkTheme nav {
        background-color: #047857;
    }

    nav.menu-abierto {
        display: block;
    }

    .nav-list {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }

    .tema-item {
        justify-content: center;
        padding: 0.7rem 0;
    }

    .link {
        display: block;
        width: 100%;
        padding: 0.8rem 1rem;
        text-align: center;
        font-size: 0.9rem;
    }
}
</style>
