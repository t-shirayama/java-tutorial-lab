# 22章 Web技術

この章では、Java標準APIでHTTP通信と簡単なデータ処理を行う方法を学びます。

## 22-1 HTTPクライアント処理

`java.net.http.HttpClient`を使うと、HTTPリクエストを送れます。`HttpRequest`でリクエストを作り、`HttpResponse`でレスポンスを受け取ります。

## 22-2 データ処理（JSON、XML、CSV、zip）

Java標準APIにはCSVやJSON専用の高水準APIはありません。実務ではライブラリを使うことが多いですが、この章では標準APIだけでCSV風の分割とzip作成を確認します。

## 実行して確認する

```bash
cd docs/22-web-technologies/examples
mvn compile exec:java
```

Dockerで実行する場合:

```bash
docker compose up -d --build
docker compose exec -w /workspace/docs/22-web-technologies/examples java mvn compile exec:java
```

## ハンズオン

HTTPリクエストのURIやCSV文字列を変えて、生成される値を確認してください。ネットワーク通信は環境に依存するため、サンプルではリクエスト作成までを主に確認します。

## 参考資料

公式:

- [Java SE 21 API: HttpClient](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html)
- [Java SE 21 API: HttpRequest](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.html)
- [Java SE 21 API: ZipOutputStream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/zip/ZipOutputStream.html)

補助:

- なし
