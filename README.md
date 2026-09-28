# Vue Products Showcase - Proyecto 7

Aplicación web desarrollada con **Vue 3** que funciona como una **SPA (Single Page Application)** para consultar y gestionar un catálogo de productos obtenido desde una API REST externa.

La aplicación permite visualizar productos, filtrar por categoría, consultar el detalle de cada producto, marcar o quitar productos de favoritos y alternar entre tema claro y oscuro. Además, incorpora manejo de estados de carga, error y catálogo vacío, navegación mediante Vue Router, pruebas unitarias con Jest y Vue Test Utils y una prueba end-to-end (E2E) con Cypress.

## Tecnologías utilizadas

- Vue 3
- Vue CLI
- Vue Router
- Vuex
- Axios
- Vuetify
- Material Design Icons
- Jest
- Vue Test Utils
- flush-promises
- Cypress
- start-server-and-test
- JavaScript
- HTML5
- CSS3

## Requisitos previos

Para ejecutar el proyecto se debe contar con:

- Node.js instalado.
- npm instalado.
- Una terminal o consola de comandos.

## Instalación del proyecto

1. Descargar o clonar el repositorio.

```bash
git clone https://github.com/Lore-FS/Proyecto-modulo-7-catalogo-productos.git
```

2. Ingresar a la carpeta del proyecto.

```bash
cd Proyecto-modulo-7-catalogo-productos
```

3. Instalar las dependencias definidas en `package.json`.

```bash
npm install
```

4. Ejecutar el proyecto en modo desarrollo.

```bash
npm run serve
```

5. Abrir en el navegador la dirección local indicada por Vue CLI en la terminal, normalmente:

```text
http://localhost:8080/
```

## Otros comandos disponibles

Generar una versión optimizada para producción:

```bash
npm run build
```

Revisar el código con ESLint:

```bash
npm run lint
```

## Despliegue en GitHub Pages

La aplicación se encuentra publicada mediante GitHub Pages en:

https://lore-fs.github.io/Proyecto-modulo-7-catalogo-productos/

Para generar la versión de producción:

```bash
npm run build
```

Luego, para publicar la carpeta dist en la rama gh-pages:

```bash
npm run deploy
```

## Ejecución de pruebas unitarias

Para ejecutar todas las pruebas unitarias del proyecto:

```bash
npm run test:unit
```

El `package.json` también incluye scripts para ejecutar cada prueba unitaria de forma independiente:

```bash
npm run productcard
```

Ejecuta:

```text
tests/unit/ProductCardComponent.spec.js
```

Y:

```bash
npm run listaproductos
```

Ejecuta:

```text
tests/unit/ListaProductosView.spec.js
```

Las pruebas unitarias utilizan **Jest** y **Vue Test Utils** para comprobar el comportamiento de componentes y vistas de manera aislada. Además, se utilizan mocks, stubs y `flush-promises` cuando es necesario controlar dependencias o esperar la resolución de procesos asincrónicos.

## Ejecución de la prueba end-to-end

El proyecto incluye una prueba E2E desarrollada con **Cypress** para validar el flujo de filtrado de productos.

La estructura de Cypress se creó manualmente en la raíz del proyecto:

```text
cypress/
├── e2e/
│   └── FiltroProductos.cy.js
├── fixtures/
├── screenshots/
└── support/

cypress.config.js
```

La carpeta `cypress/e2e/` contiene las pruebas end-to-end. Las carpetas `fixtures`, `screenshots` y `support` quedan disponibles para datos simulados, capturas y archivos de soporte. En la configuración actual se utiliza `supportFile: false`, por lo que Cypress no carga automáticamente un archivo de soporte.

