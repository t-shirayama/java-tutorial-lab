# Java Tutorial Site Guard

このskillは、JavaチュートリアルのサイトUI、Markdownレンダリング、ナビゲーション、リンク解決を変更するときに使います。

## 使うタイミング

- `src/content.ts` のMarkdown変換、リンク正規化、見出しID生成を変更するとき。
- `src/main.tsx` のルーティング、サイドメニュー、章・節ナビゲーション、スクロール処理を変更するとき。
- `src/styles.css` のレイアウト、サイドバー、Markdown本文、コードブロック表示を変更するとき。
- `tests/e2e/layout.spec.ts` のUI回帰テストを追加・修正するとき。

## 守ること

- 章遷移では、前ページのスクロール位置を保持しない。遷移時はアニメーションなしでトップへ戻す。
- ページ内の節リンクや現在節ハイライトを壊さない。`scroll-behavior: smooth` を変える場合は、章遷移と節移動の両方を確認する。
- サイドメニューは閉じられる状態、復元できる状態、本文と重ならない状態を保つ。
- 現在章だけでなく、スクロール位置に近い節がサイドメニューで分かる状態を保つ。
- Markdownの相対リンクは、アプリ内章・用語集ならhash routeへ、サンプルファイルなど実ファイルならGitHub blob URLへ解決する。`Not Found`になるリンクを残さない。
- README本文で案内したファイル名、実行コマンド、期待出力は実ファイルと一致させる。

## 変更前に見るファイル

- `src/content.ts`
- `src/main.tsx`
- `src/styles.css`
- `tests/e2e/layout.spec.ts`
- `playwright.config.ts`

## 確認コマンド

通常のUI・Markdown変更後:

```sh
npm run build
npm run test:e2e:layout
```

リンク解決、サイドメニュー、スクロールだけを触った場合でも、少なくとも該当E2Eを絞って実行する:

```sh
npm run test:e2e:layout -- -g "markdown links|sidebar|chapter navigation"
```

## よくある落とし穴

- CSSの `html { scroll-behavior: smooth; }` があるため、`window.scrollTo({ behavior: "auto" })` だけでは遷移時に滑らかに動く場合がある。章遷移では一時的にsmoothを無効化してからトップへ戻す。
- サイドバーの開閉はCSS transitionの途中で寸法を読むとテストが不安定になる。Playwrightでは `expect.poll` で最終状態を待つ。
- Markdown内の `../` や `./examples/...` は、ブラウザ上の現在URLではなく元READMEの場所を基準に解決する。
- GitHub ActionsやローカルのNodeバージョン差でVite警告が出る場合がある。ビルド失敗と警告を分けて扱う。
