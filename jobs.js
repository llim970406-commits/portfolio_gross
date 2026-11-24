/* ==========================================================
   jobs.js = 코디표 👔
   직무마다 "옷장(data.js)에서 무엇을, 어떤 순서로" 꺼낼지 정해요.

   - heroStats : 첫 화면의 큰 숫자 3개
   - keywords  : About의 동그라미 3개 + 결과 동그라미
   - cases     : 대표 사례 순서 (id는 data.js의 이름)
                 lead = 이 직무에서 이 사례를 소개하는 한 줄
   - minor     : 아래쪽 작은 카드로 보여줄 경험
   ========================================================== */

window.JOBS = {

  order: ['content', 'performance', 'chatbot', 'shortdrama', 'planner'],

  /* ① 콘텐츠마케터 */
  content: {
    ready: true,
    file: 'content.html',
    en: 'Content Marketer',
    ko: '콘텐츠마케터',
    bgWord: 'CONTENT',
    oneLine: '좋아하는 마음을 <em>"공유하고 싶은 마음"</em>으로 바꾸는 콘텐츠마케터',
    motivation: '콘텐츠 하나로 작품 검색량이 8에서 100이 되는 걸 직접 만들어봤어요. 이제는 브랜드의 이야기를 사람들이 <em>"친구에게 보내고 싶게"</em> 만들고 싶어요.',
    heroStats: [
      { v: '180', u: '만', l: '리디 협업 2건 총 조회수', n: '채널 평균 20~30만' },
      { v: '18', u: '배', l: '팔로워 4배 큰 채널 대비 공유 수', n: '위프 협업 · 공유 4,500 vs 250' },
      { v: '8→100', u: '', l: '협업 후 작품 검색량', n: '네이버 데이터랩 기준' },
    ],
    keywords: {
      items: [
        { en: 'TARGET', ko: '취향을 잘게 쪼개기', d: '"2030 여성"이 아니라<br>"흑발에 까칠한 남고딩을<br>좋아하는 사람"까지',
          proof: { case: 'wyp', t: '위프: 캐릭터 한 명을 깊게' } },
        { en: 'HOOK', ko: '첫 장에서 붙잡기', d: '도입부 키워드<br>갭모에 · 빠른 컷 전환',
          proof: { case: 'ridi', t: '리디: 도입부 키워드 + 갭모에' } },
        { en: 'SHARE', ko: '보내고 싶게 만들기', d: 'KPI를 공유로 설정<br>"너는 둘 중 뭐야?"',
          proof: { case: 'melting', t: '멜팅: 아저씨 vs 동갑' } },
      ],
      result: { en: 'ACTION', ko: '유입 · 설치 · 재의뢰', proof: { case: 'melting', t: '앱 설치 1,100+, 재의뢰 3건' } },
    },
    cases: [
      { id: 'ridi',
        question: '어떻게 하면 "내 취향이다" 싶어서<br>친구에게 <em>보내고 싶게</em> 만들까?',
        lead: '캐릭터의 성격 키워드와 공유를 부르는 질문으로, 릴스 한 편이 채널 평균의 <em>5배가 넘는 130만 조회</em>를 기록했어요.',
        tip: 'KPI를 저장이 아니라 <b>공유</b>로 잡은 게 핵심이야. 친구한테 보내고 싶게 만들면 알아서 퍼지거든!' },
      { id: 'wyp',
        question: '아직 낯선 AI챗봇을,<br><em>광고처럼 안 보이게</em> 권할 수 있을까?',
        lead: '팔로워가 4배 많은 채널보다 <em>공유를 18배</em> 더 만들었어요. 채널 크기가 아니라 기획으로 이겼어요.',
        tip: '광고처럼 안 보이게 만들었더니, 같은 콘텐츠를 광고로 돌렸을 때 <b>클릭 비용까지</b> 낮아졌대!' },
      { id: 'melting',
        question: '같은 AI챗봇 홍보,<br>이미 통한 방법 말고 <em>무엇으로?</em>',
        lead: '같은 업종, 다른 시기. <em>이전 성공 공식을 버리고</em> 캐릭터성으로 다시 설계했어요.',
        tip: '한 번 성공한 방법을 <b>스스로 버린</b> 게 포인트야. 그래서 두 달 넘게 살아남는 소재가 됐어.' },
      { id: 'mangazine',
        question: '그만둘까 고민하던 채널,<br><em>다시 살릴 수 있을까?</em>',
        lead: '이름부터 색까지 직접 만든 채널이에요. 무너질 뻔한 순간 <em>팀을 꾸려 20일 만에 6배</em>로 되살렸어요.',
        tip: '그만둘까 고민하던 채널을 <b>팀과 시스템</b>으로 다시 살렸어. 이게 바로 "될 때까지"야!' },
    ],
    minor: ['readyset', 'reels', 'fastcampus'],
  },

  /* ② 퍼포먼스마케터 (준비 중) */
  performance: {
    ready: false,
    file: 'performance.html',
    en: 'Performance Marketer',
    ko: '퍼포먼스마케터',
    bgWord: 'PERFORMANCE',
    oneLine: '숫자 속에서 문제를 찾고, <em>될 때까지 고치는</em> 퍼포먼스마케터',
    motivation: '이탈률 98%의 원인을 찾아 고쳤을 때 가장 짜릿했어요. 숫자 속에서 문제를 찾고, <em>될 때까지 고치는</em> 일을 하고 싶어요.',
  },

  /* ③ AI챗봇 운영PD (준비 중) */
  chatbot: {
    ready: false,
    file: 'chatbot.html',
    en: 'AI Chatbot Operation PD',
    ko: 'AI챗봇 운영PD',
    bgWord: 'CHARACTER',
    oneLine: '사람들이 캐릭터의 <em>성격과 말투</em>에 반응한다는 걸 아는 PD',
    motivation: 'AI챗봇을 알리며 사람들이 캐릭터의 <em>"성격과 말투"</em>에 반응한다는 걸 배웠어요. 이제는 그 캐릭터를 직접 만들고 키우고 싶어요.',
  },

  /* ④ AI숏드라마 PD (준비 중) */
  shortdrama: {
    ready: false,
    file: 'shortdrama.html',
    en: 'AI Short Drama PD',
    ko: 'AI숏드라마 PD',
    bgWord: 'STORY',
    oneLine: '어디서 사람들이 <em>멈추고, 넘기는지</em> 아는 PD',
    motivation: '2년간 웹툰을 요약하며 어디서 사람들이 멈추는지 익혔어요. 그 후킹 감각으로 <em>끝까지 보게 되는 이야기</em>를 만들고 싶어요.',
  },

  /* ⑤ 기획자 (준비 중) */
  planner: {
    ready: false,
    file: 'planner.html',
    en: 'Service Planner',
    ko: '기획자',
    bgWord: 'SYSTEM',
    oneLine: '불편함을 발견하면 <em>구조와 시스템</em>으로 해결하는 기획자',
    motivation: '불편함을 발견하면 구조와 시스템으로 해결해왔어요. 이 방식을 <em>더 많은 사람이 쓰는 서비스</em>에 적용하고 싶어요.',
  },
};
