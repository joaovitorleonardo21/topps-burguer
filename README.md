# TOPPS BURGER — Site de pedidos

Site estático (HTML + CSS + JavaScript puro). Não precisa de servidor, banco de dados ou instalação.

## Arquivos
- `index.html` — página
- `style.css` — visual preto/laranja
- `script.js` — carrinho, taxas, formulário e WhatsApp
- `config.js` — **todas as informações do negócio** (edite só este arquivo)
- `assets/logo.jpg` e `assets/cardapio.jpg` — imagens oficiais

## Publicar no GitHub Pages
1. Crie uma conta em github.com e clique em **New repository** (ex.: `topps-burger`, público).
2. Clique em **uploading an existing file** e envie **todo o conteúdo da pasta** (incluindo `assets`). Clique em **Commit changes**.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
6. Aguarde 1–2 minutos. O endereço será `https://SEU-USUARIO.github.io/topps-burger/`.

Todos os caminhos são relativos, então funciona em qualquer repositório.

## Como alterar (arquivo `config.js`)
- **WhatsApp / endereço:** `whatsapp`, `telefone`, `endereco`, `cidade`, `estado`.
- **Preços e produtos:** lista `produtos` (altere `preco`, adicione ou remova linhas).
- **Adicionais:** lista `adicionais`; a disponibilidade por categoria fica em `extras`.
- **Taxas por bairro:** lista `taxas`, ex.: `{ bairro: "Centro", taxa: 5, ativo: true }`. Bairro sem taxa cadastrada aparece como "a confirmar".
- **Chave Pix:** preencha `pix`. Vazio = o cliente é avisado de que a chave será enviada pelo WhatsApp.
- **Pagamentos:** lista `pagamentos` (mantenha os nomes "Pix" e "Dinheiro" para ativar chave e troco).

## Observações
- O pedido **só é enviado quando o cliente toca em "enviar" no WhatsApp**; o site apenas abre a conversa com a mensagem pronta.
- O carrinho fica salvo no navegador do cliente (`localStorage`).
- Não há painel administrativo: as alterações são feitas editando `config.js` no repositório (seguro, sem senhas no código).
- Horário de funcionamento e taxas de entrega não foram informados, por isso não aparecem no site.
