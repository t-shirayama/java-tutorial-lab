# 17章 クラスの拡張継承

この章では、既存クラスをもとに新しいクラスを作る拡張継承を学びます。

## 17-1 拡張継承

継承を使うと、共通するフィールドやメソッドを親クラスへまとめられます。

## 17-2 拡張継承の構文

`extends`で親クラスを指定します。子クラスは親クラスのメソッドを引き継ぎ、必要に応じて上書きできます。

## 17-3 インタフェース自体の拡張継承

インタフェースも`extends`で別のインタフェースを拡張できます。

## 17-4 拡張継承の制御

`final`クラスは継承できません。`sealed`を使うと、継承できるクラスを限定できます。

## 実行して確認する

```bash
cd docs/17-inheritance/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/17-inheritance/examples java mvn compile exec:java
```

## ハンズオン

`VideoLesson`を追加し、`Lesson`として同じ配列で扱えることを確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 8.1.4 Superclasses and Subclasses](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.4)
- [Java Language Specification, Java SE 21 Edition: 8.4.8 Inheritance, Overriding, and Hiding](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.8)
- [Java Language Specification, Java SE 21 Edition: 9.1.3 Superinterfaces and Subinterfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.1.3)

補助:

- なし
