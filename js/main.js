/* =========================================================
   지오메트리 대시 가이드 — 메인 스크립트
   data.js 의 LEVELS 배열로 카드를 그리고, 모달을 제어합니다.
   ========================================================= */

(function () {
  "use strict";

  const grid = document.getElementById("levelGrid");
  const filtersEl = document.getElementById("filters");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  let activeCategory = "전체"; // 현재 선택된 필터

  // 텍스트를 안전하게 출력하기 위한 이스케이프
  function esc(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // 레벨의 분류 목록 (문자열 하나 또는 배열 모두 허용)
  function catsOf(level) {
    if (!level.category) return [];
    return Array.isArray(level.category) ? level.category : [level.category];
  }

  // 레벨이 특정 분류에 속하는지
  function hasCat(level, cat) {
    return catsOf(level).indexOf(cat) !== -1;
  }

  /* -----------------------------------------------------------
     대표 일러스트 생성
     level.image 가 있으면 그 이미지를, 없으면 테마 색으로
     지오메트리 대시 스타일 SVG(큐브가 가시를 넘는 장면)를 그립니다.
     ----------------------------------------------------------- */

  // 문자열로부터 간단한 시드 생성 → 레벨마다 일관된(매번 같은) 모양
  function seedFrom(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  // 시드 기반 의사난수 생성기 (mulberry32)
  function rngFrom(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ── 공통 도형 헬퍼 ──────────────────────────────────────────
  // 바닥(지면) 라인
  function artGround(c1, c2) {
    return (
      '<rect x="0" y="148" width="400" height="32" fill="' + c2 + '" opacity="0.35"/>' +
      '<line x1="0" y1="148" x2="400" y2="148" stroke="' + c1 + '" stroke-width="2"/>'
    );
  }
  // 4갈래 반짝임 별
  function star4(x, y, r, c) {
    const q = r * 0.28;
    return (
      '<path d="M ' + x + ' ' + (y - r) + ' L ' + (x + q) + ' ' + (y - q) +
      ' L ' + (x + r) + ' ' + y + ' L ' + (x + q) + ' ' + (y + q) +
      ' L ' + x + ' ' + (y + r) + ' L ' + (x - q) + ' ' + (y + q) +
      ' L ' + (x - r) + ' ' + y + ' L ' + (x - q) + ' ' + (y - q) +
      ' Z" fill="' + c + '"/>'
    );
  }
  // 악마 해골 (어두운 실루엣 + 붉은 윤곽 · 빛나는 눈 · 뿔)
  function demonSkull(cx, cy, sc, c1, c2) {
    let g = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + sc + ')" opacity="0.92">';
    // 뿔
    g += '<path d="M -16 -20 Q -44 -34 -40 -64 Q -34 -40 -8 -26 Z" fill="' + c2 + '" stroke="' + c1 + '" stroke-width="1.4"/>';
    g += '<path d="M 16 -20 Q 44 -34 40 -64 Q 34 -40 8 -26 Z" fill="' + c2 + '" stroke="' + c1 + '" stroke-width="1.4"/>';
    // 두개골 + 턱
    g += '<path d="M -26 -8 C -28 -30 -14 -40 0 -40 C 14 -40 28 -30 26 -8 ' +
         'C 25 4 20 10 16 16 L 10 30 L 4 24 L 0 32 L -4 24 L -10 30 L -16 16 ' +
         'C -20 10 -25 4 -26 -8 Z" fill="' + c2 + '" stroke="' + c1 + '" stroke-width="1.6"/>';
    // 눈 발광
    g += '<circle cx="-12" cy="-8" r="7" fill="' + c1 + '" opacity="0.45"/>';
    g += '<circle cx="12" cy="-8" r="7" fill="' + c1 + '" opacity="0.45"/>';
    // 악마의 눈 (안쪽으로 치켜뜬 슬랜트)
    g += '<polygon points="-19,-13 -6,-7 -9,-1 -18,-3" fill="' + c1 + '"/>';
    g += '<polygon points="19,-13 6,-7 9,-1 18,-3" fill="' + c1 + '"/>';
    // 코
    g += '<polygon points="-3,2 3,2 0,11" fill="' + c1 + '" opacity="0.75"/>';
    // 이빨
    g += '<g fill="' + c1 + '" opacity="0.6">';
    g += '<polygon points="-9,16 -5,16 -7,24"/>';
    g += '<polygon points="-3,17 1,17 -1,26"/>';
    g += '<polygon points="3,16 7,16 5,24"/>';
    g += "</g>";
    g += "</g>";
    return g;
  }

  // ── 모티프별 전경 그리기 ────────────────────────────────────
  const MOTIFS = {
    // 기본: 큐브가 가시를 넘는 장면
    spikes: function (c1, c2, rng) {
      let s = artGround(c1, c2);
      let x = 24;
      while (x < 376) {
        const w = 16 + Math.floor(rng() * 12);
        const h = 18 + Math.floor(rng() * 30);
        s += '<polygon points="' + x + ',148 ' + (x + w) + ',148 ' + (x + w / 2) + ',' + (148 - h) + '" fill="' + c1 + '" opacity="0.9"/>';
        x += w + 12 + Math.floor(rng() * 28);
      }
      s += '<g transform="rotate(12 70 135)"><rect x="56" y="122" width="26" height="26" rx="5" fill="' + c2 + '" stroke="#fff" stroke-width="2"/><rect x="63" y="129" width="12" height="12" rx="2" fill="#fff" opacity="0.85"/></g>';
      return s;
    },
    // 어센트: 흑백 고대비 세계 + 파스텔 무지개 계단 + 빛나는 핀휠 버스트
    ascent: function (c1, c2, rng) {
      const pastel = ["#ff9ec4", "#ffc9a7", "#fff3a7", "#a7ffd0", "#a7d8ff", "#c9a7ff", "#ffa7e8"];
      let s = "";

      // 0) 어둠 속 무지갯빛 글로우 (가장 뒤 레이어)
      const rainbow = ["#ff4d6d", "#ff9e3d", "#ffe23d", "#46e06a", "#32d4ff", "#5b7bff", "#c15cff"];
      for (let i = 0; i < rainbow.length; i++) {
        const gx = 36 + (i * 328) / (rainbow.length - 1) + (rng() * 30 - 15);
        const gy = 40 + rng() * 100;
        const gr = 56 + rng() * 44;
        s += '<circle cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) +
          '" r="' + gr.toFixed(1) + '" fill="' + rainbow[i] + '" opacity="0.11"/>';
      }

      // 1) 어두운 기둥 (흑백 대비 배경 구조물)
      s += '<g fill="#15161c" stroke="#3a3f4a" stroke-width="1">';
      s += '<rect x="40" y="20" width="34" height="160"/>';
      s += '<rect x="116" y="46" width="24" height="134"/>';
      s += '<rect x="300" y="8" width="42" height="172"/>';
      s += "</g>";

      // 2) 흰 구름 (좌상단)
      s += '<g fill="#ffffff" opacity="0.95">';
      s += '<circle cx="42" cy="34" r="13"/><circle cx="62" cy="29" r="17"/><circle cx="82" cy="36" r="12"/>';
      s += '<rect x="42" y="34" width="40" height="14"/>';
      s += "</g>";

      // 3) 흰 별
      s += star4(252, 38, 11, "#ffffff");

      // 4) 파스텔 무지개 계단 (좌하 → 우상 상승 = ascent)
      for (let i = 0; i < 7; i++) {
        const x = 150 + i * 26;
        const y = 138 - i * 15;
        s += '<rect x="' + x + '" y="' + y + '" width="26" height="26" rx="1" fill="' + pastel[i % pastel.length] + '" opacity="0.92"/>';
      }

      // 5) 빛나는 핀휠 버스트 (시안/그린)
      function burst(cx, cy, r) {
        let b = '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 4) + '" fill="#5fffe0" opacity="0.18"/>';
        const petals = 12;
        for (let k = 0; k < petals; k++) {
          const a = (k / petals) * Math.PI * 2;
          const x1 = (cx + Math.cos(a) * r * 0.45).toFixed(1);
          const y1 = (cy + Math.sin(a) * r * 0.45).toFixed(1);
          const x2 = (cx + Math.cos(a) * r).toFixed(1);
          const y2 = (cy + Math.sin(a) * r).toFixed(1);
          b += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
            '" stroke="' + (k % 2 ? "#6cff9e" : "#5fe9ff") + '" stroke-width="2.4"/>';
        }
        b += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.4).toFixed(1) + '" fill="none" stroke="#5fe9ff" stroke-width="2"/>';
        b += '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="#0a0a16"/>';
        return b;
      }
      s += burst(74, 96, 22);
      s += burst(120, 140, 15);

      // 6) 붉은 포인트 블록
      s += '<g fill="#ff3b3b">';
      for (let i = 0; i < 4; i++) {
        const rx = 60 + Math.floor(rng() * 290);
        const ry = 28 + Math.floor(rng() * 110);
        s += '<rect x="' + rx + '" y="' + ry + '" width="7" height="7"/>';
      }
      s += "</g>";

      return s;
    },
    // 피: 위에서 흘러내리는 핏방울 + 바닥 웅덩이
    blood: function (c1, c2, rng) {
      let s = '<rect x="0" y="150" width="400" height="30" fill="' + c1 + '" opacity="0.5"/>';
      for (let i = 0; i < 9; i++) {
        const x = 22 + i * 44 + Math.floor(rng() * 10);
        const len = 18 + Math.floor(rng() * 70);
        s += '<rect x="' + (x - 4) + '" y="0" width="8" height="' + len + '" rx="4" fill="' + c1 + '" opacity="0.85"/>';
        s += '<circle cx="' + x + '" cy="' + (len + 4) + '" r="6" fill="' + c1 + '" opacity="0.85"/>';
      }
      return s;
    },
    // 슬러터하우스: 칠흑 속 진홍빛 글로우 + 악마 해골 + 고딕 문구
    slaughter: function (c1, c2, rng) {
      let s = "";

      // 1) 중앙에서 번지는 붉은 글로우 (반투명 원을 겹쳐 방사형처럼)
      s += '<circle cx="200" cy="78" r="155" fill="' + c1 + '" opacity="0.07"/>';
      s += '<circle cx="200" cy="78" r="95" fill="' + c1 + '" opacity="0.1"/>';

      // 2) 양옆의 어두운 붉은 기하 구조물 (실루엣 블록)
      s += '<g opacity="0.4" fill="' + c2 + '" stroke="' + c1 + '" stroke-width="1.2">';
      s += '<rect x="12" y="22" width="56" height="22" rx="2"/>';
      s += '<rect x="332" y="26" width="56" height="22" rx="2"/>';
      s += "</g>";

      // 3) 악마 해골 (배경 중앙)
      s += demonSkull(200, 72, 1.18, c1, c2);

      // 4) 바닥 + 붉은 가시 열 (실루엣)
      s += '<rect x="0" y="150" width="400" height="30" fill="' + c2 + '" opacity="0.78"/>';
      s += '<line x1="0" y1="150" x2="400" y2="150" stroke="' + c1 + '" stroke-width="2" opacity="0.85"/>';
      let x = 14;
      while (x < 386) {
        const w = 14 + Math.floor(rng() * 10);
        const h = 13 + Math.floor(rng() * 16);
        s += '<polygon points="' + x + ',150 ' + (x + w) + ',150 ' + (x + w / 2) + ',' + (150 - h) + '" fill="' + c1 + '" opacity="0.68"/>';
        x += w + 10 + Math.floor(rng() * 16);
      }

      // 5) 떠다니는 붉은 글로우 오브 (네 귀퉁이)
      const orbs = [[40, 48], [360, 44], [54, 116], [348, 120]];
      for (let i = 0; i < orbs.length; i++) {
        const ox = orbs[i][0], oy = orbs[i][1];
        const orr = 6 + Math.floor(rng() * 6);
        s += '<circle cx="' + ox + '" cy="' + oy + '" r="' + (orr * 2.2).toFixed(1) + '" fill="' + c1 + '" opacity="0.1"/>';
        s += '<circle cx="' + ox + '" cy="' + oy + '" r="' + orr + '" fill="' + c1 + '" opacity="0.5"/>';
        s += '<circle cx="' + ox + '" cy="' + oy + '" r="' + (orr * 0.4).toFixed(1) + '" fill="#fff" opacity="0.5"/>';
      }

      // 6) SLAUGHTERHOUSE 문구 (전경, 고딕풍 레드)
      s += '<text x="200" y="134" text-anchor="middle" textLength="346" ' +
        'lengthAdjust="spacingAndGlyphs" font-family="Georgia, &apos;Times New Roman&apos;, serif" ' +
        'font-weight="bold" font-size="27" fill="' + c1 + '" stroke="#1a0006" ' +
        'stroke-width="0.9" paint-order="stroke">SLAUGHTERHOUSE</text>';

      return s;
    },
    // 불: 바닥에서 솟는 불꽃
    fire: function (c1, c2, rng) {
      let s = artGround(c1, c2);
      for (let i = 0; i < 7; i++) {
        const x = 30 + i * 52 + Math.floor(rng() * 12);
        const h = 40 + Math.floor(rng() * 58);
        s += '<path d="M ' + x + ' 148 Q ' + (x - 14) + ' ' + (148 - h * 0.5) + ' ' + x + ' ' + (148 - h) + ' Q ' + (x + 14) + ' ' + (148 - h * 0.5) + ' ' + x + ' 148 Z" fill="' + c1 + '" opacity="0.8"/>';
        s += '<path d="M ' + x + ' 148 Q ' + (x - 7) + ' ' + (148 - h * 0.4) + ' ' + x + ' ' + (148 - h * 0.6) + ' Q ' + (x + 7) + ' ' + (148 - h * 0.4) + ' ' + x + ' 148 Z" fill="' + c2 + '" opacity="0.75"/>';
      }
      return s;
    },
    // 웨이브: 날카로운 지그재그 라인
    wave: function (c1, c2, rng) {
      let s = artGround(c1, c2);
      let pts = '';
      let x = 0;
      let up = true;
      while (x <= 400) {
        pts += x + ',' + (up ? 58 : 122) + ' ';
        x += 18 + Math.floor(rng() * 14);
        up = !up;
      }
      s += '<polyline points="' + pts.trim() + '" fill="none" stroke="' + c1 + '" stroke-width="4" opacity="0.9"/>';
      s += '<rect x="4" y="50" width="15" height="15" rx="3" fill="' + c2 + '" stroke="#fff" stroke-width="2"/>';
      return s;
    },
    // 해일: 굽이치는 큰 파도
    tidal: function (c1, c2) {
      let s = '';
      s += '<path d="M 0 110 C 80 70, 160 150, 240 100 S 400 90, 400 110 L 400 180 L 0 180 Z" fill="' + c1 + '" opacity="0.5"/>';
      s += '<path d="M 0 132 C 90 102, 170 172, 260 126 S 400 122, 400 136 L 400 180 L 0 180 Z" fill="' + c2 + '" opacity="0.6"/>';
      s += '<circle cx="300" cy="95" r="11" fill="none" stroke="' + c1 + '" stroke-width="4" opacity="0.85"/>';
      return s;
    },
    // 동심원: Nine Circles류 상징
    circles: function (c1, c2) {
      let s = '';
      let i = 0;
      for (let r = 18; r <= 92; r += 16) {
        s += '<circle cx="200" cy="88" r="' + r + '" fill="none" stroke="' + (i % 2 ? c2 : c1) + '" stroke-width="3" opacity="0.8"/>';
        i++;
      }
      s += '<circle cx="200" cy="88" r="7" fill="' + c1 + '"/>';
      return s;
    },
    // 얼음: 결정(다이아몬드) 조각들
    ice: function (c1, c2, rng) {
      let s = artGround(c1, c2);
      for (let i = 0; i < 6; i++) {
        const x = 45 + i * 60;
        const y = 58 + Math.floor(rng() * 40);
        const w = 9 + Math.floor(rng() * 8);
        const h = 22 + Math.floor(rng() * 22);
        s += '<polygon points="' + x + ',' + (y - h) + ' ' + (x + w) + ',' + y + ' ' + x + ',' + (y + h) + ' ' + (x - w) + ',' + y + '" fill="' + c1 + '" opacity="0.55" stroke="' + c2 + '" stroke-width="1.5"/>';
      }
      return s;
    },
    // 펄스: 심전도 같은 맥박 라인
    pulse: function (c1, c2) {
      let s = artGround(c1, c2);
      let d = 'M 0 92';
      let x = 0;
      while (x < 400) {
        d += ' L ' + (x + 30) + ' 92 L ' + (x + 38) + ' 48 L ' + (x + 46) + ' 132 L ' + (x + 54) + ' 92';
        x += 80;
      }
      s += '<path d="' + d + '" fill="none" stroke="' + c1 + '" stroke-width="3.5" opacity="0.9"/>';
      return s;
    },
    // 별: 우주/스타필드 (바닥 없음)
    stars: function (c1, c2, rng) {
      let s = '';
      for (let i = 0; i < 42; i++) {
        const x = Math.floor(rng() * 400);
        const y = Math.floor(rng() * 180);
        const r = (0.6 + rng() * 1.8).toFixed(1);
        s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" opacity="' + (0.35 + rng() * 0.5).toFixed(2) + '"/>';
      }
      for (let i = 0; i < 3; i++) {
        s += star4(60 + i * 130 + Math.floor(rng() * 30), 45 + Math.floor(rng() * 60), 10, c1);
      }
      return s;
    },
    // 황금: 금화 더미 + 반짝임
    gold: function (c1, c2, rng) {
      let s = artGround(c1, c2);
      for (let i = 0; i < 5; i++) {
        const x = 95 + i * 45;
        const y = 122 - Math.floor(rng() * 8);
        s += '<ellipse cx="' + x + '" cy="' + y + '" rx="16" ry="7" fill="' + c1 + '" stroke="' + c2 + '" stroke-width="2"/>';
      }
      s += star4(300, 58, 16, c1) + star4(332, 92, 9, c1) + star4(120, 52, 8, c1);
      return s;
    },
    // 열쇠: LIMBO의 상징 (열쇠 여러 개)
    key: function (c1, c2) {
      function key(cx, cy, sc, c) {
        return (
          '<g transform="translate(' + cx + ' ' + cy + ') scale(' + sc + ')" stroke="' + c + '" stroke-width="6" fill="none" stroke-linecap="round">' +
          '<circle cx="0" cy="0" r="12"/>' +
          '<line x1="12" y1="0" x2="46" y2="0"/>' +
          '<line x1="34" y1="0" x2="34" y2="11"/>' +
          '<line x1="44" y1="0" x2="44" y2="13"/>' +
          '</g>'
        );
      }
      return artGround(c1, c2) + key(110, 78, 1.1, c1) + key(235, 112, 0.85, c2) + key(305, 56, 0.7, c1);
    },
    // 림보: 어둠 속 무지갯빛 배경에 각기 다른 색의 열쇠들이 어지럽게 날뛰는 그림
    limbo: function (c1, c2, rng) {
      const palette = [
        "#ff3b3b", "#ff8a2c", "#ffe23d", "#bfff3d", "#46e06a",
        "#32d4ff", "#5b7bff", "#c15cff", "#ff5ca8",
      ];

      // 한 자루의 열쇠 (회전 가능) — 어떤 방향으로도 날뛰게
      function key(cx, cy, sc, rot, c) {
        return (
          '<g transform="translate(' + cx.toFixed(1) + " " + cy.toFixed(1) +
          ") rotate(" + rot.toFixed(1) + ") scale(" + sc.toFixed(2) + ')" ' +
          'stroke="' + c + '" stroke-width="3.2" fill="none" ' +
          'stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="-13" cy="0" r="6"/>' +
          '<line x1="-7" y1="0" x2="18" y2="0"/>' +
          '<line x1="9" y1="0" x2="9" y2="7"/>' +
          '<line x1="15" y1="0" x2="15" y2="8"/>' +
          "</g>"
        );
      }

      let s = "";

      // 1) 어둠 속 무지갯빛 글로우 (색색의 빛이 부드럽게 번짐)
      for (let i = 0; i < palette.length; i++) {
        const gx = 40 + (i * 320) / (palette.length - 1) + (rng() * 36 - 18);
        const gy = 45 + rng() * 92;
        const gr = 58 + rng() * 46;
        s += '<circle cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) +
          '" r="' + gr.toFixed(1) + '" fill="' + palette[i] + '" opacity="0.1"/>';
      }

      // 2) 날뛰는 색색의 열쇠 (느슨한 격자 + 흔들림 + 자유 회전)
      const cols = 3;
      for (let i = 0; i < palette.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = 68 + col * 132 + (rng() * 56 - 28);
        const cy = 40 + row * 46 + (rng() * 28 - 14);
        const sc = 0.85 + rng() * 0.6;
        const rot = rng() * 360;
        const c = palette[i];
        // 열쇠 색 후광
        s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) +
          '" r="' + (15 * sc).toFixed(1) + '" fill="' + c + '" opacity="0.16"/>';
        // 열쇠
        s += key(cx, cy, sc, rot, c);
      }

      return s;
    },
    // 보석: 깎인 면을 가진 크리스털 (Amethyst)
    gem: function (c1, c2) {
      const cx = 200, cy = 92;
      let s = '<polygon points="' + (cx - 40) + ',' + (cy - 30) + ' ' + (cx + 40) + ',' + (cy - 30) + ' ' + (cx + 55) + ',' + (cy - 10) + ' ' + cx + ',' + (cy + 56) + ' ' + (cx - 55) + ',' + (cy - 10) + '" fill="' + c1 + '" opacity="0.7" stroke="' + c2 + '" stroke-width="2"/>';
      s += '<g stroke="' + c2 + '" stroke-width="1.5" opacity="0.85">';
      s += '<line x1="' + (cx - 40) + '" y1="' + (cy - 30) + '" x2="' + (cx - 15) + '" y2="' + (cy - 10) + '"/>';
      s += '<line x1="' + (cx + 40) + '" y1="' + (cy - 30) + '" x2="' + (cx + 15) + '" y2="' + (cy - 10) + '"/>';
      s += '<line x1="' + (cx - 55) + '" y1="' + (cy - 10) + '" x2="' + (cx + 55) + '" y2="' + (cy - 10) + '"/>';
      s += '<line x1="' + (cx - 15) + '" y1="' + (cy - 10) + '" x2="' + cx + '" y2="' + (cy + 56) + '"/>';
      s += '<line x1="' + (cx + 15) + '" y1="' + (cy - 10) + '" x2="' + cx + '" y2="' + (cy + 56) + '"/>';
      s += '<line x1="' + (cx - 15) + '" y1="' + (cy - 10) + '" x2="' + (cx + 15) + '" y2="' + (cy - 10) + '"/>';
      s += '</g>';
      s += star4(cx + 62, cy - 28, 7, '#fff');
      return s;
    },
    // 궤도: 행성과 공전 궤도 (ORBIT, 바닥 없음)
    orbit: function (c1, c2) {
      const cx = 200, cy = 90;
      let s = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="120" ry="42" fill="none" stroke="' + c1 + '" stroke-width="2" opacity="0.7"/>';
      s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="80" ry="28" fill="none" stroke="' + c2 + '" stroke-width="2" opacity="0.7" transform="rotate(-18 ' + cx + ' ' + cy + ')"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="22" fill="' + c1 + '"/>';
      s += '<circle cx="' + (cx - 7) + '" cy="' + (cy - 7) + '" r="6" fill="#fff" opacity="0.45"/>';
      s += '<circle cx="' + (cx + 120) + '" cy="' + cy + '" r="7" fill="' + c2 + '" stroke="#fff" stroke-width="1.5"/>';
      return s;
    },
    // 사운드: 이퀄라이저 막대 (Silent Clubstep)
    sound: function (c1, c2, rng) {
      let s = artGround(c1, c2);
      let x = 30;
      let i = 0;
      while (x < 376) {
        const h = 18 + Math.floor(rng() * 92);
        s += '<rect x="' + x + '" y="' + (148 - h) + '" width="14" height="' + h + '" rx="2" fill="' + (i % 2 ? c2 : c1) + '" opacity="0.85"/>';
        x += 22;
        i++;
      }
      return s;
    },
  };

  function levelArt(level) {
    // 실제 이미지가 지정된 경우 그대로 사용
    if (level.image) {
      return '<img src="' + esc(level.image) + '" alt="' + esc(level.name) + '" loading="lazy" />';
    }

    const c1 = level.colors ? level.colors[0] : "#00e5ff";
    const c2 = level.colors ? level.colors[1] : "#ff2e92";
    const uid = "g-" + level.id;
    const rng = rngFrom(seedFrom(level.id));
    const draw = MOTIFS[level.motif] || MOTIFS.spikes;

    return (
      '<svg viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      esc(level.name) + ' 일러스트">' +
      '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + c1 + '"/>' +
      '<stop offset="1" stop-color="' + c2 + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="400" height="180" fill="url(#' + uid + ')"/>' +
      '<rect width="400" height="180" fill="#0a0a16" opacity="0.6"/>' +
      draw(c1, c2, rng) +
      "</svg>"
    );
  }

  // 필터 버튼 렌더링 (CATEGORIES 중 실제 데이터에 존재하는 것만)
  function renderFilters() {
    if (!filtersEl) return;
    const present = (typeof CATEGORIES !== "undefined" ? CATEGORIES : []).filter(
      function (cat) {
        return (
          cat === "전체" ||
          LEVELS.some(function (lv) {
            return hasCat(lv, cat);
          })
        );
      }
    );
    filtersEl.innerHTML = present
      .map(function (cat) {
        const count =
          cat === "전체"
            ? LEVELS.length
            : LEVELS.filter(function (lv) {
                return hasCat(lv, cat);
              }).length;
        const on = cat === activeCategory ? " is-active" : "";
        return (
          '<button class="filter-btn' +
          on +
          '" data-cat="' +
          esc(cat) +
          '">' +
          esc(cat) +
          ' <span class="count">' +
          count +
          "</span></button>"
        );
      })
      .join("");
  }

  // 카드 렌더링 (activeCategory 기준 필터)
  function renderCards() {
    if (!grid) return;
    const list = LEVELS.filter(function (lv) {
      return activeCategory === "전체" || hasCat(lv, activeCategory);
    });
    grid.innerHTML = list
      .map(function (lv) {
      return (
        '<article class="level-card" data-id="' +
        esc(lv.id) +
        '" tabindex="0">' +
        '<div class="card-art">' +
        levelArt(lv) +
        "</div>" +
        '<div class="card-body">' +
        '<span class="level-tag">' +
        esc(lv.tag) +
        "</span>" +
        catsOf(lv)
          .map(function (c) {
            return '<span class="level-tag tag-cat">' + esc(c) + "</span>";
          })
          .join("") +
        (lv.controversy ? '<span class="level-tag tag-warn">논란</span>' : "") +
        "<h3>" +
        esc(lv.name) +
        "</h3>" +
        '<p class="summary">' +
        esc(lv.summary) +
        "</p>" +
        '<div class="level-meta">' +
        "<span>제작 <b>" +
        esc(lv.creator) +
        "</b></span>" +
        "<span>베리파이 <b>" +
        esc(lv.verifier) +
        "</b></span>" +
        '<span class="peak">최고 ' +
        esc(lv.peakRank) +
        " · " +
        esc(String(lv.year)) +
        "</span>" +
        "</div>" +
        "</div>" +
        "</article>"
      );
    }).join("");
  }

  // 모달 열기
  function openModal(level) {
    const historyHtml = level.history
      .split("\n\n")
      .map(function (para) {
        return "<p>" + esc(para) + "</p>";
      })
      .join("");

    // 영상 섹션은 video(유튜브 ID) 필드가 있을 때만 표시
    let videoHtml = "";
    if (level.video) {
      const vid = encodeURIComponent(level.video);
      videoHtml =
        '<div class="modal-video">' +
        '<div class="video-label">🎬 플레이 영상</div>' +
        '<div class="video-frame">' +
        '<iframe src="https://www.youtube.com/embed/' + vid + '" ' +
        'title="' + esc(level.name) + ' 영상" ' +
        'loading="lazy" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        "allowfullscreen></iframe>" +
        "</div>" +
        "</div>";
    }

    // 논란 섹션은 controversy 필드가 있을 때만 표시
    let controversyHtml = "";
    if (level.controversy) {
      const paras = level.controversy
        .split("\n\n")
        .map(function (para) {
          return "<p>" + esc(para) + "</p>";
        })
        .join("");
      controversyHtml =
        '<div class="modal-controversy">' +
        '<div class="controversy-label">⚠️ 논란 · 커뮤니티 의견</div>' +
        paras +
        "</div>";
    }

    modalContent.innerHTML =
      '<span class="modal-tag">' +
      esc(level.tag) +
      "</span>" +
      "<h2>" +
      esc(level.name) +
      "</h2>" +
      '<div class="modal-art">' +
      levelArt(level) +
      "</div>" +
      '<div class="modal-stats">' +
      stat("제작 / 호스트", level.creator) +
      stat("베리파이", level.verifier) +
      stat("베리파이 연도", String(level.year)) +
      stat("최고 순위", level.peakRank) +
      "</div>" +
      '<div class="modal-history">' +
      historyHtml +
      "</div>" +
      videoHtml +
      controversyHtml;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function stat(label, value) {
    return (
      '<div class="stat"><div class="label">' +
      esc(label) +
      '</div><div class="value">' +
      esc(value) +
      "</div></div>"
    );
  }

  // 모달 닫기
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // 이벤트 연결
  function bindEvents() {
    // 필터 버튼
    if (filtersEl) {
      filtersEl.addEventListener("click", function (e) {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        activeCategory = btn.dataset.cat;
        renderFilters();
        renderCards();
      });
    }

    // 카드 클릭 / 키보드
    grid.addEventListener("click", function (e) {
      const card = e.target.closest(".level-card");
      if (card) handleSelect(card.dataset.id);
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".level-card");
        if (card) {
          e.preventDefault();
          handleSelect(card.dataset.id);
        }
      }
    });

    // 닫기 버튼 / 배경 클릭
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });

    // ESC 로 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  function handleSelect(id) {
    const level = LEVELS.find(function (lv) {
      return lv.id === id;
    });
    if (level) openModal(level);
  }

  // 초기화
  renderFilters();
  renderCards();
  bindEvents();
})();
