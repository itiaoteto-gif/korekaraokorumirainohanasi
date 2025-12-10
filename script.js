// =======================================
// 設定：素材フォルダのパス
// =======================================
const ASSET_PATHS = {
  bg: "assets/bg/",
  chara: "assets/chara/",
  bgm: "assets/bgm/"
};

// =======================================
// ルート到達フラグ
// =======================================
const flags = {
  hit_unpassed_seen: false,      // ①未通過の「打つ」を見た
  not_hit_unpassed_seen: false   // ②未通過の「打たない」を見た
};

// =======================================
// シナリオ定義
// - テキストを書き換えるのはここだけでOK
// - 必要に応じて scene（場面）を追加してください
// =======================================

/**
 * text: セリフの配列
 *   - 文字列：モノローグ / 名前なし
 *   - { speaker: "名前", content: "テキスト" }：名前付きセリフ
 *
 * choices: 選択肢の配列（なければエンド扱い）
 *   - { label: "ボタンに出す文字", next: "飛び先のscene ID", requireFlags?: [] }
 *
 * bg: そのシーンで設定する背景画像ファイル名（assets/bg/配下）
 * chara: 立ち絵画像ファイル名（assets/chara/配下・不要なら null）
 * music:
 *   - "ファイル名" → そのBGMを再生
 *   - "" または null → BGM停止
 *   - undefined → 前のシーンのBGMをそのまま継続
 * setFlags: { フラグ名: true/false } → シーン開始時に flags に反映
 */
