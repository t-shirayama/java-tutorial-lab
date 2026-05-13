# 23章 FFM API

この章は発展編です。Foreign Function & Memory API（FFM API）の概要を学びます。Java 21ではFFM APIはプレビュー機能です。実際に`java.lang.foreign`の型を直接使うコードを書くには、コンパイル時と実行時に`--enable-preview`が必要です。

この章のMavenサンプルは通常の`mvn compile exec:java`で動くように、APIの存在確認と外部メモリに近い概念の観察に絞ります。FFMそのものを本格的に使う章ではなく、「何のためのAPIで、なぜ慎重に扱うか」を理解する入口です。

通常のJava基礎、Webアプリケーション、業務アプリケーションを学ぶ段階では、先に1〜22章、24〜25章を固めてから戻ってくるくらいで十分です。

FFM APIは、従来のJNIよりもJavaコードから外部メモリや外部関数を扱いやすくすることを目指したAPIです。ただし、OSやネイティブライブラリに依存するため、初心者は「Javaからネイティブ機能へつながる入口がある」程度の理解で問題ありません。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- FFM APIが発展編である理由を説明できる
- 外部メモリと外部関数呼び出しの概要を説明できる
- Java 21でpreview機能を扱う注意を説明できる

## 23-1 FFM API（Foreign Function & Memory API）

FFM APIは、JVM外のメモリや関数とやり取りするためのAPIです。パッケージは`java.lang.foreign`です。

JVMの外にあるメモリやネイティブ関数に触れると、Javaだけで完結するコードよりもOS、CPU、ネイティブライブラリの影響を受けやすくなります。最初は標準APIの通常の範囲で十分かを確認し、それでも必要な場合に検討します。

## 23-2 外部メモリへのアクセス

FFM APIでは、`Arena`でメモリの寿命を管理し、`MemorySegment`でメモリ領域を扱います。メモリは「いつ確保され、いつ解放されるか」が重要です。

サンプルは直接FFMコードを書かず、`ByteBuffer.allocateDirect`で通常ヒープ外に近いメモリを扱う感覚を確認します。

## 23-3 外部関数呼び出し

`Linker`などを使うと外部関数を呼び出せます。ただし、OSやネイティブライブラリに依存するため、最初は公式ドキュメントの例を読み、実行環境を限定して試すのが安全です。

FFMを学ぶ前に、例外処理、リソース管理、メモリの寿命、ビルドオプションを理解しておくとつまずきにくくなります。

## 23-4 Java 21での扱い

Java 21 LTSではFFM APIはプレビュー機能です。このリポジトリはJava 21基準のため、通常サンプルでは`--enable-preview`なしで動く範囲に留めています。

公式のFFMサンプルを試す場合は、コンパイルと実行の両方でプレビューを有効にしてください。学習用リポジトリでプレビュー機能を使うときは、READMEに必要なオプションを明記し、通常の章サンプルと混ぜないほうが安全です。

## この章の全体コード例

本文中の短いコード例は、実行できる [FfmApiApp.java](examples/src/main/java/lab/ffmapi/FfmApiApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

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

期待される出力例:

```text
FFM package class: java.lang.foreign.Arena
direct buffer: true
```

## ハンズオン

1. `ByteBuffer.allocateDirect`で確保するサイズや書き込む整数値を変え、JVMの通常ヒープ外に近いメモリを扱う感覚を確認してください。
2. `Class.forName("java.lang.foreign.MemorySegment")`の出力から、Java 21にFFM APIの型が存在することを確認してください。
3. 公式ドキュメントのFFM API例を試す場合は、必ず`--enable-preview`をコンパイル時と実行時の両方へ付けてください。

## よくあるエラー

### Java 21でpreviewオプションを忘れる

Java 21でFFM APIを直接使うコードを書く場合は、コンパイル時と実行時の両方で`--enable-preview`が必要です。

## 練習問題

### Level 1

出力されるFFM関連クラス名を確認してください。

### Level 2

`ByteBuffer`へ書き込む値を変えてください。

### Level 3

FFM APIを通常章ではなく発展編にする理由を説明してください。

## 理解チェック

1. FFM APIは何のためのAPIですか？
2. Java 21でFFM APIを直接使うときの注意は何ですか？
3. この章を発展編として扱う理由は何ですか？

## 参考資料

公式:

- [Oracle Java SE 21: Foreign Function and Memory API](https://docs.oracle.com/en/java/javase/21/core/foreign-function-and-memory-api.html)
- [OpenJDK JEP 442: Foreign Function & Memory API (Third Preview)](https://openjdk.org/jeps/442)
- [Java SE 21 API: java.lang.foreign](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/foreign/package-summary.html)

補助:

- なし
