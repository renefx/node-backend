# Backend Node

Servidor desenvolvido em NodeJS com um banco MongoDB com as funcionalidades:
-Autenticação
-Upload de imagem
-PushNotification com firebase
-Validação de body
-Bloqueio de ip

## Tecnologias
NodeJS, nodemon, express, MongoDB, mongoose, aws S3, firebase.

## Getting Started
Navegue até a pasta do projeto e instale as dependências:
```sh
npm install
```

## Execução Ambiente produção
```sh
npm install
```
O script start é utilizado para execução em produção. 

## Execução Ambiente Desenvolvimento
```sh
npm run dev
```
O script dev é utilizado para desenvolvimento, esse conta com o nodemon e um arquivo .env.
Para o funcionamento correto crie um arquivo .env na pasta raiz contendo as variáveis de ambiente.

## Variáveis de Ambiente
Seja para produção ou desenvolvimento, essas são as variáveis de ambiente que devem ser iniciadas.

```sh
PORT=

# dev: ambiente de desenvolvimento
# production: ambiente de produção
NODE_ENV=

# Informações do banco no mongo atlas
BD_USER=
BD_PASSWORD=
BD_NAME=

# Valor para gerar um JWT único
JWT_KEY=segredojwt

# s3: para produção
# local: em desenvolvimento
STORAGE_TYPE=local

# S3 AWS Configurações
BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
```

## Banco de dados
Para o funcionamento da aplicação utilizamos um banco em nuvem da [Mongo Atlas](https://www.mongodb.com/cloud/atlas). 

## Firebase
Para usar o firebase, crie um projeto no [console](https://console.firebase.google.com/). 
Gere uma nova private key nas "Configuraçoes do projeto" > "Service accounts", baixe o json e substitua o que existe na pasta utils.
Ao capturar o token do FCM, substitua no endpoint de criação de um novo pedido.

## Contact Info
renefx@gmail.com
