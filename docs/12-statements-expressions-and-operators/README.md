# 12章 文、式、演算子

この章では、Javaのコードを構成する文、式、演算子を学びます。式は値を生み、文は処理の単位になります。

## 12-1 Javaの文法と文

文は、実行される処理の単位です。多くの文は`;`で終わります。

## 12-2 文

変数宣言文、式文、ブロック文、`return`文などがあります。

## 12-3 Javaの演算子と式

演算子は、値を組み合わせて新しい値を作ります。`+`、`-`、`*`、`/`などがあります。

## 12-4 数値の演算

数値では四則演算や剰余を使えます。

## 12-5 文字列の演算

`+`は文字列結合にも使えます。

## 12-6 関係演算と等値演算

`<`、`>=`、`==`、`!=`などの結果は`boolean`です。

## 12-7 論理演算

`&&`、`||`、`!`で条件を組み合わせます。

## 12-8 その他の演算

代入、三項演算子、インクリメントなどもあります。読みやすさを優先して使いましょう。

## 実行して確認する

```bash
cd docs/12-statements-expressions-and-operators/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/12-statements-expressions-and-operators/examples java mvn compile exec:java
```

## ハンズオン

条件式や演算子を変えて、`label`や`canStart`の結果がどう変わるか確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 14 Blocks and Statements](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html)
- [Java Language Specification, Java SE 21 Edition: Chapter 15 Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html)

補助:

- なし
