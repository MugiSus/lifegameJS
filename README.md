# lifegameJS
A lifegame which is using JS.

JSを使ったライフゲームです。(3作目)
- [1作目](https://www.mugisus.com/game_of_life)
  - 通常の2次元配列を使用。
  - 空間が有限なのでチューリング完全でない。
  - プログラムが本当に汚い。[^1]
  - O(n²)。
- [2作目](https://www.mugisus.com/game_of_life_inf)
  - 採れたての新鮮な連想配列を使用。
  - 理論上空間が無限なのでチューリング完全だけど、アルゴリズムが良くないので爆発的に重い。
  - プログラムが本当に汚い。[^2]
  - O(n²)。
- [3作目](https://www.mugisus.com/lifegameJS) ←これ
  - 産地直送で厳選された2次元の連想配列をふんだんに使用。
  - 理論上空間が無限なのでチューリング完全。アルゴリズムが良いので軽い。
  - プログラムがそこまで汚くない。[^3]
  - O(n)。

計算も速いしソースコードも随分と綺麗になったんじゃないですかね。あと趣味で書いたコードなので可読性には帰ってもらっています。

```js
cw(0, 0, 1);
cw(1, 1, 1);
cw(1, 2, 1);
cw(0, 2, 1);
cw(-1, 2, 1);

for (let i = 0; i < 100; i++) ep = e(ep);
```
これはグライダーを100世代動かすコードです。軽いのですぐです

実行結果はオブジェクトmに出てます。

```js
>>> m
<<< 22: {25: false, 26: false, 27: false}
    23: {24: false, 25: false, 26: false, 27: false, 28: false}
    24: {24: false, 25: false, 26: false, 27: true, 28: false}
    25: {24: false, 25: true, 26: false, 27: true, 28: false}
    26: {24: false, 25: false, 26: true, 27: true, 28: false}
    27: {25: false, 26: false, 27: false}
```
trueとfalseでわかりにくいですがちゃんと動いてますね。

図示するとこんな感じです。[^4]<br>
✖️◼️◼️◼️✖️<br>
◼️◼️◼️◼️◼️<br>
◼️◼️◼️◻️◼️<br>
◼️◻️◼️◻️◼️<br>
◼️◼️◻️◻️◼️<br>
✖️◼️◼️◼️✖️<br>
◻️は`true`、◼️は`false`、✖️のあるところは`undefined`です。

```js
cw(10, 10, 1);
cw(11, 10, 1);
cw(12, 10, 1);
cw(13, 10, 1);
cw(14, 10, 1);
cw(15, 10, 1);
cw(16, 10, 1);
cw(17, 10, 1);
cw(18, 10, 1);
cw(19, 10, 1);

ep = e(ep);
```
ちなみにこれはペンタデカスロンです。周期15で振動します。

## WebGL GUI (2021.12.02追記)

[<img width="1680" alt="WebGL GUI is here." src="https://user-images.githubusercontent.com/42643211/144275223-82d890da-ed2b-4002-864d-68a34f656141.png">](https://www.mugisus.com/lifegameJS/)

ユーザーフレンドリー?なGUIができました。<br>
**右クリック**で再生/一時停止、**右ドラッグ**でスクロール、**ホイール**でズームイン/アウト、**左クリック**で編集です。<br>
実行速度とかの動的な変更やスマートフォンとかへの対応はもうちょっと待っててね。

ちなみに実行速度はクエリでも変更できます。
(e.g. [?preset=23334m&speed=0&gpf=1](https://www.mugisus.com/lifegameJS/?preset=23334m&speed=0&gpf=1))
|属性|役割|未定義時|
|---|---|---|
|preset|glidergun|プリセット名。galaxyとかacornとかpentadecathlonとか。|
|speed|100|計算間隔(ミリ秒)|
|gpf|1|Generations Per Frame。一回の計算で何世代進めるか。<br>30とかにするとビュンビュン進みますがお使いのパソコンの性能と相談してからにしてください[^5]|

[^1]: https://github.com/MugiSus/mugisus.github.io/blob/master/game_of_life/src.js
[^2]: https://github.com/MugiSus/mugisus.github.io/blob/master/game_of_life_inf/src.js
[^3]: ただし趣味・思想が全開なので、可読性は保証しません。https://github.com/MugiSus/lifegameJS/blob/main/lifegame.js
[^4]: 便宜上転置しちゃってますが、正しくはx軸とy軸が逆です。
[^5]: 長寿型やシュシュポッポ列車などを動かすと10程度でも重くなります。なんならシュシュポッポ列車は1でも重くなります。
