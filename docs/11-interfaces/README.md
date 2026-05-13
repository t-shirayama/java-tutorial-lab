# 11章 インタフェース

この章では、クラスが提供する機能の約束を表すインタフェースを学びます。インタフェースを使うと、実装クラスを切り替えやすくなります。

インタフェースは「何ができるか」を表し、クラスは「どう実現するか」を書きます。この分離ができると、呼び出す側のコードを変えずに実装だけを差し替えられます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- インタフェースを約束として説明できる
- 実装クラスを差し替えやすい設計を説明できる
- 関数型インタフェースとラムダ式の関係を説明できる

## 11-1 インタフェースとは

インタフェースは、クラスが持つべきメソッドの約束です。

例えば通知機能なら、呼び出す側は「通知する」ことだけを知っていれば十分です。画面に出すのか、メモリに保存するのか、メールで送るのかは実装クラスへ任せられます。

## 11-2 インタフェース宣言

`interface`で宣言します。抽象メソッドだけでなく、`default`メソッドや`static`メソッドも持てます。

```java
interface Notifier {
    void notify(String message);

    default void notifyStart() {
        notify("学習を開始します");
    }
}
```

`default`メソッドは、実装クラスに共通の処理をインタフェース側へ置きたいときに使います。

## 11-3 インタフェースと実装クラス

クラスは`implements`でインタフェースを実装します。

同じ`Notifier`型として扱えるため、呼び出し側は具象クラス名に強く依存しません。

```java
Notifier notifier = new ConsoleNotifier();
notifier.notify("hello");
```

## 11-4 関数型インタフェース

抽象メソッドが1つだけのインタフェースは、ラムダ式の対象にできます。

`@FunctionalInterface`を付けると、抽象メソッドが2つ以上になったときにコンパイルエラーで気づけます。

## 11-5 多重継承

Javaのクラスは複数のクラスを継承できませんが、複数のインタフェースを実装できます。

複数の能力を組み合わせたい場合は、インタフェースを小さく分けます。例えば`Notifier`と`Reportable`を別々に用意すると、「通知できる」「レポートできる」を独立して表せます。

## 11-6 インタフェースの設計

実装の詳細ではなく、利用者が必要とする操作を名前にします。

設計するときは、次の順に考えるとまとまりやすいです。

1. 呼び出す側が本当に必要な操作を1つ選ぶ。
2. 具体的な出力先や保存方法を名前に入れない。
3. 最初は小さく作り、必要になってからメソッドを増やす。

## この章の全体コード例

本文中の短いコード例は、実行できる [InterfacesApp.java](examples/src/main/java/lab/interfacesdemo/InterfacesApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/11-interfaces/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/11-interfaces/examples java mvn compile exec:java
```

期待される出力例:

```text
ConsoleNotifier: 学習を開始します
MemoryNotifier: ...
```

## ハンズオン

1. `ConsoleNotifier`とは別の実装クラスを追加し、同じ`Notifier`型として使えることを確認してください。
2. サンプルの`MemoryNotifier`へ複数回通知し、保存されたメッセージ一覧を表示してください。
3. `Formatter`ラムダ式を変えて、通知メッセージの形を変更してください。
4. `Notifier`へ抽象メソッドを追加してみて、実装クラス側に修正が必要になることを確認してください。その後、元に戻してください。

## よくあるエラー

### defaultメソッドに処理を詰め込みすぎる

`default`メソッドは便利ですが、実装の詳細を入れすぎるとインタフェースが重くなります。共通処理が本当にすべての実装に合うか確認します。

## 練習問題

### Level 1

実装クラスを切り替えて出力を確認してください。

### Level 2

新しい`Notifier`実装を1つ追加してください。

### Level 3

呼び出し側が具象クラス名を知らない形に整理してください。

## 理解チェック

1. インタフェースは何を表す約束ですか？
2. 呼び出し側がインタフェースに依存すると何が嬉しいですか？
3. `@FunctionalInterface`を付ける利点は何ですか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: Chapter 9 Interfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html)
- [Java SE 21 API: FunctionalInterface](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/FunctionalInterface.html)

補助:

- なし
