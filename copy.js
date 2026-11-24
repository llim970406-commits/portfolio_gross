/* ==========================================================
   v1.8-B (뉴팅랩스 · 야우린용) 전용 copy.js
   - 근거 문서: jobs/뉴팅랩스.md
   - 공용 data.js, jobs.js, 맨 바깥 copy.js는 그대로 두고
     이 페이지 안에서만 덮어써요.
   - 문서에 적힌 문장만 사용. 숫자도 문서·기존 data.js에 있는 것만.
   ========================================================== */

window.COPY = {

  profile: {
    aboutLine: '될 때까지 방법을 찾아내 버리는 사람',
    phone: '010-7132-1856',
  },

  jobs: {
    content: {
      /* 전체 공통 표기 (댓글 요청): 콘텐츠 / 그로스 / 퍼포먼스 마케터 */
      en: 'IMC / Influencer Marketer',
      koSp: 'IMC / 인플루언서 마케터',
      /* 0. 소개: 메인 문장 / 보조 문장 */
      /* 댓글 요청: 제목 교체(줄바꿈 "사람이" 뒤), 보조 문장 삭제 */
      heroTitle: '<span class="ht-sm ht-3"><span class="ht-line">광고도 받아 본 사람이</span><br><span class="ht-line ht-tilt"><i class="ht-ul" aria-hidden="true"></i><span class="ht-tx">인플루언서 협업</span></span><br><span class="ht-line">제대로 할 줄 안다</span></span>',
      heroSub: '',
    },
  },

  /* v1.8과 같은 문장 (위프·멜팅) */
  cases: {
    wyp: {
      target: '흑발에 까칠한 남고딩 캐릭터를<br>좋아하는 여성 오타쿠',
      avatar: 'otaku',
      logo: 'images/web/logo-wyp.webp',
      voiceFirst: true,
      quote: { text: ['인플루언서 마케팅을 이 채널로 처음 했는데,<br>여태 한 프로모션 중 정말 잘됐어요', '다른 버전으로도 만들고 싶은데,<br>어떤 의도로 만들었길래 이렇게 잘되나요?'] },
      points: [
        { d: '낯선 서비스! 2페이지를 개념 설명에 쓰기' },
        { d: '<b>걸스나잇</b> 트렌드로 챗봇을 놀이처럼 제안하기' },
        { d: '캐릭터 하나를 키워드로 깊게 파서 취향 정확히 공략하기' },
        { d: '광고 느낌을 빼서 클릭 비용(CPC)까지 낮추기' },
      ],
      media: [null, { cap: '게시물 인사이트 (실제 수치)' }],
      pins6: [false, false, false, false],
      stats: [null,
        { vis: { type: 'dots', on: 6, label: '노출 100번 중 약 6번 클릭' } },
        { vis: { type: 'steps', items: ['첫 협업', '재의뢰', { t: '미진행', off: true }], label: '재의뢰 2번 받고, 실제 협업은 총 2번' } }],
      viz: [{ note: '도달한 사람 100명 중 약 2.4명이 친구에게 공유' }],
    },
    melting: {
      dark: true,
      avatar: 'teen',
      points: [
        { d: '설명부터 하던 위프 방식을 버리고<br>캐릭터 자체의 매력 앞세우기' },
        { d: '아저씨 vs 동갑 구도로 캐릭터 4명을 키워드화<br>친구에게 물어보고 싶어서 공유하게' },
        { d: '1020 여성 사이에서 유행하던 그림러 릴스 형식을 참고<br>흑백으로 바꿔 AI 이미지 느낌을 지우고<br>빠른 컷 전환으로 오래 머물게' },
      ],
      duel: { a: '🧔 아저씨', b: '👦 동갑', note: '캐릭터 4명을 두 편으로 나눠 키워드로 소개' },
      carousel: { title: '카드뉴스 9장의 흐름', items: [null, null, null, { d: '실제 말투를 사용해서 후킹하게' }, { d: '가입 이벤트 혜택으로 앱 설치까지' }] },
      pinGuide: false,
      logo: 'images/web/logo-melting.png',
      voiceFirst: true,
      viz: [{ note: '광고 소재로 두 달 넘게 사용 (평균 CTR 4.5%)' }],
    },
    ridi: {
      logo: 'images/web/logo-ridi.png',
      pins6: [false, false, false, false],
      pinGuide: false,
      voiceFirst: true,
      /* 8. 남길 내용: 같은 기획으로 다른 작품 협업 제안 받음 */
      quote: { text: '같은 레이아웃과 기획으로 다른 작품 협업 제안<br>릴스는 바이럴이 이어져 이후 3개월 동안 검색량 20~30 유지' },
    },
  },
};

