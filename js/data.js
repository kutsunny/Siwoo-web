/*
 * 지오메트리 대시 — 유명 레벨 데이터
 * --------------------------------------------------
 * 여기에 레벨 객체를 추가하면 사이트에 자동으로 카드가 생성됩니다.
 * (시간순으로 정렬해 두면 타임라인이 자연스럽습니다)
 *
 *  필드 설명:
 *   id        : 고유 식별자 (영문, 공백 없이)
 *   name      : 레벨 이름
 *   creator   : 제작자 / 호스트
 *   verifier  : 베리파이(최초 클리어 인증)한 사람
 *   year      : 베리파이 연도 (모르면 "—")
 *   peakRank  : 데몬리스트 최고 순위 / 위상 (예: "1위", "톱 5")
 *   category  : 분류 — 필터 버튼에 쓰임 (아래 CATEGORIES 참고).
 *               여러 분류에 동시에 넣으려면 배열로: ["1위 경쟁", "혁신"]
 *   tag       : 카드에 표시할 짧은 수식어
 *   motif     : 대표 일러스트 모티프 (main.js의 MOTIFS 참고)
 *               circles · ice · blood · slaughter · ascent · fire · wave ·
 *               tidal · pulse · stars · gold · key · limbo · gem · orbit · sound · spikes
 *   colors    : [메인색, 보조색] — 일러스트 색 테마
 *   image     : (선택) 실제 이미지 URL. 넣으면 SVG 대신 이 이미지를 사용
 *   summary   : 카드에 보일 한 줄 요약
 *   history   : 상세 모달 — 역사 / 순위 변동 / 베리파이 과정 (빈 줄로 문단 구분)
 *   controversy : (선택) 논란이 있었던 경우에만 추가
 *
 *  ⚠️ 데몬리스트(Demonlist) 순위는 계속 바뀌며, 일부 정보·날짜는 대략적인 값입니다.
 *     사실관계는 공개 위키 등을 참고했으나 커뮤니티 기록 특성상 이견이 있을 수 있습니다.
 */

// 필터에 표시할 카테고리 순서
const CATEGORIES = ["전체", "1위 경쟁", "장르 개척", "혁신", "역사", "불가능 레벨", "미평가"];

