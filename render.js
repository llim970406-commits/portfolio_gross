/* ==========================================================
   v1.1 · 몽글이 핑크 render.js
   공통 옷장(../../data.js)과 코디표(../../jobs.js)를 읽어서 화면을 그려요.
   사례 하나 = 하나의 "장(chapter)":
     표지(제목·정보 띠·타깃 카드) → 질문 → 전략(이미지 위 번호 핀) → 결과(차트) → 반응
   보통은 이 파일을 고칠 필요가 없어요.
   ========================================================== */

(function () {
  var D = window.DATA;
  var J = window.JOBS;
  var BASE = window.ASSET_BASE || '';
  var app = document.getElementById('app');
  var jobId = document.body.getAttribute('data-job');

  /* v1.7: copy.js(명사형 말투 + 줄바꿈 문장)를 data.js·jobs.js 위에 덮어써요.
     배열은 같은 순서끼리, 글자는 통째로 바꿔요. 이 페이지 안에서만 바뀌어요. */
  function merge(t, s) {
    if (!s || !t) return t;
    Object.keys(s).forEach(function (k) {
      var v = s[k];
      if (Array.isArray(v) && Array.isArray(t[k])) {
        v.forEach(function (x, i) {
          if (x && typeof x === 'object' && t[k][i] && typeof t[k][i] === 'object') merge(t[k][i], x);
          else if (x !== undefined && x !== null) t[k][i] = x;
        });
      } else if (v && typeof v === 'object' && !Array.isArray(v) && t[k] && typeof t[k] === 'object') merge(t[k], v);
      else t[k] = v;
    });
    return t;
  }
  var CP = window.COPY || {};
  merge(D.cases, CP.cases);
  merge(J, CP.jobs);
  var ABOUT_LINE = (CP.profile && CP.profile.aboutLine) || D.profile.tagline;
  function koOf(job) { return job.koSp || job.ko; }
  var NO_TIPS = true;

  /* ---------- 몽글이 ----------
     pose: 'hi'(손 흔들기) / 'point'(윙크) / 'cheer'(만세) / 'sad'(시무룩) / 'calm'(다짐) */
  /* v1.8: 몽글이 → 사이다 병 캐릭터로 통일 (댓글 피드백) */
  function mascot(pose, cls) { return ciderChar(cls, pose); }
  function mascotOld(pose, cls) {
    var armSets = {
      hi: ['M42 132 Q24 146 22 166', 'M168 118 Q188 100 190 72'],
      point: ['M42 132 Q24 146 22 166', 'M168 124 Q188 122 204 110'],
      cheer: ['M42 118 Q22 100 20 72', 'M168 118 Q188 100 190 72'],
      sad: ['M42 134 Q30 150 30 172', 'M168 134 Q180 150 180 172'],
      calm: ['M42 132 Q24 146 22 166', 'M168 132 Q186 126 182 108'],
    };
    var arms = armSets[pose].map(function (d) { return '<path class="m-arm" d="' + d + '"/>'; }).join('');
    var open = function (x) { return '<ellipse cx="' + x + '" cy="102" rx="7" ry="9" fill="#2F2A33"/><circle cx="' + (x + 2.5) + '" cy="97.5" r="2.6" fill="#fff"/>'; };
    var happy = function (x) { return '<path class="m-line" d="M' + (x - 8) + ' 104 Q' + x + ' 94 ' + (x + 8) + ' 104"/>'; };
    var eyes, mouth, brows = '';
    if (pose === 'cheer') { eyes = happy(85) + happy(125); mouth = '<path d="M95 116 Q105 132 115 116 Z" fill="#8E1EA2"/>'; }
    else if (pose === 'point') { eyes = open(85) + happy(125); mouth = '<path class="m-line" d="M97 118 Q105 125 113 118"/>'; }
    else if (pose === 'sad') {
      eyes = '<ellipse cx="85" cy="104" rx="5.5" ry="6.5" fill="#2F2A33"/><ellipse cx="125" cy="104" rx="5.5" ry="6.5" fill="#2F2A33"/>';
      // 시무룩: 눈썹 안쪽 끝이 올라가요
      brows = '<path class="m-line" d="M76 90 Q84 87 92 90" transform="rotate(-14 84 89)"/><path class="m-line" d="M118 90 Q126 87 134 90" transform="rotate(14 126 89)"/>';
      mouth = '<path class="m-line" d="M97 124 Q105 117 113 124"/>';
    }
    else if (pose === 'calm') { eyes = open(85) + open(125); brows = '<path class="m-line" d="M78 88 L92 88"/><path class="m-line" d="M118 88 L132 88"/>'; mouth = '<path class="m-line" d="M98 120 L112 120"/>'; }
    else { eyes = open(85) + open(125); mouth = '<path class="m-line" d="M97 118 Q105 125 113 118"/>'; }
    return '<svg class="mascot ' + (cls || '') + '" viewBox="0 0 210 212" aria-hidden="true">' +
      '<defs><linearGradient id="mgBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ED96D7"/><stop offset="1" stop-color="#C654C3"/></linearGradient>' +
      '<radialGradient id="mgScreen" cx=".38" cy=".32" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFC0DE"/></radialGradient></defs>' +
      '<ellipse cx="105" cy="206" rx="54" ry="6" fill="#8E1EA2" opacity=".12"/>' +
      '<path d="M90 46 L72 16" stroke="#8E1EA2" stroke-width="5" stroke-linecap="round"/><path d="M120 46 L138 16" stroke="#8E1EA2" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="71" cy="13" r="8" fill="#FFC0DE" stroke="#8E1EA2" stroke-width="4"/><circle cx="139" cy="13" r="8" fill="#FFC0DE" stroke="#8E1EA2" stroke-width="4"/>' +
      arms +
      '<ellipse cx="83" cy="196" rx="17" ry="9" fill="#8E1EA2"/><ellipse cx="127" cy="196" rx="17" ry="9" fill="#8E1EA2"/>' +
      '<rect x="35" y="40" width="140" height="152" rx="66" fill="url(#mgBody)"/>' +
      '<rect x="55" y="64" width="100" height="84" rx="36" fill="url(#mgScreen)"/>' +
      '<path d="M66 82 Q70 72 82 70" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".9"/>' +
      brows + eyes + mouth +
      '<ellipse cx="70" cy="121" rx="9" ry="5" fill="#ED96D7" opacity=".85"/><ellipse cx="140" cy="121" rx="9" ry="5" fill="#ED96D7" opacity=".85"/>' +
      '<circle cx="92" cy="170" r="5" fill="#FFC0DE"/><circle cx="108" cy="170" r="5" fill="#FFC0DE" opacity=".7"/><rect x="120" y="166" width="18" height="8" rx="4" fill="#FFC0DE" opacity=".7"/>' +
      '<path d="M52 92 Q48 64 70 52" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".45"/>' +
      '</svg>';
  }

  /* ---------- 장식: 낙서와 빛 번짐 ---------- */
  var SVG = {
    sparkle: '<svg viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M20 2 C21 14 26 19 38 20 C26 21 21 26 20 38 C19 26 14 21 2 20 C14 19 19 14 20 2Z"/></svg>',
    squiggle: '<svg viewBox="0 0 120 30" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M4 18 C16 4 28 4 36 16 S56 28 64 14 S86 2 96 16 S112 26 116 12"/></svg>',
    ring: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="4 5"/></svg>',
    person: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="#8E1EA2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="#8E1EA2"/></svg>',
  };
  function deco(type, style) { return '<span class="deco" aria-hidden="true" style="' + style + '">' + SVG[type] + '</span>'; }
  // v1.1: 흐림 필터 없이 가벼운 원형 그라데이션
  function glow(rgb, size, pos, alpha) {
    return '<div class="glow" aria-hidden="true" style="width:' + size + 'px;height:' + size + 'px;' + pos +
      ';background:radial-gradient(circle, rgba(' + rgb + ',' + alpha + ') 0%, rgba(' + rgb + ',0) 68%)"></div>';
  }
  var PINK = '255,192,222', ROSE = '237,150,215', MAG = '198,84,195', PUR = '142,30,162';

  /* v1.2: 레퍼런스처럼 알약 대신 색 글자 영어 소제목 */
  function label(t) { return '<p class="eyebrow">' + t + '</p>'; }

  /* ---------- v1.2 디테일 부품 ---------- */
  // 진주 구슬 (praise up 레퍼런스의 구슬을 핑크·보라로)
  function pearl(size, pos, tone) {
    return '<span class="pearl ' + (tone || '') + '" aria-hidden="true" style="width:' + size + 'px;height:' + size + 'px;' + pos + '"></span>';
  }
  // 반짝이는 별 스티커
  function star(size, pos) {
    return '<svg class="star3d" aria-hidden="true" viewBox="0 0 40 40" style="width:' + size + 'px;' + pos + '">' +
      '<defs><linearGradient id="stG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#FFC0DE"/><stop offset="1" stop-color="#ED96D7"/></linearGradient></defs>' +
      '<path fill="url(#stG)" stroke="#fff" stroke-width="1.2" d="M20 2 C21.5 13 27 18.5 38 20 C27 21.5 21.5 27 20 38 C18.5 27 13 21.5 2 20 C13 18.5 18.5 13 20 2Z"/></svg>';
  }
  // 배경 구석의 커다란 선 아이콘 (FRESHCODE 레퍼런스)
  var BIG = {
    share: '<path d="M20 52 L82 22 L60 84 L48 58 Z M48 58 L82 22"/>',
    chat: '<path d="M18 26 h64 a10 10 0 0 1 10 10 v30 a10 10 0 0 1 -10 10 h-34 l-18 14 v-14 h-12 a10 10 0 0 1 -10 -10 v-30 a10 10 0 0 1 10 -10z"/><circle cx="36" cy="51" r="3"/><circle cx="50" cy="51" r="3"/><circle cx="64" cy="51" r="3"/>',
    tv: '<rect x="12" y="30" width="76" height="54" rx="14"/><path d="M38 12 L50 30 L62 12"/><circle cx="74" cy="72" r="3"/>',
    heart: '<path d="M50 84 C20 64 10 48 14 34 C18 20 38 16 50 32 C62 16 82 20 86 34 C90 48 80 64 50 84Z"/>',
  };
  function bigIcon(name, pos) {
    return '<svg class="big-icon" aria-hidden="true" viewBox="0 0 100 100" style="' + pos + '">' + BIG[name] + '</svg>';
  }
  var CASE_ICON = { ridi: 'share', wyp: 'chat', melting: 'heart', mangazine: 'tv', b_jd: 'heart', b_process: 'chat', b_team: 'tv', b_ai: 'share', fastcampus: 'tv' };
  // 인스타 게시물·스토리 테두리용 작은 아이콘
  var UI = {
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1-3.6A8 8 0 0 1 4 12z"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10.5l7 2.5 2.5 7z M10 13l11-10"/></svg>',
    save: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
    dots: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
    cam: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function say(html) { return '<p class="say">' + html + '</p>'; }
  function guide(html, pose) { return '<div class="guide">' + mascot(pose || 'hi', 'm-mini') + say(html) + '</div>'; }
  // v1.7: PNG로 저장할 거라 누르는 버튼 대신 글자로만 보여줘요
  function mail(cls, text) { return '<span class="' + cls + '">' + (text || D.profile.email) + '</span>'; }

  function stat(s) {
    return '<div class="stat"><div class="stat-num">' + s.v + (s.u ? '<small>' + s.u + '</small>' : '') + '</div>' +
      '<div class="stat-label">' + s.l + '</div>' + (s.n ? '<div class="stat-note">' + s.n + '</div>' : '') + statVis(s.vis) + '</div>';
  }
  /* v1.8: 숫자 아래 작은 그림 (댓글 피드백) */
  function statVis(v) {
    if (!v) return '';
    if (v.type === 'dots') {   // 100칸 중 몇 칸
      var d = '';
      for (var i = 0; i < 100; i++) d += '<i' + (i < v.on ? ' class="on"' : '') + '></i>';
      return '<div class="sv-dots" role="img" aria-label="' + v.label + '">' + d + '</div><p class="sv-cap">' + v.label + '</p>';
    }
    if (v.type === 'steps') {  // 첫 의뢰 → 재의뢰
      return '<ol class="sv-steps">' + v.items.map(function (t, i) { var off = typeof t === 'object' && t.off; var tx = typeof t === 'object' ? t.t : t; return '<li class="' + (i ? 're' : '') + (off ? ' off' : '') + '"><span>' + (i + 1) + '</span>' + tx + '</li>'; }).join('<li class="sv-arr" aria-hidden="true">→</li>') + '</ol>' + (v.label ? '<p class="sv-cap">' + v.label + '</p>' : '');
    }
    return '';
  }

  /* ---------- 맨 위 ---------- */
  function topbar(links) {
    return '<header class="topbar wrap"><span class="wordmark">' + D.profile.nameEn + ' Portfolio</span>' +
      '<span class="top-mail">' + D.profile.email + '</span></header>';
  }

  function heroDecor() {
    return '<div class="arc" aria-hidden="true"></div>' +
      glow(PINK, 760, 'top:-300px;right:-200px', 0.9) + glow(ROSE, 560, 'top:180px;right:220px', 0.45) +
      glow(MAG, 520, 'top:-40px;left:-260px', 0.18) +
      pearl(130, 'left:-70px;top:250px', 'warm') + pearl(64, 'left:70px;top:600px') +
      pearl(220, 'right:-90px;top:640px', 'cool') + star(30, 'right:6%;top:180px') + star(20, 'left:44%;top:600px') +
      deco('sparkle', 'top:130px;left:47%;width:22px;color:#ED96D7') + deco('sparkle', 'top:540px;left:6%;width:16px;color:#C654C3;opacity:.5') +
      deco('squiggle', 'top:96px;right:8%;width:110px;color:#ED96D7;opacity:.8') + deco('ring', 'top:470px;right:4%;width:38px;color:#C654C3;opacity:.5');
  }

  /* v1.8: 첫 화면 캐릭터 = 사이다 병 (댓글 피드백) */
  /* 단계마다 다른 팔 동작 + 주변 효과 */
  function armsFor(pose) {
    var A = {
      sad:   ['M60 150 Q48 178 50 206', 'M160 150 Q172 178 170 206'],                 // 축 처진 팔
      calm:  ['M60 150 Q36 150 34 128', 'M160 140 Q186 124 182 96'],                  // 한 팔 불끈
      hi:    ['M60 150 Q40 168 40 192', 'M160 148 Q192 136 204 114'],                 // 앞으로 가리키기
      cheer: ['M60 140 Q30 112 26 74', 'M160 140 Q190 112 194 74']                    // 두 팔 만세
    }[pose] || ['M52 150 Q28 140 22 112', 'M168 150 Q194 132 196 100'];
    var fx = '';
    if (pose === 'sad') fx = '<g class="fx-gloom"><path d="M150 40c0-10 9-17 19-15 3-8 13-12 21-7 9-1 15 7 13 15 8 2 10 13 2 17H156c-8 0-12-6-6-10z" fill="#9C94A6"/>' +
      '<path d="M162 70l-4 12M178 70l-4 12M194 70l-4 12" stroke="#8FA4D8" stroke-width="3" stroke-linecap="round"/></g>' +
      '<path d="M44 96q-6 10 0 14q6-4 0-14z" fill="#8FA4D8" opacity=".85"/>';
    if (pose === 'calm') fx = '<path d="M196 82l6-10M206 92l10-4M188 76l2-12" stroke="#C654C3" stroke-width="3" stroke-linecap="round"/>';
    if (pose === 'cheer') fx = '<g class="fx-sparkle" fill="#FFC23D"><path d="M30 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path d="M188 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>' +
      '<path d="M200 150l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="#ED96D7"/><path d="M14 150l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ED96D7"/></g>';
    return fx + '<path class="m-arm" d="' + A[0] + '" stroke="#5FBF96"/><path class="m-arm" d="' + A[1] + '" stroke="#5FBF96"/>';
  }
  function ciderChar(cls, pose) {
    var mouth = pose === 'sad' ? 'M101 136 Q110 128 119 136' : pose === 'calm' ? 'M102 133 L118 133' : pose === 'cheer' ? 'M100 129 Q110 143 120 129 Z' : 'M101 131 Q110 139 119 131';
    return '<svg class="mascot ' + (cls || 'm-hero') + ' cider-char" viewBox="0 0 220 260" aria-hidden="true">' +
      '<defs><linearGradient id="cdBody" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9BE7C4"/><stop offset=".45" stop-color="#DDFBEE"/><stop offset="1" stop-color="#7FD9B2"/></linearGradient>' +
      '<linearGradient id="cdLiquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C8F7E1"/><stop offset="1" stop-color="#6FD0A6"/></linearGradient></defs>' +
      '<ellipse cx="110" cy="252" rx="56" ry="6" fill="#8E1EA2" opacity=".12"/>' +
      armsFor(pose) +
      '<rect x="92" y="6" width="36" height="16" rx="5" fill="#8E1EA2"/><rect x="92" y="18" width="36" height="5" fill="#C654C3"/>' +
      '<path d="M96 24h28v26c0 10 34 22 34 52v118a22 22 0 0 1-22 22H84a22 22 0 0 1-22-22V102c0-30 34-42 34-52z" fill="url(#cdBody)" stroke="#5FBF96" stroke-width="3"/>' +
      '<path d="M66 120h88v100a18 18 0 0 1-18 18H84a18 18 0 0 1-18-18z" fill="url(#cdLiquid)" opacity=".75"/>' +
      '<rect x="62" y="150" width="96" height="40" fill="#ED96D7"/><text x="110" y="177" text-anchor="middle" font-family="Arial" font-weight="700" font-size="20" fill="#fff">CIDER</text>' +
      '<ellipse cx="94" cy="118" rx="6" ry="7.5" fill="#2F2A33"/><ellipse cx="126" cy="118" rx="6" ry="7.5" fill="#2F2A33"/><circle cx="96" cy="115" r="2.2" fill="#fff"/><circle cx="128" cy="115" r="2.2" fill="#fff"/>' +
      '<path d="' + mouth + '" fill="' + (pose === 'cheer' ? '#C654C3' : 'none') + '" stroke="#2F2A33" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="82" cy="130" rx="7" ry="4" fill="#FFB3D6" opacity=".9"/><ellipse cx="138" cy="130" rx="7" ry="4" fill="#FFB3D6" opacity=".9"/>' +
      '<path d="M76 70 Q72 92 74 112" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".75"/><path d="M76 200 v20" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>' +
      '<g fill="#fff" opacity=".85"><circle cx="128" cy="206" r="4"/><circle cx="142" cy="220" r="3"/><circle cx="96" cy="214" r="2.6"/><circle cx="118" cy="226" r="2.2"/></g>' +
      '<g fill="#B8F0D6"><circle cx="58" cy="40" r="6"/><circle cx="44" cy="20" r="4"/><circle cx="170" cy="34" r="5"/><circle cx="186" cy="58" r="3.5"/></g>' +
      '<g stroke="#C654C3" stroke-width="3" stroke-linecap="round"><path d="M110 -2v-0"/><path d="M78 8l-8-8"/><path d="M142 8l8-8"/></g>' +
      '<ellipse cx="88" cy="248" rx="14" ry="6" fill="#5FBF96"/><ellipse cx="132" cy="248" rx="14" ry="6" fill="#5FBF96"/>' +
      '</svg>';
  }
  /* ---------- 첫 화면 ---------- */
  function hero(job) {
    return '<section class="hero">' + heroDecor() +
      topbar('<a href="#lineup">대표 사례</a><a href="#profile">이력</a>') +
      '<div class="wrap"><div class="hero-grid"><div>' +
      label(job.en + ' · ' + koOf(job)) +
      '<h1 class="hero-title' + (job.heroTitle ? ' long' : '') + '">' + (job.heroTitle || '될 때까지<br>방법을 찾아내 버리는<br><span class="grad-text">' + D.profile.nameKo + '</span>입니다') + '</h1>' +
      (job.heroSub === '' ? '' : '<p class="hero-sub">' + (job.heroSub || job.oneLine) + '</p>') +
      '</div><div class="hero-visual">' +
      '<div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>' +
      '<span class="hole" aria-hidden="true"></span>' + pearl(70, 'left:12%;top:34%', 'warm') + pearl(42, 'right:18%;top:22%') +
      ciderChar('m-hero', 'hi') +   /* v1.8: 첫 화면 몽글이 말풍선 삭제 (댓글 피드백) */
      job.keywords.items.map(function (k, i) { return '<span class="float-tag t' + (i + 1) + '">#' + k.ko + '</span>'; }).join('') +
      '</div></div>' +
      '<div class="hero-stats">' + job.heroStats.map(function (s) { return '<div class="tile">' + stat(s) + '</div>'; }).join('') + '</div>' +
      '</div></section>';
  }

  /* ---------- 왜 이 직무인가 (원 아래에 실제 사례 증거) ---------- */
  function about(job) {
    var k = job.keywords;
    var proof = function (p) { return p ? '<span class="kw-proof">' + p.t + '</span>' : ''; };
    return '<section class="section">' + glow(PINK, 620, 'top:60px;left:-280px', 0.55) +
      deco('sparkle', 'top:90px;right:12%;width:18px;color:#ED96D7') +
      pearl(120, 'right:-40px;top:520px', 'cool') + star(24, 'left:8%;top:640px') +
      '<div class="wrap"><div class="sec-head"><div>' + label('About Me') + '<h2>왜 <span class="key">' + koOf(job) + '</span>인가요?</h2></div>' +
      guide('콘텐츠를 만드는 공식이야', 'point') + '</div>' +   /* v1.8: 댓글 피드백으로 짧게 */
      '<blockquote class="motivation"><span class="qmark" aria-hidden="true">“</span>' + job.motivation + '</blockquote>' +
      '<div class="kw">' + k.items.map(function (i) {
        return '<div class="kw-col"><div class="kw-circle"><b>' + i.en + '</b><span>' + i.ko + '</span></div>' +
          '<div class="kw-line"></div><p class="kw-desc">' + i.d + '</p>' + proof(i.proof) + '</div>';
      }).join('') +
      '<div class="kw-arrow" aria-hidden="true">→</div>' +
      '<div class="kw-col"><div class="kw-circle kw-result"><b>' + k.result.en + '</b><span>' + k.result.ko + '</span></div>' +
      '<div class="kw-line"></div>' + proof(k.result.proof) + '</div>' +
      '</div></div></section>';
  }

  /* ---------- 채널 편성표 (폴더 카드) ---------- */
  function lineup(job) {
    return '<section class="section section-alt" id="lineup">' + glow(ROSE, 680, 'top:-120px;right:-260px', 0.35) +
      deco('squiggle', 'top:120px;left:42%;width:96px;color:#ED96D7;opacity:.7') +
      bigIcon('tv', 'right:-60px;bottom:-80px;width:360px') + pearl(90, 'left:-30px;top:180px', 'warm') +
      '<div class="wrap"><div class="sec-head"><div>' + label('Channel Guide') + '<h2>오늘의 <span class="key">편성표</span></h2></div>' +
      guide('채널 <b>' + job.cases.length + '개</b>를 차례로 틀어 줄게!', 'point') + '</div>' +
      '<div class="rail" aria-hidden="true">' + job.cases.map(function (r, i) { return '<span class="node">' + pad(i + 1) + '</span>'; }).join('') + '</div>' +
      '<div class="lineup">' + job.cases.map(function (ref, i) {
        var c = D.cases[ref.id], s = c.stats && c.stats[0];
        // v1.6: 폴더 안에 실제 콘텐츠 썸네일
        var th = c.media ? c.media[0].src : c.channel ? c.channel.reels : '';
        return '<div class="folder' + (th ? ' has-thumb' : '') + '"><span class="ch">CH.' + pad(i + 1) + '</span>' +
          (th ? '<span class="folder-thumb"><img src="' + BASE + th + '" alt="" loading="lazy"></span>' : '') +
          '<h3>' + c.title + '</h3>' +
          (s ? '<div class="fig"><b>' + s.v + (s.u ? '<small>' + s.u + '</small>' : '') + '</b><span>' + s.l + '</span></div>' : '') +
          '</div>';
      }).join('') + '</div></div></section>';
  }

  /* ---------- 사례 한 장(chapter) ---------- */
  function facts(c) {
    var L = c.factLabels || {};   /* v1.8-B: 칸 이름을 문서 표기대로 바꿀 수 있게 */
    var rows = [[L.client || '광고주', c.client], [L.period || '기간', c.period], [L.format || '형식', c.format], [L.goal || '목표', c.goal], [L.kpi || 'KPI', c.kpi], [L.role || '역할', c.role]];
    // v1.7: 칸 수에 맞춰 한 줄에 다 (6칸이면 3칸씩 두 줄) → 한 칸만 아래로 떨어지지 않게
    var list = rows.filter(function (r) { return r[1]; });
    var cols = list.length > 5 ? Math.ceil(list.length / 2) : list.length;
    /* v1.8-B: 긴 "내 역할"은 아래 한 줄 전체로 */
    var wideRow = c.factWide ? (L[c.factWide] || '') : '';
    if (wideRow) cols = list.length - 1;
    return '<dl class="facts" style="grid-template-columns:repeat(' + cols + ', minmax(0, 1fr))">' +
      list.map(function (r) { return '<div' + (wideRow && r[0] === wideRow ? ' style="grid-column:1 / -1"' : '') + '><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>'; }).join('') + '</dl>';
  }

  /* v1.8: 타깃마다 다른 일러스트 프로필 (댓글 피드백) */
  function avatarArt(kind) {
    if (!kind) return SVG.person;
    var face = '<ellipse cx="28" cy="29" rx="11" ry="12" fill="#FFE6DA"/>';
    var body = '<path d="M9 58c2-11 9-15 19-15s17 4 19 15z" fill="#8E1EA2"/><path d="M23 43h10v4a5 5 0 0 1-10 0z" fill="#FFE6DA"/>';
    var eyes = '<ellipse cx="23.6" cy="30" rx="1.7" ry="2.3" fill="#3A3240"/><ellipse cx="32.4" cy="30" rx="1.7" ry="2.3" fill="#3A3240"/>' +
      '<circle cx="24.2" cy="29.2" r=".6" fill="#fff"/><circle cx="33" cy="29.2" r=".6" fill="#fff"/>';
    var cheek = '<ellipse cx="21" cy="33.5" rx="2.2" ry="1.3" fill="#ED96D7" opacity=".75"/><ellipse cx="35" cy="33.5" rx="2.2" ry="1.3" fill="#ED96D7" opacity=".75"/>';
    var mouth = '<path d="M26.2 35.4q1.8 1.4 3.6 0" fill="none" stroke="#C0606E" stroke-width="1.1" stroke-linecap="round"/>';
    var back = '', bangs = '', extra = '';
    if (kind === 'dark') {        // 어두운 남캐를 좋아하는 2030: 긴 흑발
      back = '<path d="M14.5 30c0-11 6-17.5 13.5-17.5S41.5 19 41.5 30v16h-5.5V31h-16v15h-5.5z" fill="#3A3240"/>';
      bangs = '<path d="M16.5 28c.8-8.5 5.8-13 11.5-13s10.7 4.5 11.5 13c-2.5-2.6-4.6-4-7-4.6L28 27l-3.6-3.6c-3 .6-5.4 2-7.9 4.6z" fill="#3A3240"/>';
      extra = '<path d="M36 16.5l1.2 2.4 2.6.3-1.9 1.8.5 2.6-2.4-1.3-2.3 1.3.4-2.6-1.9-1.8 2.6-.3z" fill="#C654C3"/>';
    } else if (kind === 'otaku') { // 오타쿠 여성: 양쪽 똥머리 + 동그란 안경
      back = '<circle cx="15.5" cy="15.5" r="5.5" fill="#5E4466"/><circle cx="40.5" cy="15.5" r="5.5" fill="#5E4466"/><path d="M16 31c0-10 5.4-16 12-16s12 6 12 16v6h-4V30H20v7h-4z" fill="#5E4466"/>';
      bangs = '<path d="M17 27.5c1-7.6 5.5-11.5 11-11.5s10 3.9 11 11.5c-3.6-2.4-7-3.4-11-3.4s-7.4 1-11 3.4z" fill="#5E4466"/>';
      extra = '<g fill="none" stroke="#4A4152" stroke-width="1.2"><circle cx="23.6" cy="30" r="3.6"/><circle cx="32.4" cy="30" r="3.6"/><path d="M27.2 30h1.6"/></g>';
    } else if (kind === 'client') { // 광고주 담당자: 단정한 단발 + 재킷
      body = '<path d="M9 58c2-11 9-15 19-15s17 4 19 15z" fill="#4A4152"/><path d="M23 43l5 7 5-7z" fill="#fff"/><path d="M23 43h10v3l-5 4-5-4z" fill="#FFE6DA"/>';
      back = '<path d="M15.5 30c0-10 5.6-16 12.5-16S40.5 20 40.5 30v10h-5V31h-15v9h-5z" fill="#3A3240"/>';
      bangs = '<path d="M16.8 29c.2-9 5.2-14 11.2-14s11 5 11.2 14c-1.5-4-4-6.6-7.6-7.6-3 2.6-8 4-14.8 7.6z" fill="#3A3240"/>';
      extra = '<circle cx="16.6" cy="33.5" r="1.1" fill="#C654C3"/><circle cx="39.4" cy="33.5" r="1.1" fill="#C654C3"/>';
    } else {                       // 1020 여성: 핑크 단발 + 헤드폰
      back = '<path d="M15.5 31c0-10.5 5.6-16.5 12.5-16.5S40.5 20.5 40.5 31v8.5h-5V31h-15v8.5h-5z" fill="#ED96D7"/>';
      bangs = '<path d="M17 28c.6-8 5.4-12.4 11-12.4S38.4 20 39 28c-2.2-1.8-4.4-2.8-6.4-3.2l-2 2.6-1.6-3c-4.6 0-8.2 1.4-12 3.6z" fill="#ED96D7"/>';
      extra = '<path d="M14.5 29a13.5 13.5 0 0 1 27 0" fill="none" stroke="#8E1EA2" stroke-width="2.2"/><rect x="11.5" y="27" width="5" height="8" rx="2.5" fill="#8E1EA2"/><rect x="39.5" y="27" width="5" height="8" rx="2.5" fill="#8E1EA2"/>';
    }
    return '<svg viewBox="0 0 56 56" aria-hidden="true" class="avatar-art">' + body + back + face + bangs + eyes + cheek + mouth + extra + '</svg>';
  }

  function persona(c) {
    if (!c.target) return '';
    return '<aside class="persona" aria-label="타깃"><span class="tag-bubble">Target</span>' +
      '<div class="persona-top"><span class="avatar' + (c.avatar ? ' has-art' : '') + '">' + avatarArt(c.avatar) + '</span><div><small>이 콘텐츠의 타깃</small><b>' + c.target + '</b></div></div>' +
      // v1.8: 칩 옆 빈칸을 점선으로 채우기 (댓글 피드백)
      (c.persona ? '<h4>이 사람이 좋아하는 것</h4><div class="chips">' + c.persona.map(function (p) { return '<div class="chip-row"><span>' + p + '</span><i class="leader" aria-hidden="true"></i></div>'; }).join('') + '</div>' : '') +
      (c.kpi ? '<div class="kpi"><span>KPI</span><b>' + c.kpi + '</b></div>' : '') +
      '</aside>';
  }

  /* v1.6: 다듬은 이미지(media)와 번호 위치(pins6)가 있으면 그걸 써요 */
  function mediaOf(c) { return c.media || c.images || []; }
  function pinsOf(c) { return c.media ? (c.pins6 || []) : (c.pins || []); }
  var LOGO = 'images/web/mangazine-logo.png';

  /* v1.6: 인스타 인사이트 캡처를 실제 수치 그대로 다시 그린 화면 */
  function insightPanel(s) {
    var max = Math.max.apply(null, s.items.map(function (i) { return i.v; }));
    var top = s.items[0];
    return '<div class="ins">' +
      '<div class="ins-row"><span>조회수</span><b>' + s.views + '</b></div>' +
      '<div class="ins-split"><span class="ins-bar"><i style="width:' + s.nonFollower + '%"></i></span>' +
      '<small>팔로워가 아닌 사람 <b>' + s.nonFollower + '%</b></small></div>' +
      '<div class="ins-row"><span>도달한 계정</span><b>' + s.reach + '</b></div>' +
      '<h5>게시물 반응 ' + s.total.toLocaleString('ko-KR') + '</h5>' +
      '<ul class="ins-list">' + s.items.map(function (i) {
        return '<li' + (i.hi ? ' class="hi"' : '') + '><span class="l">' + i.l + '</span><span class="t"><i style="width:' + Math.max(2, Math.round(i.v / max * 100)) + '%"></i></span><b>' + i.v.toLocaleString('ko-KR') + '</b></li>';
      }).join('') + '</ul>' +
      '<p class="ins-key">반응의 <b>' + Math.round(top.v / s.total * 100) + '%</b>가 ' + top.l + '</p>' +
      '<div class="ins-extra">' + s.extra.map(function (e) { return '<span>' + e.l + ' <b>' + e.v + '</b></span>'; }).join('') + '</div>' +
      '</div>';
  }

  function artifact(c, img, idx) {
    var pins = pinsOf(c).map(function (p, n) { return p ? { n: n + 1, img: p[0], at: p[1] } : null; })
      .filter(function (p) { return p && p.img === idx; });
    var reel = img.shape === 'reel';
    var handle = D.profile.handle || 'mangazine';
    // v1.2: 인스타 게시물·릴스 화면처럼 (계정 줄 + 반응 아이콘). v1.6: 실제 계정 이름과 로고
    var avatar = '<span class="ig-avatar"><img src="' + BASE + LOGO + '" alt=""></span>';
    var head = '<div class="ig-head">' + avatar + '<b>' + handle + '</b>' + UI.dots + '</div>';
    var foot = '<div class="ig-foot">' + UI.heart + UI.chat + UI.send + '<span class="sp"></span>' + UI.save + '</div>';
    if (reel) {
      // v1.7: 스토리가 아니라 "릴스" 화면 (위 제목 · 오른쪽 반응 버튼 · 아래 계정 줄)
      var n = img.ig || {};
      var act = function (icon, num) { return '<span class="ra">' + icon + (num ? '<small>' + num + '</small>' : '') + '</span>'; };
      head = '<div class="reel-top"><b>릴스</b>' + UI.cam + '</div>';
      foot = '<div class="reel-side">' + act(UI.heart, n.likes) + act(UI.chat, n.comments) + act(UI.send, n.shares) + act(UI.dots, '') + '</div>' +
        '<div class="reel-bottom">' + avatar + '<b>' + handle + '</b><span class="follow">팔로우</span></div>';
    }
    var inner = img.type === 'insight' && c.insight ? '<div class="frame-in ins-in">' + insightPanel(c.insight) + '</div>' :
      '<div class="frame-in" data-file="' + img.src + '">' +
      '<img src="' + BASE + img.src + '" alt="' + img.cap + '" loading="lazy" onerror="this.parentNode.classList.add(\'missing\')"></div>';
    if (img.type === 'insight') { head = '<div class="ig-head ins-head"><b>게시물 인사이트</b></div>'; foot = ''; }
    return '<figure class="artifact ' + (reel ? 'reel' : 'card') + (img.type ? ' ' + img.type : '') + '">' +
      '<div class="frame">' + head + inner + foot +
      pins.map(function (p) { return '<span class="pin ' + p.at + '" data-n="' + p.n + '" aria-hidden="true">' + pad(p.n) + '</span>'; }).join('') +
      '</div><figcaption>' + img.cap + '</figcaption></figure>';
  }

  /* v1.3: 사례마다 구도를 다르게
     a = 이미지 왼쪽 · 설명 오른쪽 (리디)
     b = 설명 카드 2×2 위 · 이미지 가로 줄 아래 (위프)
     c = 이미지 ─ VS ─ 이미지 가운데 대결 · 설명 3칸 아래 (멜팅) */
  function strategy(c, v) {
    var all = mediaOf(c);
    /* v1.8-B: 설명 없이 이미지만 (한 페이지로 줄인 리디) */
    if (!c.points) {
      if (!c.mediaOnly) return '';
      return '<div class="strategy" style="grid-template-columns:minmax(0, 1fr)"><div class="artifacts row">' +
        all.filter(function (im) { return im.shape !== 'wide'; }).map(function (im) { return artifact(c, im, all.indexOf(im)); }).join('') + '</div></div>';
    }
    /* v1.8-B: 이미지 없는 새 페이지는 설명 카드만 한 줄 가득 */
    if (!all.length) {
      return '<div class="strategy" style="grid-template-columns:minmax(0, 1fr)"><div><ol class="points ' + (c.pointsCols || v === 'c' ? 'cols' : 'cards') + '">' + c.points.map(function (p, i) {
        return '<li><span class="pnum" aria-hidden="true">' + pad(i + 1) + (p.ico ? '<i class="pico">' + p.ico + '</i>' : '') + '</span><div>' + (p.t ? '<h3>' + p.t + '</h3>' : '') + '<p>' + p.d + '</p></div></li>';
      }).join('') + '</ol></div></div>';
    }
    var imgs = all.filter(function (im) { return im.shape !== 'wide'; }).slice(0, 2);
    var arts = imgs.map(function (im) { return artifact(c, im, all.indexOf(im)); });
    // v1.8: 이미지에 번호가 하나도 없으면 안내 문구도 빼요
    var hasPins = c.pinGuide !== false && pinsOf(c).filter(function (p) { return p; }).length > 0;
    var title = function (where) { return hasPins ? '<p class="mini">' + (c.pointsTitle || '포인트') + ': 번호 = ' + where + ' 이미지 속 위치</p>' : ''; };
    var list = function (cls) {
      return '<ol class="points ' + (cls || '') + '">' + c.points.map(function (p, i) {
        return '<li><span class="pnum" aria-hidden="true">' + pad(i + 1) + '</span><div><h3>' + p.t + '</h3><p>' + p.d + '</p></div></li>';
      }).join('') + '</ol>' + (v.label ? '<p class="sv-cap">' + v.label + '</p>' : '');
    };
    var duel = c.duel ? '<div class="duel"><span class="side a">' + c.duel.a + '</span><span class="vs">VS</span><span class="side b">' + c.duel.b + '</span>' +
      '<p class="dq">"' + c.duel.q + '"<small>' + c.duel.note + '</small></p></div>' : '';
    if (v === 'c' && c.duel && arts.length === 2) {
      return '<div class="strategy s-c"><div class="vsboard">' + arts[0] + duel + arts[1] + '</div>' + title('위') + list('cols') + '</div>';
    }
    if (v === 'b') {
      /* v1.8-B 댓글: 이미지 왼쪽 + '실행' 세로 카드 오른쪽 */
      var side = (c.blocks || []).filter(function (b) { return b.side; })[0];
      if (side) return '<div class="strategy s-b"><div>' + title('아래') + list('cards') + '</div><div class="exec-row"><div class="artifacts row">' + arts.join('') + '</div>' +
        '<div class="exec-card"><h4>' + side.title + '</h4><ol class="exec-steps">' + side.items.map(function (t, i) { return '<li><span>' + (i + 1) + '</span>' + t + '</li>'; }).join('') + '</ol></div></div></div>';
      return '<div class="strategy s-b"><div>' + title('아래') + list('cards') + '</div><div class="artifacts row">' + arts.join('') + '</div></div>';
    }
    return '<div class="strategy s-a"><div class="artifacts">' + arts.join('') + '</div><div>' + title('왼쪽') + list() + duel + '</div></div>';
  }

  /* 차트 3종: 비교 막대 · 흐름 · 퍼널 */
  function vizVersus(z) {
    var max = Math.max.apply(null, z.items.map(function (i) { return i.v; }));
    return '<div class="viz"><h4>' + z.title + '</h4>' + z.items.map(function (i) {
      return '<div class="vs-row' + (i.hi ? ' hi' : '') + '" title="' + i.l + ': ' + i.show + '"><span class="l">' + i.l + '</span>' +
        '<span class="track"><span class="bar" style="width:' + Math.max(3, Math.round(i.v / max * 100)) + '%"></span></span><span class="v">' + i.show + '</span></div>';
    }).join('') + (z.note ? '<p class="note">' + z.note + '</p>' : '') + '</div>';
  }
  function vizTrend(z) {
    var W = 460, H = 170, padX = 40, top = 30, base = 130;
    var max = Math.max.apply(null, z.points.map(function (p) { return p.v; }));
    var step = (W - padX * 2) / (z.points.length - 1);
    var pts = z.points.map(function (p, i) { return { x: padX + i * step, y: base - (p.v / max) * (base - top), p: p }; });
    var line = pts.map(function (q, i) { return (i ? 'L' : 'M') + q.x.toFixed(1) + ' ' + q.y.toFixed(1); }).join(' ');
    var area = line + ' L' + pts[pts.length - 1].x.toFixed(1) + ' ' + base + ' L' + pts[0].x.toFixed(1) + ' ' + base + ' Z';
    return '<div class="viz trend"><h4>' + z.title + '</h4>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + z.title + ': ' + z.points.map(function (p) { return p.l + ' ' + (p.show || p.v); }).join(', ') + '">' +
      '<line class="t-base" x1="' + padX / 2 + '" x2="' + (W - padX / 2) + '" y1="' + base + '" y2="' + base + '"/>' +
      '<path class="t-area" d="' + area + '"/><path class="t-line" d="' + line + '"/>' +
      pts.map(function (q) {
        return '<circle class="t-dot" cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="5"><title>' + q.p.l + ': ' + (q.p.show || q.p.v) + '</title></circle>' +
          '<text class="t-val" x="' + q.x.toFixed(1) + '" y="' + (q.y - 12).toFixed(1) + '">' + (q.p.show || q.p.v) + '</text>' +
          '<text class="t-lab" x="' + q.x.toFixed(1) + '" y="' + (base + 24) + '">' + q.p.l + '</text>';
      }).join('') + '</svg>' + (z.note ? '<p class="note">' + z.note + '</p>' : '') + '</div>';
  }
  /* v1.6: 실제 캡처 차트 + 발행 시점 표시 */
  function vizShot(s) {
    return '<div class="viz wide shot"><div class="shot-head"><h4>' + s.title + '</h4><small>' + s.sub + '</small></div>' +
      // v1.8: 최고점에 화살표 + 동그라미 강조 (댓글 피드백)
      '<div class="shot-img" data-file="' + s.src + '"><span class="shot-plot"><img src="' + BASE + s.src + '" alt="' + s.title + ': ' + s.mark.t + '" loading="lazy" onerror="this.parentNode.parentNode.classList.add(\'missing\')">' +
      '<span class="shot-ring" style="left:' + s.mark.x + '%;top:' + (s.mark.y || 3.4) + '%"></span>' +
      /* v1.8-B: 라벨을 그래프 안으로 옮겨서, 양옆을 잘라도 최고점 위치가 안 어긋나게 */
      '<span class="shot-mark" style="left:' + s.mark.x + '%"><b>' + s.mark.t + '</b><i class="shot-arrow" aria-hidden="true"></i></span></span></div>' +
      (s.note ? '<p class="note">' + s.note + '</p>' : '') + '</div>';
  }
  function vizFunnel(z) {
    return '<div class="viz wide"><h4>' + z.title + '</h4><div class="funnel">' + z.items.map(function (i) {
      return '<div class="step"><b>' + i.show + '</b><span>' + i.l + '</span></div>';
    }).join('') + '</div>' + (z.note ? '<p class="note">' + z.note + '</p>' : '') + '</div>';
  }
  function table(t) {
    var tt = t.title === undefined ? '작품별 반응' : t.title;
    return '<div class="viz wide' + (t.cls ? ' ' + t.cls : '') + '">' + (tt ? '<h4>' + tt + '</h4>' : '') + '<div class="table-wrap"><table><thead><tr>' +
      t.head.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.rows.map(function (r) { return '<tr>' + r.map(function (x, i) { return '<td data-label="' + t.head[i] + '">' + x + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div></div>';
  }

  /* 같은 숫자를 두 번 보여주지 않도록: "4.5천" = "4,500", "10→60만" = "60만" */
  function toNum(s) {
    s = String(s).replace(/<[^>]+>/g, '').replace(/,/g, '').split(/→|->/).pop();
    var m = /([\d.]+)\s*(만|천)?/.exec(s);
    if (!m) return null;
    return parseFloat(m[1]) * (m[2] === '만' ? 10000 : m[2] === '천' ? 1000 : 1);
  }
  function shownNums(c) {
    var set = [];
    (c.viz || []).forEach(function (z) {
      (z.items || z.points || []).forEach(function (i) { set.push(toNum(i.show || i.v)); });
    });
    if (c.compare) c.compare.items.forEach(function (i) { set.push(toNum(i.show)); });
    if (c.table) c.table.rows.forEach(function (r) { r.slice(1).forEach(function (x) { set.push(toNum(x)); }); });
    return set;
  }

  /* v1.3: 결과도 사례마다 다르게
     a = 2칸 격자 · b = 퍼널 위, 비교 + 세로 숫자 기둥 아래 · c = 숫자 기둥 왼쪽 + 차트 오른쪽 · d = 큰 숫자 띠 먼저 */
  function results(c, v) {
    var charts = [];
    var shown = shownNums(c);
    var stats = (c.stats || []).filter(function (s) { return shown.indexOf(toNum(s.v + (s.u || ''))) < 0; });
    (c.viz || []).forEach(function (z) {
      if (c.shot && c.shot.replaces === z.type) { charts.push(vizShot(c.shot)); return; }
      charts.push(z.type === 'trend' ? vizTrend(z) : z.type === 'funnel' ? vizFunnel(z) : vizVersus(z));
    });
    if (c.compare) charts.push(vizVersus({ title: c.compare.title, items: c.compare.items.map(function (i) { return { l: i.l, v: i.v, show: i.show, hi: i.hi }; }) }));
    if (c.table) charts.push(table(c.table));
    if (!charts.length && !stats.length) return '';
    var head = '<div class="results-head"><h3' + (c.resultsTitle ? ' class="res-en"' : '') + '>' + (c.resultsTitle || '그래서, 결과는') + '</h3></div>';
    var column = stats.length ? '<div class="viz stats-col"><div class="figs">' + stats.map(stat).join('') + '</div></div>' : '';
    var band = stats.length ? '<div class="viz wide stats-band"><div class="figs">' + stats.map(stat).join('') + '</div></div>' : '';
    if (v === 'b' || v === 'c') {
      return '<div class="results r-' + v + '">' + head + (v === 'c' ? column + '<div class="chart-stack">' + charts.join('') + '</div>'
        : charts.join('') + column) + '</div>';
    }
    // a, d: 2칸 격자. 홀수면 마지막 반쪽 카드를 넓혀요
    var half = charts.filter(function (b) { return b.indexOf('viz wide') < 0; }).length;
    if (half % 2 === 1) { for (var i = charts.length - 1; i >= 0; i--) { if (charts[i].indexOf('viz wide') < 0) { charts[i] = charts[i].replace('class="viz', 'class="viz wide'); break; } } }
    return '<div class="results r-' + v + '">' + head + (v === 'd' ? band + charts.join('') : charts.join('') + band) + '</div>';
  }

  function voice(ref, c, i) {
    if (!c.quote && !ref.tip) return '';
    var q = c.quote, lines = q ? (Array.isArray(q.text) ? q.text : [q.text]) : [];
    return '<div class="voice">' +
      // v1.8: 광고주 말 옆에 담당자 얼굴 일러스트 (댓글 피드백)
      (q ? '<div class="quote"><div class="quote-row"><span class="client-face">' + avatarArt('client') + '</span><div class="quote-lines' + (lines.length > 1 ? ' two' : '') + '"><span class="quote-who">' + q.who + '</span>' +
        lines.map(function (l) { return '<p class="bubble' + (q.direct ? ' direct' : '') + '">' + l + '</p>'; }).join('') + '</div></div></div>' : '<div></div>') +
      // v1.7: "광고주 반응"처럼 라벨을 말풍선 밖으로
      (ref.tip && !NO_TIPS ? '<div class="tip-wrap"><span class="quote-who">몽글이 포인트</span><div class="case-tip">' + mascot(i % 2 ? 'hi' : 'point', 'm-tip') + '<p class="say">' + ref.tip + '</p></div></div>' : '') +
      '</div>';
  }

  /* 망가진 전용: 브랜드 보드 + 감정 여정 */
  function brandBoard(b) {
    return '<div class="board">' +
      '<div><p class="mini">네이밍 센스</p><div class="venn">' +
      '<div class="pair">' + b.parts.map(function (p, i) { return '<div class="el"><span><b>' + p + '</b>' + (b.partsKo ? b.partsKo[i] : '') + '</span></div>'; }).join('') + '</div>' +
      '<span class="arrow" aria-hidden="true">→</span><span class="res">' + b.result + '</span></div><p>' + (b.whyS || b.why) + '</p></div>' +
      '<div><p class="mini">브랜드 색</p><div class="swatches">' + b.colors.map(function (c) {
        return '<div class="swatch" style="background:' + c.hex + '"><b>' + c.n + '</b><small>' + c.hex + '</small></div>';
      }).join('') + '</div><p>' + (b.colorWhyS || b.colorWhy) + '</p></div>' +
      (b.keywords ? '<div class="row2"><div><p class="mini">브랜드 키워드</p><div class="brand-kw">' + b.keywords.map(function (k) { return '<span>' + k + '</span>'; }).join('<i class="kw-dot" aria-hidden="true"></i>') + '</div></div>' +
        '<figure class="kw-logo"><img src="' + BASE + LOGO + '" alt="망가진 실제 프로필 로고"><figcaption>실제 프로필 로고</figcaption></figure></div>' : '') +
      '</div>';
  }
  function journey(c) {
    var moods = ['sad', 'calm', 'hi', 'cheer'];
    return '<div class="journey"><p class="mini">' + (c.flowTitle || '흐름') + '</p>' +
      '<svg viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="jArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#C654C3"/></marker></defs>' +
      '<path class="j-path" marker-end="url(#jArrow)" d="M110 300 C 300 290, 380 230, 500 180 S 760 70, 890 40"/></svg>' +
      '<div class="steps">' + c.flow.map(function (f, i) {
        return '<div class="step-card">' + mascot(moods[i] || 'hi', 'm-step') + '<span class="pill">' + f.t + '</span><p>' + (f.s || f.d) + '</p></div>';
      }).join('') + '</div></div>';
  }

  /* v1.4: 망가진 "시스템" 단계를 마케터 관점으로 펼친 카드 3장 */
  function howWork(h) {
    return '<div class="howwork">' +
      '<div class="hw-head"><div><p class="mini">시스템 단계를 자세히 보면</p><h3>' + h.title + '</h3><p class="hw-lead">' + h.lead + '</p></div>' +
      guide('4명이 만들어도 <b>기획 의도</b>는 그대로 살아있게!', 'point') + '</div>' +
      '<ol class="hw-bento">' + h.items.map(function (it, i) {
        return '<li class="hw-card hw-' + (it.vis ? it.vis.type : 'text') + '">' +
          '<div class="hw-text"><b class="hw-k"><span>' + pad(i + 1) + '</span>' + it.k + '</b>' +
          '<h4>' + it.t + '</h4><p>' + (it.s || it.d) + '</p><span class="hw-tag">' + it.tag + '</span></div>' +
          (it.vis ? '<div class="hw-vis">' + hwVis(it.vis6 || it.vis) + '</div>' : '') + '</li>';
      }).join('') + '</ol></div>';
  }

  /* v1.5: 일하는 방식 카드 속 시각 자료 */
  function hwImg(src, cap) {
    return '<div class="hw-shot" data-file="' + src + '"><img src="' + BASE + src + '" alt="' + cap + '" loading="lazy" onerror="this.parentNode.classList.add(\'missing\')"></div>';
  }
  function hwVis(v) {
    if (v.type === 'datalab') {
      // 자동 분석 화면 모양: 검색어 입력 → 발행 전/후 막대 (리디 실제 수치)
      var max = Math.max(v.before, v.after);
      return '<div class="mock">' +
        '<div class="mock-bar"><i></i><i></i><i></i><span>검색량 자동 비교</span><b class="mock-ai">AI로 자동화까지</b></div>' +
        '<div class="mock-search"><svg class="sr" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><span>' + v.word + '</span><em>발행 10일 뒤</em></div>' +
        '<div class="mock-chart">' +
        '<div class="mc-col"><span class="mc-v">' + v.before + '</span><span class="mc-bar" style="height:' + Math.max(6, Math.round(v.before / max * 100)) + '%"></span><span class="mc-l">발행 전</span></div>' +
        '<div class="mc-arrow" aria-hidden="true">→</div>' +
        '<div class="mc-col hi"><span class="mc-v">' + v.after + '</span><span class="mc-bar" style="height:100%"></span><span class="mc-l">발행 후</span></div>' +
        '<div class="mc-badge">' + Math.round(v.after / v.before * 10) / 10 + '배</div>' +
        '</div><p class="mock-note">예시: 리디 협업 작품의 네이버 데이터랩 검색량 지수</p></div>' +
        hwImg(v.img6 || v.img, '에어테이블 콘텐츠 성과·검색량 기록 화면') + (v.img6 ? '<p class="shot-cap">실제 에어테이블 화면 · 공유, 저장, 게시 전후 검색량이 한 줄에</p>' : '');
    }
    if (v.type === 'board') {
      // 피그마 보드: 실제 캡처 위에 단계 라벨, 아래에 "전 → 후 → 발표" 흐름
      return '<div class="board-shot">' + hwImg(v.img6 || v.img, '피그마 제작 보드: 기획 초안, 피드백 받은 후, 완성본 칸') +
        '<ol class="board-steps">' + v.steps.map(function (s, i) { return '<li' + (i === v.steps.length - 1 ? ' class="last"' : '') + '><span>' + pad(i + 1) + '</span>' + s + '</li>'; }).join('') + '</ol></div>' +
        '<div class="ba"><div class="ba-card"><small>BEFORE</small><b>처음 기획안</b></div><span class="ba-arrow" aria-hidden="true">→</span>' +
        '<div class="ba-card note"><small>WHY</small><b>왜 고쳤나</b><i>주간 회의에서 발표</i></div><span class="ba-arrow" aria-hidden="true">→</span>' +
        '<div class="ba-card after"><small>AFTER</small><b>최종본</b></div></div>';
    }
    if (v.type === 'gantt') {
      // 에어테이블 타임라인을 이름 없이 다시 그림. 단계가 바뀌는 곳 = 체크리스트 점검
      var cell = 100 / v.days;
      return '<div class="gantt"><div class="gt-head"><b>' + v.title + '</b><small>' + v.meta + '</small></div>' +
        '<div class="gt-legend">' + v.stages.map(function (s, i) { return '<span class="g' + i + '"><i></i>' + s + '</span>'; }).join('') + '</div>' +
        '<div class="gt-body"><span class="gt-today" style="left:calc(26px + (100% - 26px) * ' + (v.today / v.days).toFixed(4) + ')"><em>오늘</em></span>' +
        v.rows.map(function (r) {
          return '<div class="gt-row"><span class="gt-who">' + r.n + '</span><div class="gt-track">' + r.bars.map(function (b) {
            var x = b[0];
            return b[1].map(function (len, i) {
              var seg = '<span class="gt-seg g' + i + '" style="left:' + (x * cell) + '%;width:' + (len * cell) + '%">' +
                (i ? '<svg class="gt-chk" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : '') + '</span>';
              x += len; return seg;
            }).join('');
          }).join('') + '</div></div>';
        }).join('') + '</div>' +
        '<p class="shot-cap">✓ 단계가 넘어갈 때마다 체크리스트 점검<br>일정 시각화를 위해 AI로 개인 프로그램을 개발해서 사용 중</p></div>';
    }
    if (v.type === 'pipeline') {
      return '<ol class="pipe">' + v.steps.map(function (s, i) {
        var last = i === v.steps.length - 1;
        return '<li class="' + (last ? 'done' : '') + '"><span class="pipe-dot">' + (last ? '발행' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>') + '</span>' +
          '<b>' + s + '</b>' + (last ? '<small>점검 끝</small>' : '<small>체크리스트</small>') + '</li>';
      }).join('') + '</ol>' + (v.label ? '<p class="sv-cap">' + v.label + '</p>' : '');
    }
    return '';
  }

  /* v1.6: 카드뉴스 전체 흐름 (멜팅) */
  function carousel(k) {
    return '<div class="carousel"><p class="mini">' + k.title + '</p><ol class="cr-strip">' + k.items.map(function (it, i) {
      return '<li><span class="cr-img' + (it.html ? ' sq' : '') + '">' + (it.html || '<img src="' + BASE + it.src + '" alt="' + it.t + '" loading="lazy">') + '</span>' +   /* v1.8-B: html이면 1:1로 다시 그린 카드 */
        '<span class="cr-no">' + pad(i + 1) + '</span><b>' + it.t + '</b><small>' + it.d + '</small></li>';
    }).join('') + '</ol></div>';
  }

  /* v1.6: 실제 채널 화면 + 카드 템플릿 규칙 (망가진) */
  function channelBlock(ch) {
    var t = ch.template;
    var dots = { title: 'm-title', logo: 'm-logo', dot: 'm-dot' };
    return '<div class="channel">' +
      '<figure class="phone"><div class="phone-in">' +
      '<div class="ph-top"><b>' + (D.profile.handle || '') + '</b></div>' +
      '<img src="' + BASE + ch.profile + '" alt="망가진 인스타그램 프로필: 게시물 159, 팔로워 1.4만" loading="lazy">' +
      '<div class="ph-tabs"><span></span><span class="on"></span><span></span></div>' +
      '<img src="' + BASE + ch.reels + '" alt="망가진 릴스 탭: 고정 릴스 249만, 200만, 138만 조회" loading="lazy">' +
      '</div><figcaption>' + ch.note + '</figcaption></figure>' +
      '<div class="tpl"><p class="mini tpl-q">채널을 브랜드화시키려면 어떻게?</p><h4>' + t.title + '</h4>' +
      '<div class="tpl-body"><div class="tpl-card"><img src="' + BASE + t.src + '" alt="망가진 카드뉴스 예시" loading="lazy">' +
      t.marks.map(function (m, i) { return '<span class="tpl-pin ' + dots[m.at] + '">' + (i + 1) + '</span>'; }).join('') +
      (t.stats ? '<div class="tpl-stats">' + t.stats.map(function (s) { return '<span>' + (s.icon === 'heart' ? UI.heart : UI.send) + '<em>' + s.l + '</em><b>' + s.v + '</b></span>'; }).join('') + '</div>' : '') + '</div>' +
      '<ol class="tpl-list">' + t.marks.map(function (m, i) {
        return '<li><span class="tpl-no">' + (i + 1) + '</span><div><b>' + m.t + '</b><p>' + m.d + '</p></div></li>';
      }).join('') + '</ol></div></div></div>';
  }

  /* v1.8-B: 새 페이지(역량 표·협업 프로세스·AI 효율 등)를 기존 케이스 부품으로 그리기
     type: table(표) / steps(단계 알약) / stats(숫자 띠) / list(번호 목록 카드) / image(이미지 카드) / hw(일하는 방식 그림) */
  function blocks(c) {
    var bl = (c.blocks || []).filter(function (b) { return !b.side && !b.skip; });
    if (!bl.length) return '';
    c = { blocks: bl };
    /* 소제목(head)마다 묶음을 나눠요 → PDF에서 묶음 단위로 장이 넘어가게 */
    var groups = [[]];
    c.blocks.forEach(function (b) { if (b.type === 'head' && groups[groups.length - 1].length) groups.push([]); groups[groups.length - 1].push(b); });
    return groups.map(blockGroup).join('');
  }
  function blockGroup(list) {
    return '<div class="results r-a">' + list.map(function (b) {
      var w = b.wide ? ' wide' : '';
      var h = b.title ? '<h4>' + b.title + '</h4>' : '';
      if (b.type === 'table') return table(b);
      if (b.type === 'head') return '<div class="results-head"><h3>' + b.title + '</h3></div>';
      /* 매체 카드: 실제 집행 이미지 + 번호 목록 */
      if (b.type === 'channel') return '<div class="viz' + w + (b.perf ? ' has-perf' : '') + '">' + h +
        '<div class="hw-shot" style="margin-bottom:18px;background:#fff;aspect-ratio:auto">' + (b.html || '<img src="' + BASE + b.src + '" alt="' + b.cap + '" loading="lazy" style="display:block;width:100%;height:' + (b.h || 260) + 'px;object-fit:' + (b.fit || 'cover') + '">') + '</div>' +
        '<ol class="points">' + b.items.map(function (t, i) { return '<li><span class="pnum" aria-hidden="true">' + pad(i + 1) + '</span><div><p>' + t + '</p></div></li>'; }).join('') + '</ol>' +
        (b.cap ? '<p class="note">' + b.cap + '</p>' : '') + (b.perf ? '<i class="perf-line" aria-hidden="true"></i><p class="perf-pt">' + b.perf + '</p>' : '') + '</div>';
      /* A/B 대결판: 멜팅의 VS 구도 그대로 */
      if (b.type === 'vs') {
        var fig = function (s) { return '<figure class="artifact card"><div class="frame"><div class="frame-in"' + (s.html ? ' style="aspect-ratio:1 / 1"' : '') + '>' + (s.html || '<img src="' + BASE + s.src + '" alt="' + s.cap + '" loading="lazy">') + '</div></div><figcaption>' + s.cap + '</figcaption></figure>'; };
        return '<div class="strategy s-c" style="grid-column:1 / -1;margin-top:0;grid-template-columns:minmax(0, 1fr)"><div class="vsboard">' + fig(b.a) +
          '<div class="duel"><span class="side a">' + b.a.tag + '</span><span class="vs">VS</span><span class="side b">' + b.b.tag + '</span><p class="dq">' + b.q + '<small>' + b.note + '</small></p></div>' +
          fig(b.b) + '</div></div>';
      }
      if (b.type === 'carousel') return '<div style="grid-column:1 / -1">' + carousel(b) + '</div>';
      if (b.type === 'funnel') { var fz = vizFunnel(b); return b.wide ? fz : fz.replace('class="viz wide', 'class="viz'); }
      if (b.type === 'phone') return '<figure class="phone" style="margin:0 auto;max-width:300px"><div class="phone-in">' + (b.html || '<img src="' + BASE + b.src + '" alt="' + b.cap + '" loading="lazy">') + '</div><figcaption>' + b.cap + '</figcaption></figure>';
      if (b.type === 'versus') { var vz = vizVersus(b); return b.wide ? vz.replace('class="viz', 'class="viz wide') : vz; }
      if (b.type === 'steps') return '<div class="viz' + w + (b.plain ? ' plain' : '') + (b.dash ? ' dash-flow' : '') + '">' + h + statVis({ type: 'steps', items: b.items }) + '</div>';
      /* v1.8-B 댓글: 좋은 브리프 VS 아쉬운 브리프 */
      if (b.type === 'bvs') {
        var side = function (s, ok) {
          return '<div class="bvs-card ' + (ok ? 'good' : 'bad') + '"><div class="bvs-top">' + briefFace(ok) + '<span class="bvs-sign" aria-hidden="true">' + (ok ? 'O' : 'X') + '</span></div>' +
            '<h4>' + s.title + '</h4><ul>' + s.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
        };
        return '<div class="bvs">' + side(b.good, true) + '<span class="bvs-vs" aria-hidden="true">VS</span>' + side(b.bad, false) + '</div>';
      }
      if (b.type === 'stats') return '<div class="viz' + w + ' stats-band"' + (b.top ? ' style="align-self:start"' : '') + '>' + h + '<div class="figs">' + b.items.map(stat).join('') + '</div></div>';
      if (b.type === 'list') return '<div class="viz' + w + '">' + h + '<ol class="points' + (b.cols ? ' cols' : '') + (b.cols2 ? ' cols2' : '') + '">' + b.items.map(function (t, i) {
        return '<li><span class="pnum" aria-hidden="true">' + pad(i + 1) + '</span><div><p>' + t + '</p></div></li>'; }).join('') + '</ol></div>';
      if (b.type === 'image') return '<div class="viz' + w + '">' + h + hwImg(b.src, b.cap) + (b.cap ? '<p class="note">' + b.cap + '</p>' : '') + '</div>';
      if (b.type === 'hw') return '<div class="hw-vis"' + (b.wide ? ' style="grid-column:1 / -1"' : '') + '>' + hwVis(b.vis) + '</div>';
      return '';
    }).join('') + '</div>';
  }
  /* v1.8-B: 남자 얼굴 (웃는 얼굴 / 우는 얼굴) */
  function briefFace(ok) {
    var eyes = ok ? '<path d="M27 40q4-5 8 0M45 40q4-5 8 0" stroke="#2F2A33" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : '<path d="M27 38q4 4 8 0M45 38q4 4 8 0" stroke="#2F2A33" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M29 44q-3 8 0 11q3-3 0-11zM51 44q-3 8 0 11q3-3 0-11z" fill="#5BA8F0"/>';
    var mouth = ok ? '<path d="M30 52q10 11 20 0z" fill="#B23A48"/>' : '<path d="M31 60q9-9 18 0" stroke="#2F2A33" stroke-width="3" fill="none" stroke-linecap="round"/>';
    return '<svg class="bvs-face" viewBox="0 0 80 80" role="img" aria-label="' + (ok ? '웃는 얼굴' : '우는 얼굴') + '">' +
      '<circle cx="40" cy="44" r="27" fill="#FFDCC2"/><path d="M13 40q0-25 27-25t27 25q-6-11-20-12q-5 6-14 4q-9 0-20 8z" fill="#3A2E2A"/>' +
      '<circle cx="24" cy="50" r="4" fill="#FFB4B4" opacity=".7"/><circle cx="56" cy="50" r="4" fill="#FFB4B4" opacity=".7"/>' + eyes + mouth + '</svg>';
  }
  /* v1.8-B: 인사이트 한 줄 (질문 상자 모양 그대로) */
  function insightLine(ref) {
    return ref.insight ? '<div class="question' + (ref.insightTag ? ' has-tag' : '') + '"><span class="q-mark word" aria-hidden="true">INSIGHT</span>' + (ref.insightTag ? '<span class="ins-tag">' + ref.insightTag + '</span>' : '') + '<p>' + ref.insight + '</p></div>' : '';
  }

  /* v1.8-B: 페이지 순서가 바뀌어도 v1.8에 있던 케이스는 v1.8 때의 구도·배경 그대로 */
  var V18_ORDER = ['ridi', 'wyp', 'melting', 'mangazine'];
  function chapter(ref, chIdx) {
    var c = D.cases[ref.id];
    var idx = V18_ORDER.indexOf(ref.id); if (idx < 0) idx = chIdx;
    var v = c.variant || 'abcd'.charAt(idx % 4);
    // v1.8: 망가진은 잡지 지면처럼 (댓글 피드백)
    if (c.channel) {
      return '<section class="chapter l-' + v + ' mag" id="case-' + ref.id + '">' +
        '<div class="mag-bg" aria-hidden="true">' +
          '<svg class="mag-waves" viewBox="0 0 1440 900" preserveAspectRatio="none"><path d="M-40 260 C 240 120, 420 420, 720 300 S 1180 120, 1480 260"/><path d="M-40 520 C 300 660, 520 360, 820 470 S 1240 640, 1480 470"/></svg>' +
          [['MAGAZINE', 'm1'], ['BRAND', 'm2'], ['TEAM', 'm3'], ['CONTENT', 'm4']].map(function (m) { return '<div class="mag3d ' + m[1] + '"><i class="pg"></i><i class="cv"><b>M</b></i><span class="tagl">' + m[0] + '</span></div>'; }).join('') +
          '<span class="mag-big">MANGAZINE</span></div>' +
        '<div class="wrap">' +
        chapterBody(ref, c, v, idx, chIdx) + '</div></section>';
    }
    return '<section class="chapter l-' + v + (idx % 2 ? ' alt' : '') + (c.dark ? ' dark' : '') + '" id="case-' + ref.id + '">' +
      glow(idx % 2 ? ROSE : PINK, 640, idx % 2 ? 'top:-160px;left:-260px' : 'top:-120px;right:-240px', 0.45) +
      bigIcon(CASE_ICON[ref.id] || 'heart', idx % 2 ? 'left:-70px;top:120px;width:320px' : 'right:-70px;top:120px;width:320px') +
      pearl(idx % 2 ? 160 : 120, idx % 2 ? 'right:-60px;top:46%' : 'left:-50px;top:52%', idx % 2 ? 'cool' : 'warm') +
      star(22, idx % 2 ? 'left:46%;top:60px' : 'right:40%;top:70px') +
      '<div class="wrap">' + chapterBody(ref, c, v, idx, chIdx) + '</div></section>';
  }

  function chapterBody(ref, c, v, idx, chIdx) {
    return '<div class="case-bar"><span class="ch-pill">CH.' + pad(chIdx + 1) + '</span><span>' + c.label + '</span><span class="rec"><i></i>' + (c.period ? c.period.replace(/<br>/g, ' ') : 'ON AIR') + '</span></div>' +
      // v1.8: 협업 광고주 로고를 제목 앞에 (파일이 없으면 자리만 숨겨요)
      '<div class="cover' + (c.target ? '' : ' solo') + '"><div><h2>' + (c.logo ? '<span class="client-logo"><img src="' + BASE + c.logo + '" alt="' + (c.client || '') + ' 로고" onerror="this.parentNode.remove()"></span>' : '') + c.title + '</h2>' + (ref.lead ? '<p class="cover-lead">' + ref.lead + '</p>' : '') + facts(c) + '</div>' +
      (c.target ? persona(c) : '') + '</div>' +   /* v1.8: 한 줄 요약 박스 삭제 (댓글 피드백) */
      (ref.question ? '<div class="question"><span class="q-mark' + (ref.qmark ? ' word' : '') + '" aria-hidden="true">' + (ref.qmark || '“') + '</span><p>' + ref.question + '</p></div>' : '') +
      (c.brand ? brandBoard(c.brand) : '') +
      (c.channel ? channelBlock(c.channel) : '') +
      (c.flow ? journey(c) : '') +
      (c.howWork ? howWork(c.howWork) : '') +
      strategy(c, v) +
      (c.carousel ? carousel(c.carousel) : '') +
      blocks(c) +   /* v1.8-B */
      (c.voiceFirst ? voice(ref, c, idx) + results(c, v) : results(c, v) + voice(ref, c, idx)) +   /* v1.8: 광고주 반응을 결과 위로 올릴 수 있게 */
      insightLine(ref);   /* v1.8-B */
  }

  /* ---------- 그 밖의 경험 ---------- */
  function minor(job) {
    if (!job.minor || !job.minor.length) return '';
    return '<section class="section">' + pearl(110, 'right:-40px;top:80px', 'warm') +
      '<div class="wrap"><div class="sec-head"><div>' + label('More Experience') + '<h2>그 밖의 <span class="key">경험</span></h2></div>' +
      guide('이것도 놓치면 <b>아쉬워!</b>', 'hi') + '</div><div class="minor">' + job.minor.map(function (id) {
        var c = D.cases[id];
        return '<div class="folder' + (c.thumb ? ' has-thumb' : '') + '">' +
          (c.thumb ? '<figure class="minor-thumb"><img src="' + BASE + c.thumb.src + '" alt="' + c.thumb.cap + '" loading="lazy"><figcaption>' + c.thumb.cap + '</figcaption></figure>' : '') +
          '<h3>' + c.title + '</h3>' + (c.period ? '<p class="minor-period">' + c.period + '</p>' : '') +
          '<p class="minor-short">' + c.short + '</p></div>';
      }).join('') + '</div></div></section>';
  }

  /* ---------- 이력 스프레드 ---------- */
  function profile() {
    var p = D.profile;
    var rows = function (arr) { return '<ul class="rows">' + arr.map(function (a) {
      return '<li' + (a.date ? '' : ' class="nodate"') + '>' + (a.date ? '<span class="r-date">' + a.date + '</span>' : '') + '<span>' + a.t + (a.d ? '<small>' + a.d + '</small>' : '') + (a.org ? '<small>' + a.org + '</small>' : '') + '</span></li>';
    }).join('') + '</ul>'; };
    return '<section class="section section-alt" id="profile">' + glow(PINK, 680, 'top:-200px;right:-240px', 0.6) +
      '<div class="wrap"><div class="spread">' +
      // v1.8: 레퍼런스 느낌 나던 폴더+선택상자 대신 이름표 (댓글 피드백)
      '<div class="spread-left"><h2 class="sr-only">Profile</h2><div class="nametag" aria-hidden="true"><i class="nt-strap"></i><i class="nt-clip"></i>' +
      '<div class="nt-card"><div class="nt-head"><b>HELLO</b><span>my name is</span></div>' +
      '<div class="nt-name">' + p.nameKo + '<small>' + p.nameEn + ' · Content / Growth / Performance Marketer</small></div><span class="nt-star">✦</span></div></div>' +
      '<p class="about-me">' + ABOUT_LINE + '<br>' + p.education[0].t + ' ' + p.education[0].d + '</p>' +
      '<div class="contact"><h3>' + p.nameEn + '</h3>' + mail('contact-mail', p.email) + '</div>' + mascot('point', 'm-mini') + '</div>' +
      '<div class="spread-right">' +
      '<div><h3>Awards</h3>' + rows(D.awards) + '</div>' +
      '<div><h3>Activities</h3>' + rows(p.activities) + '<h3 style="margin-top:28px">Certificates</h3>' + rows(D.certs) + '</div>' +
      '<div class="wide"><h3>Tools</h3><div class="tools">' + D.tools.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></div>' +
      '</div></div></div></section>';
  }

  function footer() {
    return '<footer class="footer">' + glow(PUR, 720, 'top:-260px;right:-140px', 0.55) + glow(MAG, 520, 'bottom:-240px;left:8%', 0.3) +
      deco('sparkle', 'top:90px;right:34%;width:18px;color:#FFC0DE;opacity:.8') +
      '<div class="wrap footer-grid"><div>' + label('Contact') +
      '<p class="footer-line">' + ABOUT_LINE + ',<br><span class="glow-text">' + D.profile.nameKo + '</span></p>' +
      '<dl class="footer-contact"><div><dt>Email</dt><dd>' + D.profile.email + '</dd></div>' + (CP.profile && CP.profile.phone ? '<div><dt>Phone</dt><dd>' + CP.profile.phone + '</dd></div>' : '') + '</dl></div>' +
      '<div class="footer-visual">' + say('끝까지 봐줘서 <b>고마워!</b>') + mascot('cheer', 'm-foot') + '</div></div></footer>';
  }

  /* ---------- 직무 고르기 (index.html) ---------- */
  function home() {
    return '<section class="hero">' + heroDecor() + topbar('') +
      '<div class="wrap"><div class="hero-grid"><div>' + label('Portfolio') +
      '<h1 class="hero-title">될 때까지<br>방법을 찾아내 버리는<br><span class="grad-text">' + D.profile.nameKo + '</span>입니다</h1>' +
      '<p class="hero-sub">보고 싶은 직무를 골라주세요.</p></div>' +
      '<div class="hero-visual"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>' +
      say('안녕! 나는 <b>몽글이</b>야.<br>어떤 채널부터 틀어볼까?') + mascot('hi', 'm-hero') + '</div></div>' +
      '<ul class="job-list">' + J.order.map(function (id, i) {
        var j = J[id];
        var inner = '<span class="job-no">CH.' + pad(i + 1) + '</span><span class="job-name"><small>' + j.en + '</small>' + j.ko + '</span>' +
          '<span class="job-line">' + j.oneLine + '</span><span class="job-go">' + (j.ready ? '보러 가기' : '준비 중') + '</span>';
        return '<li>' + (j.ready ? '<a class="job" href="' + j.file + '">' + inner + '</a>' : '<div class="job off">' + inner + '</div>') + '</li>';
      }).join('') + '</ul></div></section>';
  }

  /* v1.8: 이미지 위 번호 → 아래 설명 번호를 연한 점선으로 잇기 (구도 c, 멜팅) */
  function drawPinLines() {
    var boxes = document.querySelectorAll('.strategy.s-c');
    Array.prototype.forEach.call(boxes, function (box) {
      var old = box.querySelector('.pin-lines'); if (old) old.remove();
      var br = box.getBoundingClientRect();
      var nums = box.querySelectorAll('.points > li .pnum');
      var paths = '';
      Array.prototype.forEach.call(box.querySelectorAll('.pin[data-n]'), function (pin) {
        var target = nums[+pin.getAttribute('data-n') - 1]; if (!target) return;
        var a = pin.getBoundingClientRect(), b = target.getBoundingClientRect();
        var x1 = a.left + a.width / 2 - br.left, y1 = a.bottom - br.top;
        var x2 = b.left + b.width / 2 - br.left, y2 = b.top - br.top - 4;
        var my = (y1 + y2) / 2;
        paths += '<path d="M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + my + ' ' + x2 + ' ' + my + ' ' + x2 + ' ' + y2 + '"/><circle cx="' + x2 + '" cy="' + y2 + '" r="3"/>';
      });
      if (!paths) return;
      box.insertAdjacentHTML('afterbegin', '<svg class="pin-lines" aria-hidden="true" width="' + br.width + '" height="' + br.height + '">' + paths + '</svg>');
    });
  }

  /* v1.8: 카드 템플릿 번호 → 오른쪽 설명 번호 점선 */
  function drawTplLines() {
    Array.prototype.forEach.call(document.querySelectorAll('.tpl-body'), function (box) {
      var old = box.querySelector('.pin-lines'); if (old) old.remove();
      var br = box.getBoundingClientRect(), nos = box.querySelectorAll('.tpl-no'), paths = '';
      Array.prototype.forEach.call(box.querySelectorAll('.tpl-pin'), function (pin, i) {
        var t = nos[i]; if (!t) return;
        var a = pin.getBoundingClientRect(), b = t.getBoundingClientRect();
        var cr = box.querySelector('.tpl-card img').getBoundingClientRect();
        var x1 = Math.max(a.right, cr.right + 6) - br.left, y1 = Math.min(Math.max(a.top + a.height / 2, cr.top + 14), cr.bottom - 14) - br.top, x2 = b.left - br.left - 4, y2 = b.top + b.height / 2 - br.top;
        var mx = (x1 + x2) / 2;
        paths += '<circle cx="' + x1 + '" cy="' + y1 + '" r="3"/><path d="M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '"/><circle cx="' + x2 + '" cy="' + y2 + '" r="3"/>';
      });
      if (paths) box.insertAdjacentHTML('afterbegin', '<svg class="pin-lines" aria-hidden="true" width="' + br.width + '" height="' + br.height + '">' + paths + '</svg>');
    });
  }
  /* ---------- 그리기 ---------- */
  if (jobId === 'home') { app.innerHTML = home(); return; }
  var job = J[jobId];
  document.title = D.profile.nameKo + ' | ' + koOf(job) + ' 포트폴리오';
  setTimeout(drawPinLines, 0); setTimeout(drawTplLines, 0);
  window.addEventListener('load', drawTplLines);
  window.addEventListener('load', drawPinLines);
  window.addEventListener('resize', drawPinLines);
  /* v1.8-B (뉴팅랩스): 문서의 페이지 순서만. 소개 → 페이지 1~8 → 연락처
     (왜 이 직무인가, 편성표, 그 밖의 경험, 이력·툴 소개는 뺌) */
  app.innerHTML = hero(job) + '<main>' + job.cases.map(chapter).join('') + '</main>' + footer();
})();
