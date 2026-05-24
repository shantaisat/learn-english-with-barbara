/* ══════════════════════════════════════════════
   lessons.js — Interactive lesson engine
   Flashcards, quizzes, fill-in-blank, roleplay,
   IELTS, pronunciation
   ══════════════════════════════════════════════ */

// ── STATE ──────────────────────────────────────────────────────────────────────
const LessonState = {
  activePack:   'vocab',
  activeLesson: 0,
  progress:     JSON.parse(localStorage.getItem('lewb_progress') || '{}'),
  fcIndex:      { vocab:0, phrasal:0 },
  fcFlipped:    { vocab:false, phrasal:false },
  quizAnswers:  {},
  fitbAnswers:  {},
};

function saveProgress(packId, lessonIdx, pct) {
  if (!LessonState.progress[packId]) LessonState.progress[packId] = {};
  LessonState.progress[packId][lessonIdx] = Math.max(LessonState.progress[packId][lessonIdx] || 0, pct);
  localStorage.setItem('lewb_progress', JSON.stringify(LessonState.progress));
  if (typeof renderSidebar === 'function') renderSidebar();
}

function getPackProgress(packId) {
  const p = LessonState.progress[packId];
  if (!p) return 0;
  const vals = Object.values(p);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a,b) => a+b, 0) / vals.length);
}

// ── SIDEBAR ────────────────────────────────────────────────────────────────────
function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;
  nav.innerHTML = Object.values(PACKS).map(pack => {
    const pct = getPackProgress(pack.id);
    return `<div class="pack-nav-item ${LessonState.activePack === pack.id ? 'active' : ''}" onclick="loadPack('${pack.id}')">
      <div class="pack-nav-icon" style="background:${pack.color}">${pack.icon}</div>
      <div style="flex:1;min-width:0;">
        <div class="pack-nav-name">${pack.name}</div>
        <div class="pack-nav-day">${pack.day}</div>
        <div class="pack-nav-bar"><div class="pack-nav-fill" style="width:${pct}%"></div></div>
      </div>
    </div>`;
  }).join('');

  const pcts = Object.keys(PACKS).map(id => getPackProgress(id));
  const avg = Math.round(pcts.reduce((a,b) => a+b, 0) / pcts.length);
  const el = document.getElementById('sidebarOverallPct');
  if (el) el.textContent = avg + '%';
}

// ── LOAD PACK ──────────────────────────────────────────────────────────────────
function loadPack(packId) {
  LessonState.activePack   = packId;
  LessonState.activeLesson = 0;
  LessonState.quizAnswers  = {};
  LessonState.fitbAnswers  = {};
  renderSidebar();
  renderPackView();
}

function renderPackView() {
  const pack = PACKS[LessonState.activePack];
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = `
    <div class="pack-header">
      <div class="pack-header-top">
        <div class="pack-big-icon" style="background:${pack.color}">${pack.icon}</div>
        <div>
          <h1>${pack.name}</h1>
          <div class="pack-sub">${pack.day} · ${pack.lessons.length} Lessons · Interactive Practice</div>
        </div>
      </div>
      <div class="pack-stats">
        <div class="pack-stat"><span class="num">${pack.lessons.length}</span><span class="lbl">Lessons</span></div>
        <div class="pack-stat"><span class="num">${getPackProgress(pack.id)}%</span><span class="lbl">Complete</span></div>
        <div class="pack-stat"><span class="num">⚡</span><span class="lbl">Interactive</span></div>
      </div>
    </div>
    <div class="lesson-tabs" id="lessonTabs">
      ${pack.lessons.map((l,i) => `<div class="lesson-tab ${i === LessonState.activeLesson ? 'active' : ''}" onclick="loadLesson(${i})">${l.title}</div>`).join('')}
    </div>
    <div class="lesson-content" id="lessonContent"></div>`;
  renderLesson();
}

function loadLesson(idx) {
  LessonState.activeLesson = idx;
  LessonState.quizAnswers  = {};
  LessonState.fitbAnswers  = {};
  document.querySelectorAll('.lesson-tab').forEach((t,i) => t.classList.toggle('active', i === idx));
  renderLesson();
}

