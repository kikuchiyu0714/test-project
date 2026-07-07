# test-project

React + Node.js(Express) の最小構成テストサンプル（DB未使用・ダミーデータ返却）。

## 構成

- `frontend/`: React（開発サーバーで起動）
- `backend/`: Node.js(Express) API、`/api/health` でダミーの接続情報を返却

## 起動方法

```bash
docker compose up --build
```

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:4000/api/health

## 動作確認

1. `http://localhost:3000` を開き、「ヘルスチェックを確認する」ボタンを押す
2. ダミーの `dbConnected: true` と時刻が表示されればOK
3. `curl http://localhost:4000/api/health` でも同様のJSONが確認できる

## 停止・クリーンアップ

```bash
docker compose down
```
