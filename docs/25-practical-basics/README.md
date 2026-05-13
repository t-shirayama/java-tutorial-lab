# 25章 実務入口: null・テスト・ファイル・日付時刻・ログ

この章では、Javaの文法を学んだあとに実務でよく出会う基本トピックをまとめて扱います。`null`、テスト、ファイル入出力、日付時刻、ログは、アプリケーションを書くときにほぼ必ず必要になります。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- nullとNullPointerExceptionの基本を説明できる
- JUnitで最小のテストを書ける
- ファイル入出力、日付時刻、ログの入口を使える

## この章で学ぶこと

- `null`と`NullPointerException`の避け方
- JUnitで最小の自動テストを書く方法
- `Path`、`Files.readString`、`Files.writeString`によるファイル入出力
- `LocalDate`、`LocalDateTime`、`DateTimeFormatter`による日付時刻処理
- `System.out.println`からログへ進む考え方

## サンプルの実行

リポジトリ直下で学習用コンテナを起動します。

```bash
docker compose up -d
```

アプリケーションを実行します。

```bash
docker compose exec -w /workspace/docs/25-practical-basics/examples java mvn compile exec:java
```

JUnitテストを実行します。

```bash
docker compose exec -w /workspace/docs/25-practical-basics/examples java mvn test
```

ローカルにJava 21とMavenを入れている場合は、次でも実行できます。

```bash
cd docs/25-practical-basics/examples
mvn compile exec:java
mvn test
```

## 25-1 nullとNullPointerException

`null`は「参照先のオブジェクトがない」ことを表す特別な値です。`null`に対してメソッドを呼ぶと、`NullPointerException`が発生します。

```java
String name = null;
System.out.println(name.length()); // NullPointerException
```

実務では、`null`を完全になくすというより、「どこで`null`を受け入れるか」「どこから先は`null`ではないと保証するか」を明確にします。

この章のサンプルでは、`Objects.requireNonNullElse`を使い、名前が`null`のときに`"ゲスト"`へ置き換えます。

## 25-2 JUnitで最小テストを書く

テストは、コードを変更しても期待した動きが保たれているか確認するための小さなプログラムです。JUnitはJavaでよく使われるテストフレームワークです。

最小のテストは、次の3点で考えます。

1. 入力を決める
2. 実行する
3. 期待結果と比べる

```java
@Test
void guestNameIsUsedWhenNameIsNull() {
    assertEquals("こんにちは、ゲストさん", PracticalBasics.greeting(null));
}
```

手で実行結果を毎回確認する代わりに、`mvn test`で自動的に確認できます。

異常系のテストでは、期待した例外が出ることも確認できます。

```java
@Test
void parseIntFailsWhenTextIsNotNumber() {
    assertThrows(NumberFormatException.class, () -> Integer.parseInt("abc"));
}
```

正常系と異常系の両方を少しずつ追加すると、変更したときに壊れた場所へ気づきやすくなります。

## 25-3 ファイル入出力

Java 21では、`java.nio.file.Path`と`java.nio.file.Files`を使うと、短いコードでテキストファイルを読み書きできます。

```java
Path path = Path.of("target", "memo.txt");
Files.writeString(path, "Java学習メモ");
String text = Files.readString(path);
```

`Path`はファイルやディレクトリの場所を表す型です。`Files.writeString`は文字列をファイルへ書き込み、`Files.readString`はファイルの内容を文字列として読み込みます。

サンプルでは`target/`配下へファイルを書きます。`target/`はMavenの生成物置き場なので、学習中に作った一時ファイルを置く場所として扱いやすいです。

## 25-4 日付時刻

日付だけを扱うなら`LocalDate`、日付と時刻を扱うなら`LocalDateTime`を使います。表示形式を指定したいときは`DateTimeFormatter`を使います。

```java
LocalDate date = LocalDate.of(2026, 5, 13);
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
System.out.println(date.format(formatter));
```

`LocalDate`や`LocalDateTime`はタイムゾーンを持ちません。世界中の時刻やサーバー時刻を扱う章へ進む前に、まずは「日付」「日付時刻」「表示形式」を分けて理解しましょう。

## 25-5 printlnからログへ

`System.out.println`は学習には便利ですが、実務では「いつ」「どの重要度で」「どの処理から」出た情報かを管理したくなります。その入口がログです。

Java標準には`System.getLogger`があります。

```java
System.Logger logger = System.getLogger("lab.practicalbasics");
logger.log(System.Logger.Level.INFO, "処理を開始しました");
```

本格的なアプリケーションでは、SLF4JやLogbackなどのライブラリを使うことが多いですが、この章ではまず標準APIで「ログという考え方」に慣れます。

期待される出力例:

```text
こんにちは、Javaさん
Java学習メモ: ...
2026/05/13
```

## ハンズオン

1. `PracticalBasicsApp.java`を実行して、挨拶、ファイル入出力、日付時刻、ログの出力を確認する
2. `PracticalBasicsTest.java`を開き、どの入力をテストしているか読む
3. `PracticalBasics.greeting`の`"ゲスト"`を別の言葉に変え、`mvn test`が失敗することを確認する
4. テストの期待値も同じ言葉に変え、`mvn test`が成功することを確認する

## 練習問題

### Level 1

`greeting("Java")`の結果を確認するテストを1つ追加してください。

### Level 2

`writeMemo`の内容に今日の日付を含めて、読み込んだ文字列に日付が含まれることを確認してください。

### Level 3

`DateTimeFormatter`のパターンを変え、`2026年05月13日`のような表示を作ってください。

## 理解チェック

1. `null`に対してメソッドを呼ぶと何が起きますか？
2. JUnitのテストでは何と何を比べますか？
3. `Files.writeString`と`Files.readString`は何をしますか？

## 参考資料

### 公式

- [Oracle Docs: NullPointerException](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/NullPointerException.html)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Oracle Docs: Path](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Path.html)
- [Oracle Docs: Files](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html)
- [Oracle Docs: LocalDate](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html)
- [Oracle Docs: DateTimeFormatter](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html)
- [Oracle Docs: System.Logger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.Logger.html)

### 補助

- テストは「正しさを証明するもの」ではなく、「変更時に気づくための安全網」と考えると始めやすくなります。
