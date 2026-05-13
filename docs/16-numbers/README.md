# 16章 数値

この章では、整数以外の数値や、正確な計算が必要な場面で使うクラスを学びます。特に、`double`で小数を扱う場合と、`BigDecimal`で10進数を扱う場合の違いを手を動かして確認します。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- doubleの誤差を説明できる
- BigDecimalを文字列から作る理由を説明できる
- 金額計算で避けるべき書き方を判断できる

## 16-1 浮動小数点数

`double`は小数を扱えますが、2進数で表すため10進小数を常に正確に表せるわけではありません。たとえば`0.1 + 0.2`が、数学で期待する`0.3`ぴったりに表示されないことがあります。

測定値や近似値なら`double`が便利です。一方で、金額や数量のように10進数としての正確さが必要な値では`BigDecimal`を検討します。

## 16-2 型変換

数値型同士の変換では、範囲や小数部の扱いに注意します。`(int) 12.9`のようなキャストでは、小数部は四捨五入ではなく切り捨てられます。

## 16-3 数値クラス（数値ラッパークラス）

`Integer`、`Long`、`Double`などは基本型に対応するクラスです。

## 16-4 ビット演算

`&`、`|`、`^`、`<<`などでビット単位の演算ができます。

## 16-5 BigIntegerとBigDecimal

大きな整数には`BigInteger`、10進数として正確に扱いたい値には`BigDecimal`を使えます。

`BigDecimal`で小数を書きたいときは、`new BigDecimal("0.1")`のように文字列から作ると、10進数の`0.1`として扱えます。`new BigDecimal(0.1)`は、すでに`double`として近似された値から作るため、意図しない細かい誤差が見えます。

割り切れない割り算では、桁数と丸め方を指定します。サンプルの`RoundingMode.HALF_UP`は、一般的な四捨五入に近い丸め方です。

## この章の全体コード例

本文中の短いコード例は、実行できる [NumbersApp.java](examples/src/main/java/lab/numbers/NumbersApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

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

期待される出力例:

```text
0.1 + 0.2 = ...
BigDecimal: 0.3
```

## ハンズオン

1. `new BigDecimal("0.1")`、`new BigDecimal(0.1)`、`BigDecimal.valueOf(0.1)`の出力を比べてください。
2. `BigDecimal.ONE.divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP)`の桁数を`3`や`4`に変えてください。
3. `RoundingMode.HALF_UP`を`DOWN`や`CEILING`に変え、丸め結果の違いを確認してください。

## よくあるエラー

### BigDecimalをdoubleから作ってしまう

`new BigDecimal(0.1)`のように書くと、`double`の誤差を含んだ値から作られます。金額のような値は文字列から作ります。

## 練習問題

### Level 1

`double`の計算値を変えて誤差を確認してください。

### Level 2

`BigDecimal`を文字列から作る例を追加してください。

### Level 3

税込価格を計算する小さなメソッドを作ってください。

## 理解チェック

1. `0.1 + 0.2`で誤差が出ることがある理由は何ですか？
2. BigDecimalを文字列から作る理由は何ですか？
3. 金額計算で`double`を避ける理由は何ですか？

## 参考資料

公式:

- [Java SE 21 API: BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html)
- [Java SE 21 API: BigDecimal](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html)
- [Java SE 21 API: RoundingMode](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/RoundingMode.html)
- [Java Language Specification, Java SE 21 Edition: 4.2 Primitive Types and Values](https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2)

補助:

- なし
