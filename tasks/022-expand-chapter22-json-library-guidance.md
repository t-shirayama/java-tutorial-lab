# タスク: 22章にJSONライブラリとMaven依存関係への導線を追加する

## 背景

標準APIにJSON高水準APIがないと説明しているため、実務で使うJackson/Gsonなどへの導線が必要。

## 対象

- `docs/22-web-technologies/README.md`
- `docs/22-web-technologies/examples/`

## 修正内容

- Java標準APIだけで扱う範囲と限界を明確にする。
- Jackson/Gsonなど外部ライブラリの選択肢を補足する。
- Maven依存関係を追加する章またはタスクへの導線を入れる。
- HTTPステータス、ヘッダー、タイムアウトの基本を追加する。

## 完了条件

- JSONを実務で扱うには外部ライブラリが自然だと分かる。
- 標準APIサンプルの範囲が誤解されない。
