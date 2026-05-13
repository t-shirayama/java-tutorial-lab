# 19章 ジェネリック型

この章では、型をパラメータとして扱うジェネリック型を学びます。`List<String>`のように書くことで、要素の型をコンパイル時に確認できます。

ジェネリック型の目的は、実行する前に型の取り違えを見つけることです。`List`に何でも入れるより、`List<String>`のように型を明示したほうが安全に読み書きできます。

## 19-1 ジェネリック型とは

ジェネリック型は、型を後から指定できるクラスやインタフェースです。サンプルの`Box<T>`は、`Box<String>`にも`Box<Integer>`にもできます。

## 19-2 ジェネリック型宣言

`class Box<T>`のように、型パラメータを宣言します。`T`は慣習的に「型」を表す名前です。

## 19-3 ジェネリック型の使用

`Box<String>`や`List<Integer>`のように、具体的な型を指定して使います。`Box<String>`へ`Integer`を入れようとすると、実行前にコンパイルエラーになります。

## 19-4 ワイルドカード

`? extends Number`は「NumberまたはNumberの子型のリスト」を受け取る書き方です。値を読む側、たとえば合計を計算する`sum(List<? extends Number>)`に向いています。

`? super Integer`は「Integerを入れられる親側の型」を受け取る書き方です。値を書き込む側、たとえば`List<Number>`へ`Integer`を追加する処理に向いています。

## 19-5 ジェネリック型の設計

型パラメータは、利用者にとって意味がある範囲に絞ります。必要以上に複雑なジェネリック設計は避けます。

## 実行して確認する

```bash
cd docs/19-generics/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/19-generics/examples java mvn compile exec:java
```

## ハンズオン

1. `Box<String>`を`Box<Integer>`に変え、入れられる値の型が変わることを確認してください。
2. `sum(List.of(1, 2, 3))`や`sum(List.of(1.5, 2.5))`を追加し、`? extends Number`が複数の数値型を受け取れることを確認してください。
3. `addDefaultScores`の引数を`List<? extends Integer>`に変えると、なぜ追加できなくなるのか考えてください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 4.5 Parameterized Types](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5)
- [Java Language Specification, Java SE 21 Edition: 8.1.2 Generic Classes and Type Parameters](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.2)
- [Java Language Specification, Java SE 21 Edition: 4.5.1 Type Arguments of Parameterized Types](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5.1)
- [Java SE 21 API: List](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html)

補助:

- なし
