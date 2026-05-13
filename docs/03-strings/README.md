# 3章 文字列

この章では、Javaで文字列を扱う基本を学びます。文字列は画面表示、入力値、ログ、ファイル名、URLなど、ほとんどのプログラムで使います。Javaでは文字列を表す`String`がとてもよく使われるため、最初のうちに「変更できない文字列」と「組み立てるための文字列」を分けて理解しておくと、後の章が読みやすくなります。

## この章で学ぶこと

- `String`は文字の並びを表すクラスであること
- `String`は一度作ると中身を変更できないこと
- 文字列を何度も組み立てるときは`StringBuilder`を使えること
- 文字列の結合、比較、オブジェクトの文字列変換の基本

## 3-1 文字列

Javaでは、`"Hello"`のように二重引用符で囲んだ値を文字列リテラルと呼びます。リテラルとは、ソースコードに直接書かれた値のことです。

```java
String message = "Javaを学ぶ";
```

`String`は、Java APIでは「文字列を表すクラス」として定義されています。`String`には、文字数を調べる`length`、一部を取り出す`substring`、前後の空白を取り除く`strip`など、多くのメソッドがあります。

重要なのは、`String`の値は変更できないという点です。たとえば、`strip`や`toUpperCase`のようなメソッドは、元の文字列を書き換えるのではなく、新しい文字列を返します。

## 3-2 書き換え可能文字列

`String`は変更できないため、文字列を少しずつ組み立てたいときは`StringBuilder`を使うことがあります。`StringBuilder`は、変更可能な文字の並びを表すクラスです。

```java
StringBuilder builder = new StringBuilder();
builder.append("Java");
builder.append(" ");
builder.append("21");
String result = builder.toString();
```

`append`は、末尾に文字列を追加するメソッドです。最後に`toString`を呼ぶと、組み立てた内容を`String`として取り出せます。

## 3-3 文字列の結合

短い文字列を読みやすくつなぐだけなら、`+`演算子を使えます。

```java
String name = "Java";
String version = "21";
String label = name + " " + version;
```

一方で、ループの中で何度も文字列をつなぐ場合は、`StringBuilder`を使うと「文字列を組み立てている」という意図がはっきりします。この章では性能の細かい話には踏み込みません。まずは、短い結合は`+`、繰り返し組み立てる処理は`StringBuilder`、という使い分けに慣れましょう。

## 3-4 文字列の比較

Javaで文字列の内容を比較するときは、基本的に`equals`を使います。

```java
String first = "java";
String second = "java";
System.out.println(first.equals(second));
```

`==`は、2つの変数が同じオブジェクトを指しているかを比べます。文字列の内容が同じかどうかを調べたい場面では、`==`ではなく`equals`を使う、と覚えてください。

大文字と小文字を区別せずに比べたい場合は、`equalsIgnoreCase`も使えます。

`equals`を呼ぶ側が`null`の可能性があるときは注意が必要です。たとえば、`input.equals("java")`は`input`が`null`だと例外になります。まだ`null`の扱いに慣れていないうちは、定数側から`"java".equals(input)`と書くと安全に比較できます。

## 3-5 オブジェクトの文字列変換

Javaのすべてのクラスは、`Object`クラスをもとにしています。`Object`には`toString`メソッドがあり、オブジェクトを文字列として表すときに使われます。

自分で作ったクラスでも、`toString`を定義すると、表示やログで読みやすい文字列を出せます。

```java
public String toString() {
    return name + " (" + level + ")";
}
```

ただし、`toString`は人が読んで理解しやすい表示を作るためのものです。プログラムの判定に使う正式なデータ形式として扱う場合は、別の設計が必要になります。

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/03-strings/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/03-strings/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
== 文字列 ==
元の文字列:   Java 21  
strip後: Java 21
元の文字列は変わらない:   Java 21  

== 書き換え可能文字列 ==
学習メニュー: 文字列 -> StringBuilder -> equals -> toString

== 文字列の比較 ==
equals: true
==: false
equalsIgnoreCase: true

== オブジェクトの文字列変換 ==
StudyTopic{name='文字列', level='基本'}
```

## ハンズオン

まずは、`examples/src/main/java/lab/strings/StringExamplesApp.java`を開き、`rawText`の前後の空白を増やしたり減らしたりして、`strip`の結果がどう変わるかを確認してください。

次に、`StringBuilder`へ追加している学習項目を1つ増やしてください。出力の順番がコードの`append`順と同じになることを確認します。

最後に、`new String("java")`を使っている箇所を文字列リテラルに変えて、`==`の結果がどう変わるかを観察してください。結果が変わっても、内容比較には`equals`を使う方針は変わりません。

確認してほしいこと:

- `String`のメソッドは、元の文字列を直接書き換えない
- 文字列を組み立てる処理は、`StringBuilder`を使うと意図が読みやすい
- 内容比較は`equals`、表示用の文字列化は`toString`と役割が違う

## 演習

Level 1: `rawText`を`"  Java\n"`のように変えて、`strip`が改行や空白をどう扱うか確認してください。表示が見づらい場合は、前後に`[`と`]`を付けて出力すると違いが分かりやすくなります。

Level 2: `StringBuilder`の学習メニューに`strip`と`equalsIgnoreCase`を追加してください。`append`の順番が、そのまま出力順になることを確認します。

Level 3: `String maybeNull = null;`を追加し、`"java".equals(maybeNull)`と`maybeNull.equals("java")`の違いを試してください。例外が出たら、エラーメッセージの最初の行と、どの行で起きたかを読んでみましょう。

つまずきポイント:

- `String`は変更できません。`rawText.strip();`だけを書いても、戻り値を変数へ入れなければ結果を使えません。
- `==`の結果がたまたま`true`になる文字列もありますが、内容比較の意図なら`equals`を使います。
- `toString`は人間が読む表示向けです。CSVやJSONのような正式な保存形式として使う場合は、別の設計を考えます。

## 参考資料

公式:

- [Java SE 21 API: String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)
- [Java SE 21 API: StringBuilder](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html)
- [Java SE 21 API: Object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html)
- [Java Language Specification, Java SE 21 Edition: String Literals](https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.5)

補助:

- なし
