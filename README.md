# Tic-Tac-Toe (Human vs Perfect AI)

ブラウザで動く三目並べです。プレイヤーは `X`（先手）または `O`（後手）を選択でき、AIは Minimax により常に最適手を選びます。

## 起動方法

`index.html` をブラウザで開くだけで動作します。ローカルサーバーを使う場合は以下の例でも可:

```bash
python3 -m http.server 8000
```

その後 `http://localhost:8000` を開いてください。

## 構成

- `assets/js/game/*`: ルール・状態・進行管理
- `assets/js/ai/*`: Minimax と最適手API
- `assets/js/ui/*`: DOM取得・描画・イベント
- `assets/js/main.js`: 全体配線