const SCENES = {
  // -----------------------------
  // タイトル / 導入
  // -----------------------------
  intro: {
    bg: "room_dark.png",
    chara: "self_bed.png",
    music: "bgm_dream.mp3",
    text: [
      "目の前で男がベッドに横たわっている。",
      "どうやらとても苦しんでいるようだ。",
      "俺の手元には「鎮痛剤」と書かれた注射器がある。",
      "これを彼に打てば彼の痛みを鎮められるだろうか。"
    ],
    choices: [
      { label: "打つ", next: "hit_unpassed" },
      { label: "打たない", next: "not_hit_unpassed" },
      {
        label: "思い出す",
        next: "omoidasu",
        // この2つのフラグが true になっていないと表示されない
        requireFlags: ["hit_unpassed_seen", "not_hit_unpassed_seen"]
      }
    ]
  },

  // -----------------------------
  // ① 思い出す未通過の打つ → End01
  // -----------------------------
  hit_unpassed: {
    bg: "room_dark.png",
    chara: "self_bed.png",
    setFlags: {                     // このシーンに入ったらフラグを立てる
      hit_unpassed_seen: true
    },
    // music: undefined → 前のBGMをそのまま
    text: [
      "打つ",
      "注射器を手に取った。",
      "手に取った瞬間、この注射器の使い方が頭に流れ込んでくる。",
      "腕に刺すこと。刺した後、後ろの白い部分を押すこと。押したらゆっくり抜くこと……。",
      "激しく抜いてはいけないこと。刺さずに白い部分を押さないこと。",
      "刺したまま横向きに引っ張らないこと。自分に刺してはいけないこと。目に刺さないこと。",
      "ああ。まただ。",
      "俺はどうしても、やってはいけないことをやたらと考えてしまう癖がある。",
      "そして、それをやってみたいと思ってしまう。",
      "　",
      "「この注射器を彼の目に刺して、ぐりぐりと動かしてから勢いよく引っ張ったら目をくりぬくことができるだろうか？」",
      "そんなことをしていいわけがない。",
      "早く彼の腕に刺して、彼の痛みを抑えてあげなければ。",
      "そんなことをしていいはずがない。",
      "そんなことをしていいはずがない。",
      "そんなことをしていいはずがない。",
      "　",
      "ぱりん。",
      "落としてしまった。",
      "手が震えて、うっかり床に注射器を落として割ってしまった。",
      "薬らしき液体が床にはじける。",
      "それを見たら、なんだか助けることがばかばかしく思えてきた。",
      "そもそもこいつは誰なんだ？こいつを助けたところで俺に利があるのか？",
      "こいつは助けなくていい人間なんじゃないのか？",
      "……",
      "小さくため息をついた。",
      "なんで俺って生きてるんだろうな。",
      "思えば昔からずっとそうだった。",
      "駄々をこねて譲ってもらったリレーのアンカーで、バトンをもらう前から走り出したことがあった。",
      "他の組は笑い転げ、俺たちの組だけが笑っていなかった。",
      "合唱コンクールの時だって、背が高い俺は一番後ろの段で緊張でふらついて落ちたこともある。",
      "心配してくれるのは大人と他の組の子供だけで、自分の周囲からはため息と乾いた笑いだけが聞こえていた。",
      "中学では挽回しようとして生徒会に入ったが、全校放送で緊張して言ってはいけないことを口走ってしまった。",
      "俺に期待していた人はもういなかったから、みんな大爆笑していた。",
      "俺だけが笑えなかった。",
      "そんなことが積み重なって、どこかのタイミングでぷつんと糸が切れ、自分の部屋に引きこもるようになってしまった。",
      "それからはあっという間だった。",
      "特に記憶したい出来事がなかったから、体感一ヶ月くらいで25歳になってしまった。",
      "そんな俺は、人一人分の生きるエネルギーを無駄遣いして死に続けているだけだ。",
      "……",
      "じゃあ何でここにいるんだ？",
      "割れた注射器を見下ろす視界がぐらつく。",
      "痛い。",
      "頭が痛い。",
      "頭の中で親指くらいの大きさの虫が暴れているように感じる。",
      "そう思うと心臓も痛くなる。",
      "気づけば手足も痛い。",
      "体の中で悪魔が暴れている。",
      "立てなくなって床に倒れこむ。",
      "掠れた声で助けを叫ぶが、その声は誰にも届かない。",
      "せめてベッドの上で倒れればよかった。ちょうど今見たらベッドの上で苦しんでいた男はいなくなっている。",
      "でも今は痛くて立てそうにない。",
      "痛みに耐えることだけしか考えられない。",
      "……",
      "床に鎮痛剤が散らばっているのが見えた。",
      "その場所まで這って移動する。",
      "霞む視界で透明な液を探し、必死に舌で舐めとる。",
      "……",
      "甘い。",
      "End01　身の丈にあった未来"
    ],
    choices: [
      { label: "最初からやり直す", next: "intro" }
    ]
  },

  // -----------------------------
  // ② 思い出す未通過の打たない → End02
  // -----------------------------
  not_hit_unpassed: {
    bg: "room_dark.png",
    chara: "self_bed.png",
    setFlags: {                     // このシーンに入ったらフラグを立てる
      not_hit_unpassed_seen: true
    },
    text: [
      "打たない",
      "俺は注射器を手に取らなかった。",
      "だって、この注射器が本当に鎮痛剤だという確証はどこにもないから。",
      "これは猛毒で、打たれた男はもっともがき苦しんで死ぬかもしれない。",
      "それを見ていた管理人的な奴がほくそ笑んでいるかもしれない。",
      "そもそも、こいつを助けて何が起こるかわからない。",
      "実はこいつは殺人鬼で、痛みが落ち着いたら俺を殺しに来るかもしれない。",
      "俺以外のやつを殺しに行ったとしたら、俺はこいつの殺人に加担したことになってしまう。",
      "そうだ！だってこいつの横にはナイフが置かれている！わざわざ自分の横にナイフを置くなんて殺人鬼でしかないだろう。",
      "そう思うと、顔もなんだか醜く思えてきた。",
      "きっとこいつは、自分を馬鹿にした誰かを傷つけそうになったから暴れたんだ。",
      "それを見た警察的な組織が、こいつを危険だと判断してここに閉じ込めて毒を飲ませたんだ。",
      "じゃあ俺がこいつに鎮痛剤を打つ理由はないし、俺はこいつを助けちゃいけないんだ。",
      "……",
      "小さくため息をつく。",
      "なんで俺っていつもこうなんだろうな。",
      "本当は注射器なんか触ったことがないから失敗が怖くて触れないだけだ。",
      "自分のせいで彼が死んでしまったら責任がとれないから、最大限責任が生まれないように行動しているだけだ。",
      "やりたくないことから逃げ出して、それを正当化し続けているんだ。",
      "……",
      "小学生のころ、作文を書いているときに習ったのに思い出せない漢字があった。",
      "正確に言うと、思い出せないというよりあっているか自信がなかっただけだ。",
      "俺はその漢字と前の文章を消して、意味は似ているがその漢字を使わなくてもいい文章に書き換えた。",
      "最終的に、その作文は俺が書きたい作文とは違うものになっていた。",
      "みんなの前で発表しているときにそれに気づき、俺はこんなことを書きたかったんじゃないと思ったらみんなの前で作文をバラバラに破り捨ててしまった。",
      "俺はあのころから何一つ変わっちゃいない。",
      "自分がやりたくないことから逃げ出して、逃げ出して、逃げ続けてこんな場所にいるんだろう。",
      "スクリーンの青い光だけが光る部屋で、定期的にドアの前に置かれる食事を食べて、親がいない時間を見計らって排泄をして、画面から供給されるドーパミンを摂取し続けるだけ。",
      "そんな俺は、数十年という時間をかけてゆっくり死に続けているだけだ。",
      "……",
      "じゃあ何でここにいるんだ？",
      "薄暗い光の中で不衛生なベッドを写す視界がぐらつく。",
      "痛い。",
      "頭が痛い。",
      "頭の中で親指くらいの大きさの虫が暴れているように感じる。",
      "そう思うと心臓も痛くなる。",
      "気づけば手足も痛い。",
      "体の中で悪魔が暴れている。",
      "割れそうな頭で必死に生き残る術を考える。",
      "そうだ。鎮痛剤。",
      "まともに動かない右腕で鎮痛剤が入った注射器を手に取る。",
      "ちょうどベッドの上の男はいなくなっているから自分に打つことができる。",
      "思いっきり左腕に刺し、自分に薬を注入する。",
      "痛い。痛い。効くまでに時間がかかるのだろうか。",
      "床に倒れこむ。掠れた声で叫びを上げる。",
      "……",
      "ふと気づくと、痛みが消えていた。",
      "目の前にはさっきと違い、花畑が広がっているように見える。",
      "助かったのだろうか。",
      "そう思うと、急激な眠気が襲ってきた。",
      "少し休みたいな。と思い、硬い床の上でゆっくりと目を閉じる。",
      "意識が、ゆっくりと薄れていく。",
      "",
      "End02　逃げ続けた先の未来"
    ],
    choices: [
      { label: "最初からやり直す", next: "intro" }
    ]
  },

  // -----------------------------
  // ③ 思い出す → 会話パート
  // -----------------------------
  omoidasu: {
    bg: "room_dark.png",
    chara: "self_talk.png",
    text: [
      "苦しんでいる彼について、何か思い出せそうな気がした。",
      "黒い髪で、背が高く、痩せ細っていて声は低い。",
      "じっと見ていると、彼が助けを求めるように手を伸ばしてきた。",
      "俺は無意識のうちにその手を取っていた。",
      { speaker: "？？？", content: "「あなたは……俺ですか？」" },
      { speaker: "俺", content: "「なんだろう……もしかするとそうなのかも。」" },
      { speaker: "俺", content: "「だったら、きっとわかってくれるよね。」" },
      { speaker: "俺", content: "「俺の……俺のこと。」" },
      { speaker: "俺", content: "「知っての通り、俺は起こりうる最悪な未来を想像する癖がある。」" },
      { speaker: "俺", content: "「これは、その癖が生み出した幻覚だよ。」" },
      { speaker: "俺", content: "「目の前で苦しんでいる「俺」は、この先に起こる未来を想像して苦しんでいるんだ。」" },
      { speaker: "俺", content: "「初めて見るかい？これは毎晩俺がやっていることだよ。」" },
      { speaker: "俺", content: "「毎晩最悪な未来を見て、それに悶え苦しんでいるだけだ。」" },
      { speaker: "俺", content: "「そんな生活を続けていたら、一個の選択肢が生まれた。」" },
      { speaker: "俺", content: "「死ぬか。死なないか。」" },
      { speaker: "俺", content: "「夢の中で、俺自身に選択をさせるんだ。」" },
      { speaker: "俺", content: "「鎮痛剤……厳密に言えば安楽死用の毒なんだけど、それを打って安らかに死ぬか、打たずに最悪な未来を歩き続けるか。」" },
      { speaker: "俺", content: "「俺には……このまま生き続けるかここで俺の人生を終わらせるかの選択をしてほしい。」" },
      { speaker: "俺", content: "「……」" },
      { speaker: "俺", content: "「って言っても、まだわからないよね。」" },
      { speaker: "俺", content: "「君は俺が生み出した第二の俺だから、今日生まれてからの記憶と、情報としての過去しか知らないはずだ。」" },
      { speaker: "俺", content: "「俺がいつも考えてることを、君に話してから選んでもらおう。」" },
      { speaker: "俺", content: "「　」" },
      { speaker: "俺", content: "「まずこの部屋から出たらどうなると思う？」" },
      { speaker: "俺", content: "「お母さんが待っているかな」" },
      { speaker: "俺", content: "「待っていなかったらどうする？」" },
      { speaker: "俺", content: "「お母さんはとうの昔に俺に見切りをつけて家を出て行ったとしたら？」" },
      { speaker: "俺", content: "「俺の世話は雇われた全く知らない人が続けていて、俺が出てきたら仕事がなくなるから出てこないことを祈って料理を作り続けていたら？」" },
      { speaker: "俺", content: "「お母さんに会えると思ってドアを開けたら言われるんだ。」" },
      { speaker: "俺", content: "「こんにちは……出てきたんですね……出てこなければよかったのに……」" },
      { speaker: "俺", content: "「ってね。」" },
      { speaker: "俺", content: "「元の部屋に戻されるかな。それともそのまま家から追い出されるかな？」" },
      { speaker: "俺", content: "「追い出されるだろうね。」" },
      { speaker: "俺", content: "「俺はもう部屋から出た時点で用済みなんだから、そのヘルパーさんからしたら邪魔でしかないもんね。」" },
      { speaker: "俺", content: "「俺は10年以上引きこもっていたから、周囲の土地も自分の見た目も変わっているだろうね。」" },
      { speaker: "俺", content: "「そしたら全く知らない子供に出会うんだ。」" },
      { speaker: "俺", content: "「その子供はなんて言うだろうね。」" },
      { speaker: "俺", content: "「うわっ。気持ち悪。」" },
      { speaker: "俺", content: "「子供って無邪気だからね。そういうことは平気で言うだろうね。」" },
      { speaker: "俺", content: "「俺はそれに対してどう思うだろう。むかつくかな？」" },
      { speaker: "俺", content: "「昔からそうだもんね。イライラしたら相手が悪かったことにして正当化するのが俺だ。」" },
      { speaker: "俺", content: "「子供に手を上げるだろうね。」" },
      { speaker: "俺", content: "「でもどうだろう。10年引きこもった体で子供に勝てるかな？」" },
      { speaker: "俺", content: "「勝てないだろうね。」" },
      { speaker: "俺", content: "「すぐに警察を呼ばれて、俺は現行犯逮捕されるだろうね。」" },
      { speaker: "俺", content: "「俺は味方がいないから、かばってくれる人もいない。すぐに牢屋に入れられるだろうね。」" },
      { speaker: "俺", content: "「そのあとはどうだろう。他の囚人たちと仲良くなれるかな？」" },
      { speaker: "俺", content: "「なれないだろうね。」" },
      { speaker: "俺", content: "「いじめられて、雑巾みたいな扱いをされるはず。」" },
      { speaker: "俺", content: "「そんな生活が何十年か続いて、やっと牢屋を出ることができたら君は何歳だろう？」" },
      { speaker: "俺", content: "「社会も知らない、中学生で知識が止まっている、味方もいない。そんな大人が50歳でも超えていたら。」" },
      { speaker: "俺", content: "「俺は耐えきれなくなって死ぬよ。」" },
      { speaker: "俺", content: "「……」" },
      { speaker: "彼", content: "「そんな未来と、今ここで死ぬ未来、俺はどっちがいい？」" },
      "",
      "安楽死用の毒を――",
      ""
    ],
    choices: [
      { label: "打つ", next: "omoidasu_hit" },
      { label: "打たない", next: "omoidasu_not_hit" }
    ]
  },

  // -----------------------------
  // ④ 思い出す → 打つ → End03
  // -----------------------------
  omoidasu_hit: {
    bg: "room_dark.png",
    chara: "self_bed.png",
    text: [
      { speaker: "俺", content: "「そっか。」" },
      { speaker: "俺", content: "「俺はそうすると思ってた。」" },
      { speaker: "俺", content: "「……」" },
      { speaker: "俺", content: "「はやく打ってあげなよ。こうしてる間もずっと苦しんでるよ？」" },
      "俺はベッドの上に横たわる俺に注射を打った。",
      "意識がスーッと遠くなっていく。",
      "なんだかすごく眠たくなってきた。",
      "景色はなぜか、見覚えのある視界を映し出す。",
      "これが走馬灯ってやつか。",
      "小学校のリレー。",
      "合唱コンクール。",
      "生徒会の放送。",
      "他にもいくつかの嫌な記憶を映し出して、走馬灯は終わった。",
      "俺の人生は、走馬灯にしても一分もなかったな。と思う。",
      "ゆっくりと目を閉じる。",
      "もし……",
      "もし来世があったなら。",
      "こんな俺には生まれてこないでほしいな。と思う。",
      { speaker: "俺", content: "「おやすみ。君の選択は正しかったよ。」" },
      { speaker: "俺", content: "「いい夢を見てね。」" },
      "",
      "End03　考えうる限り幸せな未来"
    ],
    choices: [
      { label: "最初からやり直す", next: "intro" }
    ]
  },

  // -----------------------------
  // ⑤ 思い出す → 打たない → End04（現実の朝 手前）
  // -----------------------------
  omoidasu_not_hit: {
    bg: "room_dark.png",
    chara: "self_talk.png",
    text: [
      { speaker: "俺", content: "「……そっか。」" },
      { speaker: "俺", content: "「俺がそうするとは……思わなかった。」" },
      { speaker: "俺", content: "「……」" },
      { speaker: "彼", content: "「そこのドアから目覚められるよ。ほら、行きなよ。」" },
      "俺はゆっくりと歩いて、苦しんでいる俺を後ろにドアに手をかける。",
      "意識がだんだんとはっきりしていく。",
      "だんだんと、今見ているものが夢であると自覚していく。",
      "ゆっくり、この空間で起きたことを忘れかけていることに気づく。",
      "俺が選んだこの選択の責任は、すべて俺にある。",
      "でも、この選択を選んだことでつかめた幸せも、すべて俺のものだ。",
      "決して明るくはないドアの先へ、ゆっくりと歩きだす。",
      "意識がだんだんとはっきりしていく。",
      "……",
      { speaker: "俺", content: "「振り返らないでよ。」" },
      { speaker: "俺", content: "「君の選択は……正しいよ。」" },

    ],
    choices: [
      { label: "目を覚ます", next: "morning" }
    ]
  },

  // -----------------------------
  // 現実の朝 → End04
  // -----------------------------
  morning: {
    bg: "room_morning.png",
    chara: null,
    music: "bgm_morning.mp3", // BGM切り替え
    text: [
      "目が覚めると、カーテンの隙間からうっすらと淡い朝日が差し込んでいた。",
      "スマホで時計を確認すると、まだ6時であることに気づく。",
      "この部屋を出て、まずはお母さんに声をかけよう。",
      "お母さんがいなかったら……？",
      "いや、そんなことは考えない。あの夢で見た未来は、ただの妄想だ。",
      "考えていると、夢の内容を思い出してまたベッドに戻りそうになる。",
      "自分に考える隙間を与えないように、急ぐようにドアを開ける。",
      "……",
      "………………",
      "………………………………",
      "柔らかな朝日が、俺の背中を暖かく照らしていた。",
      "",
      "End04　これから起こる未来の話"
    ],
    choices: [
      { label: "最初からやり直す", next: "intro" }
    ]
  }
};

