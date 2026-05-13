# 26章 Web技術

この章では、Java標準APIでHTTP通信と簡単なデータ処理を行う方法を学びます。あわせて、JSONのような実務でよく使う形式では、標準APIだけで頑張りすぎない判断も学びます。

## この章でできるようになること

この章を終えると、次のことができるようになります。

- HttpClient、HttpRequest、HttpResponseの役割を説明できる
- CSVやzipなど標準APIで扱える範囲を説明できる
- JSONライブラリを使う判断基準を説明できる

## 26-1 HTTPクライアント処理

`java.net.http.HttpClient`を使うと、HTTPリクエストを送れます。`HttpRequest`でリクエストを作り、`HttpResponse`でレスポンスを受け取ります。

この章のサンプルは、ネットワーク環境に左右されないように、実際の送信ではなくリクエスト作成を中心に確認します。

## 26-2 データ処理（JSON、XML、CSV、zip）

Java標準APIにはCSVやJSON専用の高水準APIはありません。実務ではライブラリを使うことが多いですが、この章では標準APIだけでCSV風の分割、簡単なJSON風文字列、zip作成を確認します。

## 26-3 JSONライブラリの考え方

サンプルの`toTinyJson`は、学習用に小さなJSON風文字列を作るだけです。文字列に`"`や改行が入る場合のエスケープ、配列、ネストしたオブジェクト、日付形式などを正しく扱うには不十分です。

実務では、Jackson、Gson、JSON-Bなどのライブラリを検討します。選ぶときは、プロジェクトで使っているフレームワークとの相性、メンテナンス状況、日付やnullの扱い、セキュリティアップデートの追従しやすさを見ます。

Springを使うプロジェクトではJacksonが標準的に組み込まれることが多いです。一方、このチュートリアルでは標準APIの範囲を確認するため、外部JSONライブラリは追加していません。

HTTPでは、レスポンス本文だけでなくステータスコードも重要です。`200`番台は成功、`400`番台はクライアント側のリクエスト問題、`500`番台はサーバー側の問題を表すことが多いです。また、実務では接続や読み取りのタイムアウトを設定し、待ち続けないようにします。

外部ライブラリを使う場合は、Mavenの`pom.xml`へ依存関係を追加します。JSON処理ではJackson、Gson、JSON-Bなどが候補になりますが、プロジェクトのフレームワークとの相性とメンテナンス状況を確認します。

## この章の全体コード例

本文中の短いコード例は、実行できる [WebTechnologiesApp.java](examples/src/main/java/lab/webtechnologies/WebTechnologiesApp.java) にまとまっています。まずこのファイルを上から読み、次に本文の各節へ戻ると、断片的な説明が1つの流れとしてつながります。

読むときの観点:

- `main`メソッドが、どの順番でサンプル処理を呼び出しているか
- 章で学ぶ型やメソッドが、実際のクラスのどこで使われているか
- 値を変えたときに、どの出力が変わるか

## 実行して確認する

```bash
cd docs/26-web-technologies/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/26-web-technologies/examples java mvn compile exec:java
```

期待される出力例:

```text
request method: GET
client class: ...
zip bytes: ...
```

## ハンズオン

1. HTTPリクエストのURIを変えて、`request.method()`や`client class`の出力を確認してください。
2. CSV文字列に列を追加し、`split(",")`だけでは複雑なCSVを扱いきれない場面を考えてください。
3. `lesson`のタイトルに`Java "Basic"`のような引用符を入れ、手作りJSONの危うさを確認してください。

## よくあるエラー

### 手作りJSONで実務データを扱ってしまう

引用符、改行、ネスト、日付、nullを正しく扱うのは難しいため、実務ではJacksonなどのJSONライブラリを検討します。

## 練習問題

### Level 1

URIやHTTPメソッドを変えてリクエスト内容を確認してください。

### Level 2

HTTPステータスコードの意味を3つ調べてください。

### Level 3

手作りJSONの危うさを説明し、ライブラリを使う場面を整理してください。

## 理解チェック

1. HttpClientは何をするAPIですか？
2. HTTPステータスコードは何を表しますか？
3. 実務でJSONライブラリを検討する理由は何ですか？

## 参考資料

公式:

- [Java SE 21 API: HttpClient](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html)
- [Java SE 21 API: HttpRequest](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.html)
- [Java SE 21 API: ZipOutputStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/zip/ZipOutputStream.html)
- [Spring Framework Reference: HTTP Message Conversion](https://docs.spring.io/spring-framework/reference/web/webmvc/message-converters.html)

補助:

- なし
