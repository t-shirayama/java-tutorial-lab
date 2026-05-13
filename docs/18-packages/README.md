# 18章 パッケージ

この章では、Javaのクラスを整理するパッケージを学びます。パッケージは、名前の衝突を避け、関連するクラスをまとめるために使います。

## 18-1 パッケージの役割

パッケージはクラスの名前空間です。`java.util.List`のように、完全修飾名でクラスを一意に表せます。

## 18-2 パッケージ名

パッケージ名は小文字で書くのが慣習です。このリポジトリでは`lab.packagesdemo`のようにしています。

## 18-3 パッケージ宣言

ソースファイルの先頭に`package`宣言を書きます。

## 18-4 インポート宣言

`import`を使うと、完全修飾名を毎回書かずにクラスを使えます。

## 18-5 staticインポート

`static import`で、定数やstaticメソッドを短く呼び出せます。多用すると出所が分かりにくくなるため、読みやすい場面に限ります。

## 18-6 package-info.javaファイル

`package-info.java`には、パッケージ全体の説明やアノテーションを書けます。

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

`MessageFormatter`を別パッケージに移動すると、`import`が必要になることを確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 7 Packages and Modules](https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html)
- [Oracle Java Tutorials: Creating and Using Packages](https://docs.oracle.com/javase/tutorial/java/package/packages.html)

補助:

- なし