// =======================================
// エンジン本体
// =======================================

let currentSceneId = "intro";
let currentLineIndex = 0;
let isShowingChoices = false;

// DOM取得
const bgEl = document.getElementById("background-layer");
const charaEl = document.getElementById("chara-layer");
const textboxEl = document.getElementById("textbox");
const nameEl = document.getElementById("namebox");
const messageEl = document.getElementById("message");
const choicesEl = document.getElementById("choices");
const clickHintEl = document.getElementById("click-hint");
const bgmEl = document.getElementById("bgm");

if (bgmEl) {
  // BGM要素があるときだけ初期値をセット
  bgmEl.dataset.currentMusic = "";
}

// シーン開始
function startScene(id) {
  const scene = SCENES[id];
  if (!scene) {
    console.error("存在しないシーンID:", id);
    return;
  }
  currentSceneId = id;
  currentLineIndex = 0;
  isShowingChoices = false;
  choicesEl.innerHTML = "";
  clickHintEl.style.display = "block";

  // ★ このシーンで立てるべきフラグがあれば反映
  if (scene.setFlags) {
    Object.keys(scene.setFlags).forEach(key => {
      flags[key] = scene.setFlags[key];
    });
  }

  applySceneAssets(scene);
  showCurrentLine();
}

// 背景 / 立ち絵 / BGM の切り替え
function applySceneAssets(scene) {
  // 背景
  if (scene.bg) {
    bgEl.style.backgroundImage = `url("${ASSET_PATHS.bg}${scene.bg}")`;
  }

  // 立ち絵
  if (scene.chara) {
    charaEl.src = `${ASSET_PATHS.chara}${scene.chara}`;
    charaEl.style.display = "block";
  } else {
    charaEl.style.display = "none";
  }

  // BGM
  if (bgmEl && scene.music !== undefined) {
    if (scene.music) {
      const nextMusic = scene.music;
      if (bgmEl.dataset.currentMusic !== nextMusic) {
        bgmEl.pause();
        bgmEl.currentTime = 0;
        bgmEl.src = `${ASSET_PATHS.bgm}${nextMusic}`;
        bgmEl.dataset.currentMusic = nextMusic;
        bgmEl.play().catch(() => {
          // 自動再生ブロック時は無視
        });
      }
    } else {
      bgmEl.pause();
      bgmEl.currentTime = 0;
      bgmEl.removeAttribute("src");
      bgmEl.dataset.currentMusic = "";
    }
  }
}

