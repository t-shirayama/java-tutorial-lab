# 10章 Javaプログラムの実行

この章では、Javaプログラムがどこから始まり、Mavenでどのように実行されるかを学びます。

ここまでの章では、値、演算子、条件分岐、文字列、クラス、コレクションを順番に見てきました。この章では、それらを「1つのJavaアプリケーションとして起動する」入口を整理します。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- `main`メソッドをプログラムの入口として説明できる
- Mavenの`compile`と`exec:java`の役割を説明できる
- コマンドライン引数を`String[] args`から受け取れる
- `System.out.println`で実行結果を確認できる

## この章で学ぶこと

- Javaアプリケーションの入口になる`main`メソッドの形
- `public static void main(String[] args)`を構成する言葉の大まかな意味
- Mavenでコンパイルと実行を続けて行う流れ
- コマンドライン引数と標準出力を使った動作確認

## 10-1 mainメソッド

Javaアプリケーションは、通常`public static void main(String[] args)`から始まります。

`main`メソッドは、Java実行環境が最初に呼び出す特別なメソッドです。`String[] args`には、起動時に渡したコマンドライン引数が入ります。

```java
public static void main(String[] args) {
    System.out.println("Hello, Java");
}
```

`public`は外から呼び出せること、`static`はオブジェクトを作らずクラスから呼べること、`void`は戻り値がないことを表します。細かい使い分けはこの後の章でも何度も出てきます。ここではまず、「この形を書くとアプリケーションの入口になる」と覚えてください。

## 10-2 Mavenで実行する

このリポジトリのサンプルは、章ごとの`examples/`でMavenを使って実行します。

```bash
cd docs/10-java-program-execution/examples
mvn compile exec:java
```

`compile`はJavaファイルをコンパイルし、`exec:java`は`pom.xml`に設定された`mainClass`を実行します。

Mavenは、毎回`javac`や`java`コマンドの引数を手で組み立てる代わりに、`pom.xml`に書いた設定を使って同じ手順で実行するための道具です。サンプルでは`exec-maven-plugin`が、実行するクラスを決めています。

Dockerを使う場合:

```bash
docker compose exec -w /workspace/docs/10-java-program-execution/examples java mvn compile exec:java
```

## 10-3 コマンドライン引数

`exec:java`に引数を渡すと、`main`メソッドの`args`で受け取れます。

```bash
mvn compile exec:java -Dexec.args="Java Maven"
```

サンプルでは、渡された引数を順番に表示します。引数がない場合は、引数なしで実行されたことを表示します。

## 10-4 Systemクラス

`System.out.println`は、標準出力へ文字列を表示します。

標準出力は、学習中に値を確認するもっとも簡単な方法です。慣れてきたらデバッガやログも使いますが、まずは`println`で「どの順番で実行されたか」を観察しましょう。

## この章の全体コード例

本文中の短いコード例は、実行できる [ExecutionApp.java](examples/src/main/java/lab/execution/ExecutionApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/10-java-program-execution/examples
mvn compile exec:java
```

引数付きで実行する場合:

```bash
mvn compile exec:java -Dexec.args="Java Maven"
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/10-java-program-execution/examples java mvn compile exec:java
```

期待される出力例:

```text
Javaプログラムを実行しました
java version: 21...
args: 引数はありません
```

引数付きで実行すると、`args count: 2`や`args[0]: Java`のように表示されます。

## ハンズオン

1. 引数なしで実行する
2. `-Dexec.args="Java Maven"`を付けて実行する
3. `ExecutionApp.java`の表示メッセージを書き換える
4. もう一度実行して、結果が変わることを確認する

## よくあるエラー

### mainClassの設定とクラス名がずれている

`pom.xml`の`mainClass`と実際のパッケージ名・クラス名が違うと、Mavenは起動するクラスを見つけられません。ファイルの場所、`package`宣言、クラス名、`pom.xml`の設定を同じ名前でそろえます。

## 練習問題

1. 引数の個数を表示してください。
2. 1つ目の引数だけを大文字にして表示してください。
3. 引数が3つ以上ある場合だけ、`たくさん渡されました`と表示してください。

## 理解チェック

1. `main`メソッドは何のためにありますか？
2. `mvn compile exec:java`の`compile`は何をしますか？
3. `String[] args`には何が入りますか？

## 参考資料

公式:

- [Oracle Java Documentation](https://docs.oracle.com/en/java/)
- [Apache Maven: Exec Maven Plugin](https://www.mojohaus.org/exec-maven-plugin/)

補助:

- なし