const LEVELS = [
  {
    id: "nine-circles",
    name: "Nine Circles",
    creator: "Zobros",
    verifier: "Zobros",
    year: 2015,
    peakRank: "장르 원조",
    category: "장르 개척",
    tag: "하나의 장르가 되다",
    motif: "circles",
    colors: ["#2ad4ff", "#0a1b6b"],
    summary: "빠른 웨이브 + 스트로브 연출로 'Nine Circles류'라는 장르를 통째로 탄생시킨 레벨.",
    history:
      "Nine Circles는 2015년 Zobros가 만든 그의 첫 오리지널 레벨로, 데몬 등급 중에서는 비교적 낮은 'Hard Demon'이었지만 " +
      "GD 역사에서 가장 영향력 있는 레벨 중 하나로 꼽힙니다.\n\n" +
      "핵심은 후반부의 빠른 웨이브 구간과, 화면이 번쩍이는 스트로브(strobe) 연출이었습니다. 이 조합이 너무나 강렬해서, " +
      "등장 직후 수많은 제작자들이 같은 구조를 따라 만든 '나인 서클즈류(Nine Circles)' 레벨이 쏟아졌습니다. " +
      "Sonic Wave, Sakupen Circles 같은 전설적인 레벨들도 모두 이 장르의 후예입니다.\n\n" +
      "즉 Nine Circles는 단일 레벨을 넘어 하나의 '장르'를 만들어낸 레벨입니다. 무명에 가깝던 제작자 Zobros를 단숨에 스타로 " +
      "만들었고, 이후 수년간 GD 커뮤니티의 유행을 주도했습니다.",
  },
  {
    id: "ice-carbon-diablo-x",
    name: "ICE Carbon Diablo X",
    creator: "Roadbose",
    verifier: "Riot (정식 클리어)",
    year: 2015,
    peakRank: "초기 1위급",
    category: "역사",
    tag: "초창기 최강",
    motif: "ice",
    colors: ["#7fe8ff", "#0a2a4a"],
    summary: "한때 '세계에서 가장 어려운 레벨'로 불린 초창기 전설.",
    history:
      "ICE Carbon Diablo X(줄여서 ICDX)는 Roadbose가 만든 레벨로, 한때 '세계에서 가장 어려운 레벨'로 불린 초창기 최강 " +
      "레벨 중 하나입니다. 길고 빽빽한 비행(ship) 구간으로 악명이 높았습니다.\n\n" +
      "당시에는 레벨을 업로드하려면 제작자가 직접 클리어해야 했기 때문에, 너무 어려운 레벨은 핵(noclip 등)으로 " +
      "'핵 베리파이'해 올린 뒤, 나중에 실력자가 정식으로 깨는 것이 흔한 관행이었습니다. ICDX도 처음에는 핵으로 검증되어 " +
      "올라왔고, 2015년 Riot이 처음으로 정식 클리어에 성공했습니다.\n\n" +
      "한동안 Cataclysm과 함께 '양대 최강'으로 비교되며 초기 익스트림 데몬 시대를 상징했고, 이후 데몬리스트가 " +
      "정식화되면서 역사적인 레벨로 자리매김했습니다.",
    controversy:
      "초기 기록은 Roadbose의 핵 베리파이로 올라온 것이어서, '진짜로 깰 수 있는 레벨인가'를 두고 의심이 컸습니다. " +
      "Riot의 정식 클리어로 비로소 '가능한 레벨'임이 증명되었습니다. 이는 검증 문화가 자리잡기 전, 초창기 GD의 전형적인 " +
      "모습이기도 했습니다.",
  },
  {
    id: "bloodbath",
    name: "Bloodbath",
    creator: "Riot (콜라브 호스트)",
    verifier: "Riot",
    year: 2015,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "전설의 시작",
    motif: "blood",
    colors: ["#ff1f3d", "#6e000f"],
    summary: "현대 익스트림 데몬 시대를 연 기념비적인 붉은 콜라브 레벨.",
    history:
      "Bloodbath는 2015년 Riot이 호스트한 콜라브 레벨로, 흔히 '현대 익스트림 데몬의 시작점'으로 불립니다. " +
      "여러 톱 제작자들이 각자 한 구간씩 맡아 만드는 '구간 콜라브' 형식으로, 붉은 피를 테마로 한 강렬한 비주얼과 " +
      "당시 기준으로는 차원이 다른 난이도가 결합되어 등장과 동시에 화제가 되었습니다.\n\n" +
      "이 레벨이 특별했던 이유는 단순히 어려워서가 아니라, '여러 사람이 모여 인류가 깰 수 있는 한계에 도전하는 " +
      "콜라브'라는 문화를 대중화했기 때문입니다. 각 구간마다 서로 다른 제작자의 개성이 드러나, 한 레벨 안에서 " +
      "다양한 스타일을 모두 맛볼 수 있다는 점도 큰 매력이었습니다.\n\n" +
      "베리파이 과정 자체가 하나의 사건이었습니다. Riot이 끝없는 어택(attempt) 끝에 최초 클리어를 인증하면서 " +
      "Bloodbath는 데몬리스트 정상에 올랐고, 오랜 기간 그 자리를 지켰습니다. 이후 더 어려운 레벨들이 등장하며 " +
      "순위는 점차 내려갔지만, '레전드 레벨'로서의 상징성은 지금도 변하지 않습니다.",
    controversy:
      "베리파이 이후부터 '명성만큼 실제로 어려운가'를 두고 의견이 갈렸습니다. 시간이 지나 훨씬 어려운 레벨들이 " +
      "나오자 'Bloodbath는 과대평가되었다'는 평가와 '등장 시기를 감안하면 정당한 1위였다'는 평가가 오래 맞섰습니다.\n\n" +
      "또한 인기가 워낙 많아 수많은 모작·리메이크·이지(easy) 버전이 쏟아졌고, '어떤 버전을 원작으로 볼 것인가', " +
      "'리메이크가 원작의 위상을 깎아내리는가' 같은 논쟁도 따라붙었습니다.",
  },
  {
    id: "cataclysm",
    name: "Cataclysm",
    creator: "Ggb0y",
    verifier: "Riot (2.0 정식 클리어)",
    year: 2016,
    peakRank: "당대 최고난도",
    category: "역사",
    tag: "지옥 테마의 원조",
    motif: "fire",
    colors: ["#ff3b1f", "#1a0300"],
    summary: "붉은-검정 '지옥' 색조를 대중화한, 가장 인기 있는 레벨 중 하나.",
    history:
      "Cataclysm은 2015년 Ggb0y가 만든 레벨로, 붉은색과 검은색을 결합한 '지옥(hell)' 테마를 대중화한 기념비적인 " +
      "작품입니다. 이후 수많은 익스트림 데몬이 이 붉은-검정 색조를 따랐을 만큼 디자인 면에서 영향력이 컸습니다.\n\n" +
      "출시되자마자 ICE Carbon Diablo X와 더불어 당대 최고 난이도로 평가받았습니다. 2.0 버전으로 업데이트된 뒤 " +
      "2016년 Riot이 정식으로 베리파이하면서 다시 한 번 정상권 레벨로 주목받았습니다.\n\n" +
      "지금도 게임 내에서 가장 '좋아요'를 많이 받은 익스트림 데몬 중 하나로, 가장 인기 있고 영향력 있는 레벨로 자주 " +
      "언급됩니다.",
    controversy:
      "Cataclysm 역시 초창기 관행대로 제작자가 핵으로 검증해 올린 레벨이었고, 이후 실력자들이 정식 클리어에 " +
      "도전했습니다. '핵 베리파이 → 정식 베리파이'로 이어지는 과정은 당시 어려운 레벨들의 공통된 역사였습니다.",
  },
  {
    id: "sakupen-hell",
    name: "Sakupen Hell",
    creator: "Noobas",
    verifier: "TrusTa (정식 클리어)",
    year: 2016,
    peakRank: "불가능→정복",
    category: "불가능 레벨",
    tag: "정복된 불가능",
    motif: "fire",
    colors: ["#ff355e", "#11021a"],
    summary: "'불가능하다'던 익스트림 데몬이 인간의 손으로 정복된 대표 사례.",
    history:
      "Sakupen Hell은 Noobas가 만든 익스트림 데몬으로, 당대 최고의 플레이어였던 Riot과 Cyclic에게 도전장을 " +
      "내밀기 위해 만들어졌다고 알려져 있습니다. 한때 '인간이 깰 수 없는 불가능 레벨'로 여겨졌습니다.\n\n" +
      "처음에는 제작자가 핵으로 검증해 올렸지만, 2016년 TrusTa가 정식으로 클리어하며 '불가능하다고 여겨지던 레벨이 " +
      "실제로 정복되는' 극적인 순간을 만들어냈습니다.\n\n" +
      "불가능에 가깝다고 여겨지던 레벨이 인간의 손으로 정복된 대표 사례로, 이후 '불가능은 시간문제'라는 인식을 " +
      "커뮤니티에 심어준 상징적 레벨입니다.",
  },
  {
    id: "sonic-wave",
    name: "Sonic Wave",
    creator: "Cyclic",
    verifier: "Sunix (최초 정식 클리어)",
    year: 2016,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "웨이브의 악몽",
    motif: "wave",
    colors: ["#00b3ff", "#03287a"],
    summary: "악명 높은 좁은 웨이브 구간으로 한 시대를 풍미한 파란 레벨.",
    history:
      "Sonic Wave는 빠르고 좁은 웨이브(wave) 구간으로 악명이 높았던 나인 서클즈류 레벨입니다. 웨이브는 화면을 누르는 " +
      "동안 위로, 떼는 동안 아래로 대각선 이동하는 모드인데, Sonic Wave는 이 웨이브를 극단적으로 좁은 통로와 빠른 " +
      "속도로 몰아붙여 '웨이브 컨트롤의 극한'을 상징하는 레벨이 되었습니다.\n\n" +
      "Cyclic이 만들었고 2016년 Sunix가 최초로 정식 클리어하며 최상위권에 올랐습니다. 푸른 네온 비주얼과 강렬한 " +
      "사운드트랙으로도 큰 인기를 끌었으며, 당시 'Sonic Wave를 깬다'는 것은 곧 최정상급 실력의 증명으로 여겨졌습니다.\n\n" +
      "이후 게임 업데이트에 따른 물리(physics) 변경과 더 어려운 레벨들의 등장으로 순위가 내려갔지만, 후속작 격인 " +
      "'Sonic Wave Infinity'가 따로 제작될 만큼 커뮤니티에 깊은 발자취를 남겼습니다.",
    controversy:
      "2010년대 중반은 핵(hack)을 이용한 가짜 기록이 빈번하고 검증(verification) 문화가 막 자리잡던 시기였습니다. " +
      "그래서 최상위권 기록 전반이 진위 의심을 받았고, Sonic Wave 역시 그 논쟁의 한가운데에 자주 거론되곤 했습니다.\n\n" +
      "또한 원본 레벨이 손상·삭제된 뒤 'Sonic Wave Infinity' 등으로 재제작되면서, '리메이크 버전을 원작과 동일한 " +
      "레벨로 인정할 수 있는가'라는 정체성 논쟁도 길게 이어졌습니다.",
  },
  {
    id: "artificial-ascent",
    name: "Artificial Ascent",
    creator: "Viprin 호스트 · LmAnubis 외 (콜라브)",
    verifier: "Combined",
    year: 2016,
    peakRank: "1위",
    category: ["1위 경쟁", "혁신"],
    tag: "잠깐의 정상",
    motif: "ascent",
    colors: ["#3a3f4a", "#08080c"],
    video: "URwPErFdH7c",
    summary: "2016년 말 잠시 데몬리스트 1위에 올랐던 2.0 시대의 대형 콜라브.",
    history:
      "Artificial Ascent는 Viprin이 호스트하고 Combined가 2016년 12월 11일 베리파이한 2.0 시대의 대형 콜라브입니다. " +
      "베리파이 직후 당시 1위였던 Sakupen Hell을 제치고 데몬리스트 정상에 올랐습니다.\n\n" +
      "하지만 정상의 자리는 오래가지 못했습니다. 약 한 달 뒤 Yatagarasu가 베리파이되면서 1위를 넘겨주었고, 그만큼 " +
      "이 시기는 최강 레벨이 빠르게 교체되던 격변기였습니다.\n\n" +
      "당시 평가는 대체로 호의적이었습니다. 화려한 색감과 구간마다 개성이 뚜렷한 연출(특히 파랑·분홍이 번쩍이는 후반부 " +
      "배경)로 2.0 시대를 대표하는 대형 콜라브로 꼽혔고, '2.0 지오메트리 대시 어워드'의 베스트 데몬 메가콜라브 후보에 " +
      "올랐습니다. 훗날 GDToday의 '역대 위대한 레벨 100선'에서 14위에 선정되기도 했습니다.\n\n" +
      "다만 난이도를 두고는 이견도 있었습니다. 빠듯한 비행 구간과 까다로운 타이밍이 많아 어렵다는 평이 주를 이뤘지만, " +
      "일부 유저가 의도적으로 낮은 난이도로 투표하는 바람에 한때 등급이 'Hard Demon'으로 표시되는 해프닝도 있었습니다. " +
      "(커뮤니티 의견)\n\n" +
      "초창기 익스트림 데몬 씬에서 '톱 1 경쟁'이 본격화되던 흐름을 보여주는 상징적인 레벨로 기억됩니다.",
  },
  {
    id: "yatagarasu",
    name: "Yatagarasu",
    creator: "Viprin & Riot (콜라브 호스트)",
    verifier: "TrusTa",
    year: 2017,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "제작 비화의 레벨",
    motif: "fire",
    colors: ["#ff5a1f", "#1a0a00"],
    summary: "일본 신화 속 세 발 까마귀를 모티프로 한, 드라마 많은 1위 콜라브.",
    history:
      "Yatagarasu는 Viprin과 Riot이 호스트한 대형 콜라브로, 일본 신화 속 세 발 달린 까마귀 '야타가라스'를 모티프로 한 " +
      "지옥 테마 레벨입니다. 2017년 TrusTa가 베리파이하며 데몬리스트 1위에 올랐습니다.\n\n" +
      "화려한 비주얼과 높은 난이도로 큰 인기를 끌었지만, 이 레벨은 '제작 과정의 드라마'로도 유명합니다. 베리파이 담당이 " +
      "바뀌고, 일부 구간이 교체·수정되는 등 완성까지 우여곡절이 많았습니다.\n\n" +
      "결과적으로 무사히 완성되어 정상에 올랐지만, 제작 비화 자체가 GD 커뮤니티에서 두고두고 회자되는 레벨입니다.",
    controversy:
      "제작 도중 한 참여자의 핵 사용 논란으로 해당 구간이 폐기되었고, 베리파이를 맡았던 플레이어가 중도 하차하면서 다른 " +
      "실력자에게 넘어가는 등 잡음이 있었습니다. 또한 이름이 비슷한 별개의 레벨 'The Yatagarasu'(Manix648 제작)는 아트 " +
      "표절 논란에 휘말리기도 했습니다.\n\n" +
      "이런 사건들은 대형 콜라브가 완성되기까지 얼마나 많은 사람과 갈등이 얽히는지를 보여주는 사례로 자주 언급됩니다.",
  },
  {
    id: "plasma-pulse-finale",
    name: "Plasma Pulse Finale",
    creator: "Giron & Smokes",
    verifier: "Smokes",
    year: 2017,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "타이밍의 극한",
    motif: "pulse",
    colors: ["#19e0ff", "#1a0030"],
    summary: "정밀한 타이밍의 극한을 보여준, 시리즈의 대미를 장식한 1위 레벨.",
    history:
      "Plasma Pulse Finale은 Giron과 Smokes가 함께 만든 콜라브로, 'Plasma Pulse' 시리즈(Plasma Pulse, II, III)의 " +
      "네 번째이자 마지막 작품입니다. 2017년 Smokes가 베리파이·공개했습니다.\n\n" +
      "원래 Giron이 게임플레이를 일부 공개하며 시작되었지만, 그가 도중에 GD를 완전히 떠나면서 Smokes가 데코레이션과 " +
      "완성, 그리고 베리파이까지 혼자 떠맡게 되었습니다. 그 결과 '한 사람의 집념으로 완성된 레벨'이라는 서사가 더해졌습니다.\n\n" +
      "당대 가장 어려운 '타이밍(timing) 레벨' 중 하나로 꼽혔고, 데몬리스트에서 2위로 시작해 한 달 뒤 Sonic Wave를 제치고 " +
      "1위에 올랐습니다. 이후로도 오랫동안 리스트에 남아, Sonic Wave·Bloodlust에 이어 '가장 오래 리스트에 머문 레벨' " +
      "중 하나로 기록되었습니다.",
  },
  {
    id: "bloodlust",
    name: "Bloodlust",
    creator: "Manix648 외 (콜라브)",
    verifier: "Knobbelboy",
    year: 2018,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "비주얼 + 난이도",
    motif: "blood",
    colors: ["#ff2e5b", "#1a0008"],
    summary: "압도적인 연출과 난이도를 동시에 갖춘 '예술 작품'급 콜라브.",
    history:
      "Bloodlust는 화려한 비주얼과 극악의 난이도를 모두 갖춘 콜라브로, Knobbelboy가 베리파이했습니다. " +
      "'보기에는 더없이 아름답고 플레이하기엔 지옥 같다'는 평가를 받으며, 단순히 어려운 레벨을 넘어 GD 디자인의 " +
      "한 정점으로 꼽힙니다.\n\n" +
      "정교한 이펙트, 카메라 연출, 음악과 완벽하게 맞아떨어지는 구간 전환 등 '게임플레이와 연출의 조화'라는 면에서 " +
      "이후 제작되는 수많은 레벨에 영향을 주었습니다. 그만큼 베리파이 난도도 높아, 완주 영상이 공개되었을 때 큰 " +
      "주목을 받았습니다.\n\n" +
      "한동안 데몬리스트 정상권을 지켰으며, 지금도 '어렵기만 한 레벨'과 '예술적인 레벨'을 모두 만족시킨 보기 드문 " +
      "사례로 자주 언급됩니다.",
  },
  {
    id: "thinking-space",
    name: "Thinking Space",
    creator: "HidekiX",
    verifier: "Atomic",
    year: 2019,
    peakRank: "정상권",
    category: "역사",
    tag: "흑백 우주의 명작",
    motif: "stars",
    colors: ["#d8dcec", "#20242f"],
    summary: "흰색과 회색만으로 우주를 그려낸, 역사 깊은 개성파 명작.",
    history:
      "Thinking Space는 HidekiX가 만든 레벨로, 2019년 Atomic이 베리파이·공개했습니다. 흰색과 회색 음영만으로 우주와 " +
      "별을 표현한 독특한 색감이 특징입니다.\n\n" +
      "업데이트 2.0 시절에는 '불가능 레벨'로 여겨졌을 만큼 어려웠고, 특히 후반부의 난이도로 악명이 높았습니다. 화려한 " +
      "색을 배제하고 절제된 흑백 톤으로 분위기를 잡은 점에서, 시각적으로도 한 시대를 대표하는 개성 있는 레벨로 꼽힙니다.\n\n" +
      "오랜 시간 정상권을 지키며 '역사 깊은 명작'으로 자리매김했고, 이후 후속작 'Thinking Space II'가 만들어질 만큼 " +
      "상징성이 큰 레벨입니다.",
  },
  {
    id: "zodiac",
    name: "Zodiac",
    creator: "Bianox 호스트 · 다수 제작자 (콜라브)",
    verifier: "Technical (정식 클리어)",
    year: 2019,
    peakRank: "톱급 익스트림",
    category: "1위 경쟁",
    tag: "베리파이 논란",
    motif: "stars",
    colors: ["#b388ff", "#0a0a33"],
    summary: "별자리를 테마로 한 대형 콜라브 — 핵 베리파이 논란으로도 유명한 레벨.",
    history:
      "Zodiac는 Bianox가 호스트한 별자리 테마의 대형 콜라브로, 정교한 연출과 긴 길이로 큰 주목을 받은 레벨입니다. " +
      "2017년부터 제작 소식이 알려지며 오랜 기간 기대를 모았습니다.\n\n" +
      "베리파이 과정은 GD 역사에서 손꼽히는 사건이 되었습니다. xander가 2019년 1월 베리파이를 주장했지만, 이후 핵 " +
      "사용 사실이 드러나면서 베리파이어 자격을 잃었습니다. 결국 같은 해 4월 9일 이 레벨을 정식으로 처음 클리어한 " +
      "Technical이 공식 첫 정복자로 인정받았습니다.\n\n" +
      "이 사건은 최상위권 기록에서 '무편집 영상·클릭 검증'이 왜 중요한지를 다시 한번 일깨운 대표적인 사례로 회자됩니다.",
    controversy:
      "xander는 2019년 1월 약 61,375회 시도 끝에 베리파이했다고 주장했지만, 핵 사용 사실을 숨겼다가 6월에 직접 고백했습니다. " +
      "이에 레벨의 권리와 베리파이어 타이틀은 정식으로 첫 클리어에 성공한 Technical에게 넘어갔습니다. (커뮤니티 기록 기준)",
  },
  {
    id: "the-golden",
    name: "The Golden",
    creator: "Bo & El3cTr0 (콜라브 호스트)",
    verifier: "nSwish",
    year: 2020,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "정글 속 황금",
    motif: "gold",
    colors: ["#ffcf33", "#1d3a14"],
    summary: "정글 테마의 황금빛 레벨로, 2020년 잠시 데몬리스트 정상에 오른 작품.",
    history:
      "The Golden은 Bo와 El3cTr0가 호스트한 대형 콜라브로, 2020년 nSwish가 베리파이했습니다. 2.0 인세인 데몬 " +
      "'El Dorado(엘도라도)'를 리메이크한 작품으로, 황금빛이 감도는 정글 테마가 특징입니다.\n\n" +
      "어둡고 흐릿한 데코레이션 속에서 빠른 웨이브와 까다로운 타이밍을 요구해, 'VSC' 같은 챌린지를 떠올리게 하는 " +
      "긴장감 있는 분위기로 유명합니다.\n\n" +
      "원래는 Tartarus를 넘어서는 난이도로 기획되었지만, 호스트의 요청으로 nSwish가 일부 구간을 크게 너프(완화)했습니다. " +
      "그럼에도 2020년 5월 데몬리스트 1위에 올라 Tartarus를 잠시 제쳤고, 이후 두 레벨이 순위를 주고받았습니다.",
  },
  {
    id: "tartarus",
    name: "Tartarus",
    creator: "콜라브 (다수 제작자)",
    verifier: "Dolphy",
    year: 2020,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "1위 등극",
    motif: "fire",
    colors: ["#ff7a18", "#3a0a4a"],
    summary: "2020년 데몬리스트 1위에 오른 초고난도 콜라브.",
    history:
      "Tartarus는 2020년 Dolphy가 베리파이하며 데몬리스트 1위에 오른 레벨입니다. 그리스 신화에서 '가장 깊은 " +
      "지옥'을 뜻하는 이름처럼, 이전 1위 레벨들을 뛰어넘는 난이도로 큰 화제가 되었습니다.\n\n" +
      "여러 구간이 저마다 다른 방식으로 플레이어를 시험하기 때문에, 한 구간을 익히면 다음 구간이 또 다른 벽으로 " +
      "다가오는 구조입니다. 그래서 베리파이가 완료되기까지 막대한 양의 연습과 어택, 그리고 흔들리지 않는 멘탈이 " +
      "요구되었습니다.\n\n" +
      "베리파이 직후 곧바로 정상에 올랐지만, 이 시기는 익스트림 데몬 경쟁이 가장 치열해진 때이기도 했습니다. " +
      "이후 Slaughterhouse, Acheron 등 차세대 강자들이 연이어 등장하면서 1위 자리는 빠르게 교체되어 갔습니다.",
  },
  {
    id: "slaughterhouse",
    name: "Slaughterhouse",
    creator: "icedcave 호스트 · 다수 제작자 (콜라브)",
    verifier: "Doggie",
    year: 2021,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "1위 등극",
    motif: "slaughter",
    colors: ["#ff1f3a", "#1a0006"],
    video: "7W5bZJY2IPI",
    summary: "2021년 정상에 오른 잔혹한 난이도의 대형 콜라브.",
    history:
      "Slaughterhouse는 icedcave가 호스트한 대형 콜라브로, 2021년 데몬리스트 1위에 오른 레벨입니다. 이름 그대로 " +
      "살벌한 난이도로 악명이 높았으며, 각 구간마다 서로 다른 제작자의 색이 뚜렷하게 드러납니다.\n\n" +
      "구간마다 요구하는 기술이 크게 달라, 한 가지 컨트롤만 잘해서는 절대 클리어할 수 없습니다. 정밀 점프, 타이밍, " +
      "암기, 순간 반응까지 종합적인 실력이 필요해 '진정한 종합 시험장'이라는 평가를 받았습니다.\n\n" +
      "베리파이는 치열한 경쟁이었습니다. Spaceuk가 2021년 10월 먼저 베리파이를 주장했으나 이후 핵 사용이 " +
      "드러나 타이틀이 박탈되었고, 같은 해 12월 19일 처음으로 정식 클리어한 Doggie가 공식 베리파이어로 인정받았습니다. " +
      "이후 Acheron 등 차세대 1위 레벨들에게 정상 자리를 넘겨주었습니다.",
  },
  {
    id: "sakupen-circles",
    name: "Sakupen Circles",
    creator: "DrCuber & GhostVandalf 호스트 (콜라브)",
    verifier: "Diamond",
    year: 2021,
    peakRank: "톱급 나인서클즈",
    category: "1위 경쟁",
    tag: "나인 서클즈류 정점",
    motif: "circles",
    colors: ["#ff2e4d", "#16001a"],
    summary: "1.9 시절 불가능 레벨을 리메이크한, 나인 서클즈류의 정점급 레벨.",
    history:
      "Sakupen Circles는 DrCuber와 GhostVandalf가 호스트하고 Diamond가 2021년 12월 29일 베리파이·공개한 " +
      "나인 서클즈(Nine Circles)류 레벨입니다. 1.9 시절 같은 이름의 불가능 레벨을 리메이크한 작품으로, 옛 레벨 " +
      "Iron God의 게임플레이 아이디어도 일부 가져왔습니다.\n\n" +
      "원본 게임플레이는 Nick24가 만들었고 Muffy450이 곳곳을 다듬었습니다. 살벌한 붉은 연출과 극도로 빠른 웨이브 " +
      "구간이 특징으로, 나인 서클즈 장르가 도달한 난이도의 정점을 보여줍니다.\n\n" +
      "이름이 비슷한 'Sakupen Hell'과는 전혀 다른 레벨이니 주의하세요. 나인 서클즈 장르에 속하는 쪽은 이 " +
      "Sakupen Circles입니다.",
  },
  {
    id: "acheron",
    name: "Acheron",
    creator: "Ryamu",
    verifier: "Zoink",
    year: 2022,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "1위 등극",
    motif: "spikes",
    colors: ["#9b5cff", "#1b0a3a"],
    summary: "2022년 Zoink의 베리파이로 정상에 오른 보라빛 극한 레벨.",
    history:
      "Acheron은 Ryamu가 제작하고 2022년 Zoink가 베리파이하며 데몬리스트 1위에 오른 레벨입니다. 그리스 신화 " +
      "속 '고통의 강' 이름을 딴 만큼, 처음부터 끝까지 고밀도의 정밀 컨트롤 구간으로 가득 차 있습니다.\n\n" +
      "특히 빠른 입력과 좁은 간격이 끊임없이 이어져, 한 번의 작은 실수도 곧바로 죽음으로 이어집니다. 그래서 " +
      "베리파이 도전 자체가 큰 화제가 되었고, Zoink의 클리어 인증은 당시 커뮤니티에서 크게 회자되었습니다.\n\n" +
      "Zoink는 이후 차세대 최강 레벨의 베리파이에도 이름을 올리며, 익스트림 데몬 씬을 대표하는 플레이어 중 한 명으로 " +
      "확실히 자리매김했습니다.",
  },
  {
    id: "limbo",
    name: "LIMBO",
    creator: "MindCap (콜라브 호스트, 코호스트 Djoxy)",
    verifier: "BGram",
    year: 2022,
    peakRank: "톱 7",
    category: "혁신",
    tag: "메모리 게임플레이",
    motif: "limbo",
    colors: ["#2a2350", "#080612"],
    video: "ryBbuH_SPbs",
    summary: "'같은 구간도 매번 다르게' — 암기를 무력화한 혁신적 메모리 데몬.",
    history:
      "LIMBO는 MindCap이 호스트한 대형 콜라브로(코호스트 Djoxy), 2022년 11월 BGram이 약 10만 9천 번의 시도 끝에 " +
      "베리파이했습니다. 인디고·짙은 파랑·붉은색을 섞은 색감과, 일부러 옛 1.9 스타일을 살린 디자인이 특징입니다.\n\n" +
      "이 레벨이 '혁신적'으로 불리는 이유는 독특한 게임플레이 메커니즘 때문입니다. 화면을 가리는 시각 방해 없이도 외워야 " +
      "할 것이 끝없이 나오는 '메모리(memory) 데몬'을 지향했고, 특히 87% 지점의 '키(key)' 구간은 8개의 키가 매번 다른 " +
      "순서로 섞여 나오도록 설계되어 단순 암기를 무력화했습니다.\n\n" +
      "즉 '같은 구간이라도 매번 다르게 나오게 만든다'는 발상으로, 익스트림 데몬의 설계 방식 자체에 새로운 아이디어를 " +
      "더한 레벨로 평가받습니다.",
  },
  {
    id: "avernus",
    name: "Avernus",
    creator: "Bo & PockeWindfish (콜라브 호스트)",
    verifier: "Zoink",
    year: 2023,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "1위 등극",
    motif: "fire",
    colors: ["#ff4d1a", "#1a0600"],
    summary: "2023년 Zoink가 베리파이하며 Acheron을 제치고 정상에 오른 화산 테마 레벨.",
    history:
      "Avernus는 Bo와 PockeWindfish가 호스트하고 Kyhros가 코호스트한 대형 콜라브로, 2023년 3월 Zoink가 " +
      "베리파이했습니다. 'Avernus'는 로마 신화에서 저승으로 통하는 화산 분화구를 뜻하는 이름으로, 그에 어울리는 " +
      "붉고 뜨거운 분위기를 지녔습니다.\n\n" +
      "데몬리스트에서 2위로 시작했다가 곧 1위로 올라서며 Acheron을 제쳤고, 한때 '게임에서 가장 어려운 정식 레벨'로 " +
      "기록되었습니다.\n\n" +
      "Zoink는 이 Avernus를 포함해 Acheron, Tidal Wave를 1년 남짓한 기간에 연속으로 베리파이하며, '세 개의 1위 레벨을 " +
      "연달아 검증한 최초의 플레이어'라는 진기록을 세웠습니다.",
  },
  {
    id: "tidal-wave",
    name: "Tidal Wave",
    creator: "OniLink",
    verifier: "Zoink",
    year: 2023,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "차세대 정점",
    motif: "tidal",
    colors: ["#00e0d0", "#003a66"],
    video: "frjtBcNI6dI",
    summary: "2023년 Zoink가 베리파이한, 한 시대를 대표하는 최강 레벨.",
    history:
      "Tidal Wave는 OniLink가 제작하고 2023년 Zoink가 베리파이한 레벨로, 오랜 기간 데몬리스트 정상권을 지킨 " +
      "차세대 최강 레벨 중 하나입니다. 거대한 파도(tidal wave)를 테마로 한 압도적인 비주얼과, 한 치의 실수도 " +
      "허용하지 않는 난이도가 결합되어 있습니다.\n\n" +
      "특히 후반부의 길고 빽빽한 구간은 '인간이 집중력을 유지할 수 있는 한계'를 시험한다는 평을 들을 만큼 가혹합니다. " +
      "베리파이가 완료되기까지 막대한 시간과 어택이 투입되었고, 완주 인증 영상은 공개 즉시 큰 화제를 모았습니다.\n\n" +
      "Tidal Wave는 '익스트림 데몬의 난이도가 과연 어디까지 올라갈 수 있는가'를 보여준 상징적인 레벨로, 이후 " +
      "도전자들의 새로운 목표이자 기준점이 되었습니다.",
  },
  {
    id: "thinking-space-2",
    name: "Thinking Space II",
    creator: "DrCuber & CairoX (콜라브 호스트)",
    verifier: "Zoink",
    year: 2025,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "전설의 후속작",
    motif: "stars",
    colors: ["#c7d0e8", "#161a26"],
    summary: "명작 Thinking Space의 정식 후속작으로, 2025년 데몬리스트 1위에 오른 우주 테마 콜라브.",
    history:
      "Thinking Space II는 명작 'Thinking Space'의 정식 후속작에 해당하는 대형 콜라브로, DrCuber와 CairoX가 호스트하고 " +
      "2025년 Zoink가 베리파이했습니다. 원작의 분위기를 잇는 우주·별 테마를 한층 발전된 디자인으로 풀어냈습니다.\n\n" +
      "베리파이 이후 정식 레이팅을 받기까지 약 넉 달이 걸렸고, 2025년 9월 데몬리스트 1위에 올랐습니다.\n\n" +
      "Zoink에게 이 레벨은 Acheron, Avernus, Tidal Wave에 이은 '네 번째 1위 레벨 베리파이'로, 정상급 베리파이어로서의 " +
      "위상을 다시 한 번 확인시킨 기록이기도 합니다.",
  },
  {
    id: "amethyst",
    name: "Amethyst",
    creator: "Mist (콜라브 호스트)",
    verifier: "wPopoff",
    year: 2025,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "보랏빛 수정 동굴",
    motif: "gem",
    colors: ["#b06bff", "#1a0930"],
    summary: "보라색 수정 동굴을 테마로 한, 2025년 데몬리스트 정상에 오른 레벨.",
    history:
      "Amethyst는 Mist가 호스트한 대형 콜라브로, 2025년 5월 wPopoff가 베리파이했습니다. 이름 그대로 자수정(amethyst)이 " +
      "박힌 수정 동굴을 테마로, 파랑·분홍·빨강에 보라색이 어우러진 화려한 색감이 특징입니다.\n\n" +
      "극도로 좁은 비행(ship) 구간, 정밀한 타이밍, 그리고 중력·크기 변환 포털이 섞인 까다로운 웨이브 구간으로 " +
      "악명이 높습니다.\n\n" +
      "2025년 6월 레이팅을 받으며 Tidal Wave를 제치고 데몬리스트 1위에 올랐습니다. 이후 Flamewall 등 새로운 강자가 " +
      "등장하며 순위가 조정되었지만, 한 시대의 최정상을 장식한 레벨로 남았습니다.",
  },
  {
    id: "flamewall",
    name: "Flamewall",
    creator: "Narwall 호스트 · RicoLP 외 (콜라브)",
    verifier: "Cuatrocientos",
    year: 2025,
    peakRank: "톱 3급",
    category: "1위 경쟁",
    tag: "초장편 톱급",
    motif: "fire",
    colors: ["#ff7a18", "#3a0a00"],
    summary: "6분 46초에 달하는 초장편 — 톱 1급 난이도로 화제가 된 대형 콜라브.",
    history:
      "Flamewall는 Narwall가 호스트·공개한(이전 호스트 RicoLP) 대형 콜라브로, Cuatrocientos가 2025년 9월 21일 " +
      "약 221,703회 시도 끝에 베리파이했습니다. 당시 톱 1급 난이도 레벨 중 가장 긴 6분 46초 길이로, 54개 파트와 " +
      "40만 개가 넘는 오브젝트로 이루어졌습니다.\n\n" +
      "Cuatrocientos가 이 레벨 이전에 클리어한 최고 난이도가 Belladonna였기에, 역대급으로 큰 난이도 점프를 한 " +
      "베리파이로도 화제가 되었습니다.\n\n" +
      "100명이 넘는 플레이테스터와 데코레이터가 참여했으며, Geometry Dash 2025 어워드에서 'Best Extreme Classic'을 " +
      "수상했습니다.",
  },
  {
    id: "sakupen-circles-unnerfed",
    name: "Sakupen Circles (Unnerfed)",
    creator: "Nick24 (원본 1.9)",
    verifier: "ad3usgmd",
    year: 2025,
    peakRank: "역대급 나인서클즈",
    category: ["미평가", "불가능 레벨", "역사"],
    tag: "10년 만의 베리파이",
    motif: "circles",
    colors: ["#ff2e4d", "#120006"],
    summary: "10년 가까이 '불가능'으로 남아 있던 1.9 원본 나인 서클즈가 2025년 마침내 베리파이됐다.",
    history:
      "이 레벨은 흔히 'Unnerfed Sakupen Circles'(USKC)로 불리는, Nick24가 1.9 시절 만든 원본 나인 서클즈류 " +
      "레벨입니다. 2021년 Diamond가 베리파이한 'Sakupen Circles' 리메이크와 달리, 이쪽은 악명 높은 미니 웨이브 " +
      "스팸 구간이 전혀 너프되지 않은 원본 그대로의 버전입니다.\n\n" +
      "두 블록 간격을 통과하는 극한의 컨트롤 미니 웨이브 스팸(약 59%~66%) 때문에 거의 10년간 '인간이 클리어할 수 " +
      "없는 레벨'로 여겨졌습니다. 2021년 리메이크에서 Diamond가 이 구간을 크게 너프했고, 원본의 난이도를 보여주려 " +
      "'포즈 버퍼링' 같은 꼼수를 시연하자 RobTop이 빠른 포즈 사용을 제한하는 패치를 넣기도 했습니다.\n\n" +
      "결국 2025년 7월 15일, 러시아 플레이어 ad3usgmd가 약 267,516회 시도 끝에 너프 없는 원본을 베리파이하며 " +
      "역대 가장 어려운 나인 서클즈 레벨 중 하나로 기록됐습니다. 이후 2025년 10월 17일 ROZE가 약 45,000회 만에 " +
      "첫 빅터(legitimate victor)에 올랐습니다.\n\n" +
      "이름이 비슷한 'Sakupen Hell', 그리고 같은 이름의 2021년 리메이크와 혼동하지 않도록 주의하세요.",
  },
  {
    id: "orbit",
    name: "ORBIT",
    creator: "MindCap (콜라브 호스트)",
    verifier: "Zoink",
    year: 2026,
    peakRank: "톱 5",
    category: "혁신",
    tag: "오브로 이루어진 우주",
    motif: "orbit",
    colors: ["#4d7bff", "#0a0a2e"],
    summary: "모든 입력이 '오브'인 깊은 우주 테마 — 독특한 플레이로 신화(Mythic) 등급을 받은 레벨.",
    history:
      "ORBIT은 MindCap이 호스트한 대형 콜라브로, 2026년 2월 Zoink가 베리파이했습니다. 행성·별·블랙홀 같은 천체를 " +
      "오브(orb)로 표현한 깊은 우주 테마가 특징입니다.\n\n" +
      "가장 큰 특징은 '모든 입력이 오브'라는 점입니다. 일반적인 익스트림 데몬과는 조작 감각 자체가 크게 달라, 매우 독특한 " +
      "플레이 경험을 제공합니다.\n\n" +
      "베리파이 다음 날 곧바로 레이팅을 받았고, 클래식 익스트림 데몬으로는 처음으로 '신화(Mythic)' 등급을 받았습니다. " +
      "이후 데몬리스트 톱 5권에 자리하며, MindCap이 만들어내는 혁신적 설계의 흐름을 다시 한 번 보여주었습니다.",
  },
  {
    id: "society",
    name: "Society",
    creator: "Neomarbilan 호스트 (콜라브)",
    verifier: "wPopoff",
    year: 2026,
    peakRank: "1위",
    category: "1위 경쟁",
    tag: "신(新) 1위",
    motif: "spikes",
    colors: ["#00e5ff", "#10103a"],
    summary: "Escalator의 후속격 대형 콜라브 — 2026년 새롭게 정상에 오른 레벨.",
    history:
      "Society는 Neomarbilan가 호스트한 대형 콜라브로, wPopoff가 2026년 6월 20일 베리파이하며 데몬리스트 1위에 " +
      "오른 레벨입니다. 인기 레벨 Escalator의 후속격 작품으로 제작되었습니다.\n\n" +
      "최신 세대의 톱 1 경쟁을 보여주는 레벨로, 베리파이 직후 곧바로 정상에 자리하며 큰 화제를 모았습니다.\n\n" +
      "데몬리스트 최상위권은 늘 빠르게 교체되는 만큼, 순위와 위상은 이후에도 계속 변동될 수 있습니다.",
  },
  {
    id: "silent-clubstep",
    name: "Silent Clubstep",
    creator: "여러 버전 존재 (Clubstep 개조)",
    verifier: "정상 클리어 미확인",
    year: "—",
    peakRank: "비공식",
    category: "불가능 레벨",
    tag: "전설의 불가능 레벨",
    motif: "sound",
    colors: ["#33ff8a", "#062b18"],
    summary: "사람이 손으로 깨는 것이 사실상 불가능하다고 여겨지는 '불가능 레벨'의 대명사.",
    history:
      "Silent Clubstep은 게임 공식 레벨 'Clubstep'을 극한으로 개조한 레벨로, 등장 당시부터 '인간이 정상적으로 깰 수 " +
      "없는 레벨'의 대표격으로 불려 왔습니다. 찰나의 오차도 허용하지 않는 입력이 끊임없이 이어져, 일반적인 플레이로는 " +
      "클리어가 사실상 불가능하다고 평가됩니다.\n\n" +
      "이런 '불가능 레벨'은 실제로 깨는 것보다, '인간 능력의 한계는 어디까지인가'를 시험하는 상징적 의미가 더 큽니다. " +
      "그래서 데몬리스트 같은 공식 난이도 순위에는 보통 오르지 않으며, 별도의 '전설/불가능 레벨' 카테고리로 다뤄지곤 " +
      "합니다.\n\n" +
      "여러 사람이 조금씩 다른 버전을 만들어 왔기 때문에 '진짜 Silent Clubstep'이 무엇인지조차 의견이 갈리며, " +
      "그 자체로 GD 역사에서 가장 신화화된 레벨 중 하나로 남아 있습니다.",
    controversy:
      "이 레벨의 역사는 곧 '치팅 논란의 역사'이기도 합니다. 클리어를 주장한 영상들은 대부분 TAS(툴 보조 플레이), " +
      "속도 조작, 영상 편집 의혹에 휩싸였고, '진짜 핸드(맨손) 클리어가 존재하는가'는 지금까지도 끝나지 않은 논쟁입니다.\n\n" +
      "역설적으로 이 끝없는 논란 덕분에, Silent Clubstep은 '검증 문화가 왜 중요한가'를 커뮤니티 전체에 각인시킨 대표 " +
      "사례가 되었습니다.",
  },
];
