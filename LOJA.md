# Loja dos Reencarnados — primeira versão

A loja é uma vitrine estática integrada ao Jiji Hub. Não usa banco de dados nem serviços pagos nesta primeira fase.

## Catálogo de jogos

Edite `games.json`. Cada item pode ter estes campos:

- `title`: nome do jogo.
- `category`: categoria exibida e usada no filtro.
- `description`: descrição curta.
- `icon`: emoji simples exibido na arte provisória.
- `status`: use `"soon"` enquanto não houver chave confirmada; mude para `"available"` somente quando o jogo estiver realmente disponível.

Exemplo de item:

```json
[
  {
    "title": "Nome do jogo",
    "category": "Terror",
    "description": "Uma descrição curta para a comunidade.",
    "icon": "🎮",
    "status": "soon"
  }
]
```

## Fluxo manual de resgate

1. Anuncie a recompensa e as regras na Twitch.
2. Confira manualmente o resgate na plataforma.
3. Registre o pedido e o status numa planilha privada.
4. Aprove ou recuse o pedido conforme as regras publicadas.
5. Entregue a chave legítima ao ganhador por mensagem privada e marque como entregue.

**Segurança:** não coloque chaves, tokens, senhas, dados de ganhadores ou informações privadas no repositório. O site é público e não valida automaticamente resgates da Twitch. As chaves devem ser obtidas de fontes legítimas e só anunciadas como disponíveis após confirmação do estoque.

## Arquivos

- `index.html`: estrutura do Jiji Hub e seção da loja.
- `styles.css`: estilos responsivos com identidade preta e roxo neon.
- `script.js`: menu mobile, busca, filtro e renderização da vitrine.
- `games.json`: catálogo público, sem credenciais.
