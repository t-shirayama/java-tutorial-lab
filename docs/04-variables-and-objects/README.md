# 4章 変数とオブジェクト

この章では、Javaの変数が値をどのように持つのかを学びます。特に大切なのは、`int`や`boolean`のような基本型と、`String`や自分で作ったクラスのような参照型を分けて考えることです。

変数は、値に名前を付けて後から使えるようにする仕組みです。Javaでは、変数には必ず型があります。型とは、その変数に入れられる値の種類を表す情報です。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- 基本型と参照型の違いを説明できる
- 変数がオブジェクトそのものではなく参照を持つことを説明できる
- スコープ、初期値、寿命を意識して変数を扱える

## この章で学ぶこと

- 基本型と参照型の違い
- オブジェクトと変数の関係
- 参照型変数の代入で何が共有されるか
- 変数の初期値、スコープ、オブジェクトの寿命の考え方

## 4-1 基本型と参照型

Javaの型は、大きく基本型と参照型に分けられます。

基本型は、数値や真偽値などの値そのものを扱います。代表的な基本型には、`int`、`long`、`double`、`boolean`、`char`があります。

参照型は、オブジェクトへの参照を扱います。参照とは、オブジェクトそのものではなく「そのオブジェクトを指す情報」です。`String`、配列、自分で作ったクラスは参照型です。

```java
int pageCount = 120;
ReadingItem item = new ReadingItem("Java入門", 120);
```

`pageCount`は整数値を持つ基本型変数です。`item`は`ReadingItem`オブジェクトへの参照を持つ参照型変数です。

## 4-2 オブジェクトと変数

オブジェクトとは、クラスをもとに作られた実体です。`new`を使うと、新しいオブジェクトを作れます。

```java
ReadingItem item = new ReadingItem("Java入門", 120);
```

このコードでは、`new ReadingItem(...)`でオブジェクトを作り、その参照を`item`変数に入れています。変数そのものがオブジェクトになるのではなく、変数はオブジェクトへの参照を持つ、と考えると理解しやすくなります。

## 4-3 参照型変数

参照型変数を別の変数へ代入すると、オブジェクトがコピーされるのではなく、同じオブジェクトへの参照がコピーされます。

```java
ReadingItem first = new ReadingItem("Java入門", 120);
ReadingItem second = first;
```

この場合、`first`と`second`は同じオブジェクトを指します。片方の変数からオブジェクトの状態を変更すると、もう片方から見ても変更後の状態が見えます。

イメージとしては、変数がオブジェクトそのものを箱に入れているのではなく、オブジェクトへ向かう矢印を持っていると考えます。

```text
first  ─┐
        ├─> ReadingItem("Java入門", 120)
second ─┘
```

## 4-4 オブジェクト生成と代入

別々のオブジェクトを作りたい場合は、`new`を2回使います。

```java
ReadingItem first = new ReadingItem("Java入門", 120);
ReadingItem second = new ReadingItem("Java入門", 120);
```

この2つは、同じ内容を持っていても別々のオブジェクトです。内容が同じか、同じオブジェクトかは別の話です。この違いは、文字列の比較やクラス設計でも何度も出てきます。

```text
first  ─> ReadingItem("Java入門", 120)
second ─> ReadingItem("Java入門", 120)
```

## 4-5 変数と型

Javaでは、変数を宣言するときに型を書きます。

```java
int number = 10;
String title = "Java";
ReadingItem item = new ReadingItem("Java入門", 120);
```

型があることで、コンパイラは間違った値を入れようとしたコードを検出できます。たとえば、`int`の変数に文字列をそのまま代入することはできません。

## 4-6 基本型変数

基本型変数を別の変数に代入すると、値がコピーされます。

```java
int original = 10;
int copied = original;
original = 20;
```

この場合、`original`を後から`20`に変えても、`copied`は`10`のままです。基本型では、変数ごとに値を持つと考えると理解しやすいです。

## 4-7 変数のデフォルト初期値とスコープ

フィールドには、型に応じたデフォルト初期値があります。たとえば、`int`は`0`、`boolean`は`false`、参照型は`null`です。`null`は、参照型変数がどのオブジェクトも指していないことを表す特別な値です。

一方で、メソッドの中で宣言したローカル変数は、使う前に自分で初期化する必要があります。

スコープとは、変数名を使える範囲のことです。メソッドの中で宣言した変数は、基本的にそのメソッドの中でだけ使えます。

## 4-8 オブジェクトの寿命

オブジェクトは、参照されている間は使えます。どこからも参照されなくなったオブジェクトは、Javaの実行環境が後で片付ける対象になります。この片付けの仕組みをガベージコレクションと呼びます。

ただし、いつ片付けられるかを普段のコードで細かく意識する必要はあまりありません。まずは、変数が参照を持っている間はオブジェクトを使える、と押さえましょう。

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/04-variables-and-objects/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/04-variables-and-objects/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
== 基本型の代入 ==
original: 20
copied: 10

== 参照型の代入 ==
first: ReadingItem{title='Java入門 改訂版', pageCount=120}
second: ReadingItem{title='Java入門 改訂版', pageCount=120}
same object: true

== 別々のオブジェクト ==
same object: false

== デフォルト初期値 ==
count: 0
finished: false
memo: null
```

## ハンズオン

まずは、`VariablesAndObjectsApp.java`の`original`と`copied`の値を変更して、基本型では値がコピーされることを確認してください。

次に、`ReadingItem second = first;`を`ReadingItem second = new ReadingItem("Java入門", 120);`に変えて、`same object`の結果がどう変わるかを見てください。

最後に、`DefaultValues`クラスのフィールドを増やして、型ごとのデフォルト初期値を確認してください。

確認してほしいこと:

- 基本型の代入では値がコピーされる
- 参照型の代入では同じオブジェクトを共有することがある
- フィールドとローカル変数では、初期化の扱いが違う

## 演習

Level 1: `original = 20;`を`original = 99;`に変えてください。`copied`が変わらないことを確認し、基本型では値がコピーされることを声に出して説明してみます。

Level 2: `first.rename("Java入門 改訂版");`の代わりに`second.rename("参照の実験");`を書いてください。`first`の表示も変わるなら、2つの変数が同じオブジェクトを指している証拠です。

Level 3: `showSeparateObjects`で、2つの`ReadingItem`のタイトルを同じにしたまま`==`が`false`になることを確認してください。「内容が同じ」と「同じオブジェクト」は別である、という違いをメモします。

よくある混乱:

- `null`は「空文字」や`0`ではありません。参照がどのオブジェクトも指していない状態です。
- ローカル変数はデフォルト初期値を持ちません。使う前に必ず自分で値を入れる必要があります。
- ガベージコレクションは便利ですが、ファイルやネットワーク接続などの後片付けをすべて任せられる仕組みではありません。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 4 Types, Values, and Variables](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html)
- [Java Language Specification, Java SE 21 Edition: 4.2 Primitive Types and Values](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2)
- [Java Language Specification, Java SE 21 Edition: 4.3 Reference Types and Values](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.3)
- [Java Language Specification, Java SE 21 Edition: 4.12 Variables](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12)
- [Java SE 21 API: Object](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html)

補助:

- なし
