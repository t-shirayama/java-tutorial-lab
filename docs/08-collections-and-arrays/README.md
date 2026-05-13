# 8章 コレクションと配列

この章では、複数の値をまとめて扱う方法を学びます。Javaでは、要素数が固定に近いときは配列、増減や検索を便利に扱いたいときはコレクションを使うのが基本です。

## この章で学ぶこと

- `List`、`Map`、`Set`の役割
- `ArrayDeque`を使ったスタック、キュー、デックの基本
- 変更不可コレクションの作り方
- 拡張for文での繰り返しと配列の扱い

## 8-1 モノの集まりを扱う

複数の値を扱うとき、変数を何個も作るより、集まりとして扱うほうが読みやすくなります。

```java
String firstTask = "読む";
String secondTask = "動かす";
String thirdTask = "書き換える";
```

このように別々の変数を増やすより、`List<String>`としてまとめると、追加、件数の確認、繰り返し処理がしやすくなります。

## 8-2 コレクションフレームワーク

コレクションフレームワークは、値の集まりを扱うための標準APIです。`List`、`Map`、`Set`などのインタフェースと実装クラスが含まれます。

よく使う型の目安:

| 型 | 得意なこと | 例 |
| --- | --- | --- |
| `List` | 順番を保って並べる | 学習タスク、表示順のあるメニュー |
| `Map` | キーから値を探す | 科目名から点数、ユーザーIDから名前 |
| `Set` | 重複をなくす | タグ、権限、既読ID |
| `ArrayDeque` | 先頭・末尾から出し入れする | 待ち行列、戻る履歴、スタック |
| 配列 | 長さが決まった同じ型の値 | コマンド引数、低レベルAPIとの受け渡し |

やりたいことから選ぶなら、次の表を入口にします。

| 使いたいこと | 選ぶもの |
| --- | --- |
| 順番に並べたい | `List` |
| 名前やIDから探したい | `Map` |
| 重複をなくしたい | `Set` |
| 先入れ先出し・後入れ先出しをしたい | `ArrayDeque` |
| 要素数が固定に近い | 配列 |

## 8-3 リスト

`List`は順序を持つ集まりです。インデックスで要素を取り出せます。

```java
List<String> tasks = new ArrayList<>(List.of("読む", "動かす"));
tasks.add("書き換える");
System.out.println(tasks.get(0));
```

`ArrayList`は、要素を順番に持つ代表的な`List`実装です。後から要素を追加したいときは、`new ArrayList<>(...)`で変更できるリストを作ります。

## 8-4 マップ

`Map`はキーと値の対応を表します。辞書のように、キーから値を探します。

```java
Map<String, Integer> scores = Map.of("文法", 80, "実行", 90);
System.out.println(scores.get("文法"));
```

存在しないキーを指定すると、`get`は`null`を返すことがあります。値がない場合にどう扱うかを決めておくと、後のバグを減らせます。

## 8-5 セット

`Set`は重複しない集まりです。同じ値を何度追加しても、要素は1つだけになります。

```java
Set<String> tags = new LinkedHashSet<>(List.of("java", "maven", "java"));
System.out.println(tags);
```

`LinkedHashSet`は、重複を除きつつ、追加された順番を保ちます。表示順を安定させたい学習用サンプルでは分かりやすい実装です。

## 8-6 スタック、キュー、デック

`ArrayDeque`は、先頭と末尾の両方から値を出し入れできるデックです。使い方によって、スタックやキューとして扱えます。

```java
ArrayDeque<String> queue = new ArrayDeque<>();
queue.addLast("1章");
queue.addLast("2章");
System.out.println(queue.removeFirst());
```

`addLast`して`removeFirst`すると、先に入れた値から取り出すキューの動きになります。`addLast`して`removeLast`すると、後に入れた値から取り出すスタックの動きになります。

## 8-7 変更不可コレクション

`List.of`や`Map.of`で作ったコレクションは、あとから要素を追加できません。読み取り専用の値を安全に渡したいときに便利です。

```java
List<String> fixedTasks = List.of("読む", "動かす");
// fixedTasks.add("書き換える"); // UnsupportedOperationException
```

変更したい場合は、`new ArrayList<>(fixedTasks)`のように、変更可能なコレクションへコピーしてから操作します。

## 8-8 コレクションの技法

要素を追加する、取り出す、存在を確認する、件数を調べる、繰り返す、といった操作を組み合わせて使います。

## 8-9 コレクションと繰り返し処理

拡張for文を使うと、コレクションの要素を順番に処理できます。

## 8-10 配列

配列は、同じ型の値を固定長で並べる仕組みです。`String[]`のように書きます。

```java
String[] commands = {"compile", "exec:java"};
for (String command : commands) {
    System.out.println(command);
}
```

配列は長さを後から変えられません。要素数が増減するデータには、まず`List`を検討すると扱いやすくなります。

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/08-collections-and-arrays/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/08-collections-and-arrays/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
== List ==
tasks: [読む, 動かす, 書き換える]

== Map ==
文法 score: 80

== Set ==
tags: [java, maven]

== ArrayDeque ==
next: 1章

== 配列 ==
command: compile
command: exec:java
```

## ハンズオン

`tasks`に要素を追加し、`scores`や`tags`の内容も変えて、出力がどう変わるか確認してください。`ArrayDeque`の`addLast`と`removeFirst`を使うと、先に入れた値から取り出せます。

確認してほしいこと:

- `List`は追加順を保つ
- `Map`はキーから値を取り出す
- `Set`は重複を取り除く
- `ArrayDeque`は取り出し方でキューにもスタックにもなる
- 配列は長さが固定されている

## 演習

Level 1: `tasks.add("復習する");`を追加して、`List`の出力順を確認してください。`tasks.size()`も表示して、件数が変わることを見ます。

Level 2: `scores.get("未登録")`を表示してください。結果が`null`になることを確認したあと、`scores.getOrDefault("未登録", 0)`に変えて、値がない場合の扱いを明確にします。

Level 3: `queue.removeFirst()`を2回呼び出したあと、3回目も呼び出してみてください。空のキューから取り出すと例外になります。例外を避けたい場合は、先に`queue.isEmpty()`で確認する方法を試します。

選び方の目安:

- 順番が大事で、同じ値が複数あってよいなら`List`
- 名前やIDから値を探したいなら`Map`
- 重複を消したいなら`Set`
- 先頭と末尾から出し入れしたいなら`ArrayDeque`
- 要素数が固定でシンプルに扱いたいなら配列

## 参考資料

公式:

- [Java SE 21 API: List](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html)
- [Java SE 21 API: Map](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html)
- [Java SE 21 API: Set](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html)
- [Java SE 21 API: ArrayDeque](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html)
- [Java Language Specification, Java SE 21 Edition: 10 Arrays](https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html)

補助:

- なし
