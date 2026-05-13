# 10章 ストリーム処理

この章では、コレクションなどのデータの流れを作り、変換や集計をつなげるストリーム処理を学びます。

ストリームは、元のコレクションを直接書き換える道具ではありません。「データを取り出す」「条件で絞る」「別の形へ変える」「最後に集める」という流れを作るAPIです。

## 10-1 ストリーム処理とは

ストリームは、データの集まりに対して処理の流れを組み立てるAPIです。

例えば「30分以上のレッスン名だけを取り出す」は、次のように読めます。

```java
lessons.stream()
        .filter(lesson -> lesson.minutes() >= 30)
        .map(Lesson::title)
        .toList();
```

`stream()`で流れを作り、`filter`で絞り、`map`で変換し、`toList`で結果をリストにします。

## 10-2 ストリームの生成

`list.stream()`や`Stream.of(...)`でストリームを作れます。

よく使う生成方法は次の通りです。

| 作り方 | 使いどころ |
| --- | --- |
| `list.stream()` | 既存のリストを処理したい |
| `Stream.of("a", "b")` | 少数の値からその場で作りたい |
| `IntStream.range(1, 5)` | 連番を扱いたい |

## 10-3 ストリームの中間処理

`filter`や`map`は中間処理です。中間処理は、最後の終端処理が呼ばれるまで実行されません。

中間処理は、処理の設計図を足している段階です。`filter`だけを書いても結果は取り出せません。

```java
lessons.stream()
        .filter(lesson -> lesson.minutes() >= 30); // まだ結果は使えない
```

## 10-4 ストリームの終端処理

`toList`、`forEach`、`count`、`sum`などが終端処理です。

終端処理を呼ぶとストリームは消費されます。同じストリームをもう一度使うのではなく、必要なら再度`lessons.stream()`から作り直します。

## 10-5 基本型数値ストリーム

`IntStream`などを使うと、数値の合計や平均を扱いやすくなります。

`mapToInt(Lesson::minutes)`のように書くと、`Lesson`の流れを`int`の流れに変換できます。その後は`sum`や`average`を直接呼べます。

## 10-6 並列ストリーム処理

`parallelStream`で並列処理できますが、順序や副作用に注意が必要です。まずは通常のストリームから慣れましょう。

特に`forEach`の中で外側のリストへ追加するような副作用は避けます。最初は`stream()`、`filter`、`map`、`toList`の組み合わせを確実に読めるようにしましょう。

## 10-7 Optional型

`Optional`は、値があるかもしれないし、ないかもしれないことを表す型です。

`findFirst`の結果は、条件に合う要素が存在しない可能性があるため`Optional`になります。値がない場合の動きを`orElse`で明示すると、`null`確認より読みやすくなります。

## 10-8 ストリーム処理の組み立て方

生成、中間処理、終端処理の順で読みます。1行に詰め込みすぎず、処理の名前が分かるように書くと理解しやすいです。

読み方に迷ったら、次の順に日本語へ置き換えます。

1. どのデータから始めるか。
2. どの条件で残すか。
3. 何へ変換するか。
4. 最後にリスト、数、合計など何として取り出すか。

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

1. `filter`の条件を`lesson.minutes() > 20`へ変えて、抽出されるレッスンを確認してください。
2. `map(Lesson::title)`を`map(lesson -> lesson.title() + ":" + lesson.minutes())`へ変えて、変換結果を確認してください。
3. `average`の出力を追加し、平均時間がどう表示されるか確認してください。
4. 条件に合う要素がない`findFirst`を作り、`orElse("なし")`が使われることを確認してください。

## 参考資料

公式:

- [Java SE 21 API: Stream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html)
- [Java SE 21 API: IntStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/IntStream.html)
- [Java SE 21 API: Optional](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html)

補助:

- なし