// ── RENDER LESSON ──────────────────────────────────────────────────────────────
function renderLesson() {
  const pack    = PACKS[LessonState.activePack];
  const content = document.getElementById('lessonContent');
  if (!content) return;
  const html = {
    vocab:         renderVocabLesson,
    grammar:       renderGrammarLesson,
    ielts:         renderIeltsLesson,
    roleplay:      renderRoleplayLesson,
    phrasal:       renderPhrasalLesson,
    pronunciation: renderPronunciationLesson,
    quiz:          renderQuizLesson,
  }[pack.id];
  if (html) content.innerHTML = html();
  saveProgress(pack.id, LessonState.activeLesson, 10);
}

// ── VOCAB ──────────────────────────────────────────────────────────────────────
function renderVocabLesson() {
  const pack = PACKS.vocab;
  const fc   = pack.flashcards[LessonState.fcIndex.vocab || 0];
  return `
    <div class="activity-section">
      <div class="activity-label">📚 Flashcard Practice</div>
      <div class="flashcard-scene ${LessonState.fcFlipped.vocab ? 'flipped' : ''}" onclick="flipFC('vocab')">
        <div class="flashcard-inner">
          <div class="flashcard-front"><div class="word">${fc.word}</div><div class="pos">${fc.pos}</div><div class="hint">Tap to reveal meaning →</div></div>
          <div class="flashcard-back"><div class="meaning">${fc.meaning}</div><div class="example">"${fc.example}"</div></div>
        </div>
      </div>
      <div class="fc-progress">Card ${(LessonState.fcIndex.vocab||0)+1} of ${pack.flashcards.length} · <em>${fc.context}</em></div>
      <div class="fc-controls">
        <button class="btn btn-grey" onclick="fcPrev('vocab')">← Prev</button>
        <button class="btn btn-gold" onclick="flipFC('vocab')">🔄 Flip</button>
        <button class="btn btn-navy" onclick="fcNext('vocab')">Next →</button>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">📋 Vocabulary Table</div>
      <table class="vocab-table">
        <thead><tr><th>Word</th><th>Meaning</th><th>Example</th><th>Context</th></tr></thead>
        <tbody>${pack.vocabTable.map(v=>`<tr><td><div class="vocab-word">${v.word}</div><small style="color:var(--grey);font-size:11px;">${v.pos}</small></td><td style="font-size:13px;">${v.meaning}</td><td style="font-size:12px;font-style:italic;color:#444;">"${v.example}"</td><td><span class="vocab-context">${v.context}</span></td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="activity-section">
      <div class="activity-label">📝 Quick Quiz</div>
      ${renderQuizQuestions(pack.quiz, 'vocab')}
      <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-gold" onclick="checkQuiz('vocab', PACKS.vocab.quiz)">✓ Check Answers</button>
        <button class="btn btn-grey" onclick="resetQuiz('vocab')">↺ Reset</button>
      </div>
      <div id="quiz-score-vocab" style="margin-top:12px;"></div>
    </div>`;
}

// ── GRAMMAR ────────────────────────────────────────────────────────────────────
function renderGrammarLesson() {
  const pack = PACKS.grammar;
  const topicTitle = LessonState.activeLesson === 0 ? 'Prepositions: IN / ON / AT' : 'Tenses in Professional Writing';
  return `
    <div class="activity-section">
      <div class="activity-label">📖 Focus: ${topicTitle}</div>
      <div style="background:var(--navy);border-radius:16px;padding:22px;margin-bottom:14px;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center;">
          ${[['IN','Larger spaces & time periods','in the office · in London · in June'],['ON','Surfaces, days & dates','on the table · on Monday · on 12th May'],['AT','Exact points & times','at the airport · at 9am · at reception']].map(([w,r,e])=>`
          <div style="background:rgba(255,255,255,0.07);border-radius:10px;padding:14px;">
            <div style="font-size:26px;font-weight:900;color:var(--gold);margin-bottom:5px;">${w}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:7px;">${r}</div>
            <div style="font-size:11px;color:var(--gold-light);">${e}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">✏️ Fill in the Blanks</div>
      ${pack.fitb.map((item,i)=>{
        let parts = item.sentence.split('___');
        let html = parts.map((p,j) => j < parts.length-1
          ? `${p}<input class="fitb-input" id="fitb_${i}_${j}" placeholder="..." oninput="recordFitb('grammar',${i},${j},this.value)">`
          : p).join('');
        return `<div class="fitb-item">
          <div class="fitb-sentence">${html}</div>
          <div class="fitb-hint">💡 ${item.hint}</div>
          <div class="fitb-tip" id="fitbtip_${i}">${item.tip}</div>
        </div>`;
      }).join('')}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;">
        <button class="btn btn-gold" onclick="checkFitb('grammar', PACKS.grammar.fitb, 'fitb', 'fitbtip')">✓ Check</button>
        <button class="btn btn-grey" onclick="resetFitb('grammar')">↺ Reset</button>
      </div>
      <div id="fitb-result-grammar" style="margin-top:10px;"></div>
    </div>
    <div class="activity-section">
      <div class="activity-label">📝 Grammar Quiz</div>
      ${renderQuizQuestions(pack.quiz, 'grammar')}
      <div style="margin-top:14px;display:flex;gap:10px;">
        <button class="btn btn-gold" onclick="checkQuiz('grammar', PACKS.grammar.quiz)">✓ Check</button>
        <button class="btn btn-grey" onclick="resetQuiz('grammar')">↺ Reset</button>
      </div>
      <div id="quiz-score-grammar" style="margin-top:12px;"></div>
    </div>`;
}

// ── IELTS ──────────────────────────────────────────────────────────────────────
function renderIeltsLesson() {
  const topic = PACKS.ielts.topics[LessonState.activeLesson % PACKS.ielts.topics.length];
  return `
    <div class="activity-section">
      <span class="ielts-part-badge">${topic.badge}</span>
      <div class="ielts-question">
        <h3>🎤 "${topic.question}"</h3>
        <ul class="ielts-should-say">${topic.shouldSay.map(s=>`<li>${s}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">💬 Model Answer</div>
      <div class="sample-answer"><h4>Sample Answer</h4><p>${topic.sampleAnswer}</p></div>
    </div>
    <div class="activity-section">
      <div class="activity-label">📌 Useful Phrases — Click to Copy</div>
      <div class="phrases-grid">${topic.phrases.map(p=>`<span class="phrase-chip" onclick="copyPhrase('${p.replace(/'/g,"\\'")}','${p.replace(/'/g,"\\'")}')">${p}</span>`).join('')}</div>
      <div id="copy-feedback" style="font-size:12px;color:var(--green);font-weight:700;min-height:18px;margin-top:4px;"></div>
    </div>
    <div class="activity-section">
      <div class="activity-label">✅ Examiner Tips</div>
      <div class="examiner-tips">${topic.tips.map(t=>`<div class="tip-item">${t}</div>`).join('')}</div>
    </div>
    <div style="background:var(--gold-pale);border-radius:14px;padding:18px;margin-top:6px;">
      <div style="font-weight:900;color:var(--navy);margin-bottom:6px;">🎯 Your Turn!</div>
      <div style="font-size:13px;color:#444;line-height:1.6;">Record yourself answering the question above. Use at least <strong>3 of the phrases</strong> listed. Then listen back and check your fluency, vocabulary range, and structure.</div>
    </div>`;
}

// ── ROLEPLAY ───────────────────────────────────────────────────────────────────
function renderRoleplayLesson() {
  const scenario = PACKS.roleplay.scenarios[LessonState.activeLesson % PACKS.roleplay.scenarios.length];
  return `
    <div class="activity-section">
      <div class="activity-label">🎭 Scenario</div>
      <div class="scenario-box">
        <div class="scene-icon">${scenario.icon}</div>
        <div><span class="scene-title">${scenario.title}</span><div class="scene-text">${scenario.context}</div></div>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">💬 Dialogue — Read & Practise</div>
      <div class="dialogue">${scenario.dialogue.map(line=>`
        <div class="dialogue-line ${line.role}">
          <div class="speaker-avatar" style="background:${line.role==='left'?'var(--light-grey)':'var(--navy)'};">${line.avatar}</div>
          <div class="bubble"><div class="speaker-label">${line.speaker}</div>${line.text}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">📌 Useful Expressions</div>
      <div class="expressions-box">
        <h4>Key Phrases</h4>
        <div class="expression-tags">${scenario.expressions.map(e=>`<span class="expression-tag">${e}</span>`).join('')}</div>
      </div>
    </div>
    <div class="your-turn"><h4>🎯 Your Turn!</h4><p>${scenario.challenge}</p></div>`;
}

// ── PHRASAL VERBS ──────────────────────────────────────────────────────────────
function renderPhrasalLesson() {
  const pack = PACKS.phrasal;
  const fc   = pack.flashcards[LessonState.fcIndex.phrasal || 0];
  return `
    <div class="activity-section">
      <div class="activity-label">🔤 Phrasal Verb Flashcards</div>
      <div class="flashcard-scene ${LessonState.fcFlipped.phrasal ? 'flipped' : ''}" onclick="flipFC('phrasal')">
        <div class="flashcard-inner">
          <div class="flashcard-front"><div class="word">${fc.word}</div><div class="pos">${fc.pos}</div><div class="hint">Tap to reveal →</div></div>
          <div class="flashcard-back"><div class="meaning">${fc.meaning}</div><div class="example">"${fc.example}"</div></div>
        </div>
      </div>
      <div class="fc-progress">Card ${(LessonState.fcIndex.phrasal||0)+1} of ${pack.flashcards.length} · <em>${fc.context}</em></div>
      <div class="fc-controls">
        <button class="btn btn-grey" onclick="fcPrev('phrasal')">← Prev</button>
        <button class="btn btn-gold" onclick="flipFC('phrasal')">🔄 Flip</button>
        <button class="btn btn-navy" onclick="fcNext('phrasal')">Next →</button>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">✏️ Fill in the Blanks</div>
      ${pack.fitb.map((item,i)=>{
        let parts = item.sentence.split('___');
        let html = parts.map((p,j) => j < parts.length-1
          ? `${p}<input class="fitb-input" id="pvfitb_${i}_${j}" placeholder="..." oninput="recordFitb('phrasal',${i},${j},this.value)">`
          : p).join('');
        return `<div class="fitb-item">
          <div class="fitb-sentence">${html}</div>
          <div class="fitb-hint">💡 ${item.hint}</div>
          <div class="fitb-tip" id="pvtip_${i}">${item.tip}</div>
        </div>`;
      }).join('')}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;">
        <button class="btn btn-gold" onclick="checkFitb('phrasal', PACKS.phrasal.fitb, 'pvfitb', 'pvtip')">✓ Check</button>
        <button class="btn btn-grey" onclick="resetFitb('phrasal')">↺ Reset</button>
      </div>
      <div id="fitb-result-phrasal" style="margin-top:10px;"></div>
    </div>
    <div class="activity-section">
      <div class="activity-label">📝 Quiz</div>
      ${renderQuizQuestions(pack.quiz, 'phrasal')}
      <div style="margin-top:14px;display:flex;gap:10px;">
        <button class="btn btn-gold" onclick="checkQuiz('phrasal', PACKS.phrasal.quiz)">✓ Check</button>
        <button class="btn btn-grey" onclick="resetQuiz('phrasal')">↺ Reset</button>
      </div>
      <div id="quiz-score-phrasal" style="margin-top:12px;"></div>
    </div>`;
}

// ── PRONUNCIATION ──────────────────────────────────────────────────────────────
function renderPronunciationLesson() {
  const topic = PACKS.pronunciation.topics[LessonState.activeLesson % PACKS.pronunciation.topics.length];
  return `
    <div class="activity-section">
      <div class="activity-label">🔊 Focus Sound</div>
      <div class="sound-focus">
        <span class="sound-symbol">${topic.symbol}</span>
        <span class="sound-name">${topic.soundName}</span>
        <div class="how-to">📌 ${topic.howTo}</div>
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">📋 Practice Words</div>
      <div class="pron-grid">${topic.columns.map(col=>`
        <div class="pron-col">
          <h4>${col.title}</h4>
          <div style="font-size:11px;color:var(--grey);margin-bottom:10px;font-style:italic;">${col.subtitle}</div>
          ${col.words.map(w=>`<div class="pron-word-row"><span class="pron-word">${w.word}</span><span class="pron-example">${w.ex}</span></div>`).join('')}
        </div>`).join('')}
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">🗣️ Read Aloud — Practice Sentences</div>
      <div class="pron-practice">
        <h4>Read each sentence aloud. Focus on the target sounds.</h4>
        ${topic.practiseSentences.map((s,i)=>`<div class="pron-sentence"><div class="pron-num">${i+1}</div>${s}</div>`).join('')}
      </div>
    </div>
    <div class="activity-section">
      <div class="activity-label">✅ Professional Tips</div>
      <div class="examiner-tips">${topic.tips.map(t=>`<div class="tip-item">${t}</div>`).join('')}</div>
    </div>`;
}

// ── QUIZ PACK ──────────────────────────────────────────────────────────────────
function renderQuizLesson() {
  const half = Math.ceil(PACKS.quiz.questions.length / 2);
  const qs   = LessonState.activeLesson === 0 ? PACKS.quiz.questions.slice(0, half) : PACKS.quiz.questions.slice(half);
  return `
    <div class="activity-section">
      <div class="activity-label">📝 ${LessonState.activeLesson === 0 ? 'Quiz 1' : 'Quiz 2'} — Choose the Best Answer</div>
      ${renderQuizQuestions(qs, 'bigquiz')}
      <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-gold" onclick="checkQuiz('bigquiz', ${LessonState.activeLesson === 0 ? 'PACKS.quiz.questions.slice(0,5)' : 'PACKS.quiz.questions.slice(5)'})">✓ Submit Quiz</button>
        <button class="btn btn-grey" onclick="resetQuiz('bigquiz')">↺ Try Again</button>
      </div>
      <div id="quiz-score-bigquiz" style="margin-top:12px;"></div>
    </div>`;
}

// ── QUIZ ENGINE ────────────────────────────────────────────────────────────────
function renderQuizQuestions(questions, quizId) {
  return questions.map((q,i) => `
    <div class="quiz-question" id="qq_${quizId}_${i}">
      <div class="quiz-q-num">${q.topic ? q.topic + ' · ' : ''}Question ${i+1}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt,j) => `<button class="quiz-option" id="qo_${quizId}_${i}_${j}" onclick="selectOption('${quizId}',${i},${j})">${String.fromCharCode(65+j)}. ${opt}</button>`).join('')}
      </div>
      <div class="quiz-explanation" id="qe_${quizId}_${i}">💡 ${q.explanation}</div>
    </div>`).join('');
}

function selectOption(quizId, qIdx, optIdx) {
  if (LessonState.quizAnswers[`${quizId}_${qIdx}_checked`]) return;
  LessonState.quizAnswers[`${quizId}_${qIdx}`] = optIdx;
  document.querySelectorAll(`[id^="qo_${quizId}_${qIdx}_"]`).forEach(b => { b.style.borderColor=''; b.style.background=''; });
  const btn = document.getElementById(`qo_${quizId}_${qIdx}_${optIdx}`);
  if (btn) { btn.style.borderColor = 'var(--navy)'; btn.style.background = 'var(--off-white)'; }
}

function checkQuiz(quizId, questions) {
  if (!questions) return;
  let score = 0;
  questions.forEach((q, i) => {
    const selected = LessonState.quizAnswers[`${quizId}_${i}`];
    const qEl   = document.getElementById(`qq_${quizId}_${i}`);
    const expEl = document.getElementById(`qe_${quizId}_${i}`);
    if (selected === undefined) return;
    LessonState.quizAnswers[`${quizId}_${i}_checked`] = true;
    document.querySelectorAll(`[id^="qo_${quizId}_${i}_"]`).forEach(b => b.classList.add('disabled'));
    const correctBtn = document.getElementById(`qo_${quizId}_${i}_${q.answer}`);
    if (correctBtn) correctBtn.classList.add('correct');
    if (selected !== q.answer) {
      const wrongBtn = document.getElementById(`qo_${quizId}_${i}_${selected}`);
      if (wrongBtn) wrongBtn.classList.add('wrong');
      if (qEl) qEl.classList.add('answered-wrong');
    } else {
      score++;
      if (qEl) qEl.classList.add('answered-correct');
    }
    if (expEl) expEl.classList.add('show');
  });
  const answered = questions.filter((_,i) => LessonState.quizAnswers[`${quizId}_${i}`] !== undefined).length;
  if (!answered) return;
  const pct     = Math.round((score / answered) * 100);
  const scoreEl = document.getElementById(`quiz-score-${quizId}`);
  if (scoreEl) {
    const grade = pct === 100 ? '🏆 Perfect!' : pct >= 70 ? '⭐ Great job!' : pct >= 50 ? '👍 Keep going!' : '📚 Review & try again';
    const high  = pct >= 70;
    scoreEl.innerHTML = `<div class="score-display ${high?'high':'low'}">${grade} &nbsp; Score: ${score}/${answered} (${pct}%)<div class="score-bar"><div class="score-bar-fill ${high?'high':'low'}" style="width:${pct}%"></div></div></div>`;
    saveProgress(LessonState.activePack, LessonState.activeLesson, pct);
  }
}

function resetQuiz(quizId) {
  Object.keys(LessonState.quizAnswers).forEach(k => { if (k.startsWith(quizId)) delete LessonState.quizAnswers[k]; });
  renderLesson();
}

// ── FITB ENGINE ────────────────────────────────────────────────────────────────
function recordFitb(packId, sentenceIdx, blankIdx, val) {
  LessonState.fitbAnswers[`${packId}_${sentenceIdx}_${blankIdx}`] = val.trim().toLowerCase();
}

function checkFitb(packId, items, inputPrefix, tipPrefix) {
  let correct = 0, total = 0;
  items.forEach((item, i) => {
    item.blanks.forEach((answer, j) => {
      total++;
      const input  = document.getElementById(`${inputPrefix}_${i}_${j}`);
      const tipEl  = document.getElementById(`${tipPrefix}_${i}`);
      if (!input) return;
      const isOk = input.value.trim().toLowerCase() === answer.toLowerCase();
      input.classList.remove('correct','wrong');
      input.classList.add(isOk ? 'correct' : 'wrong');
      if (!isOk && tipEl) tipEl.classList.add('show');
      if (isOk) correct++;
    });
  });
  const resultEl = document.getElementById(`fitb-result-${packId}`);
  if (resultEl) {
    const pct  = Math.round((correct / total) * 100);
    const high = pct >= 70;
    resultEl.innerHTML = `<div class="score-display ${high?'high':'low'}">${high?'✅':'📝'} ${correct}/${total} correct (${pct}%) ${pct < 100 ? '— Check highlighted answers.' : '— Excellent!'}</div>`;
    saveProgress(LessonState.activePack, LessonState.activeLesson, pct);
  }
}

function resetFitb(packId) {
  LessonState.fitbAnswers = {};
  renderLesson();
}

// ── FLASHCARD ENGINE ───────────────────────────────────────────────────────────
function flipFC(packKey) {
  LessonState.fcFlipped[packKey] = !LessonState.fcFlipped[packKey];
  renderLesson();
}

function fcNext(packKey) {
  const len = PACKS[packKey].flashcards.length;
  LessonState.fcIndex[packKey]  = ((LessonState.fcIndex[packKey] || 0) + 1) % len;
  LessonState.fcFlipped[packKey] = false;
  renderLesson();
}

function fcPrev(packKey) {
  const len = PACKS[packKey].flashcards.length;
  LessonState.fcIndex[packKey]  = ((LessonState.fcIndex[packKey] || 0) - 1 + len) % len;
  LessonState.fcFlipped[packKey] = false;
  renderLesson();
}

// ── COPY PHRASE ────────────────────────────────────────────────────────────────
function copyPhrase(text) {
  navigator.clipboard.writeText(text).catch(() => {});
  const fb = document.getElementById('copy-feedback');
  if (fb) { fb.textContent = `✓ Copied: "${text}"`; setTimeout(() => fb.textContent = '', 2000); }
}