El archivo `cypress.config.js` define la configuración mínima de Cypress:

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    allowCypressEnv: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'http://localhost:8080',
    supportFile: false
  }
})
```

La prueba del filtro se encuentra en:

```text
cypress/e2e/FiltroProductos.cy.js
```

### Ejecución manual en dos terminales

Si se desea ejecutar el servidor y Cypress por separado, primero se debe levantar la aplicación en una terminal:

```bash
npm run serve
```

Luego, en una segunda terminal, se pueden ejecutar todas las pruebas E2E:

```bash
npm run test:e2e:run
```

También se puede ejecutar únicamente la prueba del filtro:

```bash
npm run test:e2e:spec
```

Los scripts correspondientes en `package.json` son:

```json
"test:e2e:run": "cypress run",
"test:e2e:spec": "cypress run --spec cypress/e2e/FiltroProductos.cy.js"
```

También es posible ejecutar Cypress directamente sin utilizar estos scripts:

```bash
npx cypress run
```

Para ejecutar únicamente la prueba del filtro en Electron:

```bash
npx cypress run --spec "cypress/e2e/FiltroProductos.cy.js"
```

Para ejecutar únicamente la prueba del filtro en Chrome:

```bash
npx cypress run --spec "cypress/e2e/FiltroProductos.cy.js" --browser chrome
```

### Ejecución automatizada

Para evitar utilizar una terminal para levantar Vue y otra para ejecutar Cypress, el proyecto utiliza la dependencia de desarrollo `start-server-and-test`.

Esta dependencia queda instalada junto con las demás dependencias al ejecutar `npm install`. Si fuera necesario instalarla de forma independiente, se puede utilizar:

```bash
npm install start-server-and-test --save-dev
```

El script configurado en `package.json` es:

```json
"e2e": "start-server-and-test serve http://localhost:8080 test:e2e:run"
```

Por lo tanto, el flujo completo puede ejecutarse con un único comando:

```bash
npm run e2e
```

Este comando levanta el servidor de Vue CLI, espera a que `http://localhost:8080` esté disponible y luego ejecuta las pruebas E2E de Cypress en modo headless.

## Funcionalidades principales

- Visualización de un catálogo de productos.
- Consumo de una API REST externa mediante Axios.
- Indicador visual mientras se cargan los productos.
- Mensaje visual cuando ocurre un error al consultar la API.
- Mensaje visual cuando el catálogo se encuentra vacío después de una carga correcta desde la API.
- Filtrado de productos por categoría.
- Navegación hacia el detalle de un producto.
- Validación de parámetros dinámicos numéricos en las rutas de productos.
- Vista de error para rutas inexistentes.
- Marcado y desmarcado de productos favoritos.
- Vista independiente para productos favoritos.
- Tema claro y tema oscuro.
- Navegación responsive con menú adaptable a dispositivos de menor tamaño.
- Pruebas unitarias de componentes y manejo visual de errores.
- Prueba E2E del flujo de filtrado de productos con Cypress.

## Estructura general del proyecto

```text
src/
├── assets/
│   └── main.css
├── components/
│   ├── FooterComponent.vue
│   ├── HeaderComponent.vue
│   └── ProductCardComponent.vue
├── plugins/
│   └── vuetify.js
├── router/
│   └── index.js
├── store/
│   ├── index.js
│   └── modules/
│       ├── favourites.js
│       ├── filters.js
│       └── products.js
├── views/
│   ├── DetalleProductoView.vue
│   ├── HomeView.vue
│   ├── ListaProductosView.vue
│   ├── NotFoundView.vue
│   └── ProductosFavoritosView.vue
├── App.vue
└── main.js

tests/
└── unit/
    ├── ListaProductosView.spec.js
    └── ProductCardComponent.spec.js

cypress/
├── e2e/
│   └── FiltroProductos.cy.js
├── fixtures/
├── screenshots/
└── support/

cypress.config.js
```

Las pruebas unitarias se mantienen en `tests/unit`, mientras que las pruebas E2E se organizan de forma independiente dentro de la carpeta `cypress`, siguiendo la estructura utilizada por Cypress para pruebas end-to-end.

# Justificaciones técnicas

## 1. Uso de Vue 3 y Composition API

Se utiliza Vue 3 para construir la interfaz mediante componentes reutilizables y reactivos. En las vistas y componentes se emplea `<script setup>`, junto con herramientas de Composition API como `ref`, `computed` y `onMounted`.

Esta elección permite separar claramente los datos reactivos, propiedades computadas y funciones de cada componente, manteniendo una estructura más organizada y facilitando la reutilización de lógica.

## 2. Arquitectura SPA con Vue Router

El proyecto se desarrolla como una **Single Page Application**, por lo que las distintas secciones se muestran mediante Vue Router sin realizar una recarga completa del documento HTML en cada navegación.

Se definieron rutas para:

- Inicio.
- Catálogo de productos.
- Detalle de producto.
- Productos favoritos.
- Página no encontrada.

La ruta de detalle utiliza un parámetro dinámico `:id` y una expresión regular que permite solamente valores numéricos. Esto evita que una dirección como `/productos/abc` sea interpretada como una ruta válida de detalle.

También se incorporó una ruta comodín `/:pathMatch(.*)*` para mostrar una vista de error 404 cuando el usuario accede a una ruta que no existe.

## 3. Paso del parámetro `id` mediante props

En la ruta de detalle se utiliza `props: true`.

De esta forma, el parámetro dinámico `id` de la URL es recibido directamente por la vista mediante `defineProps`. Esto reduce el acoplamiento entre el componente y el objeto de ruta, porque la vista trabaja con una propiedad recibida en lugar de depender directamente de `route.params`.

