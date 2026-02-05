# 🚗 UrbanParkBox

O **UrbanParkBox** é um sistema de estacionamento moderno desenvolvido para gerenciar entradas e saídas de veículos de forma eficiente. O sistema permite o controle rigoroso de vagas disponíveis e mantém um histórico completo, tudo sob a robusta arquitetura **MVC** (Model-View-Controller).

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## Funcionalidades

- [x] **Gestão de Fluxo:** Registro rápido de entrada e saída de veículos.
- [x] **Controle de Ocupação:** Monitoramento de vagas disponíveis por categoria (Carros e Motos).
- [x] **Relatórios:** Visualização do histórico completo de estadias.
- [x] **Dashboard:** Indicadores de ocupação em tempo real.
- [x] **Interface Web:** Acesso via navegador totalmente responsivo.

---

## Estrutura do Projeto (MVC)

A separação de responsabilidades garante um código limpo e fácil de manter:

* **Models:** Gerenciam a lógica de dados e a comunicação direta com o MySQL.
* **Views:** Camada de apresentação que o usuário final interage.
* **Controllers:** O "cérebro" do sistema, processando as requisições e conectando Models às Views.
* **Routes:** Definição dos endpoints da aplicação.

---

## Como rodar o projeto

Siga este passo a passo para ter o UrbanParkBox funcionando na sua máquina:

### 1. Clonando o repositório
Abra o seu terminal e digite:
```bash
git clone [https://github.com/chinagiladev/urbanparkbox.git](https://github.com/chinagiladev/urbanparkbox.git)
cd urbanparkbox
```
---

### Instalando as dependências
```bash
npm install
```
