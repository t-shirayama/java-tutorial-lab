# 20章 スレッド

この章では、複数の処理を並行して進めるスレッドを学びます。Java 21では、軽量な仮想スレッドが正式機能として使えます。

## 20-1 マルチスレッド

マルチスレッドは、複数の処理を並行して実行する仕組みです。

## 20-2 スレッド生成

`Thread.startVirtualThread`や`Thread.ofPlatform`でスレッドを作れます。

## 20-3 仮想スレッドとプラットフォームスレッドの比較

プラットフォームスレッドはOSスレッドに対応します。仮想スレッドはJDKが提供する軽量なスレッドで、大量の待ち時間の多い処理に向いています。

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

仮想スレッドの数を増やし、出力順が常に同じとは限らないことを確認してください。

## 参考資料

公式:

- [OpenJDK JEP 444: Virtual Threads](https://openjdk.org/jeps/444)
- [Java SE 21 API: Thread](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html)
- [Java SE 21 API: Executors](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Executors.html)

補助:

- なし
