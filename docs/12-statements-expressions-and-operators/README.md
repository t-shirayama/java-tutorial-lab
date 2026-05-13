# 12章 文、式、演算子

この章では、Javaのコードを構成する文、式、演算子を学びます。式は値を生み、文は処理の単位になります。

この章の目標は、コードを「どこが値を作っているか」「どこが処理を実行しているか」に分けて読めるようになることです。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- 文と式の違いを説明できる
- 演算子の優先順位や短絡評価を意識して条件を書ける
- =、==、equalsの違いを説明できる

## 12-1 Javaの文法と文

文は、実行される処理の単位です。多くの文は`;`で終わります。

```java
int total = 5;              // 変数宣言文
System.out.println(total);  // 式文
```

ブロック`{ ... }`は複数の文をまとめます。`if`や`for`の中身を読みやすくする基本です。

## 12-2 文

変数宣言文、式文、ブロック文、`return`文などがあります。

`return`文はメソッドの結果を返し、そこでメソッドの実行を終えます。小さなメソッドを作ると、文の役割が見えやすくなります。

## 12-3 Javaの演算子と式

演算子は、値を組み合わせて新しい値を作ります。`+`、`-`、`*`、`/`などがあります。

式は値になります。例えば`total - completed`は`int`の値を作る式で、`completed > 0`は`boolean`の値を作る式です。

演算子には優先順位があります。迷う場合は、暗記で頑張るより括弧で意図を明示します。

```java
int score = 60 + 20 * 2;     // 100
int score2 = (60 + 20) * 2;  // 160
```

読み手に考えさせる式は、正しくても保守しにくくなります。教材のうちは、少し冗長でも括弧を使って構いません。

## 12-4 数値の演算

数値では四則演算や剰余を使えます。

整数同士の割り算は整数になります。`5 / 2`は`2`です。小数として計算したい場合は、`5.0 / 2`のように少なくとも片方を小数にします。

`%`は余りを求めます。偶数判定では`value % 2 == 0`のように使えます。

## 12-5 文字列の演算

`+`は文字列結合にも使えます。

左から順に評価されるため、数値計算と文字列結合が混ざると結果が変わることがあります。

```java
"progress: " + 3 + 5   // progress: 35
"progress: " + (3 + 5) // progress: 8
```

## 12-6 関係演算と等値演算

`<`、`>=`、`==`、`!=`などの結果は`boolean`です。

基本型の値は`==`で比較できます。文字列などのオブジェクトの内容比較には、原則として`equals`を使います。

```java
"Java".equals(topic)
```

`=`は代入、`==`は比較です。Javaでは`if (score = 80)`のようなコードは、`score = 80`が`int`になり、条件に必要な`boolean`ではないためコンパイルエラーになります。

```java
int score = 80;
if (score == 80) {
    System.out.println("合格ラインです");
}
```

文字列比較では、`name.equals("Java")`より`"Java".equals(name)`の方が`name`が`null`のときに`NullPointerException`を避けられます。

## 12-7 論理演算

`&&`、`||`、`!`で条件を組み合わせます。

`&&`は左が`false`なら右を評価しません。`||`は左が`true`なら右を評価しません。この性質を短絡評価と呼びます。

## 12-8 その他の演算

代入、三項演算子、インクリメントなどもあります。読みやすさを優先して使いましょう。

三項演算子は短い条件分岐に便利です。ただし、条件や結果が長くなるなら`if`文に分けた方が読みやすくなります。

`++`は1増やす演算子ですが、式の中に混ぜると読み間違えやすくなります。

```java
int count = 1;
System.out.println(count++); // 1を表示してから2になる
System.out.println(++count); // 3にしてから3を表示する
```

初学者のうちは、`count++`だけを1行で使うと安全です。表示や計算と混ぜる必要があるなら、別の行に分けましょう。

## 実行して確認する

```bash
cd docs/12-statements-expressions-and-operators/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/12-statements-expressions-and-operators/examples java mvn compile exec:java
```

## ハンズオン

1. `completed`と`total`を変えて、`remaining`と`canStart`の変化を確認してください。
2. `total / completed`のような整数除算を追加し、小数の計算と比較してください。
3. 文字列結合で`"progress: " + completed + total`と`"progress: " + (completed + total)`の違いを確認してください。
4. `topic == "Java"`のような比較を`"Java".equals(topic)`へ直し、オブジェクト比較の基本を確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 14 Blocks and Statements](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html)
- [Java Language Specification, Java SE 21 Edition: Chapter 15 Expressions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html)

補助:

- なし
