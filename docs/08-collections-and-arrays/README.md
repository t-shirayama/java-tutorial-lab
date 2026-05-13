# 8章 コレクションと配列

この章では、複数の値をまとめて扱う方法を学びます。Javaでは、要素数が固定に近いときは配列、増減や検索を便利に扱いたいときはコレクションを使うのが基本です。

## この章で学ぶこと

- `List`、`Map`、`Set`の役割
- `ArrayDeque`を使ったスタック、キュー、デックの基本
- 変更不可コレクションの作り方
- 拡張for文での繰り返しと配列の扱い

## 8-1 モノの集まりを扱う

複数の値を扱うとき、変数を何個も作るより、集まりとして扱うほうが読みやすくなります。

## 8-2 コレクションフレームワーク

コレクションフレームワークは、値の集まりを扱うための標準APIです。`List`、`Map`、`Set`などのインタフェースと実装クラスが含まれます。

## 8-3 リスト

`List`は順序を持つ集まりです。インデックスで要素を取り出せます。

## 8-4 マップ

`Map`はキーと値の対応を表します。辞書のように、キーから値を探します。

## 8-5 セット

`Set`は重複しない集まりです。同じ値を何度追加しても、要素は1つだけになります。

## 8-6 スタック、キュー、デック

`ArrayDeque`は、先頭と末尾の両方から値を出し入れできるデックです。使い方によって、スタックやキューとして扱えます。

## 8-7 変更不可コレクション

`List.of`や`Map.of`で作ったコレクションは、あとから要素を追加できません。読み取り専用の値を安全に渡したいときに便利です。

## 8-8 コレクションの技法

要素を追加する、取り出す、存在を確認する、件数を調べる、繰り返す、といった操作を組み合わせて使います。

## 8-9 コレクションと繰り返し処理

拡張for文を使うと、コレクションの要素を順番に処理できます。

## 8-10 配列

配列は、同じ型の値を固定長で並べる仕組みです。`String[]`のように書きます。

## 実行して確認する

```bash
cd docs/08-collections-and-arrays/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/08-collections-and-arrays/examples java mvn compile exec:java
```

## ハンズオン

`tasks`に要素を追加し、`scores`や`tags`の内容も変えて、出力がどう変わるか確認してください。`ArrayDeque`の`addLast`と`removeFirst`を使うと、先に入れた値から取り出せます。

## 参考資料

公式:

- [Java SE 21 API: List](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html)
- [Java SE 21 API: Map](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html)
- [Java SE 21 API: Set](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html)
- [Java SE 21 API: ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)
- [Java Language Specification, Java SE 21 Edition: 10 Arrays](https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html)

補助:

- なし
