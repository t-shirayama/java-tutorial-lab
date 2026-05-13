# 28章 Java基礎の次に学ぶこと

この章では、Java基礎を終えたあとに進める学習テーマを整理します。すべてを一度に学ぶ必要はありません。作りたいものに合わせて選びます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- Webアプリ、実務開発、並行処理など次の学習ルートを選べる
- Spring BootやJUnitなど、次に調べる公式情報へ進める
- Java基礎で学んだ内容が実務のどこにつながるか説明できる

## Webアプリを作りたい場合

JavaでWebアプリを作るなら、Spring Bootへ進むのが自然です。

次に学ぶ候補:

- Spring Boot
- REST API
- JSON
- データベース
- JPA
- 入力バリデーション

まずは、HTTPリクエストを受け取り、JSONを返す小さなREST APIから始めると学びやすいです。JSONやHTTPの入口は[26章 Web技術](../26-web-technologies/)でも扱っています。

## 実務開発に進みたい場合

実務では、コードを書くだけでなく、変更を安全に進めるための道具も重要です。

次に学ぶ候補:

- Git / GitHub
- JUnit
- Mockito
- ログ
- 設計原則
- コードレビュー
- CI

JUnitの入口は[22章 実務入口](../22-practical-basics/)と[23章 総合演習](../23-capstone-task-cli/)で扱っています。次は、異常系テストやモックを使ったテストへ進むとよいです。

## 並行処理を深めたい場合

並行処理を深める場合は、まず共有状態を減らす設計を意識します。そのうえで、必要なAPIを少しずつ学びます。

次に学ぶ候補:

- ExecutorService
- CompletableFuture
- Structured Concurrency
- 仮想スレッド
- スレッドセーフなコレクション

仮想スレッドの入口は[24章 スレッド](../24-threads/)、共有データの注意は[25章 同時実行制御](../25-concurrency-control/)で扱っています。

## 公式資料への入口

公式資料は、最初は難しく見えます。すべてを読むのではなく、「今使っているAPIのページを確認する」ことから始めると続けやすいです。

## 次に作ってみるもの

Javaの基礎を学んだら、次は小さな成果物を作ると理解が定着します。最初から大きなアプリを作る必要はありません。小さく作り、動かし、テストを書き、少しずつ機能を足していくことが大切です。

### Webアプリに進みたい場合

- タスク管理API
- 書籍メモAPI
- 家計簿API
- 学習記録API

まずは、作成、一覧、更新、削除ができる小さなREST APIを作るとよいです。

### 実務開発に進みたい場合

- JUnitでテスト付きの計算ライブラリ
- CSVを読み込んで集計するCLI
- ログを出しながらファイルを処理するバッチ
- GitHub Actionsでテストを自動実行する小さなプロジェクト

### 並行処理を深めたい場合

- 複数URLへHTTPリクエストするプログラム
- 大量ファイルを並列に処理するCLI
- ExecutorServiceとFutureを使った非同期処理の練習
- 仮想スレッドでHTTP処理を並行実行するサンプル

## 実行方法

この章は読み物ページです。Mavenで実行するサンプルコードはありません。関連章へのリンクをたどりながら復習してください。

## 理解チェック

1. Webアプリを作りたい場合、次にどの技術を学ぶとよいですか？
2. 実務開発では、JUnit以外にどんな道具が役立ちますか？
3. 並行処理を深める前に、共有状態について何を考えるべきですか？

## 参考資料

公式:

- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Framework Reference Documentation](https://docs.spring.io/spring-framework/reference/)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Git Documentation](https://git-scm.com/doc)
- [OpenJDK JEP 444: Virtual Threads](https://openjdk.org/jeps/444)

補助:

- なし
