# Configurar o formulário do Participe

O formulário envia a contribuição ao servidor do portal. O servidor valida os campos e encaminha os dados para uma planilha do Google. A URL e a senha dessa integração nunca são enviadas ao navegador.

## Configuração inicial

1. Na conta Google do projeto, crie a planilha **Aclimação Preciosa — Contribuições**. Em **Arquivo → Configurações**, escolha o fuso horário de São Paulo.
2. Na planilha, abra **Extensões → Apps Script**. Apague o conteúdo padrão e cole todo o conteúdo de [participacao.gs](../scripts/apps-script/participacao.gs).
3. Em **Configurações do projeto → Propriedades do script**, adicione `PARTICIPATION_SECRET` com uma senha longa e aleatória. Use um gerenciador de senhas ou `openssl rand -hex 32`. Para receber avisos por e-mail, adicione também `NOTIFY_EMAIL` com o endereço da equipe. A senha fica nessas propriedades, nunca no código ou no GitHub.
4. Clique em **Implantar → Nova implantação** e escolha **App da Web**. Selecione **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**. Implante e autorize o acesso solicitado pelo Google. “Qualquer pessoa” permite que o servidor da Vercel faça a chamada sem login Google; a senha compartilhada impede que terceiros sem a senha gravem contribuições.
5. Copie a URL da implantação que termina em `/exec`.
6. Na Vercel, abra **Settings → Environment Variables** e configure, em **Production** e **Preview**:
   - `PARTICIPATION_WEBHOOK_URL`: a URL copiada no passo 5.
   - `PARTICIPATION_WEBHOOK_SECRET`: exatamente a senha do passo 3.
     Faça um novo deploy para carregar as variáveis. Não use o prefixo `NEXT_PUBLIC_`.
7. Envie uma contribuição de cada tipo pelo portal. Confira as abas **Negócios**, **Eventos** e **Lugares e histórias**, criadas automaticamente na planilha. Cada contribuição entra com situação **Nova**. O envio não publica conteúdo automaticamente: a equipe confere e decide o que incluir no guia. Envios da prévia também chegam à planilha configurada para Preview.

## Alterar o script

Após uma mudança, abra **Implantar → Gerenciar implantações → editar → Nova versão** e implante. Isso mantém a mesma URL; apenas salvar o código não atualiza a implantação.

## Testar localmente

Copie `.env.example` para `.env.local`, preencha as duas variáveis e reinicie o servidor local. `.env.local` é ignorado pelo Git. Sem essas variáveis, o formulário exibe “O envio está temporariamente indisponível” e preserva os campos.

Os contatos públicos alternativos ficam em `src/lib/site.ts`. Preencha apenas os canais que já existem. Eles aparecem no bloco “Como funciona” e nas mensagens de falha.

## Conferência e manutenção

- Compartilhe a planilha somente com a equipe responsável. As contribuições não fazem parte do repositório público.
- Se o envio falhar, confira a URL `/exec`, a igualdade das senhas e a versão implantada do script. Os logs do portal registram apenas o tipo de falha, sem os dados enviados.
- Se configurar `NOTIFY_EMAIL`, confirme também o recebimento do aviso. O script fornecido grava a linha antes de enviar o e-mail: uma falha no aviso pode retornar erro mesmo com a linha gravada. Confira a planilha antes de repetir o envio.
- Os testes automatizados usam respostas simuladas e não enviam dados para o Google. Depois de configurar a integração, faça a conferência real do passo 7.
- No futuro, o destino pode ser substituído por um banco de dados dentro da Server Action, mantendo a interface do formulário.
