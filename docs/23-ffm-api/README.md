# 23章 FFM API

この章では、Foreign Function & Memory API（FFM API）の概要を学びます。Java 21ではFFM APIはプレビュー機能です。実際に`java.lang.foreign`の型を直接使うコードを書くには、コンパイル時と実行時に`--enable-preview`が必要です。この章のMavenサンプルは通常の`mvn compile exec:java`で動くように、APIの存在確認と外部メモリに近い概念の観察に絞ります。

## 23-1 FFM API（Foreign Function & Memory API）

FFM APIは、JVM外のメモリや関数とやり取りするためのAPIです。パッケージは`java.lang.foreign`です。

## 23-2 外部メモリへのアクセス

FFM APIでは、`Arena`でメモリの寿命を管理し、`MemorySegment`でメモリ領域を扱います。

## 23-3 外部関数呼び出し

`Linker`などを使うと外部関数を呼び出せます。ただし、OSやネイティブライブラリに依存するため、最初は公式ドキュメントの例を読み、実行環境を限定して試すのが安全です。

## 実行して確認する

```bash
cd docs/23-ffm-api/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/23-ffm-api/examples java mvn compile exec:java
```

## ハンズオン

`ByteBuffer.allocateDirect`で確保するサイズや書き込む整数値を変え、JVMの通常ヒープ外に近いメモリを扱う感覚を確認してください。そのあと、公式ドキュメントのFFM API例を`--enable-preview`付きで試してください。

## 参考資料

公式:

- [Oracle Java SE 21: Foreign Function and Memory API](https://docs.oracle.com/en/java/javase/21/core/foreign-function-and-memory-api.html)
- [OpenJDK JEP 442: Foreign Function & Memory API (Third Preview)](https://openjdk.org/jeps/442)
- [Java SE 21 API: java.lang.foreign](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/foreign/package-summary.html)

補助:

- なし
