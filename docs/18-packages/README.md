# 18章 パッケージ

この章では、Javaのクラスを整理するパッケージを学びます。パッケージは、名前の衝突を避け、関連するクラスをまとめるために使います。

パッケージはフォルダ整理のためだけでなく、アクセス制御にも関係します。どのクラスから見えるメソッドなのかを考える入り口としても重要です。

## 18-1 パッケージの役割

パッケージはクラスの名前空間です。`java.util.List`のように、完全修飾名でクラスを一意に表せます。

同じ`List`という短い名前でも、完全修飾名まで含めれば別の型と区別できます。サンプルでは、`java.util.Map.Entry.class.getName()`で完全修飾名を出力します。

## 18-2 パッケージ名

パッケージ名は小文字で書くのが慣習です。このリポジトリでは`lab.packagesdemo`のようにしています。

## 18-3 パッケージ宣言

ソースファイルの先頭に`package`宣言を書きます。`package lab.packagesdemo;`と書いたファイルは、通常`src/main/java/lab/packagesdemo/`に置きます。

## 18-4 インポート宣言

`import`を使うと、完全修飾名を毎回書かずにクラスを使えます。`java.time.LocalDate`のようによく使う型は、`import`しておくと本文が読みやすくなります。

## 18-5 staticインポート

`static import`で、定数やstaticメソッドを短く呼び出せます。多用すると出所が分かりにくくなるため、読みやすい場面に限ります。

## 18-6 package-info.javaファイル

`package-info.java`には、パッケージ全体の説明やアノテーションを書けます。

## 18-7 アクセス修飾子とモジュールの入口

`public`は他のパッケージからも見える公開APIです。何も付けないメソッドはパッケージプライベートと呼ばれ、同じパッケージ内からだけ使えます。

Java 9以降にはモジュールシステムもあります。モジュールは複数のパッケージをまとめ、外へ公開するパッケージを`exports`で明示できます。このチュートリアルのサンプルは小さく保つため`module-info.java`までは作りませんが、大きなアプリでは「パッケージで整理し、モジュールで公開範囲を決める」と捉えると理解しやすいです。

## 実行して確認する

```bash
cd docs/18-packages/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/18-packages/examples java mvn compile exec:java
```

## ハンズオン

1. `MessageFormatter.packagePrivateFormat`が同じパッケージから呼べることを確認してください。
2. `MessageFormatter`を別パッケージへ移動する場合、`package`宣言、フォルダ、`import`をそろえる必要があることを確認してください。
3. `static import`をやめて`MessageFormatter.format("import")`に戻し、どちらが読みやすいか比べてください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 7 Packages and Modules](https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html)
- [Oracle Java Tutorials: Creating and Using Packages](https://docs.oracle.com/javase/tutorial/java/package/packages.html)
- [Java SE 21 API: Module](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Module.html)

補助:

- なし
