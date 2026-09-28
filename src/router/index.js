import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue'
import Productos from '../views/ListaProductosView.vue'
import DetalleProducto from '../views/DetalleProductoView.vue'
import ProductosFavoritos from '../views/ProductosFavoritosView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/productos',
      name: 'productos',
      component: Productos
    },
    { // usar una expresion regular en la parte de la ruta que contiene el id para que solo acepte numeros, formado por uno o mas digitos, por lo que si se manipula manualmente la direccion, con un dato no numerico en esa parte, sera ruta invalida e ira a notFoundView
      path: '/productos/:id(\\d+)', 
      name: 'productoDetalle',
      component: DetalleProducto,
      props: true
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: ProductosFavoritos
    },
    // ruta comodin para capturar cualquier ruta no definida y redirigir a vista con error 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
