# 13章 Javaプログラムの実行と制御構造

この章では、プログラムの入口である`main`メソッドと、条件分岐、`switch`、繰り返し、ジャンプを学びます。

制御構造は、プログラムの流れを変えるための構文です。上から下へ順番に実行される処理に、条件や繰り返しを加えていきます。

## 13-1 Javaプログラムの実行

Javaアプリケーションは、通常`public static void main(String[] args)`から始まります。

`main`メソッドの`args`には、コマンドライン引数が入ります。この教材のサンプルでは固定値を使いますが、実務では起動時に渡された値で処理を変えることもあります。

## 13-2 java.lang.Systemクラス

`System.out.println`は標準出力へ文字列を表示します。`System.getProperty`で実行環境の情報も取得できます。

標準出力は、学習中に値を確認するもっとも簡単な方法です。慣れてきたらデバッガやログも使いますが、まずは`println`で実行順序を観察しましょう。

## 13-3 条件分岐

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

## 13-4 switch構文

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

## 13-5 繰り返し

`for`、拡張for、`while`で繰り返し処理を書きます。

| 構文 | 向いている場面 |
| --- | --- |
| `for` | 回数や添字を意識したい |
| 拡張`for` | 配列やリストの全要素を順番に扱いたい |
| `while` | 条件が成り立つ間だけ続けたい |

添字が必要ないなら拡張`for`から始めると安全です。

```java
for (String topic : topics) {
    System.out.println(topic);
}
```

添字を使う`for`では、境界条件に注意します。`i <= topics.length`では最後に存在しない位置へアクセスしてしまうため、`i < topics.length`にします。

## 13-6 ジャンプ

`break`は繰り返しを抜け、`continue`は次の繰り返しへ進みます。

`break`と`continue`は便利ですが、増えすぎると流れが追いにくくなります。まずは小さなループで動きを確認しましょう。

## 実行して確認する

```bash
cd docs/13-execution-and-control-flow/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/13-execution-and-control-flow/examples java mvn compile exec:java
```

## ハンズオン

1. `score`を60、80、95へ変えて、`if`と`switch`の出力を確認してください。
2. `topics`配列の`"stop"`の位置を変えて、`break`でどこまで出力されるか確認してください。
3. `"skip"`という要素を追加し、`continue`でその要素だけ飛ばす処理を追加してください。
4. `while`ループの回数を変え、条件が`false`になると止まることを確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 14.9 The if Statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9)
- [Java Language Specification, Java SE 21 Edition: 14.11 The switch Statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11)
- [Java SE 21 API: System](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html)

補助:

- なし
