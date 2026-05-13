# 14章 例外処理

この章では、エラーが起きたときにプログラムをどう扱うかを学びます。Javaでは、通常の処理と異常時の処理を分けるために例外を使います。

## 14-1 エラーと例外

例外は、処理を続けられない状況を呼び出し元へ伝える仕組みです。

## 14-2 例外の捕捉

`try-catch`で例外を捕捉し、回復やメッセージ表示を行います。

## 14-3 try-with-resources文

`AutoCloseable`を実装したリソースは、try-with-resourcesで自動的に閉じられます。

## 14-4 例外の送出

`throw`で例外を送出できます。

## 14-5 例外クラス

標準例外だけでなく、自分で例外クラスを作ることもできます。

## 14-6 throws節

メソッドがチェック例外を送出する可能性があるとき、`throws`で宣言します。

## 14-7 契約によるデザイン（assert）

`assert`は、開発中の前提条件確認に使えます。実行時に有効化しないと評価されません。

## 14-8 例外の設計

例外は「呼び出し元がどう対処できるか」を考えて設計します。

## 実行して確認する

```bash
cd docs/14-exceptions/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/14-exceptions/examples java mvn compile exec:java
```

## ハンズオン

数値文字列を不正な値に変え、`catch`がどのように動くか確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 11 Exceptions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html)
- [Java Language Specification, Java SE 21 Edition: 14.20 The try statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20)
- [Java SE 21 API: Exception](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Exception.html)

補助:

- なし