// 現在の行を表示
function showCurrentLine() {
  const scene = SCENES[currentSceneId];
  if (!scene) return;

  const line = scene.text[currentLineIndex];

  // 行がもうない → 選択肢へ
  if (line === undefined) {
    showChoices(scene);
    return;
  }

  // 選択肢モード解除
  isShowingChoices = false;
  choicesEl.innerHTML = "";
  clickHintEl.style.display = "block";

  if (typeof line === "string") {
    nameEl.textContent = "";
    messageEl.textContent = line;
  } else {
    // { speaker, content } 形式
    nameEl.textContent = line.speaker || "";
    messageEl.textContent = line.content || "";
  }
}

// 選択肢表示
function showChoices(scene) {
  isShowingChoices = true;
  choicesEl.innerHTML = "";
  clickHintEl.style.display = "none";

  // フラグ条件を満たしている選択肢だけを表示する
  const availableChoices = (scene.choices || []).filter(choice => {
    if (!choice.requireFlags) return true; // 条件なし → 常に表示
    return choice.requireFlags.every(flagName => flags[flagName]);
  });

  if (availableChoices.length === 0) {
    // 表示できる選択肢がなければエンド扱い
    messageEl.textContent += "\n\n（エンド）";
    return;
  }

  availableChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.label;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      startScene(choice.next);
    });
    choicesEl.appendChild(btn);
  });
}

// テキストボックスクリックで次の行へ
textboxEl.addEventListener("click", () => {
  // ★ まだBGMが再生されていなければ、このクリックをきっかけに再生を試みる
  if (bgmEl && bgmEl.paused && bgmEl.src) {
    bgmEl.play().catch(() => {
      // ここも失敗しても無視（ユーザーがミュートしている等）
    });
  }

  if (isShowingChoices) {
    // 選択肢表示中はクリックで進めない
    return;
  }

  const scene = SCENES[currentSceneId];
  if (!scene) return;

  currentLineIndex++;
  showCurrentLine();
});

// 初期化
window.addEventListener("load", () => {
  startScene(currentSceneId);
});
