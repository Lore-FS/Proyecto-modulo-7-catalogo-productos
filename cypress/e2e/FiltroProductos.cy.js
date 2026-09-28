describe('Suite Prueba de Filtro de Productos', () => {
    it('Usuario filtra productos y ve resultados', () => {
        // abre la vista de catalogo
        cy.visit('/productos')

        // como los productos llegan desde la API, se espera que el catálogo esté cargado antes de usar el filtro
        cy.get('.tarjeta-producto')
            .should('have.length.greaterThan', 0)

        // abre el filtro de categorias
        cy.get('#categoria')
            .closest('.v-field')
            .click()

        // selecciona una categoria disponible
        cy.get('.v-list-item')
            .first()
            .click({ force: true })

        // verifica que existan productos despues de aplicar el filtro
        cy.get('.tarjeta-producto')
            .should('have.length.greaterThan', 0)
  
        // para que en el momento de la prueba, tome una captura, y la guarde con el nombre indicado
        cy.screenshot('FiltroProductos-prueba-exitosa')
    })
})
