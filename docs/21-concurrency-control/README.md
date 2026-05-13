# 21章 同時実行制御

この章では、複数のスレッドから同じデータを扱うときの整合性制御を学びます。スレッドを増やすだけでは安全にならず、共有する値の扱いを設計する必要があります。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- レースコンディションを説明できる
- count++が安全でない理由を説明できる
- AtomicIntegerやsynchronizedを検討できる

## 21-1 整合性制御

複数スレッドが同じ値を同時に更新すると、期待しない結果になることがあります。これを競合状態、またはレースコンディションと呼びます。

たとえば`value++`は一見1つの操作に見えますが、実際には「読む」「1足す」「書き戻す」という複数の処理です。複数スレッドが同時に実行すると、片方の更新が上書きされることがあります。

危ないコード:

```java
class UnsafeCounter {
    private int value;

    void increment() {
        value++;
    }
}
```

`value++`の途中に別スレッドが割り込むと、2回増やしたつもりでも1回分しか反映されないことがあります。

`synchronized`や`AtomicInteger`などを使うと、安全に更新できます。サンプルでは、通常の`int`を持つ`UnsafeCounter`と`AtomicInteger`を同じ回数だけ更新し、結果を比べます。

安全なコードの例:

```java
class SafeCounter {
    private final AtomicInteger value = new AtomicInteger();

    int increment() {
        return value.incrementAndGet();
    }
}
```

`AtomicInteger.incrementAndGet()`は、読み取り、加算、書き戻しを分割されない操作として扱います。

## 21-2 安全にする考え方

共有データを安全に扱う方法は、大きく3つあります。

1. 共有しない: スレッドごとに別の値を持つ。
2. 変更しない: 不変オブジェクトとして渡す。
3. 制御して共有する: `AtomicInteger`、`synchronized`、ロックなどを使う。

初学者のうちは、まず「この値は複数スレッドから同時に触られるか」を確認する癖を付けると安全です。

`synchronized`を使う場合は、同じロックで守られた範囲だけが同時実行されないようになります。守る範囲が広すぎると並行性が下がり、狭すぎると安全になりません。まずは`AtomicInteger`のような目的がはっきりしたクラスから使うと理解しやすいです。

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

1. タスク数を`1_000`から`10_000`へ増やし、`unsafe counter`が期待値どおりにならないことがあるか確認してください。
2. `UnsafeCounter.increment()`に`synchronized`を付け、結果が安定するか確認してください。
3. `AtomicInteger`を使う場合、`incrementAndGet`が「読み取り、加算、書き戻し」を安全にまとめていることを意識してください。

## 理解チェック

1. `count++`が原子的でないとはどういう意味ですか？
2. AtomicIntegerはどのような問題を避けるために使いますか？
3. 共有状態を減らすと何が楽になりますか？

## 参考資料

公式:

- [Java SE 21 API: AtomicInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)
- [Java Language Specification, Java SE 21 Edition: 17 Threads and Locks](https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html)

補助:

- なし
