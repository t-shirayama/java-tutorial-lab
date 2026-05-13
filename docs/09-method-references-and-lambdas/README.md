# 9章 メソッド参照とラムダ式

この章では、処理を値のように渡す書き方を学びます。ラムダ式とメソッド参照を使うと、コレクション処理やイベント処理を短く表現できます。

## 9-1 メソッド参照

メソッド参照は、既存メソッドを処理として渡す書き方です。`System.out::println`のように書きます。

## 9-2 関数型インタフェース

関数型インタフェースは、抽象メソッドを1つだけ持つインタフェースです。`Predicate`、`Function`、`Consumer`などがあります。

## 9-3 ラムダ式

ラムダ式は、短い処理をその場で書く方法です。`name -> name.length()`のように書きます。

## 9-4 基本型のための標準関数型インタフェース

`IntPredicate`や`IntUnaryOperator`のように、基本型用の関数型インタフェースもあります。

## 9-5 関数合成

`andThen`や`compose`を使うと、処理をつなげられます。

## 9-6 メソッドへの参照の実践

読みやすさを優先し、短い変換はラムダ式、既存メソッドをそのまま渡すときはメソッド参照を使うと考えやすいです。

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

`Predicate`の条件や`Function`の変換内容を変えて、出力がどう変わるか確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 15.27 Lambda Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.27)
- [Java Language Specification, Java SE 21 Edition: 15.13 Method Reference Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.13)
- [Java SE 21 API: java.util.function](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html)

補助:

- なし
