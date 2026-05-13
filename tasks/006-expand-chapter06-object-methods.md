# タスク: 6章にequals/hashCode/toStringとカプセル化を追加する

## 背景

クラス章の完成度は高いが、`equals`、`hashCode`、`toString`、getter/setterの考え方が不足している。

## 対象

- `docs/06-classes/README.md`
- `docs/06-classes/examples/`

## 修正内容

- `toString`の役割を明確化する。
- `equals`/`hashCode`がコレクションやMapで重要になることを説明する。
- カプセル化とgetter/setterを無条件に増やさない考え方を追加する。

## 完了条件

- クラス設計で公開する操作と隠す状態を区別できる。
- 後続のコレクション章と接続できる説明になっている。
