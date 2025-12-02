# 🧪 Projeto QA – Cadastro de Usuário (Web)

## 🎯 Objetivo
Automatizar e validar os fluxos de **Cadastro de Usuário** no ambiente de estudo [Qazando Shop](https://automationpratice.com.br/register), cobrindo cenários positivos, negativos e de validação.

---

## 🧰 Tecnologias Utilizadas
- **Cypress**  
- **Faker.js** (geração dinâmica de dados)  
- **JavaScript (ES6+)**  
- **Node.js**  
- **Mochawesome Reports**  
- **Jira** (gerenciamento de testes e bugs)  

---

## 📋 Escopo de Testes

| ID | Cenário | Tipo | Status |
|----|----------|------|--------|
| CT01 | Cadastro com sucesso | Positivo | ✅ Passou |
| CT02 | Campos vazios | Negativo | ✅ Passou |
| CT03 | E-mail inválido | Validação | ✅ Passou |
| CT04 | Senha curta | Validação | ✅ Passou |
| CT05 | Nome com caracteres inválidos | Negativo | ❌ Bug documentado |
| CT06 | E-mail duplicado | Negativo | ❌ Bug documentado |
| CT07–CT13 | Outros fluxos de validação | Diversos | ✅ Passaram |

---

## 🐞 Bugs Documentados
| ID | Descrição | Status |
|----|------------|--------|
| BUG-CT05 | Sistema aceita nome com caracteres inválidos | ❌ Won’t Fix |
| BUG-CT06 | Sistema permite cadastro com e-mail duplicado | ❌ Won’t Fix |

---

## 🧩 Estrutura do Projeto
cypress/
├── e2e/
│ └── cadastro.cy.js
├── support/
│ ├── cadastro-commands.js
│ ├── commands.js
│ └── e2e.js
├── screenshots/
docs/
├── evidencias/
└── jira/


---

## 📎 Evidências
Todas as evidências de execução (prints e logs Cypress) estão disponíveis na pasta `/docs/evidencias`.
Link plano de teste: https://docs.google.com/spreadsheets/d/1TmC4CQfRxFbUFHcXsBQ1iR81lkd8kPwm/edit?usp=drive_link&ouid=108860538402249057489&rtpof=true&sd=true

---

## 👨‍💻 Autor
**Rodrigo Garcia da Silva**  
📍 Valinhos/SP  
🔗 [LinkedIn](https://linkedin.com/in/rodrigo-garcia-da-silva)  
💻 [GitHub](https://github.com/Rodrigo-Garcia17)
