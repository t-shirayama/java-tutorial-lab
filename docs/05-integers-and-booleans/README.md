# 5章 整数とブーリアン

この章では、Javaの整数とブーリアンを学びます。整数は個数、番号、ページ数、点数などを表すときに使います。ブーリアンは、条件が成り立つかどうかを表す真偽値です。

整数とブーリアンは小さな要素に見えますが、条件分岐、繰り返し、入力チェック、計算処理の土台になります。ここで「整数同士の割り算」「型変換」「文字列との変換」を丁寧に確認しておきます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- 整数演算、剰余、整数除算を使える
- 型変換とparseIntの注意点を説明できる
- booleanを使って条件を表せる

## この章で学ぶこと

- `int`や`long`などの整数型の基本
- 整数の四則演算と剰余
- 型変換の基本
- 数値と文字列の相互変換
- `boolean`を使った条件の表し方

## 5-1 整数

Javaの代表的な整数型は`int`です。`int`は、小数を含まない整数値を扱います。

```java
int count = 3;
long population = 125_000_000L;
```

`long`は、`int`より広い範囲の整数を扱えます。`long`のリテラルには、最後に`L`を付けると読みやすくなります。数字の区切りには`_`を使えます。`125_000_000`は、人間が読みやすくするための書き方で、値としては`125000000`と同じです。

## 5-2 整数の演算

整数では、加算、減算、乗算、除算、剰余を使えます。

```java
int total = 17;
int groupSize = 5;

int groups = total / groupSize;
int remainder = total % groupSize;
```

`/`は除算、`%`は剰余です。整数同士の割り算では、小数部分は切り捨てられます。`17 / 5`は`3`です。余りを知りたい場合は`17 % 5`のように書きます。

## 5-3 型変換

型変換とは、ある型の値を別の型として扱うことです。狭い範囲の型から広い範囲の型へ変える場合は、自然に変換できます。

```java
int count = 10;
long longCount = count;
```

一方で、広い範囲の型から狭い範囲の型へ変える場合は、明示的なキャストが必要です。

```java
long bigNumber = 100L;
int smallNumber = (int) bigNumber;
```

キャストは便利ですが、値が変わる可能性があります。大きすぎる値を狭い型へ入れると、期待しない結果になることがあります。最初は、必要なときだけ使うものとして扱いましょう。

## 5-4 数値と文字列の相互変換

入力された文字列を整数として扱いたいときは、`Integer.parseInt`を使えます。

```java
int score = Integer.parseInt("80");
```

整数を文字列にしたいときは、`Integer.toString`や文字列結合を使えます。

```java
String scoreText = Integer.toString(80);
String message = "score=" + 80;
```

`Integer.parseInt`に数値として読めない文字列を渡すと、`NumberFormatException`が発生します。例外は14章で詳しく扱います。この章では、変換には失敗する場合がある、と覚えておけば十分です。

## 5-5 ブーリアン（真偽値）

`boolean`は、`true`または`false`のどちらかを表す型です。

```java
boolean passed = score >= 70;
```

`>=`は「以上」を表す比較演算子です。比較の結果は`boolean`になります。`boolean`は、条件分岐の`if`文でよく使います。

文字列を`boolean`に変換したい場合は、`Boolean.parseBoolean`を使えます。`"true"`は`true`になり、それ以外の多くの文字列は`false`になります。

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/05-integers-and-booleans/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/05-integers-and-booleans/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
== 整数の演算 ==
total: 17
groupSize: 5
groups: 3
remainder: 2

== 型変換 ==
int to long: 120
long to int: 120

== 数値と文字列 ==
parsed score: 85
score text: 85点

== ブーリアン ==
passed: true
feature enabled: true
```

## ハンズオン

まずは、`total`や`groupSize`の値を変えて、整数の割り算と剰余の結果を確認してください。

次に、`showBooleans`メソッド内の`parsedScoreText`を`"85"`から別の数値文字列に変えて、`passed`の結果がどう変わるかを見ます。

最後に、`enabledText`を`"true"`以外の文字列に変えて、`Boolean.parseBoolean`の結果を確認してください。

確認してほしいこと:

- 整数同士の割り算では小数部分が残らない
- 明示的なキャストは、値の範囲に注意して使う
- 比較演算の結果は`boolean`になる

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 4.2 Primitive Types and Values](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2)
- [Java Language Specification, Java SE 21 Edition: 5.1 Conversions and Contexts](https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1)
- [Java SE 21 API: Integer](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html)
- [Java SE 21 API: Boolean](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Boolean.html)

補助:

- なし
