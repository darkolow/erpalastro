# ⚡ Setup Rápido - 5 Minutos

## 1️⃣ Criar projeto no Firebase

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"**
3. Nome: **alastro-manager** (ou o que preferir)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**

## 2️⃣ Configurar Authentication

1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Começar"**
3. Selecione **"Email/senha"**
4. Ative a primeira opção (Email/senha)
5. Clique em **"Salvar"**

## 3️⃣ Configurar Firestore

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de teste"** (por enquanto)
4. Escolha a localização: **southamerica-east1 (São Paulo)**
5. Clique em **"Ativar"**

## 4️⃣ Configurar Storage

1. No menu lateral, clique em **"Storage"**
2. Clique em **"Começar"**
3. Aceite as regras padrão
4. Escolha a mesma localização: **southamerica-east1**
5. Clique em **"Concluído"**

## 5️⃣ Copiar Credenciais

1. Clique no ícone de **engrenagem** ⚙️ ao lado de "Visão geral do projeto"
2. Clique em **"Configurações do projeto"**
3. Role até **"Seus aplicativos"**
4. Clique no ícone **</>** (Web)
5. Apelido do app: **Alastro Manager Web**
6. Clique em **"Registrar app"**
7. **COPIE** todo o objeto `firebaseConfig`

## 6️⃣ Configurar Variáveis de Ambiente

1. Abra o arquivo `.env.local` no VS Code
2. Cole suas credenciais:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=alastro-manager.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=alastro-manager
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=alastro-manager.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123
```

3. **Salve** o arquivo (Ctrl+S)

## 7️⃣ Criar Usuário Admin

1. Volte ao Firebase Console
2. Vá em **Authentication** → **Users**
3. Clique em **"Adicionar usuário"**
4. Email: `seu@email.com`
5. Senha: `SuaSenha123!`
6. Clique em **"Adicionar usuário"**

## 8️⃣ Rodar o Projeto

```bash
npm run dev
```

## 9️⃣ Fazer Login

1. Abra o navegador em: http://localhost:3000
2. Você será redirecionado para `/login`
3. Entre com o email e senha criados
4. **Pronto!** 🎉

---

## ✅ Checklist

- [ ] Projeto Firebase criado
- [ ] Authentication ativado (Email/Senha)
- [ ] Firestore Database ativado
- [ ] Storage ativado
- [ ] Credenciais copiadas para `.env.local`
- [ ] Usuário admin criado
- [ ] `npm run dev` executado
- [ ] Login realizado com sucesso
- [ ] Dashboard funcionando

---

## 🐛 Problemas?

### Erro: "Firebase not configured"
➜ Verifique se o `.env.local` está preenchido corretamente

### Erro: "Invalid credentials"
➜ Confirme que criou o usuário no Firebase Console

### Erro: "Permission denied"
➜ Verifique se o Firestore está em "modo de teste"

### Página em branco
➜ Abra o Console do browser (F12) e veja os erros

---

## 🎯 Próximo Passo

Após tudo funcionando, leia: **`PROXIMOS_PASSOS.md`**
