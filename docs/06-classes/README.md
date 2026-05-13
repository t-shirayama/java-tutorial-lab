# 6章 クラス

この章では、Javaの中心的な仕組みであるクラスを学びます。クラスは、データと処理をひとまとまりにするための設計図です。Javaでは、ほとんどのプログラムをクラスとして書きます。

この章では、クラス宣言、フィールド、メソッド、コンストラクタ、`static`、不変オブジェクトを、小さなサンプルで順番に確認します。

## この章で学ぶこと

- クラスとオブジェクトの関係
- フィールド、メソッド、コンストラクタの役割
- `static`メンバとインスタンスメンバの違い
- 不変オブジェクトの基本
- 小さなクラス設計で意識したいこと

## 6-1 クラスとオブジェクト

クラスは、オブジェクトを作るための設計図です。オブジェクトは、そのクラスから作られた実体です。

```java
Book book = new Book("Java入門", 240);
```

この例では、`Book`がクラス、`new Book(...)`で作られたものがオブジェクトです。`book`変数は、そのオブジェクトへの参照を持ちます。

## 6-2 既存クラスの使用

Javaには、最初から多くのクラスが用意されています。たとえば、`String`は文字列を表すクラスです。

```java
String title = "Java入門";
System.out.println(title.length());
```

既存クラスを使うときは、そのクラスがどのような値を持ち、どのようなメソッドを提供しているかを見ます。Java SE APIドキュメントは、標準クラスの使い方を確認するための一次情報です。

## 6-3 クラス宣言

自分でクラスを作るには、`class`を使って宣言します。

```java
public class Book {
}
```

`public`はアクセス修飾子です。アクセス修飾子は、そのクラスやメンバをどこから使えるかを表します。最初は、サンプルを実行するために必要なクラスを`public`にする、と考えれば十分です。

## 6-4 フィールド

フィールドは、オブジェクトが持つデータです。

```java
private String title;
private int pageCount;
```

`private`にすると、そのフィールドをクラスの外から直接触れなくなります。外から使ってよい操作だけをメソッドとして公開すると、クラスの使い方を整理しやすくなります。

## 6-5 メソッド

メソッドは、クラスが持つ処理です。

```java
public void addPages(int pages) {
    pageCount = pageCount + pages;
}
```

メソッドには、戻り値、名前、引数を書きます。`void`は戻り値がないことを表します。`int pages`は、呼び出し元から受け取る値です。

クラスにメソッドを置くときは、「その処理は、そのオブジェクトの状態を使うか」を考えると判断しやすくなります。`Book`のページ数を増やす処理は`Book`の状態を変えるため、`Book`のメソッドとして自然です。

## 6-6 コンストラクタ

コンストラクタは、オブジェクトを作るときに呼び出される特別な処理です。

```java
public Book(String title, int pageCount) {
    this.title = title;
    this.pageCount = pageCount;
}
```

`this`は、今操作しているオブジェクト自身を表します。フィールド名と引数名が同じとき、`this.title`と書くことでフィールドを指していると分かります。

## 6-7 staticメンバ

`static`を付けたメンバは、個々のオブジェクトではなくクラスに属します。

```java
private static int createdCount;
```

たとえば、`Book`オブジェクトがいくつ作られたかを数える値は、個々の本ではなく`Book`クラス全体で共有したい値です。このような場合に`static`フィールドを使えます。

一方で、タイトルやページ数のように本ごとに違う値はインスタンスフィールドにします。`static`にすると、すべての`Book`で値を共有してしまうため、個別の状態を表せません。

## 6-8 不変オブジェクト

不変オブジェクトとは、作ったあとに状態を変えないオブジェクトです。フィールドを`final`にし、状態を変えるメソッドを用意しないことで、シンプルな不変オブジェクトを作れます。

```java
public class ReadingGoal {
    private final String title;
    private final int targetPages;
}
```

`final`は、一度代入したあとに再代入できないことを表します。不変オブジェクトは、値が途中で変わらないため、プログラムの見通しをよくしやすいです。

## 6-9 クラスの設計

クラスを設計するときは、最初から大きく作りすぎないことが大切です。

考えやすい出発点:

- そのクラスが表すものを一文で説明できるか
- フィールドは、そのものを表すために必要か
- メソッド名から、何をする処理か分かるか
- 変更してよい状態と、変更してほしくない状態を分けているか

この章のサンプルでは、変更できる`Book`と、変更しない`ReadingGoal`を分けています。どちらが常に正しいという話ではなく、目的に合わせて選ぶことが大切です。

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/06-classes/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/06-classes/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
== クラスとオブジェクト ==
Book{title='Java入門', pageCount=260}
summary: Java入門 / 260ページ

== staticメンバ ==
created books: 2

== 不変オブジェクト ==
ReadingGoal{title='Java基礎を読む', targetPages=120}
```

## ハンズオン

まずは、`Book`の`addPages`に渡す値を変えて、ページ数がどう変わるか確認してください。

次に、`Book`オブジェクトをもう1つ増やして、`Book.getCreatedCount()`の結果が変わることを確認してください。

最後に、`ReadingGoal`に状態を変えるメソッドを追加しないまま、別の目標オブジェクトを作ってみてください。不変オブジェクトは、変更ではなく新しい値を作る考え方と相性がよいことを観察します。

確認してほしいこと:

- フィールドはオブジェクトの状態を表す
- メソッドはオブジェクトへの操作を表す
- `static`フィールドはクラス全体で共有される
- `final`フィールドは、作成後に値を差し替えない設計に役立つ

## 演習

Level 1: `Book`に`isLongBook`メソッドを追加し、ページ数が300以上なら`true`を返すようにしてください。`ClassesApp`から呼び出して結果を表示します。

Level 2: `Book`のコンストラクタで、`pageCount`が0以下なら`IllegalArgumentException`を投げるようにしてください。間違った状態のオブジェクトを作らせない設計を体験します。

Level 3: `ReadingGoal`に`withTargetPages(int newTargetPages)`のようなメソッドを追加し、元のオブジェクトを変えずに新しい`ReadingGoal`を返してください。不変オブジェクトでは「変更する」のではなく「新しい値を作る」と考えます。

設計で迷ったとき:

- その値がオブジェクトごとに違うなら、インスタンスフィールドにします。
- その値がクラス全体で共有されるなら、`static`を検討します。
- 外から自由に変えられると困る値は`private`にして、必要な操作だけをメソッドとして公開します。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 8 Classes](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html)
- [Java Language Specification, Java SE 21 Edition: 8.3 Field Declarations](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.3)
- [Java Language Specification, Java SE 21 Edition: 8.4 Method Declarations](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4)
- [Java Language Specification, Java SE 21 Edition: 8.8 Constructor Declarations](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8)
- [Java SE 21 API: String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

補助:

- なし