## 4. Gestión centralizada del estado con Vuex

Se utiliza Vuex para almacenar y compartir información entre diferentes vistas y componentes de la aplicación.

El store se dividió en tres módulos:

### `products`

Administra:

- Lista de productos.
- Estado de carga.
- Estado de error.
- Consulta de productos a la API.
- Estado derivado de catálogo vacío mediante el getter `isEmpty`.

### `filters`

Administra:

- Categoría seleccionada.
- Lista de productos filtrados.

### `favourites`

Administra:

- Productos marcados como favoritos.
- Agregar favoritos.
- Eliminar favoritos.
- Verificar si un producto se encuentra marcado como favorito.

La separación en módulos con `namespaced: true` evita concentrar toda la lógica en un único archivo y permite identificar claramente a qué dominio pertenece cada acción, mutación o getter, por ejemplo:

```js
store.dispatch('products/fetchProducts')
store.dispatch('filters/changeCategory', categoria)
store.dispatch('favourites/agregarFavorito', product)
```

## 5. Uso de acciones, mutaciones y getters en Vuex

Las **acciones** se utilizan para ejecutar operaciones y coordinar cambios de estado, incluyendo procesos asincrónicos como las peticiones HTTP.

Las **mutaciones** realizan la modificación efectiva del estado del store.

Los **getters** permiten obtener información derivada o reutilizable, como la cantidad de productos, los productos filtrados, la comprobación de si un producto pertenece a favoritos y el estado de catálogo vacío. Para este último caso, el getter `isEmpty` verifica que la carga haya finalizado, que no exista error y que el arreglo de productos esté vacío.

Esta distribución mantiene un flujo de datos predecible y evita modificar directamente el estado desde distintos componentes.

## 6. Consumo de API REST con Axios

El módulo `products` utiliza Axios para comunicarse con la API externa de productos.

Para obtener el catálogo se utiliza una petición `GET`:

```js
axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=20')
```

Axios se mantiene dentro de las acciones de Vuex en lugar de realizar las peticiones directamente desde cada componente. Esta decisión centraliza el acceso a los datos y evita repetir lógica de comunicación con la API en distintas vistas.

## 7. Manejo de carga, errores y catálogo vacío

El módulo `products` mantiene los estados:

```js
products: []
loading: false
error: null
```

Además, el módulo `products` incorpora el getter `isEmpty`, que determina si la carga terminó correctamente, no existe un error y el arreglo de productos se encuentra vacío.

Antes de iniciar la consulta a la API se activa `loading`. Al finalizar la operación se desactiva mediante `finally`, independientemente de si la solicitud fue exitosa o produjo un error.

La vista del catálogo reacciona a estos estados mostrando:

- Un `v-progress-circular` mientras los productos se están cargando.
- Un `v-alert` cuando ocurre un error.
- Un `v-alert` de tipo `warning` cuando la carga finaliza correctamente pero no existen productos disponibles.
- La lista de productos cuando la carga termina correctamente y existen productos disponibles.

Esto mejora la experiencia de usuario porque la interfaz informa claramente el estado de la operación asincrónica.

## 8. Evitar solicitudes innecesarias a la API

En distintas vistas se comprueba primero si Vuex ya posee productos cargados:

```js
if (store.state.products.products.length === 0) {
  await store.dispatch('products/fetchProducts')
}
```

De esta manera se evita repetir la petición cada vez que el usuario navega entre vistas cuando los datos ya están disponibles en el store durante la sesión actual.

## 9. Filtrado mediante módulo Vuex

Las categorías disponibles se obtienen desde los productos cargados y se eliminan los valores repetidos antes de mostrarlas en el selector.

La categoría seleccionada se envía al módulo `filters`, cuyo getter `filteredProducts` utiliza el estado global de productos para devolver solamente aquellos que coinciden con la categoría elegida.

Esta decisión mantiene la lógica del filtrado fuera de la presentación principal de las tarjetas y permite que el filtro forme parte del estado centralizado.

## 10. Componentización con `ProductCardComponent`

Cada producto del catálogo se renderiza mediante `ProductCardComponent`.

`ListaProductosView` entrega el producto al componente hijo a través de una prop:

```html
<ProductCard
  v-for="product in productosFiltrados"
  :key="product.id"
  :product="product"
/>
```

El componente se encarga de mostrar sus datos y de ejecutar acciones propias de cada tarjeta, como navegar al detalle o modificar el estado de favorito.

