# タスク: 21章にレースコンディションの失敗例と修正例を追加する

## 背景

同時実行制御は`AtomicInteger`だけでは理解しづらく、壊れる例が必要。

## 対象

- `docs/21-concurrency-control/README.md`
- `docs/21-concurrency-control/examples/`

## 修正内容

- 共有`int`を複数スレッドで更新して壊れる例を追加する。
- `synchronized`で守る例を追加する。
- `AtomicInteger`で修正する例を追加する。

## 完了条件

- レースコンディションがなぜ起きるか説明できる。
- 失敗例から修正例へ自然につながる。
