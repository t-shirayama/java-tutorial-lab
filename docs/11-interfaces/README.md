# 11章 インタフェース

この章では、クラスが提供する機能の約束を表すインタフェースを学びます。インタフェースを使うと、実装クラスを切り替えやすくなります。

## 11-1 インタフェースとは

インタフェースは、クラスが持つべきメソッドの約束です。

## 11-2 インタフェース宣言

`interface`で宣言します。抽象メソッドだけでなく、`default`メソッドや`static`メソッドも持てます。

## 11-3 インタフェースと実装クラス

クラスは`implements`でインタフェースを実装します。

## 11-4 関数型インタフェース

抽象メソッドが1つだけのインタフェースは、ラムダ式の対象にできます。

## 11-5 多重継承

Javaのクラスは複数のクラスを継承できませんが、複数のインタフェースを実装できます。

## 11-6 インタフェースの設計

実装の詳細ではなく、利用者が必要とする操作を名前にします。

## 実行して確認する

```bash
cd docs/11-interfaces/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/11-interfaces/examples java mvn compile exec:java
```

## ハンズオン

`ConsoleNotifier`とは別の実装クラスを追加し、同じ`Notifier`型として使えることを確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 9 Interfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html)
- [Java SE 21 API: FunctionalInterface](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/FunctionalInterface.html)

補助:

- なし
