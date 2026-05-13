# タスク: 19章にPECSの覚え方と例を追加する

## 背景

`? extends T` と `? super T` は初心者にとって混乱しやすい構文です。PECSの覚え方を入れることで、実務コードのシグネチャを読みやすくします。

## 対象

- `docs/19-generics/README.md`
- 必要に応じて `docs/19-generics/examples/`

## 修正内容

- 「値を取り出して読むだけなら `? extends T`」を説明する。
- 「値を追加して受け取らせたいなら `? super T`」を説明する。
- Producer Extends, Consumer Super の意味を短く説明する。
- `sum(List<? extends Number>)` と `addIntegers(List<? super Integer>)` の例を追加または確認する。
- raw typeの危険性と型指定の安全性とのつながりを保つ。

## 完了条件

- `extends`と`super`の使い分けを一文で思い出せる。
- ジェネリクスを安全性の道具として説明できている。
