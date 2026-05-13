# タスク: 9章にfor文・ラムダ式・メソッド参照の比較を強化する

## 背景

ラムダ式とメソッド参照は、初学者が丸暗記しやすい箇所です。`for`文から段階的に対応づけることで、`System.out::println`の意味を理解しやすくします。

## 対象

- `docs/09-method-references-and-lambdas/README.md`
- 必要に応じて `docs/09-method-references-and-lambdas/examples/`

## 修正内容

- `for (String name : names)`、`names.forEach(name -> ...)`、`names.forEach(System.out::println)` の比較を本文に入れる。
- 3つが同じ処理を表すことを説明する。
- メソッド参照は「短くするため」だけでなく「意味が読みやすい場合に使う」ことを補足する。
- 既に類似内容がある場合は、重複を避けて見出しや説明を整える。

## 完了条件

- 初学者がラムダ式とメソッド参照の関係を説明できる。
- 10章Streamへ自然につながる説明になっている。
- HTML生成後に比較コードが読みやすい。
