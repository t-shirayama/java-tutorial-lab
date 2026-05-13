# 15章 文字と文字列

この章では、文字、Unicode、バイト列の関係を学びます。文字列をファイルやネットワークへ渡すときは、文字コードを意識する必要があります。

## 15-1 文字

`char`は1つのUTF-16コード単位を表します。絵文字など、一部の文字は`char` 1つでは表せないことがあります。文字数を数える目的では、コードポイントも意識します。

## 15-2 文字とバイト

文字列をバイト列へ変換するときは、`Charset`を指定します。UTF-8は現在よく使われる文字エンコーディングです。

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

## ハンズオン

文字列に日本語や絵文字を追加し、`length`、`codePointCount`、UTF-8バイト数の違いを確認してください。

## 参考資料

公式:

- [Java SE 21 API: Character](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html)
- [Java SE 21 API: String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
- [Java SE 21 API: StandardCharsets](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/StandardCharsets.html)

補助:

- なし
