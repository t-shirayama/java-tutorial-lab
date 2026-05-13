# 13章 Javaプログラムの実行と制御構造

この章では、プログラムの入口である`main`メソッドと、条件分岐、`switch`、繰り返し、ジャンプを学びます。

## 13-1 Javaプログラムの実行

Javaアプリケーションは、通常`public static void main(String[] args)`から始まります。

## 13-2 java.lang.Systemクラス

`System.out.println`は標準出力へ文字列を表示します。`System.getProperty`で実行環境の情報も取得できます。

## 13-3 条件分岐

`if`文で条件によって処理を分けます。

## 13-4 switch構文

`switch`式や`switch`文で、値に応じた分岐を書けます。

## 13-5 繰り返し

`for`、拡張for、`while`で繰り返し処理を書きます。

## 13-6 ジャンプ

`break`は繰り返しを抜け、`continue`は次の繰り返しへ進みます。

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

`score`や`topics`を変えて、`if`、`switch`、`break`の動きがどう変わるか確認してください。

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 14.9 The if Statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9)
- [Java Language Specification, Java SE 21 Edition: 14.11 The switch Statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11)
- [Java SE 21 API: System](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/System.html)

補助:

- なし
