# 17章 クラスの拡張継承

この章では、既存クラスをもとに新しいクラスを作る拡張継承を学びます。継承は便利ですが、親子関係が強く結び付くため、「本当にis-a関係か」を考えてから使います。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- 継承とオーバーライドの基本を説明できる
- is-a関係を使って継承の妥当性を判断できる
- 継承より委譲が向く場面を説明できる

## 17-1 拡張継承

継承を使うと、共通するフィールドやメソッドを親クラスへまとめられます。子クラスは親クラスとして扱えるため、`Lesson[]`の中に`ReadingLesson`や`VideoLesson`を一緒に入れられます。

この「子クラスを親クラスとして扱える」性質をポリモーフィズムと呼びます。実行時には実際の子クラスのメソッドが呼ばれるため、同じ`lesson.category()`でも結果が変わります。

## 17-2 拡張継承の構文

`extends`で親クラスを指定します。子クラスは親クラスのメソッドを引き継ぎ、必要に応じて上書きできます。上書きはオーバーライドと呼び、`@Override`を付けるとメソッド名の間違いをコンパイラが見つけてくれます。

親クラスの処理を使いたいときは`super.describe()`のように`super`を使います。

## 17-3 インタフェース自体の拡張継承

インタフェースも`extends`で別のインタフェースを拡張できます。サンプルの`DisplayNamed`は`Named`を拡張し、`name()`を使った既定の表示メソッドを持ちます。

## 17-4 拡張継承の制御

`final`クラスは継承できません。`sealed`を使うと、継承できるクラスを限定できます。

初学者のうちは、共通処理をまとめたいだけなら継承よりも「部品として持つ」設計も候補にしてください。たとえば`Lesson`が`Formatter`を持つ形なら、親子関係を増やさずに振る舞いを差し替えられます。

## 実行して確認する

```bash
cd docs/17-inheritance/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/17-inheritance/examples java mvn compile exec:java
```

## ハンズオン

1. `VideoLesson`の`category()`の戻り値を変え、同じ`Lesson[]`のループで出力が変わることを確認してください。
2. `@Override`を外してメソッド名を`catgory`のように間違えると、どんな問題が起きるか考えてください。
3. 新しい`QuizLesson`を追加し、親クラスとして同じ配列で扱えることを確認してください。

## 理解チェック

1. 継承が向いているis-a関係とは何ですか？
2. オーバーライドでは何を変更できますか？
3. 継承より委譲を選ぶのはどんな場面ですか？

## 参考資料

公式:

- [Java Language Specification, Java SE 21 Edition: 8.1.4 Superclasses and Subclasses](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.4)
- [Java Language Specification, Java SE 21 Edition: 8.4.8 Inheritance, Overriding, and Hiding](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.8)
- [Java Language Specification, Java SE 21 Edition: 9.1.3 Superinterfaces and Subinterfaces](https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.1.3)

補助:

- なし
