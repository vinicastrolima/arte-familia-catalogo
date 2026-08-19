# Achados do manual de identidade — Arte em Família

## Estrutura da marca

O manual mostra uma marca com caligrafia manual e afetiva. A assinatura principal usa o nome **Arte em Família** em traço orgânico, com **“Arte”** e **“Família”** em vinho escuro e **“em”** em laranja queimado. Ao redor da composição aparece a inscrição curva **“Confeitaria Afetiva”** em rosa coral, acompanhada de pequenos corações.

## Símbolo

Há também uma versão reduzida com monograma **AF**, mantendo o mesmo traço orgânico da marca principal. O monograma é vinho escuro, o **“em”** aparece em laranja e o arco superior traz novamente **“Confeitaria Afetiva”** em rosa coral.

## Paleta observada

A paleta visual identificada no PDF contém cinco cores principais, sem códigos numéricos explícitos no material visto:

| Cor | Uso visual observado |
|---|---|
| Laranja queimado | Destaques, palavra “em”, apoio e calor da marca |
| Vinho escuro | Palavra principal da marca, monograma e base institucional |
| Rosa coral | Arco “Confeitaria Afetiva” e acentos delicados |
| Rosa claro/lilás rosado | Cor de apoio suave |
| Branco/off-white | Fundo limpo |

## Tipografia

A tipografia da identidade aparenta ser **desenhada à mão** ou baseada em lettering. O site atual não deve tentar substituir isso por serifas editoriais como assinatura principal da marca. O ideal é usar a própria logo enviada como imagem e manter as fontes do site como sistema de apoio, não como substitutas da marca.

## Implicações para o site

A revisão visual do site deve fazer quatro mudanças principais:

1. Substituir a marca tipográfica editorial atual pela **logo oficial**.
2. Trocar a paleta dominante vinho + bege editorial por uma paleta mais próxima da identidade, incorporando **laranja queimado**, **vinho escuro**, **rosa coral** e **fundos claros**.
3. Ajustar selos, linhas, botões e detalhes para ecoar a ideia de **confeitaria afetiva**, com desenho mais acolhedor e menos institucional/editorial.
4. Usar o monograma **AF** como favicon, selo ou detalhe de navegação, se conseguirmos extrair o ativo com qualidade suficiente.

## Verificação dos ativos extraídos

A logo principal foi extraída com transparência, mas o recorte inclui parte do arco superior e fica amplo para uso como marca pequena. O monograma extraído da segunda página também preserva a inscrição curva e não é um símbolo isolado; ele é adequado como referência visual, mas precisa de um recorte adicional ou de uma versão oficial enviada pela marca para funcionar bem como favicon.

Para o cabeçalho, o uso mais seguro nesta etapa é a **logo principal em tamanho horizontal controlado**, mantendo espaço de respiro. Para favicon e selo pequeno, deve-se preferir uma versão oficial do monograma ou criar um recorte dedicado a partir do ativo original, sem a inscrição curva.

## Validação visual

A logo oficial está aplicada no cabeçalho e rodapé. Em desktop, ela fica legível e mantém a assinatura orgânica sem competir com o hero. Em mobile, o logotipo continua reconhecível e o menu compacto preserva a navegação. A paleta atual usa vinho escuro como base, laranja queimado e coral nos acentos, com fundo branco/off-white, aproximando o site do manual sem retirar a clareza do catálogo.

## Revisão do editor visual

O editor visual adicionou atributos `style` duplicados no rodapé, causando erro de TypeScript. Eles foram substituídos por uma única declaração limpa, preservando o rodapé coral com texto vinho.

A edição também aplicou texto branco aos três cards da seção de entrega. Como apenas o card principal possui fundo vinho, os dois cards menores foram restaurados para o estilo claro original, garantindo contraste e legibilidade. A ordem das categorias e a disposição dos produtos permaneceram inalteradas.

TypeScript, build e validação responsiva foram concluídos sem erros.

## Validação da edição de 18/08/2026

A hero foi atualizada para “confeitaria afetiva em Maceió” e a nota passou a informar “Entrega disponível conforme a região.” A seção de entrega foi corrigida para manter o card principal vinho com texto coral claro e os dois cards menores claros com texto escuro legível. A composição dos produtos, categorias e ordem permaneceu intacta. TypeScript, build e screenshots desktop/mobile foram validados.
