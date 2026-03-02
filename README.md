# 🚀 Autoflex Inventory System

Este projeto é uma solução completa de **Gestão de Inventário e Planejamento de Produção** desenvolvida como teste técnico para a Autoflex. O sistema permite o controle rigoroso de insumos e a otimização da produção industrial com base no estoque disponível.

---

## 📋 Descrição do Problema
O desafio consistia em criar uma plataforma que gerenciasse o estoque de matérias-primas e sugerisse o plano de produção ideal. O diferencial técnico está na **priorização inteligente**: o sistema calcula a produção máxima priorizando sempre os produtos de maior valor agregado, garantindo o melhor retorno financeiro para a empresa.

## ✨ Funcionalidades Principais

* **Controle de Insumos (Raw Materials):** Cadastro e gestão de quantidades em estoque de cada matéria-prima.
* **Gestão de Produtos:** Cadastro de produtos finais com seus respectivos valores de mercado.
* **Receituário Dinâmico (Recipes):** Associação de múltiplas matérias-primas para a composição de um único produto.
* **Dashboard de Produção:** Interface que lista o plano de produção sugerido e o faturamento total estimado.
* **Baixa Automática de Estoque:** Ao confirmar a produção, o sistema realiza a subtração automática dos insumos no banco de dados.
* **Histórico de Produção:** Registro de todos os ciclos de produção realizados, com data, hora e valores.
* **Exportação em PDF:** Geração de relatórios profissionais das ordens de produção e histórico.

---

## 🛠️ Tecnologias e Arquitetura

O projeto foi construído seguindo os mais altos padrões de desenvolvimento exigidos:

* **Back-end (API):** Desenvolvido com **Java 17** e **Spring Boot**, utilizando JPA/Hibernate para persistência.
* **Front-end:** Construído com **Next.js (React)**, garantindo uma interface rápida e moderna.
* **Banco de Dados:** Utilização do **PostgreSQL** (hospedado via Neon Console).
* **Estilização:** **Tailwind CSS** para garantir responsividade total em dispositivos móveis e desktops.
* **Documentação:** Implementação de **Swagger (OpenAPI)** para facilitar a integração e testes da API.

---

## 🏗️ Atendimento aos Requisitos (RNFs e RFs)

O sistema atende integralmente aos requisitos propostos:
* **RNF007:** Toda a codificação (variáveis, classes, tabelas) foi realizada em **Língua Inglesa**.
* **RNF002:** Separação clara entre **Back-end (API)** e **Front-end**.
* **RF004:** Lógica de sugestão de produção baseada estritamente no estoque e priorização por valor.

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/autoflex-inventory.git](https://github.com/seu-usuario/autoflex-inventory.git)
    ```

2.  **Back-end:**
    * Certifique-se de ter o **JDK 17** instalado.
    * Configure as credenciais do banco no `application.properties`.
    * Execute via IntelliJ ou terminal: `./mvnw spring-boot:run`.

3.  **Front-end:**
    * Navegue até a pasta do front-end.
    * Instale as dependências: `npm install`.
    * Inicie o servidor de desenvolvimento: `npm run dev`.

---

## 👨‍💻 Desenvolvedor

**Victor**
Estudante do **7º termo de Ciência da Computação** na **Unoeste**. 
Com experiência técnica acumulada no **SENAI** e vivência prática em processos industriais (ex-aprendiz na **ATVOS**). Atualmente focado no desenvolvimento de sistemas ERP e aplicações inovadoras em visão computacional para o esporte.

---
*Este projeto foi desenvolvido como parte do processo seletivo para a Autoflex.*
