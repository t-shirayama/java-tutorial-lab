# 2章 Javaプログラミング初歩

この章では、Javaの細かい文法に深く入る前に、読みやすいコードの書き方と、コードを整理して置く考え方を学びます。Javaでは、正しく動くだけでなく、あとから自分や他の人が読みやすい形にそろえることがとても大切です。

## この章で学ぶこと

- クラス名、メソッド名、定数名、パッケージ名の基本的な付け方
- JavaソースファイルとMavenプロジェクトの基本的な置き方
- 1つの大きなクラスに詰め込まず、役割ごとに分ける考え方
- サンプルを動かしながら、コードの読みやすさがどう変わるかを確認する方法

## 2-1 コード表記のルール

Javaのコードは、コンパイラが理解できれば何でもよいわけではありません。人が読みやすい名前や並び方にそろえることで、コードの意図を追いやすくなります。

この章では、まず次の基本ルールを押さえます。

- クラス名: `StudyPlan` のように、単語の先頭を大文字にする
- メソッド名: `printSummary` のように、最初は小文字、2語目以降の先頭を大文字にする
- 定数名: `MAX_STEPS` のように、すべて大文字で単語を`_`でつなぐ
- パッケージ名: `lab.programmingbasics` のように、すべて小文字で書く

Oracleの古いCode Conventionsにも、クラス名は名詞、メソッド名は動詞、定数は大文字という考え方がまとめられています。古い資料ではありますが、今でも基本的な考え方は参考になります。この章では、現在のJava 21でも違和感のない範囲で、その考え方を採り入れます。

パッケージについては、Java Language Specificationで`package`宣言の構文が定義されており、Oracle Tutorialsでは小文字で付ける慣習が説明されています。Javaの標準ライブラリでも、`java.util`や`java.nio`のように小文字のパッケージ名が使われています。

## 2-2 大規模コードの考え方

最初のうちは、`main`メソッドにすべて書いても動かせます。しかし、処理が増えると、1つのファイルにすべて詰め込んだコードは読みづらくなります。

そこで、早い段階から次の考え方に慣れておくと後で楽になります。

- 表示する役割は表示用クラスへ分ける
- データを持つ役割はデータ用クラスへ分ける
- `main`メソッドは「全体をつなぐ役割」に絞る

これは「大規模開発のためだけの設計」ではありません。小さな学習用コードでも、役割を分ける練習をしておくと、後の章でクラス、インタフェース、例外、テストを学ぶときにつながりやすくなります。

Mavenプロジェクトでも、コードの置き場所には標準的な形があります。Apache Mavenでは、アプリケーションのJavaソースを`src/main/java`に置く標準ディレクトリ構成が案内されています。このリポジトリでも、その形にそろえます。

この章のサンプルでは、学習計画を表示する小さなプログラムを、次の3つの役割に分けています。

- `JavaProgrammingBasicsApp`: 実行開始地点
- `StudyStep`: 学習ステップを表すクラス
- `StudyPlanPrinter`: 学習計画を表示するクラス

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/02-java-programming-basics/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/02-java-programming-basics/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
Javaプログラミング初歩
パッケージ: lab.programmingbasics
ステップ数: 3

1. READMEを読む
2. サンプルコードを実行する
3. メソッド名を変えて再実行する
```

## ハンズオン

まずは、`examples/src/main/java/lab/programmingbasics/StudyPlanPrinter.java` の `printPlan` メソッド内にある見出しメッセージを変更して、再実行してください。

次に、`JavaProgrammingBasicsApp` の `STUDY_STEPS` にデータを1つ増やして、出力に新しい手順が表示されることを確認してください。

最後に、あえて次のような変更も試してください。

- `printPlan` を `PrintPlan` に変える
- `PACKAGE_NAME` のような定数名を `packageName` に変える
- パッケージ名の一部を大文字にする

そのうえで、「コンパイラ上は動いても読みづらいか」「ファイル配置と名前のルールがそろっているほうが探しやすいか」を観察してみてください。

確認してほしいこと:

- クラス名とメソッド名では、読みやすい命名の慣習が違う
- `main`メソッドを短くすると、プログラムの入口が追いやすくなる
- `src/main/java` の下にパッケージ構造をそろえると、ファイルを探しやすい

## 演習

Level 1: `StudyStep`の説明文を1つ変更し、出力の該当行だけが変わることを確認してください。データを変えるだけなら、表示処理のコードを直さなくてもよいことを観察します。

Level 2: `StudyPlanPrinter`に`printFooter`のような小さなメソッドを追加し、最後に「今日の学習完了」のような行を表示してください。メソッド名は「何をするか」が読める動詞から始めます。

Level 3: `JavaProgrammingBasicsApp`の`main`に表示処理を全部戻した場合と、今のように`StudyPlanPrinter`へ分けた場合を比べてください。どちらが変更箇所を探しやすいかを、自分の言葉で1文にまとめます。

よくある混乱:

- クラス名はファイル名と合わせます。`public class StudyStep`なら、ファイル名は`StudyStep.java`です。
- パッケージ宣言とフォルダ構成は対応させます。`package lab.programmingbasics;`のファイルは、`src/main/java/lab/programmingbasics/`に置きます。
- コンパイルエラーが出たら、まず「ファイル名」「クラス名」「パッケージ名」の3つを確認すると原因を絞りやすいです。

## 参考資料

公式:

- [Oracle Code Conventions: Naming Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html)
- [The Java Language Specification, Java SE 21 Edition: Chapter 6 Names](https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html)
- [The Java Language Specification, Java SE 21 Edition: 7.4 Package Declarations](https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html#jls-7.4)
- [Oracle Java Tutorials: Naming a Package](https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html)
- [Apache Maven: Introduction to the Standard Directory Layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)

補助:

- なし
