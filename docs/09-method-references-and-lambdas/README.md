# 9章 メソッド参照とラムダ式

この章では、処理を値のように渡す書き方を学びます。ラムダ式とメソッド参照を使うと、コレクション処理やイベント処理を短く表現できます。

ラムダ式は「あとで呼び出される小さな処理」をその場で作る構文です。最初は難しく見えますが、`条件`、`変換`、`出力`のような役割に分けると読みやすくなります。

## 9-1 メソッド参照

メソッド参照は、既存メソッドを処理として渡す書き方です。`System.out::println`のように書きます。

次の2つは、どちらも「文字列を大文字へ変換する処理」を表します。

```java
name -> name.toUpperCase()
String::toUpperCase
```

ラムダ式は処理の中身をその場で書きたいとき、メソッド参照は既存メソッドをそのまま渡したいときに向いています。

## 9-2 関数型インタフェース

関数型インタフェースは、抽象メソッドを1つだけ持つインタフェースです。`Predicate`、`Function`、`Consumer`などがあります。

代表的な標準関数型インタフェースは次の通りです。

| 型 | 役割 | 例 |
| --- | --- | --- |
| `Predicate<T>` | `T`を受け取り`boolean`を返す | 条件判定 |
| `Function<T, R>` | `T`を受け取り`R`へ変換する | 文字列から長さを作る |
| `Consumer<T>` | `T`を受け取り戻り値なしで処理する | 画面へ出力する |
| `Supplier<T>` | 引数なしで`T`を作る | 初期値を作る |

## 9-3 ラムダ式

ラムダ式は、短い処理をその場で書く方法です。`name -> name.length()`のように書きます。

左側が引数、右側が処理です。処理が1式だけなら`return`を書かずに値を返せます。

```java
Predicate<String> longName = name -> name.length() >= 4;
```

処理が複数行になる場合はブロックを使います。

```java
Function<String, String> label = name -> {
    String upper = name.toUpperCase();
    return "学習: " + upper;
};
```

## 9-4 基本型のための標準関数型インタフェース

`IntPredicate`や`IntUnaryOperator`のように、基本型用の関数型インタフェースもあります。

`Function<Integer, Integer>`でも書けますが、`IntUnaryOperator`を使うと`int`専用として扱えます。数値を大量に扱う処理では、基本型専用の型を選ぶと意図が明確になります。

## 9-5 関数合成

`andThen`や`compose`を使うと、処理をつなげられます。

`andThen`は「先に自分、次に相手」です。`compose`は「先に相手、次に自分」です。

```java
addOne.andThen(doubleValue).applyAsInt(3); // (3 + 1) * 2
doubleValue.compose(addOne).applyAsInt(3); // (3 + 1) * 2
```

## 9-6 メソッドへの参照の実践

読みやすさを優先し、短い変換はラムダ式、既存メソッドをそのまま渡すときはメソッド参照を使うと考えやすいです。

迷ったら、次の基準で選びます。

- 条件や計算がその場で分かるならラムダ式を使う。
- 既存メソッド名だけで意味が伝わるならメソッド参照を使う。
- 複雑になったら別メソッドへ切り出し、メソッド参照で渡す。

## 実行して確認する

```bash
cd docs/09-method-references-and-lambdas/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/09-method-references-and-lambdas/examples java mvn compile exec:java
```

## ハンズオン

1. `Predicate`の条件を`name.length() >= 5`へ変えて、残る名前がどう変わるか確認してください。
2. `Function`の変換内容を`"topic=" + text`へ変えて、出力ラベルを変えてください。
3. `addOne.andThen(doubleValue)`を`doubleValue.andThen(addOne)`へ変えて、計算順序の違いを確認してください。
4. `System.out::println`をラムダ式`text -> System.out.println(text)`へ書き換え、同じ出力になることを確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 15.27 Lambda Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.27)
- [Java Language Specification, Java SE 21 Edition: 15.13 Method Reference Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.13)
- [Java SE 21 API: java.util.function](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html)

補助:

- なし
