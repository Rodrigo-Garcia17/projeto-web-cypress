/// <reference types="cypress"/>
import { fa, faker } from '@faker-js/faker';

describe('Cadastro de Usuário', () => {

    it('CT01 - Cadastro com sucesso', () => {

        const nome = faker.person.fullName()

        cy.acessarCadastro()
        cy.preencherUsuario(nome)
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }).toLowerCase())
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()
        cy.validarCadastro()
        cy.validarNome(nome)
        cy.clicarOk()

        cy.url().should('contain', 'my-account')

        cy.screenshot('CT01_Cadastro_Sucesso')

        cy.log('CT01 finalizado com sucesso')

    })

    it('CT02 - Cadastro em branco', () => {

        cy.acessarCadastro()
        cy.clicarCadastrar()
        cy.validarCadastroErro('#errorMessageFirstName', 'O campo nome deve ser prenchido')

        cy.screenshot('CT02_cadastro-branco_erro-nome-obrigatorio')

        cy.log('CT02 finalizado com sucesso')
    
    })


    it('CT03 - E-mail inválido', () => {

        cy.acessarCadastro()
        cy.preencherUsuario(faker.person.fullName())
        cy.preencherEmail('rodrigoeste.com')  // inválido (sem @)
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()
        cy.validarCadastroErro('#errorMessageFirstName','O campo e-mail deve ser prenchido corretamente')

        cy.screenshot('CT03_email-invalido_erro-email-obrigatorio')

        cy.log('CT03 finalizado com sucesso')

    })


    it('CT04 - Senha inválida', () => {

        cy.acessarCadastro()

        cy.preencherUsuario(faker.person.fullName())
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }))
        cy.preencherSenha(faker.string.alpha({ length: 3 })) // inválida (menos de 6 dígitos)
        cy.clicarCadastrar()
        cy.validarCadastroErro('#errorMessageFirstName','O campo senha deve ter pelo menos 6 dígitos')

        cy.screenshot('CT04_senha-curta_erro-senha-minima')

        cy.log('CT04 finalizado com sucesso')

    })

    it('CT05 - Nome com caracteres inválidos (BUG conhecido)', () => {
        cy.acessarCadastro()

        cy.preencherUsuario('@Rodrigo!')
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }))
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()

        // BUG: Sistema aceita nome inválido e permite cadastro
        // Esperado: Mensagem de erro no campo nome
        // Resultado atual: Sistema cadastrou nome com caracteres inválidos
        cy.validarCadastro()

        cy.screenshot('CT05_nome-invalido_bug-sistema-aceita-caracteres')

        cy.log('CT05 finalizado — BUG confirmado')
    })

    it('CT06 - E-mail já cadastrado (BUG conhecido)', () => {
        cy.acessarCadastro()

        cy.preencherUsuario(faker.person.fullName())
        cy.preencherEmail('rodrigo@teste.com') // e-mail que já existe
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()

        // BUG: Sistema permite cadastrar e-mail já cadastrado
        cy.validarCadastro()
        cy.clicarOk()

        cy.screenshot('CT06_email-duplicado_bug-sistema-aceita-email-cadastrado')

        cy.log('CT06 - BUG: Sistema aceita e-mail duplicado')
    })

    it('CT07 - Nome vazio', () => {

        cy.acessarCadastro()
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }))
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()
        cy.validarCadastroErro('#errorMessageFirstName','O campo nome deve ser prenchido')

        cy.screenshot('CT07_nome-vazio_erro-nome-obrigatorio')

        cy.log('CT07 finalizado com sucesso')
    })


    it('CT08 - E-mail vazio', () => {

        cy.acessarCadastro()
        cy.preencherUsuario(faker.person.fullName())
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()
        cy.validarCadastroErro('#errorMessageFirstName','O campo e-mail deve ser prenchido corretamente')

        cy.screenshot('CT08_email-vazio_erro-email-obrigatorio')

        cy.log('CT08 finalizado com sucesso')
    })


    it('CT09 - Senha vazia', () => {

        cy.acessarCadastro()
        cy.preencherUsuario(faker.person.fullName())
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }))
        cy.clicarCadastrar()
        cy.validarCadastroErro('#errorMessageFirstName','O campo senha deve ter pelo menos 6 dígitos')

        cy.screenshot('CT09_senha-vazia_erro-senha-obrigatoria')

        cy.log('CT09 - Senha vazia validado com sucesso')
    })

    it('CT10 - Limite de caracteres no campo Nome (250 caracteres)', () => {
        cy.acessarCadastro()

        const nome250 = faker.string.alpha({ length: 250 })

        cy.preencherUsuario(nome250)
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }))
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()
        cy.validarCadastro()
        cy.clicarOk()

        cy.screenshot('CT10_limite-caracteres_nome-250-aceito')

        cy.log('CT10 finalizado: sistema aceitou 250 caracteres no campo Nome')
    })


    it('CT11 - Campos preenchidos apenas com espaços', () => {

        cy.acessarCadastro()
        cy.preencherUsuario('   ')
        cy.preencherEmail('   ')
        cy.preencherSenha('   ')
        cy.clicarCadastrar()

        // A aplicação só valida o e-mail
        cy.validarCadastroErro('#errorMessageFirstName','O campo e-mail deve ser prenchido corretamente')

        cy.screenshot('CT11_campos-espacos_validacao-incorreta-email')

        cy.log('CT11 finalizado com sucesso')
    })


    it('CT12 - E-mail em maiúsculo', () => {

        cy.acessarCadastro()

        cy.preencherUsuario(faker.person.fullName())
        cy.preencherEmail('RODRIGO@TESTE.COM')
        cy.preencherSenha(faker.internet.password({ length: 6 }))
        cy.clicarCadastrar()
        cy.validarCadastro()
        cy.clicarOk()

        cy.screenshot('CT12_email-maiusculo_cadastro-sucesso')

        cy.log('CT12 finalizado com sucesso — sistema aceita e-mail em maiúsculo')
    })


    it('CT13 - Senha com caracteres especiais', () => {

        cy.acessarCadastro()
        cy.preencherUsuario(faker.person.fullName())
        cy.preencherEmail(faker.internet.email({ provider: 'tester.com' }))
        cy.preencherSenha('@Senha2024!')
        cy.clicarCadastrar()
        cy.validarCadastro()
        cy.clicarOk()

        cy.screenshot('CT13_senha-especial_cadastro-sucesso')

        cy.log('CT13 finalizado com sucesso')
    })

})