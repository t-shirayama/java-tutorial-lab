# 20章 スレッド

この章では、複数の処理を並行して進めるスレッドを学びます。Java 21では、軽量な仮想スレッドが正式機能として使えます。

スレッドは「同時に進んでいるように見える処理の流れ」です。出力順が毎回同じとは限らないため、順序に依存したコードを書かないことが大切です。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- スレッドと仮想スレッドの基本を説明できる
- ExecutorServiceへタスクを渡せる
- Future#getが結果を待つことを説明できる

## 20-1 マルチスレッド

マルチスレッドは、複数の処理を並行して実行する仕組みです。たとえば、複数のHTTPリクエスト待ちやファイル処理を同時に進めたいときに役立ちます。

ただし、スレッドを使うと実行順序は固定ではなくなります。

```java
Thread.startVirtualThread(() -> System.out.println("A"));
Thread.startVirtualThread(() -> System.out.println("B"));
```

この出力は常に`A`、`B`の順になるとは限りません。スレッドを使うコードでは、「順番に依存していないか」「共有データを書き換えていないか」を先に確認します。

## 20-2 スレッド生成

`Thread.startVirtualThread`や`Thread.ofPlatform`でスレッドを作れます。ただし、実務ではスレッドを1つずつ直接管理するより、`ExecutorService`へタスクを渡す形が読みやすくなります。

`Thread`を直接作るコードは仕組みの理解には役立ちますが、タスク数が増えると待ち合わせや例外処理が散らばります。`ExecutorService`を使うと「タスクを渡す」「結果を受け取る」「最後に閉じる」という形にまとめやすくなります。

## 20-3 仮想スレッドとプラットフォームスレッドの比較

プラットフォームスレッドはOSスレッドに対応します。仮想スレッドはJDKが提供する軽量なスレッドで、大量の待ち時間の多い処理に向いています。

仮想スレッドは速い計算を魔法のように速くする仕組みではありません。待ち時間が多い処理をたくさん扱いやすくする仕組みです。

## 20-4 ExecutorServiceとFuture

`Executors.newVirtualThreadPerTaskExecutor()`は、タスクごとに仮想スレッドを使う`ExecutorService`を作ります。`submit`すると`Future`が返り、`future.get()`で結果を受け取れます。

サンプルでは、5つのタスクを仮想スレッドで実行し、結果を`Future`から取り出します。

```java
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<String> future = executor.submit(() -> "done");
    System.out.println(future.get());
}
```

`Future#get`は結果が出るまで待ちます。待ち時間のある処理をたくさん扱う場合は仮想スレッドが便利ですが、CPUを使い切る重い計算を無制限に速くするものではありません。

スレッドを止めたい場合は、いきなり強制終了するのではなく、割り込みを使って「止まってほしい」と伝える考え方があります。割り込みは発展的な話題ですが、`InterruptedException`を握りつぶさないことだけ先に覚えておくと安全です。

## この章の全体コード例

本文中の短いコード例は、実行できる [ThreadsApp.java](examples/src/main/java/lab/threads/ThreadsApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/20-threads/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/20-threads/examples java mvn compile exec:java
```

期待される出力例:

```text
task-1 done
future result: ...
```

## ハンズオン

1. タスク数を`5`から`20`へ増やし、出力されるスレッド名を確認してください。
2. `Thread.sleep`の時間を変え、完了順が実行環境に依存することを確認してください。
3. `future.get()`を呼ぶループを消すと、結果をどこで受け取る設計になるか考えてください。

## よくあるエラー

### 仮想スレッドでCPU計算も自動的に速くなると思う

仮想スレッドは待ち時間の多い処理を扱いやすくします。CPUを使い続ける重い計算を魔法のように速くする仕組みではありません。

## 練習問題

### Level 1

タスク数を変えて出力順を確認してください。

### Level 2

`Future#get`で結果を受け取る処理を追加してください。

### Level 3

待ち時間のある処理とCPU計算の違いを説明してください。

## 理解チェック

1. 仮想スレッドはどんな処理に向いていますか？
2. `Future#get`は何を待ちますか？
3. CPUを使う重い計算は仮想スレッドで自動的に速くなりますか？

## 参考資料

公式:

- [OpenJDK JEP 444: Virtual Threads](https://openjdk.org/jeps/444)
- [Java SE 21 API: Thread](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html)
- [Java SE 21 API: Executors](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Executors.html)
- [Java SE 21 API: Future](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Future.html)

補助:

- なし
