# 14章 例外処理

この章では、エラーが起きたときにプログラムをどう扱うかを学びます。Javaでは、通常の処理と異常時の処理を分けるために例外を使います。

例外処理の目的は、失敗をなかったことにすることではありません。「どこで失敗したか」「呼び出し元が回復できるか」「利用者へ何を伝えるか」をコードで表すことです。

ファイル入出力では例外処理が必要になります。実際のファイル読み書きは[25章 実務入口](../25-practical-basics/)で扱います。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- 例外の役割を説明できる
- try-catchとtry-with-resourcesを使い分けられる
- 例外メッセージと例外設計の基本を説明できる

## 14-1 エラーと例外

例外は、処理を続けられない状況を呼び出し元へ伝える仕組みです。

Javaでは、例外は大きくチェック例外と非チェック例外に分けて考えます。チェック例外はメソッドの`throws`や`try-catch`で扱う必要があり、非チェック例外は主にプログラムの前提違反を表します。

## 14-2 例外の捕捉

`try-catch`で例外を捕捉し、回復やメッセージ表示を行います。

```java
try {
    int score = parseScore("invalid");
} catch (InvalidScoreException exception) {
    System.out.println(exception.getMessage());
}
```

`catch`では、ただ握りつぶすのではなく、ログ出力、代替値、利用者向けメッセージなど「次に何をするか」を書きます。

避けたい例:

```java
try {
    int score = parseScore(input);
} catch (Exception exception) {
    // 何もしない
}
```

この書き方だと、何が起きたのか利用者にも開発者にも伝わりません。少なくとも原因を記録する、代替値を返す、呼び出し元へ伝え直す、のどれかを選びます。

## 14-3 try-with-resources文

`AutoCloseable`を実装したリソースは、try-with-resourcesで自動的に閉じられます。

ファイル、ネットワーク接続、データベース接続のように、使い終わったら閉じる必要があるものに向いています。サンプルでは小さな`StudyResource`で、`close`が呼ばれる順序を確認します。

`finally`でも後片付けは書けますが、閉じ忘れや例外時の分岐が複雑になりがちです。リソースが`AutoCloseable`なら、まずtry-with-resourcesを検討します。

```java
try (StudyResource resource = new StudyResource("file")) {
    resource.use();
}
```

## 14-4 例外の送出

`throw`で例外を送出できます。

例外を送出すると、現在の通常処理はそこで止まり、近い`catch`を探します。入力値が不正で処理を続けられない場合などに使います。

## 14-5 例外クラス

標準例外だけでなく、自分で例外クラスを作ることもできます。

独自例外は、呼び出し側が「どの種類の失敗か」を区別したいときに有効です。ただし、何でも独自例外にするのではなく、標準例外で十分な場合は標準例外を使います。

例えば、引数が不正なら`IllegalArgumentException`で十分なことが多いです。一方、学習スコアの入力エラーを画面で特別に扱いたいなら、`InvalidScoreException`のような独自例外にすると呼び出し側で区別できます。

## 14-6 throws節

メソッドがチェック例外を送出する可能性があるとき、`throws`で宣言します。

`throws`は「このメソッドを呼ぶ側が、失敗の可能性を考える必要がある」というサインです。メソッドの契約の一部として読みます。

## 14-7 契約によるデザイン（assert）

`assert`は、開発中の前提条件確認に使えます。実行時に有効化しないと評価されません。

`assert`はユーザー入力の検証には使いません。開発者が「ここまで来たなら必ず成り立つはず」と考える内部条件を確認する用途に向いています。

## 14-8 例外の設計

例外は「呼び出し元がどう対処できるか」を考えて設計します。

迷ったら、次の観点で選びます。

1. 呼び出し元が回復できる失敗なら、例外の種類とメッセージを明確にする。
2. プログラムの前提違反なら、`IllegalArgumentException`など標準の非チェック例外を検討する。
3. 例外メッセージには、調査に必要な値や状況を短く含める。
4. `catch (Exception e)`で広く捕まえすぎない。

チェック例外と非チェック例外は、次のように考えると整理しやすいです。

| 種類 | 例 | 使いどころ |
| --- | --- | --- |
| チェック例外 | `IOException` | ファイルやネットワークなど、呼び出し側が失敗を扱うべき処理 |
| 非チェック例外 | `IllegalArgumentException`、`NullPointerException` | プログラムの前提違反やバグに近いもの |

例外メッセージには「何が」「どの値で」失敗したかを書きます。`"error"`だけでは調査できません。`"score must be 0..100: " + score`のように、原因へ近づける情報を含めます。

## 実行して確認する

```bash
cd docs/14-exceptions/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/14-exceptions/examples java mvn compile exec:java
```

期待される出力例:

```text
invalid score: ...
close: StudyResource
```

## ハンズオン

1. 数値文字列を不正な値に変え、`catch`がどのように動くか確認してください。
2. `parseScore("-1")`を呼び出し、範囲外の値を独自例外にする処理を追加してください。
3. `StudyResource`の`use`で例外を送出し、それでも`close`が呼ばれることを確認してください。
4. 広い`catch (Exception exception)`へ一度書き換えたあと、何が分かりにくくなるかを確認し、元に戻してください。

## よくあるエラー

### 例外を握りつぶす

```java
try {
    readConfig();
} catch (Exception e) {
    // 何もしない
}
```

原因が分からなくなります。少なくともログに残す、代替値を返す、呼び出し元へ伝え直す、のどれかを選びます。

## 練習問題

### Level 1

不正な入力値を変えて例外メッセージを確認してください。

### Level 2

独自例外を投げる条件を1つ追加してください。

### Level 3

try-with-resourcesで必ず閉じる小さな処理を作ってください。

## 理解チェック

1. チェック例外と非チェック例外はどう違いますか？
2. 例外を握りつぶすと何が問題ですか？
3. try-with-resourcesはどんな場面で使いますか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 11 Exceptions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html)
- [Java Language Specification, Java SE 21 Edition: 14.20 The try statement](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20)
- [Java SE 21 API: Exception](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Exception.html)

補助:

- なし
