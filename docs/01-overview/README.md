# 1章 Javaの概要

この章では、Javaを学び始める前に知っておきたい全体像をつかみます。Javaは単なる文法ではなく、プログラミング言語、標準ライブラリ、JVM、開発ツールを含む大きなプラットフォームとして使われます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- Javaがどのような場面で使われるか説明できる
- JDK、JVM、Maven、Dockerの役割を大まかに説明できる
- この教材の学習ルートを選べる

## この章で学ぶこと

- Javaがどのような考え方で作られた言語か
- Javaのソースコードがどのように実行されるか
- Javaの歴史を学ぶときに、どの事実を押さえればよいか
- このリポジトリでの学習方針と、サンプルコードの動かし方

## 1-1 Javaの特徴

Javaは、プログラミング言語であると同時に、アプリケーションを実行するためのプラットフォームでもあります。OracleのJava Tutorialsでは、Java technologyを「programming language」と「platform」の両面から説明しています。

Javaの大きな特徴は、ソースコードを直接OSごとの機械語にするのではなく、まず`.class`ファイルにコンパイルする点です。`.class`ファイルにはJava Virtual Machineが実行するバイトコードが入り、`java`コマンドがJVM上でアプリケーションを起動します。

```text
HelloJava.java
  ↓ javac
HelloJava.class
  ↓ java
JVM上で実行
```

この仕組みによって、同じ`.class`ファイルを複数のOSで動かしやすくなります。ただし、実際の開発ではOS固有のファイルパス、文字コード、外部コマンド、ネイティブライブラリなどの違いにも注意が必要です。

Javaを学ぶときは、次の3つを分けて考えると理解しやすくなります。

- Java言語: `class`、`interface`、`if`、`for`、ラムダ式などの文法
- Java API: `String`、`List`、`Map`、`Path`、`HttpClient`などの標準ライブラリ
- Java実行環境: JVM、JDK、`java`、`javac`、Mavenなどのツール

JDK、JRE、JVMは似た言葉ですが、役割が違います。JDKは開発に必要な道具一式、JREは実行に必要な環境、JVMはJavaバイトコードを実行する仮想マシンです。現在の開発では、まずJDKを入れると考えると分かりやすいです。

## 1-2 Javaの歴史

Javaは、もともとOakという名前で設計され、その後インターネット向けに方向づけられてJavaという名前になりました。この経緯は、Java Language Specificationの初版序文でも説明されています。

現在のJavaは、Java Community ProcessやOpenJDKでの開発を通じて継続的に更新されています。このリポジトリではJava 21 LTSを基準にします。OpenJDKのJDK 21ページによると、JDK 21は2023年9月19日にGeneral Availabilityとなりました。

Java 21では、たとえば次のような機能が入りました。

- Virtual Threads
- Pattern Matching for switch
- Record Patterns
- Sequenced Collections

この章では細かい文法には踏み込みません。ここでは、Javaが長く使われながらも更新され続けているプラットフォームだと理解できれば十分です。

## 1-3 このリポジトリの方針

このリポジトリでは、説明を読んだあとに必ずサンプルコードを動かします。Javaは文法だけを暗記するより、小さなコードを書いて、コンパイルし、実行結果を見ながら理解するほうが身につきやすいからです。

各章の基本的な進め方は次のとおりです。

1. 章の`README.md`を読む
2. `examples/`に移動する
3. Mavenでサンプルを実行する
4. コードを少し変えて再実行する
5. 参考資料で公式ドキュメントを確認する

この章のサンプルは、実行中のJavaとOSの情報を表示します。JavaプログラムがJVM上で動き、実行環境の情報を取得できることを確認します。

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/01-overview/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/01-overview/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
Javaチュートリアルへようこそ
Java version: 21.0.x
Java vendor: ...
Runtime version: 21.0.x+...
OS: ...
```

`Java version`や`OS`の値は、実行する環境によって変わります。まずはその違いを観察してみてください。Dockerで動かすと、`OS`は手元のmacOSやWindowsではなく、コンテナ内のLinuxとして表示されます。`docker compose exec` は起動済みのコンテナの中でコマンドを実行するため、同じサンプルを何度も試すときに便利です。

## ハンズオン

`examples/src/main/java/lab/overview/JavaOverviewApp.java`を開き、表示するメッセージを変更してからもう一度実行してください。

確認してほしいこと:

- Javaファイルを変更すると、再実行時の表示が変わる
- JavaやOSの情報は、コードを書かなくてもシステムプロパティから取得できる
- Mavenを使うと、コンパイルと実行を同じ流れで行える

## 発展ハンズオン

Level 1: `Javaチュートリアルへようこそ`の文字を、自分の学習目標に変えてください。再実行して、ソースコードの変更が出力へ反映されることを確認します。

Level 2: `System.getProperty("user.language")`を追加して、実行環境の言語設定を表示してください。`java.version`や`os.name`と同じように、JVMから環境情報を取り出せることを観察します。

Level 3: Dockerで実行した結果と、ローカルJavaで実行した結果を比べてください。`OS`や`Java vendor`が違う場合は、「プログラムは同じでも、実行環境は変わる」ことをメモしておきましょう。

つまずいたときの見方:

- `mvn: command not found` は、ローカルにMavenが入っていない状態です。Docker実行に切り替えると、このリポジトリで用意したMaven環境を使えます。
- `Cannot connect to the Docker daemon` は、Docker DesktopなどのDocker本体が起動していない状態でよく起きます。
- `docker compose exec` は起動済みコンテナで実行するコマンドです。先に `docker compose up -d --build` を実行してください。

## よくあるエラー

### Dockerコンテナが起動していない

`docker compose exec ...`で接続できない場合は、先に`docker compose up -d --build`を実行しているか確認します。

## 練習問題

### Level 1

`java -version`やDocker実行コマンドを確認し、環境情報を読んでください。

### Level 2

Javaで作れそうなものを3つ挙げ、どの章が役立つかREADMEから探してください。

### Level 3

自分の目的に合わせて、最短コースか実務基礎コースの学習順をメモしてください。

## 理解チェック

1. Javaはどのような種類のアプリケーションで使われますか？
2. JDK、JVM、Mavenはそれぞれ何を担当しますか？
3. この教材でDockerを使う利点は何ですか？

## 参考資料

公式:

- [Oracle Java Tutorials: About the Java Technology](https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html)
- [Java Language Specification: Preface to the First Edition](https://docs.oracle.com/javase/specs/jls/se7/html/jls-0-preface1.html)
- [OpenJDK: JDK 21](https://openjdk.org/projects/jdk/21/)
- [Oracle Java SE 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
- [Apache Maven Documentation](https://maven.apache.org/guides/index.html)
- [Docker Docs: Compose overview](https://docs.docker.com/compose/)

補助:

- なし


## この章の全体コード例

本文中の短いコード例は、実行できる [JavaOverviewApp.java](examples/src/main/java/lab/overview/JavaOverviewApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか
