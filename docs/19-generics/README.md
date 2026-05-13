# 19章 ジェネリック型

この章では、型をパラメータとして扱うジェネリック型を学びます。`List<String>`のように書くことで、要素の型をコンパイル時に確認できます。

ジェネリック型の目的は、実行する前に型の取り違えを見つけることです。`List`に何でも入れるより、`List<String>`のように型を明示したほうが安全に読み書きできます。

`List<String>`や`Map<String, Integer>`は、[8章 コレクションと配列](../08-collections-and-arrays/)でも登場しました。この章では、型を指定する理由を詳しく見ます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- List<String>のように型を指定する理由を説明できる
- raw typeの危険性を説明できる
- extendsとsuperのワイルドカードを読み分けられる

## 19-1 ジェネリック型とは

ジェネリック型は、型を後から指定できるクラスやインタフェースです。サンプルの`Box<T>`は、`Box<String>`にも`Box<Integer>`にもできます。

ジェネリクスは難しい構文ではなく、間違った型を入れないための安全装置です。型を指定しない生の`List`を使うと、文字列と数値を同じリストへ入れられてしまいます。

```java
List rawList = new ArrayList();
rawList.add("Java");
rawList.add(123); // コンパイルは通りやすいが、後で取り出すと危ない
```

型を指定すれば、間違いを実行前に見つけられます。

```java
List<String> names = new ArrayList<>();
names.add("Java");
// names.add(123); // コンパイルエラーになるので安全
```

初学者のうちは、`List`だけでなく必ず`List<String>`のように要素の型まで書く習慣を付けましょう。

## 19-2 ジェネリック型宣言

`class Box<T>`のように、型パラメータを宣言します。`T`は慣習的に「型」を表す名前です。

## 19-3 ジェネリック型の使用

`Box<String>`や`List<Integer>`のように、具体的な型を指定して使います。`Box<String>`へ`Integer`を入れようとすると、実行前にコンパイルエラーになります。

## 19-4 ワイルドカード

`? extends Number`は「NumberまたはNumberの子型のリスト」を受け取る書き方です。値を読む側、たとえば合計を計算する`sum(List<? extends Number>)`に向いています。

`? super Integer`は「Integerを入れられる親側の型」を受け取る書き方です。値を書き込む側、たとえば`List<Number>`へ`Integer`を追加する処理に向いています。

覚え方は「読むなら`extends`、書くなら`super`」です。英語圏ではPECS（Producer Extends, Consumer Super）とも呼ばれます。

| 書き方 | 覚え方 | できること |
| --- | --- | --- |
| `? extends Number` | Numberとして読む側 | 要素を取り出して計算する |
| `? super Integer` | Integerを書き込む側 | Integerを追加する |

```java
double total = sum(List.of(10, 20, 30)); // 読むだけなので extends

List<Number> scores = new ArrayList<>();
addDefaultScores(scores); // Integerを書き込むので super
```

メソッド定義で見ると、役割は次のようになります。

```java
static double sum(List<? extends Number> numbers) {
    double total = 0;
    for (Number number : numbers) {
        total += number.doubleValue();
    }
    return total;
}
```

```java
static void addIntegers(List<? super Integer> numbers) {
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);
}
```

`sum`は値を取り出して読むだけなので`extends`です。`addIntegers`は`Integer`を追加して受け取らせるので`super`です。

## 19-5 ジェネリック型の設計

型パラメータは、利用者にとって意味がある範囲に絞ります。必要以上に複雑なジェネリック設計は避けます。

## 実行して確認する

```bash
cd docs/19-generics/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/19-generics/examples java mvn compile exec:java
```

期待される出力例:

```text
box: ...
sum: ...
PECS: ...
```

## ハンズオン

1. `Box<String>`を`Box<Integer>`に変え、入れられる値の型が変わることを確認してください。
2. `sum(List.of(1, 2, 3))`や`sum(List.of(1.5, 2.5))`を追加し、`? extends Number`が複数の数値型を受け取れることを確認してください。
3. `addDefaultScores`の引数を`List<? extends Integer>`に変えると、なぜ追加できなくなるのか考えてください。

## よくあるエラー

### raw typeを使ってしまう

```java
List raw = new ArrayList();
raw.add("Java");
raw.add(123);
```

型を指定しないと、間違った型の混入に気づきにくくなります。`List<String>`のように要素の型を指定します。

## 練習問題

### Level 1

`Box<String>`を`Box<Integer>`に変えて確認してください。

### Level 2

`sum`へ異なる数値型のListを渡してください。

### Level 3

raw typeの危険な例を型付きListへ直してください。

## 理解チェック

1. `List<String>`とraw typeの違いは何ですか？
2. `? extends Number`は読む側と書く側のどちらに向いていますか？
3. PECSは何の略ですか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 4.5 Parameterized Types](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5)
- [Java Language Specification, Java SE 21 Edition: 8.1.2 Generic Classes and Type Parameters](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.2)
- [Java Language Specification, Java SE 21 Edition: 4.5.1 Type Arguments of Parameterized Types](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5.1)
- [Java SE 21 API: List](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html)

補助:

- なし
