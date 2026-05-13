# タスク: 15章にUnicodeとコードポイントの例を増やす

## 背景

`char`がUTF-16コード単位である説明はあるが、難所なので例と図が必要。

## 対象

- `docs/15-characters-and-text/README.md`
- `docs/15-characters-and-text/examples/`

## 修正内容

- 日本語、英字、絵文字で`length`と`codePointCount`を比較する。
- UTF-8バイト数が文字数と一致しない例を追加する。
- 文字、コードポイント、バイトの違いをASCII図で説明する。

## 完了条件

- `char`を「文字そのもの」と単純化しすぎない説明になっている。
- 文字コードの違いをサンプルで確認できる。
