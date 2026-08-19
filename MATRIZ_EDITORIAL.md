# Matriz editorial do catálogo

A fonte de dados preparada para o catálogo é o arquivo `matriz_catalogo_editorial.xlsx`, criado a partir da planilha auditada.

## Fluxo atual

A aba `Produtos` concentra os campos de edição: publicação, ordem, categoria, subcategoria, produto, descrição curta, descrição detalhada, tamanho, rendimento, preço, tipo de preço, URLs das fotos, texto alternativo, CTA, link do WhatsApp, status e observações.

A aba `Categorias` controla a ordem e os nomes exibidos na navegação. A aba `Coffee Break` preserva as bases de 15, 25 e 50 pessoas. A aba `Regras Comerciais` concentra as informações que aparecem na jornada de encomenda. A aba `Como editar` explica o preenchimento.

## Como alterar um produto

Edite o preço na coluna `Preço atual (R$)` usando apenas o número. Para itens personalizados ou serviços, deixe o preço vazio e use `Sob orçamento` em `Tipo de preço`. Use `SIM` ou `NAO` na coluna `Publicar?`. Altere `Ordem` para reorganizar a categoria. Cole URLs públicas nas colunas de fotos, nunca caminhos locais do computador.

## Estado da conexão

O site já foi preparado para consumir o arquivo de dados estruturado em `client/src/data/catalog.json`, gerado a partir da matriz. Nesta etapa, a conexão é uma cópia controlada: alterações na planilha precisam ser exportadas novamente para atualizar o JSON do site.

Para sincronização automática, a matriz deve ser publicada em uma planilha Google com estrutura estável ou migrada para um painel de edição com banco de dados. O próximo passo de integração será escolher entre essas duas opções.

## Regras de segurança comercial

Não publicar preços pendentes como se fossem confirmados. Itens sem preço devem usar `Sob orçamento`. Não remover produtos da matriz para ocultá-los; usar `Publicar? = NAO`. Fotos do Canva precisam ser exportadas e hospedadas em uma URL pública antes de preencher a matriz.
