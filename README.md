# lifegameJS
A lifegame which is using JS.

JSを使ったライフゲームです。(3作目)
- [1作目](https://www.mugisus.com/game_of_life) [(ソースコード)](https://github.com/MugiSus/mugisus.github.io/blob/master/game_of_life/src.js)
- [2作目](https://www.mugisus.com/game_of_life_inf) [(ソースコード)](https://github.com/MugiSus/mugisus.github.io/blob/master/game_of_life_inf/src.js)
- [3作目](https://www.mugisus.com/lifegameJS) ←これ

[lifegame.js](https://github.com/MugiSus/lifegameJS/blob/main/lifegame.js)

速度も速いしソースコードも随分と綺麗になったんじゃないですかね。あと趣味で書いたコードなので可読性には帰ってもらっています

```js
cw(0, 0, 1);
cw(1, 1, 1);
cw(1, 2, 1);
cw(0, 2, 1);
cw(-1, 2, 1);

for (let i = 0; i < 100; i++) ep = e(ep);
```
これはグライダーを100世代動かすコードです。軽いのですぐです

実行結果はオブジェクトmに出てます

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

図示するとこんな感じです
```
✖️◼️◼️◼️✖️
◼️◼️◼️◼️◼️
◼️◼️◼️◻️◼️
◼️◻️◼️◻️◼️
◼️◼️◻️◻️◼️
✖️◼️◼️◼️✖️
```
◻️は`true`、◼️は`false`、✖️のあるところは`undefined`です

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

もっとユーザーフレンドリーなUI作ってるので待っててね。待てない人はconsole開いて遊んでてください
