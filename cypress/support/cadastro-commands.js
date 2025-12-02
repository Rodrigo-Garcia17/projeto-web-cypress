Cypress.Commands.add('acessarCadastro', () => {
    cy.visit('/register')
})

Cypress.Commands.add('preencherUsuario', (nome) => {
    cy.get('#user').type(nome)
})

Cypress.Commands.add('preencherEmail', (email) => {
    cy.get('#email').type(email)
})

Cypress.Commands.add('preencherSenha', (senha) => {
    cy.get('#password').type(senha)
})

Cypress.Commands.add('clicarCadastrar', () => {
    cy.get('#btnRegister').click()
})

Cypress.Commands.add('validarCadastro', () => {
    cy.get('#swal2-title')
        .should('be.visible')
        .and('contain', 'Cadastro realizado!')
})

Cypress.Commands.add('validarNome', (nome) => {
    cy.get("#swal2-html-container")
        .should('be.visible')
        .and('contain', `Bem-vindo ${nome}`)
})

Cypress.Commands.add('clicarOk', () => {
    cy.get('.swal2-confirm').click()

})

Cypress.Commands.add('validarCadastroErro', (campo, mensagem) => {
    cy.get(campo)
        .should('be.visible')
        .and('contain', mensagem)
})