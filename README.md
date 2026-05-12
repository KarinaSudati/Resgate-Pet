# 🐾 ResgatePet

> **Um sistema para conectar animais resgatados a lares seguros.**

## 💡 1. Apresentação da Ideia

A ideia deste projeto surgiu a partir do desafio de criar soluções tecnológicas voltadas para o cenário das grandes enchentes e desastres naturais no Brasil. Ao acompanhar as notícias, percebi uma dor muito forte e silenciosa: a situação dos animais. Pensando nisso, decidi focar as minhas habilidades para tentar aliviar um pouco dessa dificuldade.

## 🎯 2. O Problema Escolhido

Durante e após desastres climáticos ou enchentes, milhares de animais de estimação se perdem de suas famílias ou acabam desabrigados de forma abrupta.
O problema central que este projeto busca resolver é a desorganização da informação no momento do resgate: **Como cadastrar rapidamente animais encontrados, registrar lares temporários disponíveis e conectar as pessoas que querem ajudar?**

## 🚀 3. Solução Proposta

A solução é o **ResgatePet**, um sistema de gerenciamento rápido. O objetivo do sistema é permitir o cadastro de:

- **Usuários:** Voluntários e pessoas dispostas a ajudar.
- **Pets:** Registro detalhado dos animais resgatados (espécie, status, localização, foto e descrição).
- **Lares Temporários:** Mapeamento de locais seguros para abrigar os animais até que reencontrem seus donos ou sejam adotados.

## 🏗️ 4. Estrutura do Sistema

O projeto foi dividido em três partes principais para garantir organização e escalabilidade:

### 🖥️ Front-end

Interface desenvolvida em **React** com **Vite**, estilizada com **Tailwind CSS v4**. Permite que qualquer pessoa utilize o sistema de forma visual e intuitiva pelo navegador.

**Páginas:**

- **Home** — Página inicial com apresentação do projeto e acesso rápido às funcionalidades.
- **Cadastro de Usuário** — Formulário para registrar voluntários e pessoas dispostas a ajudar.
- **Cadastro de Pet** — Formulário completo com nome, espécie, status, localização, descrição e URL da foto.
- **Lista de Pets** — Exibe todos os pets cadastrados em cards, com opção de editar e excluir.
- **Cadastro de Lar Temporário** — Formulário para oferecer abrigo para animais resgatados.

**Componentes:**

- **Navbar** — Menu de navegação responsivo com menu hamburguer para dispositivos móveis.
- **PetCard** — Card reutilizável que exibe as informações de cada pet com foto, status colorido e data.

**Navegação:** React Router DOM para roteamento entre páginas sem recarregamento.

**Comunicação com a API:** Axios para realizar as requisições HTTP ao back-end.

### ⚙️ Back-end

API RESTful desenvolvida em **Node.js** com **Express** que recebe as informações, processa e se comunica com o banco de dados. Está hospedada no **Render**.

**Rotas disponíveis:**

- `GET/POST/PUT/DELETE /usuarios`
- `GET/POST/PUT/DELETE /pets`
- `GET/POST/PUT/DELETE /lares-temporarios`

### 🗄️ Banco de Dados

Modelagem relacional em **PostgreSQL** com três tabelas conectadas:

- **usuarios** — id, nome, watsapp, email, data_criacao
- **pets** — id, usuario_id, nome_pet, especie, status, localizacao, descricao, foto_url, data_postagem
- **lares_temporarios** — id, usuario_id, capacidade, especies_aceitas, observacoes, disponivel, data_cadastro

Hospedado na nuvem pelo **Supabase**.

## 💻 5. Tecnologias Usadas

**Front-end:**

- React
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- React Icons

**Back-end:**

- Node.js
- Express

**Banco de Dados:**

- PostgreSQL (Supabase)

**Deploy:**

- Back-end: Render
- Front-end: Vercel

## 🔗 Links

- 🌐 **Deploy Back-end (Render):** https://resgate-pet.onrender.com/
- 🖥️ **Deploy Front-end (Vercel):** https://resgate-pet-two.vercel.app/

## 🧠 Mais Importante

A construção deste projeto vai além das linhas de código. Este desafio não possui uma única resposta correta. O objetivo principal aqui é desenvolver:

- **Pensamento Crítico** para entender o cenário de um desastre real.
- **Análise de Problemas** para focar em uma dor específica (os pets desabrigados).
- **Organização de Dados** modelando um banco relacional eficiente.
- **Construção de Soluções com Tecnologia**, transformando lógica de programação em uma ferramenta que pode fazer a diferença na vida real.

---

_Desenvolvido com dedicação por Karina Sudati. 🚀_
