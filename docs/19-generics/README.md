# 19章 ジェネリック型

この章では、型をパラメータとして扱うジェネリック型を学びます。`List<String>`のように書くことで、要素の型をコンパイル時に確認できます。

## 19-1 ジェネリック型とは

ジェネリック型は、型を後から指定できるクラスやインタフェースです。

## 19-2 ジェネリック型宣言

`class Box<T>`のように、型パラメータを宣言します。`T`は慣習的に「型」を表す名前です。

## 19-3 ジェネリック型の使用

`Box<String>`や`List<Integer>`のように、具体的な型を指定して使います。

## 19-4 ジェネリック型の設計

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

`Box<String>`を`Box<Integer>`に変え、入れられる値の型が変わることを確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 4.5 Parameterized Types](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5)
- [Java Language Specification, Java SE 21 Edition: 8.1.2 Generic Classes and Type Parameters](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.2)
- [Java SE 21 API: List](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html)

補助:

- なし