Esta separación evita repetir el mismo marcado HTML para cada producto y mantiene la vista del catálogo enfocada en la carga, el filtrado y la distribución de la lista.

## 11. Favoritos como módulo independiente

La funcionalidad de favoritos se mantiene en un módulo Vuex independiente porque representa un estado transversal utilizado por más de una vista.

Antes de agregar un producto se utiliza `some()` para comprobar que no exista otro favorito con el mismo `id`, evitando duplicados.

Para eliminar un favorito se utiliza `filter()`, generando un arreglo que excluye el producto indicado.

Además, el getter `isFavourite` recibe un `id` y permite que cada tarjeta determine dinámicamente qué texto mostrar:

- `Añadir a Favoritos`.
- `Quitar de Favoritos`.

## 12. Uso de Vuetify

Vuetify se utiliza como biblioteca de componentes visuales para construir elementos de interfaz como:

- Tarjetas.
- Botones.
- Selectores.
- Campos de texto.
- Alertas.
- Indicadores de carga.
- Snackbar.
- Iconos.

Su uso permite mantener consistencia visual y aprovechar componentes que ya incluyen comportamientos y propiedades orientadas a interfaces modernas.

## 13. Tema claro y oscuro

La configuración de Vuetify define dos temas propios:

- `lightTheme`.
- `darkTheme`.

El encabezado utiliza `useTheme()` para consultar el tema activo y alternarlo dinámicamente. También cambia el logo según el tema para conservar un contraste adecuado.

Se complementa esta configuración con estilos CSS específicos para adaptar fondos, textos, tarjetas y otros elementos al modo oscuro.

## 14. Diseño responsive

Se utilizan CSS Grid, Flexbox y media queries para adaptar la interfaz a distintos tamaños de pantalla.

Entre los principales ajustes se encuentran:

- El catálogo muestra dos columnas en pantallas amplias y una columna en pantallas menores.
- Los botones de las tarjetas se reorganizan cuando disminuye el ancho disponible.
- El encabezado cambia a un menú desplegable en pantallas pequeñas.

Esto permite que la aplicación sea utilizable tanto en equipos de escritorio como en dispositivos móviles.

## 15. Pruebas unitarias con Jest y Vue Test Utils

Las pruebas unitarias utilizan `mount()` de Vue Test Utils para montar componentes en un entorno de prueba y comprobar el resultado renderizado y determinadas interacciones.

### Pruebas de `ProductCardComponent`

Se comprueba:

1. Que el componente renderice correctamente datos del producto, incluyendo título, precio y categoría.
2. Que al presionar el botón de detalle se llame a la navegación con la ruta correspondiente al producto.

Para aislar el componente se utilizan:

- Un mock de `useRouter()` y `router.push()`.
- Un mock de `useStore()` y `dispatch()`.
- Stubs de componentes de Vuetify.

Los stubs conservan mediante `<slot />` el contenido relevante que el componente coloca dentro de los componentes Vuetify, permitiendo comprobar el texto sin necesitar renderizar completamente la biblioteca visual.

### Prueba de `ListaProductosView`

Se simula un error de API mediante una acción `fetchProducts` falsa creada con `jest.fn()`.

La prueba verifica que:

- La acción de carga se ejecute al montar la vista.
- El estado de error sea actualizado.
- La interfaz muestre el mensaje general de fallo.
- La interfaz muestre el mensaje específico simulado de error de conexión.

También se utiliza `flush-promises` para esperar a que finalicen las promesas pendientes antes de realizar las aserciones sobre el contenido renderizado.

## 16. Uso de mocks y stubs en las pruebas

Los **mocks** permiten reemplazar dependencias como Vue Router y Vuex por implementaciones controladas dentro del entorno de prueba.

Los **stubs** permiten sustituir componentes secundarios o componentes de Vuetify por versiones simplificadas.

Esta estrategia hace que las pruebas se concentren en el comportamiento del componente que se desea evaluar y evita depender de navegación real, llamadas reales al store o la implementación completa de componentes externos.

## 17. Prueba end-to-end con Cypress

Además de las pruebas unitarias, el proyecto incorpora una prueba **end-to-end (E2E)** con Cypress para comprobar un flujo completo desde la perspectiva del usuario.

La prueba se encuentra en:

```text
cypress/e2e/FiltroProductos.cy.js
```

Esta prueba valida el siguiente comportamiento:

