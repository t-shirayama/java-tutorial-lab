# 16章 数値

この章では、整数以外の数値や、正確な計算が必要な場面で使うクラスを学びます。

## 16-1 浮動小数点数

`double`は小数を扱えますが、2進数で表すため10進小数を常に正確に表せるわけではありません。

## 16-2 型変換

数値型同士の変換では、範囲や小数部の扱いに注意します。

## 16-3 数値クラス（数値ラッパークラス）

`Integer`、`Long`、`Double`などは基本型に対応するクラスです。

## 16-4 ビット演算

`&`、`|`、`^`、`<<`などでビット単位の演算ができます。

## 16-5 BigIntegerとBigDecimal

大きな整数には`BigInteger`、10進数として正確に扱いたい値には`BigDecimal`を使えます。

## 実行して確認する

```bash
cd docs/16-numbers/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/16-numbers/examples java mvn compile exec:java
```

## ハンズオン

`BigDecimal`を`new BigDecimal("0.1")`から作る場合と`BigDecimal.valueOf(0.1)`の場合を比べてみてください。

## 参考資料

公式:

- [Java SE 21 API: BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html)
- [Java SE 21 API: BigDecimal](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html)
- [Java Language Specification, Java SE 21 Edition: 4.2 Primitive Types and Values](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2)

補助:

- なし
