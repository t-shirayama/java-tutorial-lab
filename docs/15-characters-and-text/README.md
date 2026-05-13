# 15章 文字と文字列

この章では、文字、Unicode、バイト列、テキストブロックの関係を学びます。文字列をファイルやネットワークへ渡すときは、文字そのものと、保存・送信するときのバイト表現を分けて考える必要があります。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- char、Unicode、コードポイントの関係を説明できる
- UTF-8とUTF-16の違いを大まかに説明できる
- テキストブロックで複数行文字列を書ける

## 15-1 文字

`char`は「1文字」ではなく、1つのUTF-16コード単位を表す型です。日本語の多くは`char` 1つで表せますが、絵文字など一部の文字は2つの`char`で表されます。

`String.length()`はUTF-16コード単位の数を返します。画面上の文字数に近い値を確認したいときは、まず`codePointCount`でUnicodeコードポイント数を見る習慣を付けます。

## 15-2 文字とバイト

文字列をバイト列へ変換するときは、`Charset`を指定します。UTF-8は現在よく使われる文字エンコーディングで、日本語や絵文字も扱えます。

同じ文字列でも、UTF-8のバイト数は文字数と一致しません。サンプルでは、`length`、`codePointCount`、UTF-8バイト数を並べて表示し、3つの数が別物であることを確認します。

## 15-3 テキストブロック

テキストブロックは、複数行の文字列を`"""`で書く構文です。JSON風の文字列やSQLのような複数行テキストを、改行を含めて読みやすく書けます。

サンプルでは、文字列をテキストブロックへ埋め込みます。インデントも文字列の一部になるため、出力を見て余白の扱いを確認してください。

## この章の全体コード例

本文中の短いコード例は、実行できる [CharactersAndTextApp.java](examples/src/main/java/lab/charactersandtext/CharactersAndTextApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/15-characters-and-text/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/15-characters-and-text/examples java mvn compile exec:java
```

期待される出力例:

```text
code point: ...
UTF-8 bytes: ...
```

## ハンズオン

1. 文字列に`"A"`、`"あ"`、`"🍵"`を足し、`length`、`codePointCount`、UTF-8バイト数の変化を確認してください。
2. `text.codePoints()`の出力から、各文字が`U+`で始まるコードポイントとして表示されることを確認してください。
3. テキストブロックのインデントを変え、出力されるJSON風文字列の余白がどう変わるか見てください。

## よくあるエラー

### charを見た目の1文字だと思い込む

絵文字などは`char` 1つで表せない場合があります。人間の見た目の文字数と、UTF-16コード単位の数は分けて考えます。

## 練習問題

### Level 1

文字列を絵文字や日本語に変えて長さを確認してください。

### Level 2

UTF-8のバイト数を表示する処理を追加してください。

### Level 3

テキストブロックで複数行の説明文を作ってください。

## 理解チェック

1. Javaの`char`は何を表しますか？
2. コードポイントとUTF-16コード単位はどう違いますか？
3. テキストブロックはどんな文字列に向いていますか？

## 参考資料

公式:

- [Java SE 21 API: Character](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html)
- [Java SE 21 API: String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
- [Java SE 21 API: StandardCharsets](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/StandardCharsets.html)
- [Java Language Specification, Java SE 21 Edition: 3.10.6 Text Blocks](https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.6)

補助:

- なし
