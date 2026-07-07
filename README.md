# test-project

React + Node.js(Express) + MySQL の最小構成テストサンプル。

## 構成

- `frontend/`: React（開発サーバーで起動）
- `backend/`: Node.js(Express) API、`/api/health` で MySQL 接続確認
- MySQL: 公式イメージ (`mysql:8`) をそのまま使用

## 起動方法

```bash
cp .env.example .env
docker compose up --build
```

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:4000/api/health

## 動作確認

1. `http://localhost:3000` を開き、「DB接続を確認する」ボタンを押す
2. `dbConnected: true` と現在時刻が表示されればOK
3. `curl http://localhost:4000/api/health` でも同様のJSONが確認できる

## 停止・クリーンアップ

```bash
docker compose down -v
```
