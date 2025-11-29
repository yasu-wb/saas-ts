# saas-ts

モノレポ構成の SaaS TypeScript テンプレートです。`turbo` を用いたワークスペース管理のもと、フロントエンドは Next.js、バックエンドは Hono + Drizzle ORM（PostgreSQL）を採用しています。

- フロントエンド: `apps/web`（Next.js 16, React 19, Tailwind CSS 4）
- バックエンド: `apps/api`（Hono, Drizzle ORM, postgres.js）
- 共有設定: `packages/config`（ESLint/Prettier プリセットなど）
- タスクランナー: Turborepo（`turbo.json`）
- DB: Docker Compose で PostgreSQL（`docker-compose.yml`）

---

## 必要要件

- Node.js: 24.11.1
- npm: 11.6.2 系
- Docker / Docker Compose（開発用の PostgreSQL 起動に使用）

---

## セットアップ

依存関係をルートで一括インストールします（npm workspaces を使用）。

```bash
npm install
```

DB（PostgreSQL）を起動します。

```bash
docker compose up -d
```

---

## 環境変数

バックエンド(`apps/api`) では以下の環境変数を参照します。

- `DATABASE_URL`（例: `postgres://postgres:password@localhost:5432/saas_db`）

未設定の場合、`apps/api/src/db/index.ts` と `apps/api/drizzle.config.ts` は上記のローカルデフォルトを使用します。

> dotenv を使う場合は、プロセスに環境変数を渡すか、起動スクリプト内で `dotenv` を読み込むようにしてください。現在の `apps/api/src/index.ts` では dotenv を明示的に読み込んでいません。

---

## 開発

ルートで開発サーバーを起動します（Turborepo が各アプリの `dev` スクリプトを並行実行します）。

```bash
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:3001

API のヘルスチェック:

```bash
curl http://localhost:3001/health
# => {"status":"ok"}
```

---

## ドメイン別の詳細

### apps/web (Next.js)

- スクリプト
  - `npm run dev` / `build` / `start` / `lint`
- 技術スタック
  - Next.js 16, React 19, Tailwind CSS 4

### apps/api (Hono + Drizzle)

- スクリプト
  - `npm run dev`（`tsx watch src/index.ts`）
  - `npm run build`（`tsc`）
- 起動ポート
  - 3001
- エンドポイント
  - `GET /` … テキストレスポンス
  - `GET /health` … `{ status: 'ok' }`

#### Drizzle（マイグレーション）

`apps/api/drizzle.config.ts` を基準に CLI を実行します。

```bash
# スキーマからマイグレーションを生成
npx drizzle-kit generate --config apps/api/drizzle.config.ts

# マイグレーションを適用（バージョンによりコマンドが異なる場合があります）
npx drizzle-kit migrate --config apps/api/drizzle.config.ts
```

> PostgreSQL は `docker-compose.yml` により `postgres:16-alpine` が `5432` で起動します。

---

## ディレクトリ構成（抜粋）

```
.
├─ apps/
│  ├─ web/        # Next.js アプリ
│  └─ api/        # Hono API（Drizzle, postgres）
├─ packages/
│  └─ config/     # ESLint/Prettier 共有設定
├─ turbo.json     # Turborepo 設定
├─ docker-compose.yml  # PostgreSQL (dev)
├─ package.json   # npm workspaces ルート
└─ README.md
```

---

## よく使うコマンド

- 依存関係のインストール（ルート）
  ```bash
  npm install
  ```
- 開発サーバー（全体）
  ```bash
  npm run dev
  ```
- ビルド（全体）
  ```bash
  npm run build
  ```
- Lint（全体）
  ```bash
  npm run lint
  ```
- DB 起動
  ```bash
  docker compose up -d
  ```

---

## デプロイ（概要）

- Web(`apps/web`): Vercel などのホスティングにデプロイ可能です。
- API(`apps/api`): Node ランタイム上で実行。環境に `DATABASE_URL` を設定してください。
- モノレポ: CI では `turbo run build` を実行し、必要なアプリのみをビルドします。

---

## トラブルシュート

- `npm run dev` で API が立ち上がらない
  - `docker compose ps` で DB が起動しているか確認
  - `DATABASE_URL` のホスト・ポート・認証情報を確認
- Next.js 側で依存関係エラー
  - ルートで `npm install` を実行（ワークスペース全体に適用）
- マイグレーションが失敗する
  - `apps/api/drizzle.config.ts` の `schema`, `dbCredentials` を確認
  - `npx drizzle-kit generate` → `npx drizzle-kit migrate` の順に再実行

---

必要に応じて、この README をプロジェクト要件に合わせて拡張してください。