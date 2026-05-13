# 10章 Javaプログラムの実行

この章では、Javaプログラムがどこから始まり、Mavenでどのように実行されるかを学びます。

ここまでの章では、値、演算子、条件分岐、文字列、クラス、コレクションを順番に見てきました。この章では、それらを「1つのJavaアプリケーションとして起動する」入口を整理します。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- `main`メソッドをプログラムの入口として説明できる
- Mavenの`compile`と`exec:java`の役割を説明できる
- コマンドライン引数を`String[] args`から受け取れる
- `System.out.println`で実行結果を確認できる

## 10-1 mainメソッド

Javaアプリケーションは、通常`public static void main(String[] args)`から始まります。

`main`メソッドは、Java実行環境が最初に呼び出す特別なメソッドです。`String[] args`には、起動時に渡したコマンドライン引数が入ります。

```java
public static void main(String[] args) {
    System.out.println("Hello, Java");
}
```

`public`、`static`、`void`などの意味は、この後の章でも何度も出てきます。ここではまず、「この形を書くとアプリケーションの入口になる」と覚えてください。

## 10-2 Mavenで実行する

このリポジトリのサンプルは、章ごとの`examples/`でMavenを使って実行します。

```bash
cd docs/10-java-program-execution/examples
mvn compile exec:java
```

`compile`はJavaファイルをコンパイルし、`exec:java`は`pom.xml`に設定された`mainClass`を実行します。

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

## ハンズオン

1. 引数なしで実行する
2. `-Dexec.args="Java Maven"`を付けて実行する
3. `ExecutionApp.java`の表示メッセージを書き換える
4. もう一度実行して、結果が変わることを確認する

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
