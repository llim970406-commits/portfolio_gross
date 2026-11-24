/* ==========================================================
   data-fastcampus.js = 패스트캠퍼스 경쟁 PT 케이스 (재구성판)
   - 근거: references/fastcampus 발표 자료 캡처 16장의 실제 수치
   - 발표 캡처를 통째로 쓰지 않고, 숫자·차트·카드로 다시 구성
     실제 집행 소재만 잘라서 키워 씀 (images/web/fc-*.png)
   - data.js의 기존 fastcampus는 그대로 두고 새 이름(fastcampusFull)으로 더하기만
   - 다른 직무 포트폴리오(퍼포먼스 마케터 등)에서도 이 파일만 불러서 재사용
     (render.js의 blocks 부품: head / list / versus / stats / steps)
   ========================================================== */

window.DATA = window.DATA || { cases: {} };

/* 실제 집행 소재를 HTML로 다시 그리는 부품 (캡처 화질 대신 선명하게, 스타일은 style.css의 .fc*) */
var FC_ART = (function () {
  function quiz(no, q, opts, ox) {
    return '<div class="fc-art fcq"><div class="fcq-t">마케터 역량 고사</div>' +
      '<p class="fcq-q"><b>' + no + '.</b>' + q + '</p>' +
      (ox ? '<div class="fcq-ox">O / X</div>' : '<ol class="fcq-o">' + opts.map(function (o, i) { return '<li>' + '①②③④'.charAt(i) + ' ' + o + '</li>'; }).join('') + '</ol>') +
      '<div class="fcq-no"><span>' + no + '번</span></div></div>';
  }
  function toon(lines, mark) {
    return '<div class="fc-art fct"><span class="fct-logo">Fast campus</span><p>' + lines.join('<br>') + '<br><mark>' + mark + '</mark></p></div>';
  }
  function news(h) {
    return '<div class="fc-art fcn"><i class="fcn-mon m1"></i><i class="fcn-mon m2"></i><span class="fcn-brand">FastCampus 뉴스</span>' +
      '<div class="fcn-body"><span class="fcn-tag">뉴스 속보</span><p class="fcn-h">' + h + '</p></div><span class="fcn-time">3:42</span></div>';
  }
  var ICON = {
    drink: '<svg viewBox="0 0 96 80" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"><path d="M18 30h20l-3 34H21z"/><path d="M58 22h20l-3 42H61z"/><path d="M60 34h16" stroke="#2F55D4"/><path d="M20 40h16" stroke="#2F55D4"/></svg>',
    night: '<svg viewBox="0 0 96 80" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"><path d="M10 70V30a18 18 0 0 1 36 0v40z"/><path d="M28 12v58M10 44h36"/><path d="M36 22a6 6 0 1 1-6-6 5 5 0 0 0 6 6z" fill="#FFD21F"/><path d="M56 70h34M60 70l4-22h22l-4 22" /><path d="M66 56h14" stroke="#FFD21F"/></svg>',
    chart: '<svg viewBox="0 0 96 80" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"><rect x="10" y="8" width="76" height="58" rx="3"/><path d="M24 54V40" stroke="#ED7A8A" stroke-width="7"/><path d="M38 54V32" stroke="#F2B35B" stroke-width="7"/><path d="M52 54V26" stroke="#6CC28A" stroke-width="7"/><path d="M66 54V18" stroke="#ED7A8A" stroke-width="7"/><path d="M40 66l-6 10M56 66l6 10"/></svg>',
  };
  function comic(panels) {
    return '<div class="fc-art fcc">' + panels.map(function (p) {
      return '<div class="fcc-p"><p class="fcc-b' + (p.blue ? ' blue' : '') + '">' + p.t + '</p>' + ICON[p.icon] + '</div>';
    }).join('') + '</div>';
  }
  function inflow(rows) {
    return '<div class="fci"><h5>상세 분석</h5><div class="fci-tabs"><span>조회수</span><b>유입경로</b><span>성별/연령별 분포</span></div>' +
      '<p class="fci-date">11.25. ~ 12.01.</p><ul>' + rows.map(function (r) { return '<li class="' + (r[2] || '') + '"><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('') + '</ul></div>';
  }
  return { quiz: quiz, toon: toon, news: news, comic: comic, inflow: inflow };
})();
window.DATA.cases.fastcampusFull = {
  label: 'Fastcampus Competition',
  title: '패스트캠퍼스 마케팅 경쟁 PT 대상',
  logo: null,
  variant: 'a',   /* 표지 왼쪽 정렬 + 타깃 카드 오른쪽 */
  client: '패스트캠퍼스',
  goal: '파이썬 강의 온라인 판매',
  format: '구글 디맨드젠 · 인스타그램',
  role: '팀장 (5명)',
  factLabels: { format: '매체', kpi: 'KPI' },
  factWide: 'kpi',   /* 긴 KPI는 아래 한 줄 전체로 */
  target: '"실무와 이어지는 강의는 없는 것 같아"<br>고연봉을 원하는 문과 취준생',
  avatar: 'client',
  persona: ['실무와 연결되는 데이터 분석 강의', '고연봉 직무', '웹툰·숏츠 콘텐츠 소비'],
  kpi: 'CTR 4% (디맨드젠) · 2.24% (인스타툰)',

  /* 이미지: references/fastcampus 캡처에서 실제 집행 소재만 잘라 2~3배 키운 것 (images/web/fc-*.png) */
  blocks: [
    /* ---------- 1. 매체 전략: 실제 소재 이미지 + 설계 포인트 ---------- */
    { type: 'head', title: '매체마다 다르게 설계하기' },
    { type: 'channel', title: '구글 디맨드젠 · 검색 의도 타깃', cap: '실제 집행한 유튜브 뉴스형 썸네일 2종',
      src: 'images/web/fc-dg-mock.png', h: 250,   /* 이 칸은 원본 이미지 그대로 (FC_ART.news로 다시 그린 버전은 쓰지 않음) */
      items: [
      '<b>타깃</b> 국비지원 키워드 10개 · 취업/포트폴리오 키워드 50개<br>경쟁사 강의 상세페이지 방문자',
      '<b>소재</b> 노란색·검정색 대비의 뉴스형 디자인으로 전문성',
      '<b>로고</b> "패스트캠퍼스뉴스"로 브랜드 인지 + 진짜 뉴스가 아님을 넌지시',
    ] },
    { type: 'channel', title: '인스타툰 · 페르소나 공감 타깃', cap: '실제 집행한 인스타툰 원본 · 술자리 후킹 → 실무 → 이직 → 0원 강의 CTA',
      /* 고화질 원본 4장 (references/fastcampus/고화질) 2×2 */
      html: '<div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:6px;padding:6px;background:#fff">' +
        ['fc-toon-1', 'fc-toon-2', 'fc-toon-3', 'fc-toon-4'].map(function (n, i) {
          return '<img src="' + (window.ASSET_BASE || '') + 'images/web/' + n + '.png" alt="인스타툰 ' + (i + 1) + '컷" loading="lazy" style="display:block;width:100%;aspect-ratio:1 / 1;border-radius:8px">';
        }).join('') + '</div>',
      items: [
      '<b>후킹</b> 고연봉을 암시하는 대사로 시작',
      '<b>전개</b> "파이썬으로 데이터 분석하는 신입" → 실무 투입 가능 강조',
      '<b>집행</b> 평일에만, 주말엔 자기개발 키워드 검색이 줄어서',
    ] },

    /* ---------- 2. A/B 테스트: VS 대결판 ---------- */
    { type: 'head', title: 'A/B 테스트로 남길 소재 고르기' },
    { type: 'vs',
      a: { html: '<img src="' + (window.ASSET_BASE || '') + 'images/web/fc-toon-a-hq.png" alt="A안 썸네일 원본" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">', cap: 'A안 · 대기업 간 썰 (원본)', tag: 'A안 CTR 0.70%' },
      b: { html: FC_ART.toon(['소름…', '친구 연봉 떠봤다가'], '이득 본 썰'), cap: 'B안 · 이득 본 썰', tag: 'B안 CTR 6.02%' },
      q: 'CPC 574원 → 63원, 링크 클릭 3회 → 1,645회',
      note: '목표 KPI 2.24% · 11.13 – 11.18 테스트 후 B안만 집행' },
    { type: 'list', title: 'B안이 이긴 이유', items: [
      '일상·유머 썰 느낌에 맞춘 후킹 멘트',
      '"친구 연봉을 떠본 것"과 "이득 본 것"의 인과관계가 궁금증 유발',
      'A안은 "대기업 간 썰"이 바이럴처럼 보여 거부감',
    ] },
    { type: 'versus', title: '디맨드젠 뉴스형 소재 CTR',
      items: [{ l: 'A안', v: 6.82, show: '6.82%' }, { l: 'B안', v: 7.02, show: '7.02%', hi: true }, { l: '목표 KPI', v: 4, show: '4%' }],
      note: '두 안 모두 KPI 초과 → 둘 다 집행<br>이탈률 60.32% · 58.56% (평균 70~90%)' },

    /* ---------- 3. 문제 → 해결: 역량고사 카드뉴스 ---------- */
    { type: 'head', title: 'CTR은 높은데 신청이 없다면' },
    { type: 'steps', wide: true, title: '인스타툰 B안 GA4: 이탈률 98.44%, 신청 4명', items: ['정보성 흐름이 약한 인스타툰', '관심 없는 사람까지 유입', '카드뉴스 "마케터 역량고사"로 타깃 좁히기'] },
    { type: 'carousel', title: '마케터 역량고사 카드뉴스 · 시험 형식으로 파이썬 필요성 알리기', items: [
      { html: FC_ART.quiz(1, '코딩은 마케터의 필수 역량이다.', null, true), t: '1번', d: '코딩은 마케터의 필수 역량이다 O/X' },
      { html: FC_ART.quiz(2, '다음 중 마케터에게 꼭 필요한 요소가 아닌 것은?', ['광고 반응률 예측', '구매율 예측', '구매 요인 분석', '내일 교수님 기분 예측']), t: '2번', d: '마케터에게 꼭 필요한 요소' },
      { html: FC_ART.quiz(3, '다음 중 올해 (5월 사람인 기준) 데이터 분석 역량 취업 우대 건수는?', ['345', '678', '123', '2,796']), t: '3번', d: '데이터 분석 역량 우대 공고 수' },
      { html: FC_ART.quiz(4, '데이터 분석 강의를 시청했을 시 기초부터 실무까지 끝내는 최소 시간은?', ['5일', '5주', '5개월', '5년']), t: '4번', d: '실무까지 끝내는 최소 시간' },
      { html: FC_ART.quiz(5, '데이터 분석 강의의 예상 적정 가격은?', ['50,000원', '0원', '100,000원', '1,000,000원']), t: '5번', d: '강의 적정 가격 → 무료 수강 안내' },
    ] },
    { type: 'stats', wide: true, items: [
      { v: '2.25', u: '배', l: '평균 세션 시간', n: '4.28 → 9.64' },
      { v: '23.44', u: '%p', l: '이탈률 감소', n: '98% → 75%' },
      { v: '50', u: '%', l: '신청 전환', n: '집행 8일 만에 인스타툰 17일치의 절반' },
    ] },

    /* ---------- 4. 바이럴과 예산 ---------- */
    { type: 'head', title: '광고 밖으로 퍼지기' },
    { type: 'phone', html: FC_ART.inflow([
        ['네이버 통합검색_모바일', '53.85%', 'top'], ['성격테스트 mbti', '23.08%', 'sub'], ['코딩 성격테스트 결과', '15.38%', 'sub'],
        ['코딩 라이브러리 성격 테스트 mbti', '7.69%', 'sub'], ['코딩라이브러리 성격테스트', '7.69%', 'sub'],
        ['네이버 블로그검색_모바일', '23.08%'], ['네이버 블로그검색_PC', '15.38%'], ['네이버 메인_PC', '7.69%'],
      ]), cap: '네이버 통합검색 유입 53.85%<br>유저가 직접 검색하고 리뷰까지' },
    { type: 'versus', title: '역량고사 참여 경로 (12.1 바이럴)',
      items: [{ l: '인스타그램', v: 1559, show: '1,559', hi: true }, { l: 'X (트위터)', v: 316, show: '316' }, { l: '인스티즈', v: 79, show: '79' }, { l: '에브리타임', v: 64, show: '64' }, { l: '블로그', v: 61, show: '61' }],
      note: '광고 외 매체 CTR 11.66 ~ 15.68%' },
    { type: 'versus', wide: true, title: '예산: 1차 미팅 예상 비용 대비 1,010,935원 절감',
      items: [{ l: '1차 미팅 예상 비용', v: 2898000, show: '289.8만' }, { l: '실제 집행', v: 1887065, show: '188.7만', hi: true }],
      note: '실제 집행 1,887,065원 = 인스타그램 706,897원 + 디맨드젠 1,180,168원' },

    /* ---------- 5. 인사이트 ---------- */
    { type: 'list', wide: true, cols: true, title: '최종 인사이트', items: [
      '<b>바이럴로 인지도 먼저</b><br>타깃의 흥미를 끄는 소재가 퍼지면 비용 없이 강의 노출',
      '<b>공감대로 후킹, 강의로 연결</b><br>강의 정보보다 쉬운 공감 요소로 먼저 붙잡고 강의와 연결',
      '<b>관심 분야와 엮어 궁금증 유발</b><br>파이썬을 취업·고연봉과 연결해 페이지로 유입',
    ] },
  ],
};