/* ---------- v1.8-B: 페이지 구성 (이 페이지 안에서만 바뀜) ---------- */
(function () {
  var C = window.DATA.cases;
  var mz = C.mangazine;

  /* 2. 위프 캠페인 */
  var L = { goal: '광고주 과제', role: '내 역할' };
  C.wyp.client = '위프 AI챗봇 앱';
  C.wyp.period = '2025.10, 2026.06<br>(협업 2회)';
  C.wyp.format = null;
  C.wyp.goal = '앱 설치';
  C.wyp.role = '기획 · 제작 · 광고주 커뮤니케이션 · 성과 분석 전담';
  C.wyp.factLabels = L;
  C.wyp.factWide = 'role';
  C.wyp.blocks = [{ type: 'steps', wide: true, side: true, title: '실행', items: ['브리프 확인', '기획안 제안', '컨펌', '발행', '성과 보고'] }];

  /* 3. 멜팅 캠페인 */
  C.melting.client = '멜팅 AI챗봇 앱';
  C.melting.period = '2026.04, 2026.05<br>(협업 2회)';
  C.melting.format = null;
  C.melting.goal = '앱 설치';
  C.melting.kpi = '공유 수';
  C.melting.role = '기획 · 제작 · 광고주 커뮤니케이션 · 성과 분석 전담 (카드뉴스, 재의뢰로 릴스)';
  C.melting.factLabels = L;
  C.melting.factWide = 'role';
  C.melting.stats[1].n = '두 달 넘게 교체되지 않고 장기 집행';
  C.melting.persona[2] = '익숙한 그림러 릴스 형식';
  C.melting.quote.text = ['두 달 넘게 살아남는 소재가 많지 않은데, 성과도 수명도 좋은 케이스예요'];
  C.melting.stats.push({ v: '3', u: '건', l: '재의뢰', n: '실제 협업 2회' });

  /* 1. 한눈에 보는 역량 */
  C.b_jd = {
    label: '한눈에 보는 역량',
    title: '업무와 관련된 경험',
    blocks: [{ type: 'table', title: '', cls: 'tbl-text', head: ['업무', '제 경험', '페이지'], rows: [
      ['IMC 마케팅 전략 수립·실행', '광고주 목표에 맞춰 채널·소재·타깃을 정한 캠페인 30건 이상', '2, 3'],
      ['인플루언서 시딩·관리·커뮤니케이션', '인플루언서 본인으로 30건 이상 협업, 에디터 4명 섭외·온보딩', '4, 5'],
      ['브랜드 콘텐츠 기획·제작', '리디 협업 2건 총 조회수 180만, 다른 작품 협업 제안', '8'],
      ['클라이언트 소통 (가이드라인·일정·보고서)', '브리프 수령부터 성과 보고까지 직접 진행, 위프·멜팅 모두 재의뢰', '2, 3, 4'],
      ['프로젝트 관리', '에어테이블·간트로 협업 일정과 정산 관리', '5, 6'],
      ['마케팅 데이터 분석', 'GA4로 이탈률 98% 구간 발견, A/B 테스트로 CTR 약 7%', '7'],
    ] }],
  };

  /* 4. 인플루언서 협업 프로세스 */
  C.b_process = {
    label: '인플루언서 협업 프로세스',
    title: '브리프를 받는 쪽에서 배운 것',
    blocks: [
      { type: 'stats', wide: true, title: '규모', items: [
        { v: '12', u: '개 이상', l: '광고주' },
        { v: '30', u: '건 이상', l: '협업' },
        { v: '800', u: '만 원 이상', l: '협업 수익' },
      ] },
      { type: 'steps', wide: true, title: '프로세스', items: ['브리프 수령', '기획안', '1차 가안', '2차 가안', '최종본', '컨펌', '발행', '성과 보고'] },
      /* 댓글 요청: 좋은 브리프(파랑 O, 웃는 얼굴) VS 아쉬운 브리프(빨강 X, 우는 얼굴) */
      { type: 'bvs', good: { title: '받는 쪽에서 본 좋은 브리프', items: [
        '협업 확정 전 정확한 가이드라인<br>받는 쪽도 잘할 수 있는 캠페인인지 판단 가능',
        '분명한 강조 요소와 원하는 레퍼런스',
        '브랜드 광고 요소보다, 채널 무드를 분석한 기획 포인트 제시',
      ] }, bad: { title: '받는 쪽에서 본 아쉬운 브리프', items: [
        '정해진 브랜드 광고 요소를 그대로 넣으라는 요청',
        '채널만의 기획력을 살릴 수 없는 소재',
        '방향 없이 전부 채널에 맡기는 브리프',
      ] } },
      { type: 'list', skip: true, title: '받는 쪽에서 본 좋은 브리프', items: [
        '협업 확정 전 정확한 가이드라인<br>받는 쪽도 잘할 수 있는 캠페인인지 판단 가능',
        '분명한 강조 요소와 원하는 레퍼런스',
        '브랜드 광고 요소보다, 채널 무드를 분석한 기획 포인트 제시',
      ] },
      { type: 'list', skip: true, title: '받는 쪽에서 본 아쉬운 브리프', items: [
        '정해진 브랜드 광고 요소를 그대로 넣으라는 요청',
        '채널만의 기획력을 살릴 수 없는 소재',
        '방향 없이 전부 채널에 맡기는 브리프',
      ] },
      { type: 'list', wide: true, cols: true, title: '그래서 제가 가이드라인을 쓴다면', items: [
        '외부 유출이 안 되는 범위에서,<br>협업 전 가이드라인 정확히 공유',
        '채널의 방향성,<br>팔로워 성별과 니즈를 먼저 받고,<br>그에 맞춘 기획 포인트 먼저 제안',
        '브랜드 광고 요소는 채널 콘텐츠 안에 최대한 자연스럽게 녹이기',
      ] },
    ],
  };

  /* 5. 프로젝트 관리 (팀 운영) */
  C.b_team = {
    label: '팀 운영',
    title: '프로젝트 관리 (팀 운영)',
    pointsCols: true,
    points: [
      { ico: '🤝', d: '에디터 지원자 20명 이상 중 4명 직접 선발,<br>온보딩 가이드와 제작 가이드라인 제작' },
      { ico: '📅', d: '에어테이블과 간트 차트로 협업 일정, 진행 상태, 정산을<br>한곳에서 관리' },
      { ico: '🎬', d: '매주 팀 회의 진행, 기획과 제작 디렉팅' },
    ],
    blocks: [{ type: 'hw', wide: true, vis: mz.howWork.items[2].vis6 }],   /* v1.8 망가진의 간트 그림 그대로 */
    viz: mz.viz,   /* 월 조회수 10만 → 60만, 게시물당 평균 댓글 8 → 30개 */
    resultsTitle: 'So, What Changed?',   /* 댓글 요청: 영어 제목 */
  };

  /* 6. AI 효율 개선 */
  C.b_ai = {
    label: 'AI 효율 개선',
    title: '반복 업무는 자동화하고,<br>기획에 시간 집중',
    pointsCols: true,
    points: [
      { ico: '⚙️', t: '에어테이블·간트 자동화', d: '협업 일정과 정산 관리를 자동화' },
      { ico: '🔍', t: '네이버 데이터랩 API 자동화', d: '키워드 검색량 추이를 자동으로 모아 콘텐츠 기획에 활용<br>어떤 키워드를 앞세워야 유입이 실제로 늘어나는지 확인<br>알리려는 이름을 사람들이 아직 검색하지 않을 때, 실제로 검색되는 키워드를 찾아 강조' },
      { ico: '🤖', t: 'AI 챗봇 프롬프트 설계', d: '위프·멜팅 캠페인에서 캐릭터 말투와 키워드를 학습시킨 AI 챗봇 콘텐츠 기획' },
    ],
    blocks: [
      { type: 'hw', vis: mz.howWork.items[0].vis },   /* v1.8 망가진의 데이터랩 자동 비교 그림 그대로 */
      { type: 'stats', top: true, items: [{ v: '30→3', u: '분', l: '키워드 확인 시간 (하루)', n: '따로 계획·분석할 필요 없이 확인만' }] },
    ],
  };

  /* 7. 데이터 분석 (패스트캠퍼스): 한 페이지로 줄임 */
  var fc = C.fastcampus;
  fc.period = null; fc.role = null; fc.goal = null; fc.points = null;
  fc.stats = null;
  fc.blocks = [
    { type: 'stats', wide: true, items: [
      { v: '98', u: '%', l: 'GA4로 발견한 이탈률 구간' },
      { v: '약 7', u: '%', l: 'A/B 테스트 CTR' },
      { v: '2.25', u: '배', l: '평균 세션 시간 증가' },
    ] },
    { type: 'image', wide: true, src: fc.thumb.src, cap: fc.thumb.cap },
  ];

  /* 8. 브랜드 콘텐츠 (리디): 한 페이지로 줄임 */
  /* 댓글 요청: v1.8-mongle처럼 다시 펼침. 흐름 = 팔로워 니즈 파악 → 기획 → 협업 성과 → 인플루언서 추천 역량. 성과는 작게, 한 페이지에 */
  var r = C.ridi;
  r.factLabels = L;
  r.goal = '작품 유입';
  r.role = '기획 · 제작 · 광고주 커뮤니케이션 · 성과 분석 전담';
  r.factWide = 'role';
  r.target = '음침하고 어두운 2D 남캐를<br>좋아하는 2030 여성';
  r.avatar = 'dark';
  r.pointsTitle = '팔로워 니즈에 맞춘 기획';
  r.points = [
    { t: '성격 키워드로 썸네일 문구 짜기', d: '비주얼만 보여주지 않고 캐릭터의 성격을 키워드로 내세우기<br>그 성격을 좋아하는 사람이 스스로 들어오게' },
    { t: '도입부에 키워드 먼저', d: '첫 장, 첫 컷에 키워드를 박아<br>중간에 넘겨 버리는 사람 줄이기' },
    { t: '갭모에로 붙잡기', d: '어두운 모습 바로 뒤에 상반되는 밝은 모습 배치<br>반전 매력을 좋아하는 오타쿠 여성의 취향 공략' },
    { t: 'KPI는 저장이 아니라 공유', d: '정보성이 아닌 영업형 콘텐츠<br>콘텐츠 안에 질문을 넣어 친구에게 보내고 싶게' },
  ];
  r.stats[1].n = '두 번째 작품도 10 → 63';
  r.viz = [{ type: 'versus', title: '릴스 한 편 vs 채널 평균 조회수', items: r.viz[0].items, note: '채널 평균은 20~30만의 가운데(25만) 기준' }, r.viz[1]];
  r.shot = Object.assign({}, r.shot, { note: '' });
  r.quote = { who: '광고주 반응', text: '같은 레이아웃과 기획으로 다른 작품 협업 제안<br>릴스는 바이럴이 이어져 이후 3개월 동안 검색량 20~30 유지' };
  r.compactResults = true;

  /* 7. 패스트캠퍼스 (공용 data-fastcampus.js는 그대로, 이 페이지에서만 손봄) */
  var ff = C.fastcampusFull;
  if (ff) {
    var out = [];
    ff.blocks.forEach(function (b) {
      /* 댓글 요청: 바이럴 부분 삭제 (광고 밖으로 퍼지기 · 네이버 유입 · 참여 경로) */
      if (b.type === 'phone' || (b.type === 'head' && b.title === '광고 밖으로 퍼지기') || (b.title || '').indexOf('참여 경로') >= 0) return;
      if (b.type === 'versus' && (b.title || '').indexOf('예산') === 0) out.push({ type: 'head', title: '예산' });
      if (b.type === 'steps' && (b.title || '').indexOf('GA4') >= 0) b = Object.assign({}, b, { plain: true, dash: true });   /* 댓글 요청: 박스 선 없이 + 인스타툰부터 점선으로 이어서 역량고사로 */
      /* 댓글 요청: 디맨드젠 카드 아래 빈 공간에 성과 포인트 (목표 CPC 500원은 본인 제공 수치) */
      if (b.type === 'channel' && (b.title || '').indexOf('디맨드젠') >= 0) b = Object.assign({}, b, { perf: '<b>성과 포인트</b> 목표 CPC 500원 대비 평균 CPC 약 2원 달성' });
      if (b.type === 'carousel') b = Object.assign({}, b, { title: '<span class="ts-badge">트러블슈팅</span>' + b.title + ' (더 직접적으로 타겟층에게 다가가기)' });
      if (b.type === 'list' && b.title === '최종 인사이트') b = Object.assign({}, b, { cols2: true, title: b.title + '<small class="h4-sub">(셀링 상품 트렌드 분석, 3C 분석, 페르소나 인터뷰, SWOT 기법을 통한 자사 분석, 광고 전략, 매체 전략, KPI 선정, 예산 추산, 기대효과 추정 사용)</small>', items: b.items.filter(function (t) { return t.indexOf('바이럴') < 0; }) });
      out.push(b);
    });
    ff.blocks = out;
  }

  /* 페이지 순서: 1 역량 → 2 위프 → 3 멜팅 → 4 협업 프로세스 → 5 팀 운영 → 6 AI 효율 → 7 데이터 분석 → 8 리디 */
  window.JOBS.content.cases = [
    { id: 'b_jd' },
    { id: 'wyp', qmark: 'PROBLEM',
      question: '아직 낯선 AI챗봇을,<br><em>광고처럼 안 보이게</em> 권할 수 있을까?',
      lead: '팔로워가 4배 많은 채널보다 <em>공유 18배</em> <span class="chk" aria-hidden="true"></span><br>채널 크기가 아니라 기획으로 이긴 콘텐츠',
      insight: '<em>시딩은 팔로워 수가 아니라<br>반응률과 공유율로 골라야 한다</em>' },
    { id: 'melting',
      question: '같은 AI챗봇 홍보,<br>이미 통한 방법 말고 <em>무엇으로?</em>',
      lead: '같은 업종, 다른 시기<br><em>이전 성공 공식을 버리고</em> 캐릭터성으로 다시 설계',
      insightTag: 'I CAN',   /* 댓글 요청: 위에 I CAN 라벨 */
      insight: '<em>실제 전환으로 이어지는 콘텐츠!</em><br><span class="ins-sub">실제 성과를 위해 KPI와 타겟층에 맞춰 기획 소재를 추천할 수 있다</span>' },
    { id: 'b_process' },
    { id: 'b_team', lead: '<span class="lead-1">외부 협업자를 섭외하고, 가이드를 주고, 일정을 관리하는 일 = 인플루언서 시딩/관리와 같은 구조</span>' },
    { id: 'b_ai', lead: '캠페인 리포트와 인플루언서 리스트 관리도 같은 방식으로 단축 가능' },
    /* 7. 데이터 분석: references/fastcampus 자료로 재구성한 케이스 (../../data-fastcampus.js) */
    { id: window.DATA.cases.fastcampusFull ? 'fastcampusFull' : 'fastcampus' },
    { id: 'ridi', qmark: 'HOW?',
      question: '어떻게 하면 보는 사람이 궁금해져서<br>친구에게 <span class="imsg">이거 니 취향임?</span>까지 보내게 될까?',
      lead: '채널 팔로워의 취향을 알고 기획한 협업<br>릴스 한 편이 채널 평균의 <em>5배가 넘는 130만 조회</em> 기록',
      insightTag: 'I CAN',
      insight: '<em>팔로워가 반응하는 포인트를 아는 기획!</em><br><span class="ins-sub">채널 팔로워 니즈를 알기에, 인플루언서에게 맞는 기획 포인트를 추천할 수 있다</span>' },
  ];
})();
