# 24章 エラーの読み方・IDE・デバッグ

この章では、Java学習中に止まりやすい「エラーが出た」「IDEでどう実行するか分からない」「どこで値が変わったか追えない」を扱います。エラーは失敗ではなく、JavaやMavenが次に見る場所を教えてくれるメッセージです。

文字列比較の失敗は[3章](../03-strings/)、変更不可Listの失敗は[8章](../08-collections-and-arrays/)、例外設計は[14章](../14-exceptions/)、`null`やテストは[25章](../25-practical-basics/)でも扱います。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- コンパイルエラー、実行時例外、Mavenエラーを分類できる
- スタックトレースから自分のファイルと行番号を探せる
- IDEでブレークポイントとステップ実行を試せる

## この章で学ぶこと

- コンパイルエラー、実行時例外、Mavenエラーの違い
- エラーメッセージからファイル名、行番号、原因を読む方法
- IntelliJ IDEA / VS Codeでの実行、補完、フォーマットの入口
- ブレークポイント、ステップ実行、変数確認の基本

## サンプルの実行

リポジトリ直下で学習用コンテナを起動します。

```bash
docker compose up -d
```

この章のサンプルを実行します。

```bash
docker compose exec -w /workspace/docs/24-errors-ide-debugging/examples java mvn compile exec:java
```

ローカルにJava 21とMavenを入れている場合は、次でも実行できます。

```bash
cd docs/24-errors-ide-debugging/examples
mvn compile exec:java
```

## 24-1 エラーの種類を分けて考える

Java学習でよく見るエラーは、大きく3種類に分けられます。

| 種類 | いつ出るか | まず見る場所 |
| --- | --- | --- |
| コンパイルエラー | `mvn compile` の途中 | ファイル名、行番号、`cannot find symbol` などの理由 |
| 実行時例外 | プログラム実行中 | 例外名、メッセージ、スタックトレースの先頭 |
| Mavenエラー | Mavenの準備や設定中 | `pom.xml`、プラグイン、依存関係、実行ディレクトリ |

コンパイルは「Javaの文法として読めるか」を確認する段階です。実行時例外は「文法は正しいが、実行中の値や状態に問題があった」ことを表します。

## 24-2 コンパイルエラーの読み方

例えば、変数名を書き間違えると次のようなエラーになります。

```text
[ERROR] /workspace/docs/.../Example.java:[12,28] cannot find symbol
[ERROR]   symbol:   variable userNmae
```

読み方は次の順番です。

1. `/workspace/docs/.../Example.java` で対象ファイルを確認する
2. `[12,28]` で12行目、28文字目付近を見る
3. `cannot find symbol` で「その名前をJavaが見つけられない」と理解する
4. `userNmae` のようなスペルミス、スコープ外の変数、import漏れを疑う

エラー全体を一度に理解しようとしなくて大丈夫です。最初は「ファイル」「行番号」「理由」の3点だけ拾えれば前進できます。

## 24-3 実行時例外とスタックトレース

実行時例外では、次のような情報が表示されます。

```text
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at lab.errorside.ErrorsIdeDebuggingApp.divide(ErrorsIdeDebuggingApp.java:32)
    at lab.errorside.ErrorsIdeDebuggingApp.main(ErrorsIdeDebuggingApp.java:18)
```

`ArithmeticException` は例外名です。`/ by zero` は原因の短い説明です。`ErrorsIdeDebuggingApp.java:32` は例外が起きた場所です。

スタックトレースは、上から順に「最後に実行していた処理」へ近い情報が並びます。自分で書いたファイル名が出ている最初の行から見ると、原因に近づきやすくなります。

## 24-4 Mavenエラーの読み方

Mavenエラーでは、Javaコードではなく実行場所や`pom.xml`が原因のことがあります。

よくある例:

- `The goal you specified requires a project to execute`: `pom.xml`があるディレクトリで実行していない
- `Plugin ... not found`: ネットワーク、バージョン、リポジトリ設定を確認する
- `Source option ... is no longer supported`: Javaのバージョン設定と実行環境が合っていない

このリポジトリでは、リポジトリ直下から次の形で実行する方針に統一しています。

```bash
docker compose exec -w /workspace/docs/<chapter>/examples java mvn compile exec:java
```

`-w` はコンテナ内の作業ディレクトリを指定するオプションです。`pom.xml`のある`examples/`を指定することで、章ごとのMavenプロジェクトを実行できます。

## 24-5 IDEで実行する入口

IntelliJ IDEAでもVS Codeでも、基本の流れは似ています。

1. リポジトリ直下を開く
2. 章の`examples/pom.xml`をMavenプロジェクトとして読み込む
3. `src/main/java`以下の`main`メソッドを開く
4. エディタ上の実行ボタン、またはMavenの`compile exec:java`で実行する

補完は、クラス名、メソッド名、変数名の入力を助ける機能です。フォーマットは、インデントや空白を整える機能です。最初のうちは、コードが動かなくなったときに「補完で存在する名前を選んだか」「フォーマットして波括弧の対応が見やすいか」を確認してください。

## 24-6 ブレークポイントとステップ実行

ブレークポイントは、プログラムを一時停止したい行に付ける印です。デバッグ実行すると、その行で止まり、変数の中身を確認できます。

よく使う操作:

- Step Over: メソッド呼び出しの中へ入らず、次の行へ進む
- Step Into: 呼び出したメソッドの中へ入る
- Resume: 次のブレークポイントまで実行を続ける
- Variables: 現在の変数の値を見る

この章のサンプルでは、`calculateProgress`メソッドの中にブレークポイントを置くと、学習済みステップ数から進捗率が計算される流れを追えます。

## ハンズオン

1. `ErrorsIdeDebuggingApp.java`を開く
2. `calculateProgress(3, 8)` の `3` を `5` に変えて実行する
3. `divideSafely(10, 0)` の `0` を `2` に変えて実行する
4. IDEで`calculateProgress`内にブレークポイントを置いて、変数`completedSteps`と`totalSteps`を確認する

## 練習問題

### Level 1

`formatProgress`の表示文言を、自分が分かりやすい日本語に変えてください。

### Level 2

`calculateProgress`に、`completedSteps`が`totalSteps`より大きいときは100を返す処理を追加してください。

### Level 3

`divideSafely`を変更し、0で割ろうとしたときに`IllegalArgumentException`を投げる版を作ってください。実行時例外のスタックトレースがどのように変わるか確認してください。

## 理解チェック

1. コンパイルエラーで最初に見るべき3点は何ですか？
2. スタックトレースではどの行から確認するとよいですか？
3. ブレークポイントを置くと何を確認できますか？

## 参考資料

### 公式

- [Oracle Java Tutorials: Common Problems and Their Solutions](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)
- [Apache Maven: Maven in 5 Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- [IntelliJ IDEA: Run applications](https://www.jetbrains.com/help/idea/running-applications.html)
- [Visual Studio Code: Debugging](https://code.visualstudio.com/docs/editor/debugging)

### 補助

- まずはエラーメッセージの先頭と、自分で書いたファイル名が出ている行を読む習慣を作ると、調査がかなり楽になります。
