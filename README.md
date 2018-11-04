# tagzuke

日本古辞書の注文をマークアップするツール

## 紹介

部首分類体の日本古辞書の項目構造は、掲出字と注文からなるが、注文は大別して音注、意義注、字体注、和訓の4つの要素からなる。さらにこの4要素には多様な形式で注記が施され、それぞれの要素に数種のタイプが認められる。したがって、日本古辞書のデータベース化には、項目構造の多様性に対応したマークアップ・ツールの開発が求められる。tagzukeは、[HDICプロジェクト](http://hdic.jp)が公開予定である観智院本『類聚名義抄』テキストデータベースを対象にして開発した日本古辞書マークアップ・ツールである。

## 利用方法

[臨時サーバー: http://35.185.29.101/](http://35.185.29.101/)

~~[https://toyjack.github.io/tagzuke/](https://toyjack.github.io/tagzuke/)へアクセスください。~~

## 論文

* [劉冠偉. 日本古辞書マークアップ・ツールtagzukeの課題-操作性・汎用性・維持性の改良-. 研究報告人文科学とコンピュータ, 2018-CH-117(11), pp. 1-4, 2018年5月.](http://id.nii.ac.jp/1001/00187427/)

* [劉冠偉, 李媛, 鄭門鎬, 張馨方, 池田証壽. 部首分類体日本古辞書の項目構造の多様性に対応したマークアップ・ツールの開発. じんもんこん2017論文集, 2017(2), pp. 97-102, 2017年12月.](http://id.nii.ac.jp/1001/00184642/)

## 参加

```bash
git clone https://github.com/toyjack/tagzuke.git
cd tagzuke
npm install
npm run dev
```

## リンク

HDICプロジェクト：[http://hdic.jp](http://hdic.jp)

HDIC公開テキストデータベース：[https://github.com/shikeda/HDIC.git](https://github.com/shikeda/HDIC.git)

HDIC Viewer: [https://hdic2.let.hokudai.ac.jp/](https://hdic2.let.hokudai.ac.jp/)

## ライセンス

MIT License
