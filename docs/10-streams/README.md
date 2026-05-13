# 10章 ストリーム処理

この章では、コレクションなどのデータの流れを作り、変換や集計をつなげるストリーム処理を学びます。

## 10-1 ストリーム処理とは

ストリームは、データの集まりに対して処理の流れを組み立てるAPIです。

## 10-2 ストリームの生成

`list.stream()`や`Stream.of(...)`でストリームを作れます。

## 10-3 ストリームの中間処理

`filter`や`map`は中間処理です。中間処理は、最後の終端処理が呼ばれるまで実行されません。

## 10-4 ストリームの終端処理

`toList`、`forEach`、`count`、`sum`などが終端処理です。

## 10-5 基本型数値ストリーム

`IntStream`などを使うと、数値の合計や平均を扱いやすくなります。

## 10-6 並列ストリーム処理

`parallelStream`で並列処理できますが、順序や副作用に注意が必要です。まずは通常のストリームから慣れましょう。

## 10-7 Optional型

`Optional`は、値があるかもしれないし、ないかもしれないことを表す型です。

## 10-8 ストリーム処理の組み立て方

生成、中間処理、終端処理の順で読みます。1行に詰め込みすぎず、処理の名前が分かるように書くと理解しやすいです。

## 実行して確認する

```bash
cd docs/10-streams/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/10-streams/examples java mvn compile exec:java
```

## ハンズオン

`filter`の条件や`mapToInt`で取り出す値を変えて、集計結果がどう変わるか確認してください。

## 参考資料

公式:

- [Java SE 21 API: Stream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html)
- [Java SE 21 API: IntStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/IntStream.html)
- [Java SE 21 API: Optional](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html)

補助:

- なし
