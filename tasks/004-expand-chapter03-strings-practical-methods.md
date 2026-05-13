# タスク: 3章に文字列の実用メソッドとnull注意を追加する

## 背景

`String`、`StringBuilder`、`equals`はあるが、実務でよく使うメソッドと`null`時のつまずきが不足している。

## 対象

- `docs/03-strings/README.md`
- `docs/03-strings/examples/`

## 修正内容

- `isBlank`、`contains`、`replace`、`startsWith`の例を追加する。
- `==`と`equals`の違いを失敗例つきで厚くする。
- `null.equals(...)`で`NullPointerException`になる例と安全な比較方法を追加する。

## 完了条件

- 実用的な文字列操作がサンプルで確認できる。
- `null`と文字列比較の危険が説明されている。
