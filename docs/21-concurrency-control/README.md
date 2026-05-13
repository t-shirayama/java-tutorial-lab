# 21章 同時実行制御

この章では、複数のスレッドから同じデータを扱うときの整合性制御を学びます。

## 21-1 整合性制御

複数スレッドが同じ値を同時に更新すると、期待しない結果になることがあります。`synchronized`や`AtomicInteger`などを使うと、安全に更新できます。

## 実行して確認する

```bash
cd docs/21-concurrency-control/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/21-concurrency-control/examples java mvn compile exec:java
```

## ハンズオン

`AtomicInteger`を通常の`int`に変えたら何が危ないか、コードの意味を考えてください。

## 参考資料

公式:

- [Java SE 21 API: AtomicInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)
- [Java Language Specification, Java SE 21 Edition: 17 Threads and Locks](https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html)

補助:

- なし