1. El usuario ingresa a la ruta `/productos`.
2. Cypress espera que exista al menos una tarjeta `.tarjeta-producto`, confirmando que el catálogo ya contiene productos obtenidos desde la API. Esta comprobación no exige que las imágenes de los productos hayan terminado de cargarse.
3. Se localiza el selector de categorías mediante `#categoria` y se accede a su contenedor `.v-field`, debido a la estructura generada internamente por el `v-select` de Vuetify.
4. Una vez abierto el selector, Cypress obtiene las opciones disponibles mediante `cy.get('.v-list-item')`.
5. Se selecciona la primera categoría disponible utilizando `.first()`, evitando depender de un nombre de categoría fijo entregado por la API.
6. Finalmente, se comprueba que continúe existiendo al menos una tarjeta `.tarjeta-producto` después de aplicar el filtro.

La selección dinámica de la categoría se utiliza porque las categorías disponibles dependen de los productos obtenidos desde la API externa. De esta forma, la prueba no queda vinculada a una categoría específica que podría no estar disponible en una ejecución futura.

Para realizar la selección se utiliza:

```js
cy.get('.v-list-item')
  .first()
  .click({ force: true })
```

El uso de `click({ force: true })` permite efectuar la interacción aun cuando el componente de Vuetify mantiene temporalmente estados visuales o animaciones que pueden interferir con la interacción automatizada (sugerencia de Cypress).

Esta prueba es diferente de una prueba unitaria porque no evalúa una función o un componente de manera aislada. En cambio, recorre una funcionalidad completa de la aplicación y comprueba que distintas partes trabajen en conjunto: navegación hacia el catálogo, carga de datos desde la API, generación del selector, interacción del usuario con el filtro y renderizado de los resultados.

Cypress puede ejecutarse en modo **headless**, sin necesidad de abrir su interfaz gráfica:

```bash
npm run test:e2e:run
```

También se puede ejecutar mediante el flujo automatizado:

```bash
npm run e2e
```

Para este último se utiliza `start-server-and-test`, que levanta el servidor de Vue CLI, espera a que `http://localhost:8080` esté disponible y posteriormente ejecuta Cypress.

El uso de Cypress se justifica porque permite simular interacciones reales en el navegador y verificar el comportamiento observable de la aplicación. De esta forma, las pruebas unitarias y la prueba E2E se complementan:

- **Jest + Vue Test Utils:** comprueban componentes y respuestas específicas de manera aislada y controlada.
- **Cypress:** comprueba que un flujo funcional completo se comporte correctamente desde el punto de vista del usuario.

## API utilizada

El proyecto consume productos desde **Platzi Fake Store API** mediante el endpoint:

```text
https://api.escuelajs.co/api/v1/products
```

En la carga inicial se solicitan 20 productos utilizando parámetros `offset` y `limit`.

## Consideraciones

- Los productos y favoritos se mantienen en el estado de Vuex durante la ejecución actual de la aplicación.
- La lista de favoritos no implementa persistencia local en los archivos proporcionados, por lo que puede reiniciarse al recargar completamente la aplicación.
- La aplicación depende de la disponibilidad de la API externa para obtener y mostrar los productos del catálogo.
- La ruta numérica válida no garantiza por sí sola que el producto exista. Por esta razón, `DetalleProductoView` también contempla el caso en que el `id` numérico no corresponde a ningún producto cargado y muestra un mensaje de producto no encontrado.
- Logos generados usando ChatGPT según la paleta de colores escogida.
- Maqueta generada por ChatGPT a partir de screenshots de cada una de las pantallas, tema claro/oscuro y flujos de la aplicación

## Decisión sobre migración opcional a Nuxt o Quasar

La pauta del proyecto contempla de manera **opcional** la posibilidad de migrar la aplicación a **Nuxt** o **Quasar**.

En este proyecto se decidió **no realizar la migración**, ya que la aplicación ya se encuentra estructurada con Vue 3 y Vue CLI, utilizando Vue Router para la navegación, Vuex para el manejo centralizado del estado, Axios para el consumo de la API, Vuetify para la interfaz y Jest/Vue Test Utils junto con Cypress para las pruebas.

Mantener la arquitectura actual permite cumplir con los requerimientos funcionales y técnicos del proyecto sin incorporar una capa adicional de complejidad que no era necesaria para los objetivos de esta entrega.

Nuxt podría aportar funcionalidades como renderizado del lado del servidor, generación estática y una estructura de rutas basada en archivos, mientras que Quasar ofrece un framework completo de interfaz y herramientas para construir aplicaciónes en múltiples plataformas. Sin embargo, estas ventajas no eran indispensables para las necesidades actuales del proyecto.

Por esta razón, se mantuvo la implementación en Vue 3 con Vue CLI, priorizando la estabilidad de la aplicación, la coherencia con las tecnologías trabajadas durante el módulo y el cumplimiento de los requerimientos obligatorios de la pauta.
