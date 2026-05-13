# 7章 データ

この章では、Javaでデータを表す方法を学びます。プログラムでは、文字列や数値をそのまま扱うだけでなく、「記事」「読書状態」「教材」のような意味のあるまとまりとしてデータを扱うことがよくあります。

Java 21では、通常のクラスに加えて、データを簡潔に表す`record`、決まった候補を表す`enum`、継承できる型を制限する`sealed`を使えます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- record、enum、sealed classの用途を説明できる
- 文字列定数よりenumが安全な場面を説明できる
- データを表す型を目的に応じて選べる

## この章で学ぶこと

- データをオブジェクトとしてまとめる考え方
- `record`で読み取り中心のデータを表す方法
- 定数を名前付きで管理する考え方
- `enum`で決まった候補を表す方法
- `sealed`で型の種類を制限する方法

## 7-1 データとオブジェクト

データは、ただの値の集まりではありません。値に名前と意味を与えることで、コードの意図が読みやすくなります。

```java
String title = "Java入門";
int minutes = 30;
```

このままでも動きますが、値が増えると何を表しているか追いづらくなります。そこで、クラスや`record`を使って、関連する値をひとまとまりにします。

## 7-2 レコードクラス

`record`は、データを持つためのクラスを簡潔に書く仕組みです。

```java
public record Article(String title, int readingMinutes) {
}
```

この宣言だけで、コンストラクタ、値を取り出すメソッド、`toString`、`equals`、`hashCode`が自動的に用意されます。読み取り中心の小さなデータを表すときに向いています。

`record`の要素は、レコードコンポーネントと呼ばれます。上の例では、`title`と`readingMinutes`がレコードコンポーネントです。

`record`は万能な省略記法ではありません。値を何度も変更するオブジェクトや、複雑な状態遷移を持つオブジェクトには、通常のクラスのほうが向いていることがあります。

## 7-3 定数定義

定数とは、プログラムの中で変えない値に名前を付けたものです。Javaでは、`static final`を使って定数を表すことがあります。

```java
public static final int DEFAULT_READING_MINUTES = 30;
```

同じ値を何度も直接書くより、名前付きの定数にすると、値の意味が分かりやすくなります。

## 7-4 enum型

`enum`は、決まった候補の中から値を選ぶための型です。

```java
public enum ReadingStatus {
    NOT_STARTED,
    READING,
    FINISHED
}
```

文字列で`"READING"`と書くこともできますが、文字列ではタイプミスに気づきにくくなります。`enum`を使うと、選べる値を型として表せます。

たとえば`"READNIG"`のように打ち間違えても、文字列ならコンパイルは通ってしまいます。`ReadingStatus.READING`のように`enum`で書くと、存在しない候補はコンパイル時に検出できます。

## 7-5 シール型

`sealed`は、その型を継承または実装できるクラスを制限する仕組みです。

```java
public sealed interface LearningMaterial permits BookMaterial, VideoMaterial {
}
```

この例では、`LearningMaterial`を実装できるのは`BookMaterial`と`VideoMaterial`だけです。種類が決まっているデータを表したいときに役立ちます。

`sealed`を使うと、あとから知らない種類が勝手に増えないことをコードで表せます。データの種類を明確にしたい場面で便利です。

## 実行して確認する

ローカルにJavaとMavenを入れている場合:

```bash
cd docs/07-data/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/07-data/examples java mvn compile exec:java
```

使い終わってコンテナを止めたい場合:

```bash
docker compose down
```

期待される出力例:

```text
== レコードクラス ==
Article[title=Javaのデータ表現, readingMinutes=30]
title: Javaのデータ表現

== enum型 ==
status: READING
label: 読書中

== シール型 ==
書籍: Java基礎
動画: recordとenum
```

## ハンズオン

まずは、`Article`を作っている箇所でタイトルや読書時間を変えて、`toString`の出力が自動的に変わることを確認してください。

次に、`ReadingStatus`に`PAUSED`を追加し、`label`メソッドにも対応する表示を追加してください。

最後に、`LearningMaterial`を実装する新しい種類を追加しようとしてみてください。`permits`に書かれていない型はそのままでは実装できないことを確認します。

確認してほしいこと:

- `record`は読み取り中心のデータ表現を短く書ける
- `enum`は決まった候補を型として表せる
- `sealed`はデータの種類を制限できる

## 演習

Level 1: `Article`をもう1つ作り、`article.equals(otherArticle)`の結果を表示してください。`record`では同じコンポーネント値を持つものが等しいと判定されることを確認します。

Level 2: `ReadingStatus.PAUSED`を追加し、`label`メソッドに`"一時停止"`を返す分岐を追加してください。対応を忘れるとどうなるかも観察します。

Level 3: `AudioMaterial`を追加して、`LearningMaterial`の`permits`へ含める前と後でコンパイル結果がどう変わるか確認してください。`sealed`は「種類を増やす場所」を明確にする仕組みです。

使い分けの目安:

- 値をまとめて読み取り中心で扱うなら、まず`record`を検討します。
- 候補が固定されているなら、文字列より`enum`を優先します。
- データの種類を限定し、分岐漏れを減らしたいなら、`sealed`が候補になります。

## よくあるエラー

### 文字列で状態を表して打ち間違える

```java
String status = "don"; // done のつもり
```

決まった候補から選ぶ値は`enum`にすると、打ち間違いをコンパイル時に見つけやすくなります。

## 理解チェック

1. recordはどのようなデータに向いていますか？
2. enumを使うと文字列定数より安全になる理由は何ですか？
3. sealed classはどのような場面で使いますか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 8.10 Record Classes](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.10)
- [Java Language Specification, Java SE 21 Edition: 8.9 Enum Classes](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.9)
- [Java Language Specification, Java SE 21 Edition: 8.1.1.2 sealed, non-sealed, and final Classes](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.1.2)
- [Java Language Specification, Java SE 21 Edition: 9.1.1.4 sealed Interfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.1.1.4)
- [Java SE 21 API: Record](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html)
- [Java SE 21 API: Enum](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Enum.html)

補助:

- なし
