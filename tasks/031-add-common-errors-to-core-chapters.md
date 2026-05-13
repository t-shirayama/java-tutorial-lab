# タスク: 主要章に「よくあるエラー」を追加する

## 背景

初学者は正しいコードよりも、エラー対応で詰まりやすいです。章ごとに失敗例と直し方があると、24章のエラーの読み方ともつながります。

## 対象

- 特に `docs/03-strings/README.md` 〜 `docs/14-exceptions/README.md`
- `docs/19-generics/README.md`
- `docs/20-threads/README.md`
- `docs/21-concurrency-control/README.md`
- 必要に応じて `docs/24-errors-ide-debugging/README.md`

## 修正内容

- 各対象章に `## よくあるエラー` を追加する。
- 問題のあるコード、何が問題か、修正例の順で説明する。
- 例: `==`で文字列比較、`List.of()`への`add`、例外の握りつぶし、raw type、`count++`の競合など。

## 完了条件

- 主要章で失敗例と修正例がセットになっている。
- 24章のエラー辞典と役割が重複しすぎない。
- Java 21基準の説明になっている。
