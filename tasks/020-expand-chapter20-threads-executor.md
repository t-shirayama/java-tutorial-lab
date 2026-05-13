# タスク: 20章にExecutorService・Future・join・割り込みを追加する

## 背景

仮想スレッドに触れているのは良いが、初学者にはスレッド実行の基本部品が不足している。

## 対象

- `docs/20-threads/README.md`
- `docs/20-threads/examples/`

## 修正内容

- `Thread`、`join`、`sleep`、割り込みの基本を説明する。
- `ExecutorService`と`Future`の入口を追加する。
- 仮想スレッドとプラットフォームスレッドの違いを表で説明する。

## 完了条件

- 並行実行の開始と待機の流れを説明できる。
- 仮想スレッドの位置づけがJDK 21として正確である。
