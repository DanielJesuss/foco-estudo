# Foco de Estudo — instalação

App de estudo (cronômetro com alarme de intervalo, Pomodoro, matérias, meta diária, registro de horários).
Funciona no celular e no computador. Com o Firebase configurado, tudo sincroniza entre os aparelhos.

## 1. Publicar no GitHub Pages

1. No GitHub, crie um repositório novo (por exemplo `foco-estudo`). Pode ser público.
2. Envie para a raiz do repositório todos os arquivos desta pasta (Add file > Upload files).
3. Em Settings > Pages, em Source escolha "Deploy from a branch", branch `main`, pasta `/ (root)`. Salve.
4. Em 1 a 2 minutos o endereço aparece: `https://SEU-USUARIO.github.io/foco-estudo/`

Já dá para usar assim, salvando só no aparelho. Para sincronizar, faça os passos 2 a 5.

## 2. Criar o projeto no Firebase (gratuito)

1. Acesse console.firebase.google.com e clique em Adicionar projeto. Pode desligar o Google Analytics.
2. No menu Build, abra **Authentication**, clique em Começar, aba "Método de login", ative **E-mail/senha**.
3. Ainda em Authentication, aba **Configurações > Domínios autorizados**, adicione `SEU-USUARIO.github.io`.
4. No menu Build, abra **Firestore Database**, clique em Criar banco de dados, escolha uma região (por exemplo `southamerica-east1`) e o modo de produção.
5. Na aba **Regras** do Firestore, cole o texto abaixo e publique:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## 3. Colar a configuração no app

1. Em Configurações do projeto (engrenagem) > Geral > Seus apps, clique no ícone `</>` (Web) e registre o app (nome qualquer, sem Hosting).
2. O Firebase mostra um bloco `firebaseConfig = { ... }`. Copie os valores.
3. Abra `firebase-config.js` no repositório (lápis para editar), substitua os valores e salve (Commit).

## 4. Primeiro acesso

1. Abra o endereço do GitHub Pages. Aparece o cartão "Entrar para sincronizar".
2. Digite e-mail e senha e toque em **Criar conta**. No outro aparelho, use os mesmos dados e toque em **Entrar**.
3. O indicador no topo muda para "Sincronizado".

## 5. Instalar como app

- Android (Chrome): menu ⋮ > Instalar aplicativo.
- iPhone (Safari): Compartilhar > Adicionar à Tela de Início.
- Computador (Chrome ou Edge): ícone de instalar na barra de endereço.

## Observações

- O alarme toca com a página aberta no aparelho. Com a tela bloqueada, o celular pode suspender o app.
- Os aparelhos precisam estar com data e hora automáticas.
- A chave do Firebase no arquivo é pública por natureza. Quem protege seus dados são as regras do passo 2 e o login.
