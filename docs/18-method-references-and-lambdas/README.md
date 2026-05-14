# 18章 メソッド参照とラムダ式

この章では、処理を値のように渡す書き方を学びます。ラムダ式とメソッド参照を使うと、コレクション処理やイベント処理を短く表現できます。

ラムダ式は「あとで呼び出される小さな処理」をその場で作る構文です。最初は難しく見えますが、`条件`、`変換`、`出力`のような役割に分けると読みやすくなります。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- for文、ラムダ式、メソッド参照の対応を説明できる
- Predicate、Function、Consumer、Supplierを使い分けられる
- 短い処理をラムダ式として渡せる

## この章で学ぶこと

- ラムダ式を「あとで呼ばれる小さな処理」として読む方法
- メソッド参照が既存メソッドを渡す記法であること
- `Predicate`、`Function`、`Consumer`など標準関数型インタフェースの役割
- ラムダ式を短く保ち、処理を読みやすく分ける判断

## 18-1 メソッド参照

メソッド参照は、既存メソッドを処理として渡す書き方です。`System.out::println`のように書きます。

### for文からラムダ式、メソッド参照へ

ラムダ式やメソッド参照は、まず`for`文と対応づけて読むと分かりやすくなります。次の3つは、どれも名前を1つずつ表示します。

```java
List<String> names = List.of("Java", "Maven", "Docker");

for (String name : names) {
    System.out.println(name);
}

names.forEach(name -> System.out.println(name));

names.forEach(System.out::println);
```

最初の`for`文は「1件ずつ取り出して表示する」と明示的に書いています。ラムダ式は「取り出した1件をどう処理するか」だけを書きます。メソッド参照は、呼び出す既存メソッド名だけで意味が伝わる場合にさらに短くできます。

19章のStreamでも、`filter`や`map`にラムダ式やメソッド参照を渡します。この章では「処理を値のように渡す」感覚をつかむことを重視してください。

次の2つは、どちらも「文字列を大文字へ変換する処理」を表します。

```java
name -> name.toUpperCase()
String::toUpperCase
```

ラムダ式は処理の中身をその場で書きたいとき、メソッド参照は既存メソッドをそのまま渡したいときに向いています。

## 18-2 関数型インタフェース

関数型インタフェースは、抽象メソッドを1つだけ持つインタフェースです。`Predicate`、`Function`、`Consumer`などがあります。

代表的な標準関数型インタフェースは次の通りです。迷ったら「条件」「変換」「消費」「生成」のどれかで考えます。

| 型 | 役割 | 例 |
| --- | --- | --- |
| `Predicate<T>` | `T`を受け取り`boolean`を返す | 条件判定 |
| `Function<T, R>` | `T`を受け取り`R`へ変換する | 文字列から長さを作る |
| `Consumer<T>` | `T`を受け取り戻り値なしで処理する | 画面へ出力する |
| `Supplier<T>` | 引数なしで`T`を作る | 初期値を作る |

```java
Predicate<String> longName = name -> name.length() >= 5;
Function<String, Integer> length = name -> name.length();
Consumer<String> printer = name -> System.out.println(name);
Supplier<String> defaultName = () -> "Java";
```

`Predicate`は`filter`、`Function`は`map`、`Consumer`は`forEach`でよく使います。Streamを読む前にこの対応を覚えておくと、19章が読みやすくなります。

## 18-3 ラムダ式

ラムダ式は、短い処理をその場で書く方法です。`name -> name.length()`のように書きます。

左側が引数、右側が処理です。処理が1式だけなら`return`を書かずに値を返せます。

```java
Predicate<String> longName = name -> name.length() >= 4;
```

処理が複数行になる場合はブロックを使います。

```java
Function<String, String> label = name -> {
    String upper = name.toUpperCase();
    return "学習: " + upper;
};
```

ラムダ式の中で外側の変数を書き換えようとすると読みにくくなります。最初は「受け取った値から結果を作る」小さな処理に留めると安全です。

```java
int minLength = 5;
Predicate<String> enoughLength = name -> name.length() >= minLength;
```

このように外側の変数を読むことはできます。ただし、ラムダ式の後で`minLength`を書き換えるような使い方はできません。Javaはラムダ式が参照するローカル変数に、実質的に変更されないことを求めます。

## 18-4 基本型のための標準関数型インタフェース

`IntPredicate`や`IntUnaryOperator`のように、基本型用の関数型インタフェースもあります。

`Function<Integer, Integer>`でも書けますが、`IntUnaryOperator`を使うと`int`専用として扱えます。数値を大量に扱う処理では、基本型専用の型を選ぶと意図が明確になります。

## 18-5 関数合成

`andThen`や`compose`を使うと、処理をつなげられます。

`andThen`は「先に自分、次に相手」です。`compose`は「先に相手、次に自分」です。

```java
addOne.andThen(doubleValue).applyAsInt(3); // (3 + 1) * 2
doubleValue.compose(addOne).applyAsInt(3); // (3 + 1) * 2
```

## 18-6 メソッドへの参照の実践

読みやすさを優先し、短い変換はラムダ式、既存メソッドをそのまま渡すときはメソッド参照を使うと考えやすいです。

迷ったら、次の基準で選びます。

- 条件や計算がその場で分かるならラムダ式を使う。
- 既存メソッド名だけで意味が伝わるならメソッド参照を使う。
- 複雑になったら別メソッドへ切り出し、メソッド参照で渡す。

## この章の全体コード例

本文中の短いコード例は、実行できる [LambdasApp.java](examples/src/main/java/lab/lambdas/LambdasApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/18-method-references-and-lambdas/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/18-method-references-and-lambdas/examples java mvn compile exec:java
```

期待される出力例:

```text
== filter + map + method reference ==
学習: JAVA
学習: MAVEN
学習: STREAM
```

## ハンズオン

1. `Predicate`の条件を`name.length() >= 5`へ変えて、残る名前がどう変わるか確認してください。
2. `Function`の変換内容を`"topic=" + text`へ変えて、出力ラベルを変えてください。
3. `addOne.andThen(doubleValue)`を`doubleValue.andThen(addOne)`へ変えて、計算順序の違いを確認してください。
4. `System.out::println`をラムダ式`text -> System.out.println(text)`へ書き換え、同じ出力になることを確認してください。

## よくあるエラー

### ラムダ式を長くしすぎる

ラムダ式が2〜3行を超えて読みづらくなったら、名前のあるメソッドへ切り出すことを検討します。短く書くことより、何をしているかが分かることを優先します。

## 練習問題

### Level 1

ラムダ式の条件値を変えて結果を確認してください。

### Level 2

`Predicate`と`Function`を1つずつ追加してください。

### Level 3

長いラムダ式を名前のあるメソッドへ切り出してください。

## 理解チェック

1. ラムダ式の左側と右側は何を表しますか？
2. `Predicate`、`Function`、`Consumer`の役割はどう違いますか？
3. メソッド参照を使うと読みやすくなるのはどんな場合ですか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 15.27 Lambda Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.27)
- [Java Language Specification, Java SE 21 Edition: 15.13 Method Reference Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.13)
- [Java SE 21 API: java.util.function](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html)

補助:

- なし
