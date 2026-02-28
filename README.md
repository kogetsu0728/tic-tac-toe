# Tic-Tac-Toe (Human vs Perfect AI)

ブラウザで動く三目並べです。プレイヤーは `X`（先手）または `O`（後手）を選択でき、AIは Minimax により常に最適手を選びます。

## 起動方法

`index.html` をブラウザで開くだけで動作します。ローカルサーバーを使う場合は以下の例でも可:

```bash
python3 -m http.server 8000
```

その後 `http://localhost:8000` を開いてください。

## 構成

- `assets/js/game/rules.js`: 勝敗/合法手/終局判定
- `assets/js/game/state.js`: イミュータブルな状態更新
- `assets/js/game/engine.js`: ゲーム進行制御（人間手/AI手）
- `assets/js/game/players.js`: プレイヤー記号ユーティリティ
- `assets/js/ai/*`: Minimax と最適手API
- `assets/js/ui/dom.js`: DOM参照の集約
- `assets/js/ui/events.js`: UIイベント購読
- `assets/js/ui/view-model.js`: state -> 表示モデル変換
- `assets/js/ui/render.js`: 表示モデルの描画
- `assets/js/main.js`: 全体配線
