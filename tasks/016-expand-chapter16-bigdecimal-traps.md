# タスク: 16章にBigDecimalの罠と数値変換の注意を追加する

## 背景

`BigDecimal`は扱っているが、`new BigDecimal(0.1)`の罠を明示する必要がある。

## 対象

- `docs/16-numbers/README.md`
- `docs/16-numbers/examples/`

## 修正内容

- `new BigDecimal(0.1)`と`new BigDecimal("0.1")`を比較する。
- `BigDecimal.valueOf(0.1)`の位置づけを説明する。
- `double`誤差、キャスト、小数切り捨ての注意を補強する。

## 完了条件

- 金額計算で`double`を避ける理由が分かる。
- `BigDecimal`の安全な作り方が説明されている。
