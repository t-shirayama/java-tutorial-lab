# 26章 総合演習: タスク管理CLI

この章では、ここまで学んだJavaの基礎を組み合わせて、小さなタスク管理CLIを作ります。文法を個別に覚えるだけでなく、「Javaで1つの小さなアプリを作れた」という感覚を持つことが目標です。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- `record`、`enum`、`List`、Streamを組み合わせて小さなドメインを表せる
- ファイル入出力と例外処理を使ってデータを保存できる
- JUnitで検索や絞り込みの処理をテストできる

## 作るもの

タスク管理CLIでは、次の処理を扱います。

- タスクを追加する
- 未完了タスクだけ表示する
- キーワードで検索する
- 期限順に並べる
- ファイルに保存する
- 保存したファイルを読み込む

## Step 1: Task recordを作る

`Task`は、タイトル、状態、期限を持つデータです。値を運ぶ小さな型なので`record`で表します。

## Step 2: TaskStatus enumを作る

状態は`TODO`と`DONE`のように、決まった候補から選びます。文字列ではなく`enum`にすると、打ち間違いをコンパイル時に見つけやすくなります。

## Step 3: Listでタスクを管理する

複数のタスクは`List<Task>`として扱います。追加、一覧表示、検索の入口になります。

## Step 4: Streamで未完了タスクを抽出する

未完了タスクだけを取り出す処理は、Streamの`filter`で書けます。

```java
tasks.stream()
        .filter(task -> task.status() == TaskStatus.TODO)
        .toList();
```

## Step 5: ファイルに保存する

`Path`と`Files.writeString`を使って、タスク一覧をテキストとして保存します。本格的なアプリではJSONなどを使うこともありますが、この章では標準APIだけで扱える簡単な形式にします。

## Step 6: ファイルから読み込む

`Files.readString`で保存済みファイルを読み込み、1行ずつ`Task`へ戻します。ファイルが壊れている可能性があるため、例外メッセージには原因を追える情報を含めます。

## Step 7: JUnitで検索処理をテストする

検索や未完了抽出は、入力と期待結果がはっきりしているためテストしやすい処理です。`mvn test`で確認できるようにします。

## Step 8: 例外処理とログを追加する

ファイル保存や読み込みでは`IOException`が起きる可能性があります。サンプルでは`System.Logger`で処理の開始と終了を記録します。

## この章の全体コード例

本文中の短いコード例は、実行できる [TaskCliApp.java](examples/src/main/java/lab/capstone/TaskCliApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/26-capstone-task-cli/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/26-capstone-task-cli/examples java mvn compile exec:java
```

テストを実行する場合:

```bash
mvn test
```

Dockerでテストを実行する場合:

```bash
docker compose exec -w /workspace/docs/26-capstone-task-cli/examples java mvn test
```

期待される出力例:

```text
=== タスク管理CLI ===
未完了: Javaを復習する
検索: Streamで絞り込む
保存先: target/tasks.txt
読み込み件数: 3
```

## ハンズオン

1. `TaskCliApp.java`のタスク一覧に新しいタスクを追加する
2. `TaskService.search`のキーワードを変えて、検索結果を確認する
3. `target/tasks.txt`に保存された内容を確認する
4. `mvn test`で検索と未完了抽出のテストを実行する

## よくあるエラー

### 保存形式を変えたのに読み込み処理を直さない

ファイル保存の形式と読み込みのパース処理はセットです。片方だけ変えると読み込み時に失敗します。

## 練習問題

### Level 1

タスクのタイトルや期限を変えて、表示順がどう変わるか確認してください。

### Level 2

完了済みタスクだけを取り出す`completedTasks`メソッドを追加してください。

### Level 3

期限が今日以前の未完了タスクを表示するメソッドを作り、JUnitテストを追加してください。

## 理解チェック

1. `Task`を`record`にした理由は何ですか？
2. `TaskStatus`を文字列ではなく`enum`にする利点は何ですか？
3. ファイル読み込みでは、どのような例外を考える必要がありますか？

## 参考資料

公式:

- [Java SE 21 API: Record](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html)
- [Java SE 21 API: Files](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html)
- [Java SE 21 API: Stream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)

補助:

- なし
