# Portal Iprevicon

Portal institucional do Instituto de Previdência de Contagem (RPPS).

## Desenvolvimento

```bash
npm install
npm run db:seed
npm run dev
```

Produção local (sem Docker):

```bash
npm run build && npm run start
```

## Docker / VPS (porta 3090)

A VPS já usa outras portas (3000, 3010, 3020…3080). Este portal sobe em **3090**.

```bash
# Na VPS (Ubuntu + Docker), após clonar o repositório:
cp .env.example .env
# Edite SEGURADO_SYSTEM_URL se o sistema do segurado já existir

mkdir -p data
docker compose up -d --build
```

- URL: `http://SEU_IP:3090` (ex.: `http://31.97.167.75:3090`)
- Container interno escuta na 3000; o host publica **3090**
- SQLite persistente em `./data`
- Seed automático na primeira execução se o banco estiver vazio
- Limite: 1 CPU / 512 MB (adequado à VPS compartilhada)

Comandos úteis:

```bash
docker compose ps
docker compose logs -f portal
docker compose restart portal
docker compose down
```

Atualizar após `git pull`:

```bash
docker compose up -d --build
```

## Dados

- Públicos em SQLite: `data/iprevicon.db`
- Área do Segurado via `SEGURADO_SYSTEM_URL` (sistema externo)

## Identidade

- Brandbook + logo em `public/logo/iprevicon.svg`

## Apresentação para a equipe

Documento visual (abrir no navegador; pode salvar em PDF):

`docs/apresentacao-portal-iprevicon.html`
