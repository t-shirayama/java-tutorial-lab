# 6章 条件分岐と繰り返し

この章では、条件分岐、`switch`、繰り返し、ジャンプを学びます。

制御構造は、プログラムの流れを変えるための構文です。上から下へ順番に実行される処理に、条件や繰り返しを加えていきます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- if、switch、for、whileを使って処理の流れを変えられる
- breakとcontinueの違いを説明できる

## この章で学ぶこと

- 上から下へ進む処理に、条件分岐と繰り返しを加える考え方
- `if`、`else if`、`switch`式の使い分け
- `for`、拡張`for`、`while`の向き不向き
- `break`と`continue`でループの流れを変える方法

## 6-1 処理の流れ

プログラムは、基本的には上から下へ順番に実行されます。

条件分岐は、条件によって実行する処理を変える構文です。繰り返しは、同じ形の処理を何度も実行する構文です。この2つを使うと、固定の順番で動くだけだったコードに判断と反復を加えられます。

## 6-2 実行結果を表示する

`System.out.println`は標準出力へ文字列を表示します。

標準出力は、学習中に値を確認するもっとも簡単な方法です。慣れてきたらデバッガやログも使いますが、まずは`println`で実行順序を観察しましょう。

## 6-3 条件分岐

`if`文で条件によって処理を分けます。

```java
if (score >= 80) {
    System.out.println("応用へ進めます");
} else {
    System.out.println("基礎を復習します");
}
```

条件式の結果は`boolean`です。条件が増えるときは、`else if`を使うか、後述の`switch`が向いているかを考えます。

条件式には、必ず`boolean`になる式を書きます。代入や文字列比較のミスは、初学者がよくつまずくところです。

```java
String name = null;

if ("Java".equals(name)) {
    System.out.println("Javaです");
}
```

`name.equals("Java")`と書くと、`name`が`null`のときに`NullPointerException`になります。比較対象が固定文字列なら、固定文字列側から`equals`を呼ぶと安全です。

## 6-4 switch構文

`switch`式や`switch`文で、値に応じた分岐を書けます。

Java 21では、`switch`を式として使い、結果を変数へ代入できます。`->`を使うと、分岐ごとの処理範囲が分かりやすくなります。

```java
String level = switch (score / 10) {
    case 10, 9 -> "発展";
    case 8, 7 -> "標準";
    default -> "復習";
};
```

`switch`式は、すべての分岐で値を返す必要があります。分岐が抜けているとコンパイル時に気づけるため、単なる`if`の羅列より意図が見えやすい場面があります。

## 6-5 繰り返し

`for`、拡張for、`while`で繰り返し処理を書きます。

| 構文 | 向いている場面 |
| --- | --- |
| `for` | 回数や添字を意識したい |
| 拡張`for` | 配列やリストの全要素を順番に扱いたい |
| `while` | 条件が成り立つ間だけ続けたい |

`for`は「何回繰り返すか」がはっきりしているときに向いています。

```java
for (int i = 0; i < 3; i++) {
    System.out.println("count: " + i);
}
```

添字が必要ないなら拡張`for`から始めると安全です。

```java
for (String topic : topics) {
    System.out.println(topic);
}
```

添字を使う`for`では、境界条件に注意します。`i <= topics.length`では最後に存在しない位置へアクセスしてしまうため、`i < topics.length`にします。

`while`は「条件が成り立つ間だけ続ける」処理に向いています。終了条件を書き忘れると無限ループになるため、ループ内で条件が変わるか確認します。

```java
int remaining = 3;
while (remaining > 0) {
    System.out.println("remaining: " + remaining);
    remaining--;
}
```

## 6-6 ジャンプ

`break`は繰り返しを抜け、`continue`は次の繰り返しへ進みます。

`break`と`continue`は便利ですが、増えすぎると流れが追いにくくなります。まずは小さなループで動きを確認しましょう。

`break`は、目的の値を見つけた時点でループを終えたいときに使います。

```java
for (String topic : topics) {
    if ("stop".equals(topic)) {
        break;
    }
    System.out.println(topic);
}
```

`continue`は、今回の要素だけ処理を飛ばして、次の繰り返しへ進みたいときに使います。

```java
for (String topic : topics) {
    if ("skip".equals(topic)) {
        continue;
    }
    System.out.println(topic);
}
```

同じループ内で比べると、違いがさらに分かりやすくなります。

```java
for (String topic : topics) {
    if ("skip".equals(topic)) {
        continue;
    }

    if ("stop".equals(topic)) {
        break;
    }

    System.out.println(topic);
}
```

この例では、`skip`は表示されずに次の要素へ進みます。`stop`が出たら、そこで繰り返し全体が終了します。

## この章の全体コード例

本文中の短いコード例は、実行できる [ControlFlowApp.java](examples/src/main/java/lab/controlflow/ControlFlowApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `if`、`switch`、`for`、`while`がどの順番で実行されているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/06-conditions-and-loops/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/06-conditions-and-loops/examples java mvn compile exec:java
```

期待される出力例:

```text
java version: 21...
応用へ進めます
topic: if
topic: switch
```

## ハンズオン

1. `score`を60、80、95へ変えて、`if`と`switch`の出力を確認してください。
2. `topics`配列の`"stop"`の位置を変えて、`break`でどこまで出力されるか確認してください。
3. `"skip"`という要素を追加し、`continue`でその要素だけ飛ばす処理を追加してください。
4. `while`ループの回数を変え、条件が`false`になると止まることを確認してください。

## よくあるエラー

### whileの終了条件を変え忘れる

```java
while (remaining > 0) {
    System.out.println(remaining);
}
```

`remaining`が変わらないため無限ループになります。ループ内で終了条件に近づく処理を書きます。

## 練習問題

### Level 1

`score`や配列の値を変えて分岐結果を確認してください。

### Level 2

`continue`で特定要素をスキップする条件を追加してください。

### Level 3

`switch`式を使って学習レベルを返すメソッドを作ってください。

## 理解チェック

1. 条件分岐はどのようなときに使いますか？
2. `for`、拡張for、`while`はどう使い分けますか？
3. `break`と`continue`の違いは何ですか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 14.9 The if Statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9)
- [Java Language Specification, Java SE 21 Edition: 14.11 The switch Statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11)

補助:

- なし
