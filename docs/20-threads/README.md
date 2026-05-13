# 20章 スレッド

この章では、複数の処理を並行して進めるスレッドを学びます。Java 21では、軽量な仮想スレッドが正式機能として使えます。

スレッドは「同時に進んでいるように見える処理の流れ」です。出力順が毎回同じとは限らないため、順序に依存したコードを書かないことが大切です。

## 20-1 マルチスレッド

マルチスレッドは、複数の処理を並行して実行する仕組みです。たとえば、複数のHTTPリクエスト待ちやファイル処理を同時に進めたいときに役立ちます。

## 20-2 スレッド生成

`Thread.startVirtualThread`や`Thread.ofPlatform`でスレッドを作れます。ただし、実務ではスレッドを1つずつ直接管理するより、`ExecutorService`へタスクを渡す形が読みやすくなります。

## 20-3 仮想スレッドとプラットフォームスレッドの比較

プラットフォームスレッドはOSスレッドに対応します。仮想スレッドはJDKが提供する軽量なスレッドで、大量の待ち時間の多い処理に向いています。

仮想スレッドは速い計算を魔法のように速くする仕組みではありません。待ち時間が多い処理をたくさん扱いやすくする仕組みです。

## 20-4 ExecutorServiceとFuture

`Executors.newVirtualThreadPerTaskExecutor()`は、タスクごとに仮想スレッドを使う`ExecutorService`を作ります。`submit`すると`Future`が返り、`future.get()`で結果を受け取れます。

サンプルでは、5つのタスクを仮想スレッドで実行し、結果を`Future`から取り出します。

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

## ハンズオン

1. タスク数を`5`から`20`へ増やし、出力されるスレッド名を確認してください。
2. `Thread.sleep`の時間を変え、完了順が実行環境に依存することを確認してください。
3. `future.get()`を呼ぶループを消すと、結果をどこで受け取る設計になるか考えてください。

## 参考資料

公式:

- [OpenJDK JEP 444: Virtual Threads](https://openjdk.org/jeps/444)
- [Java SE 21 API: Thread](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html)
- [Java SE 21 API: Executors](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Executors.html)
- [Java SE 21 API: Future](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Future.html)

補助:

- なし
