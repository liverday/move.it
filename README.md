# <h1 align="center"> ![Logo](./.github/logo-readme.svg) </h1>

<p align="center">
    <img src="https://img.shields.io/github/repo-size/liverday/move.it">
    <img src="https://img.shields.io/github/license/liverday/move.it">
    <img src="https://img.shields.io/github/languages/count/liverday/move.it">
    <img src="https://img.shields.io/github/languages/top/liverday/move.it">
    <img src="https://img.shields.io/github/contributors/liverday/move.it">
    <img src="https://img.shields.io/github/last-commit/liverday/move.it">
</p>

<span>move.it</span> é uma aplicação para incentivar o desenvolvedor a não esquecer de se exercitar. Implementa o método pomodoro que depois de um ciclo de 25 minutos de foco, é gerado um pequeno desafio para te fazer se **movimentar**. Isso tudo com uma plataforma [gamificada](https://www.techtudo.com.br/noticias/noticia/2016/07/o-que-e-gamificacao-conheca-ciencia-que-traz-os-jogos-para-o-cotidiano.html)!

# :hammer: Tecnologias

- ReactJS
- NextJS
- NextAuth
- Mongodb
- Axios
- React Icons
- React Switch
- React Loading
- JS Cookie
- React Responsive

# :computer: Rodando a aplicação

### Pré-requisitos

Primeiro você precisa instalar o [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) e o [NodeJS](https://nodejs.org/en/) na sua máquina.

### Clonando o repositório

```bash
# Realize o clone do repositório
git clone https://github.com/liverday/move.it

# Mude o diretório atual para o repositório clonado
cd move.it
```

### Instalando as dependências

```bash
yarn
```

### Definindo as variáveis de ambiente

Esse repositório é dependente de uma lista de variáveis de ambiente, que estão disponíveis no arquivo `.env.example`. Crie uma cópia dele, modifique seu nome para `.env.local` e altere os valores das variáveis.

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000

# NextAuth JWT
SECRET=

# NextAuth Provider
GITHUB_ID=
GITHUB_SECRET=

# NextAuth Database
DATABASE_URL=
```

### Inicie a aplicação

```bash
# A nossa aplicação será criada e exposta na porta 3000 
# http://localhost:3000
yarn dev
```

# :running: Adicionando novos desafios

É possível criar novos desafios criando novas entradas no arquivo `challenges.json`, disponível na raiz desse repositório.

Tente modificá-lo para personalizar ainda mais a experiência!

Feito com :heart: por Vitor Medeiro. :handshake: Entre em [contato](https://www.linkedin.com/in/vitor-medeiro-9096ab138)!

