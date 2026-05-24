/* ══════════════════════════════════════════════
   data.js — All lesson content
   Learn English with Barbara
   ══════════════════════════════════════════════ */

const PACKS = {
  vocab: {
    id:'vocab', name:'Vocabulary for Work', day:'Monday', icon:'📚', color:'#D6E4F7', price:'9.99',
    desc:'Essential business words with meanings, examples, and professional context.',
    lessons:[
      { title:'Lesson 1: Core Business Verbs', type:'flashcard+table' },
      { title:'Lesson 2: Meeting & Strategy Words', type:'flashcard+table' },
    ],
    flashcards:[
      { word:'COLLABORATE', pos:'Verb', meaning:'To work together with others to achieve a shared goal', example:'We collaborate with different teams to deliver the best results.', context:'Meetings / Teamwork' },
      { word:'IMPLEMENT',   pos:'Verb', meaning:'To put a plan or decision into action', example:'We will implement the new policy from next month.', context:'Corporate / Operations' },
      { word:'FACILITATE',  pos:'Verb', meaning:'To make a process easier or help it happen smoothly', example:'The project manager will facilitate the team discussion.', context:'Meetings / Training' },
      { word:'NEGOTIATE',   pos:'Verb', meaning:'To discuss terms in order to reach an agreement', example:'We need to negotiate the contract terms with the supplier.', context:'Business deals / HR' },
      { word:'PRIORITISE',  pos:'Verb', meaning:'To decide which tasks are most important and do them first', example:'We need to prioritise customer satisfaction above all else.', context:'Project management' },
      { word:'BENCHMARK',   pos:'Noun', meaning:'A standard used to measure performance or quality', example:'Our sales figures are well above the industry benchmark.', context:'Performance / KPIs' },
      { word:'INITIATIVE',  pos:'Noun', meaning:'A new plan or action taken to solve a problem', example:'The manager launched a new initiative to reduce workplace waste.', context:'Leadership / Strategy' },
      { word:'STAKEHOLDER', pos:'Noun', meaning:'A person or group with an interest in a project or business', example:'We must consider all stakeholders before making this decision.', context:'Corporate strategy' },
    ],
    vocabTable:[
      { word:'COLLABORATE',   pos:'Verb',  meaning:'To work together to achieve a goal', example:'We collaborate with different teams to deliver results.', context:'Meetings' },
      { word:'AGENDA',        pos:'Noun',  meaning:'A list of items to be discussed at a meeting', example:'Please review the agenda before tomorrow\'s meeting.', context:'Meetings' },
      { word:'IMPLEMENT',     pos:'Verb',  meaning:'To put a plan into action', example:'We will implement the new policy from next month.', context:'Operations' },
      { word:'STAKEHOLDER',   pos:'Noun',  meaning:'A person with an interest in a project', example:'We must consider all stakeholders before deciding.', context:'Strategy' },
      { word:'DEADLINE',      pos:'Noun',  meaning:'The latest time something must be completed', example:'The deadline for submitting the proposal is Friday.', context:'Project mgmt' },
      { word:'PROFICIENCY',   pos:'Noun',  meaning:'A high level of skill or competence', example:'Candidates must demonstrate proficiency in Excel.', context:'Job applications' },
    ],
    quiz:[
      { q:'Which word means "to work together to achieve a goal"?', opts:['Negotiate','Collaborate','Implement','Correspond'], answer:1, explanation:'Collaborate means to work jointly with others towards a shared goal.' },
      { q:'Which word best completes: "Customer satisfaction is our top ___."', opts:['agenda','priority','deadline','initiative'], answer:1, explanation:'Priority means something that is very important and should be done first.' },
      { q:'What does "implement" mean?', opts:['To plan something','To discuss terms','To put a plan into action','To cancel a project'], answer:2, explanation:'Implement means to put a decision or plan into action — very common in business reports and emails.' },
      { q:'Which is the correct professional context for "agenda"?', opts:['Interview','Meetings','Job applications','Finance'], answer:1, explanation:'An agenda is a list of items to be discussed — it is used in meeting contexts.' },
    ]
  },

  grammar: {
    id:'grammar', name:'Grammar Fix', day:'Wednesday', icon:'✏️', color:'#E8F5E9', price:'9.99',
    desc:'Key grammar rules with examples, common mistakes, and practice exercises.',
    lessons:[
      { title:'Lesson 1: IN / ON / AT', type:'fitb' },
      { title:'Lesson 2: Tenses in the Workplace', type:'fitb' }
    ],
    fitb:[
      { sentence:'The meeting is ___ Monday ___ 9am ___ the boardroom.', blanks:['on','at','in'], hint:'Days → ON, times → AT, enclosed spaces → IN', tip:'Think: ON for days, AT for times, IN for locations like rooms, buildings, and cities.' },
      { sentence:'She works ___ a big company ___ New York.', blanks:['for','in'], hint:'works for a company, in a city', tip:'"Work for" = employment. "In" = cities and large areas.' },
      { sentence:'I\'ll meet you ___ the airport ___ 3pm ___ Friday.', blanks:['at','at','on'], hint:'AT for exact points, ON for days', tip:'Airport = exact location → AT. Times → AT. Days → ON.' },
      { sentence:'The report is due ___ the end ___ the month.', blanks:['at','of'], hint:'at the end / of the month', tip:'"At the end" is a fixed phrase. Always followed by "of".' },
      { sentence:'We have a meeting ___ Friday ___ 2 o\'clock ___ the conference room.', blanks:['on','at','in'], hint:'Day / time / room', tip:'This uses all three: ON (day), AT (time), IN (room).' },
    ],
    quiz:[
      { q:'Choose the correct sentence:', opts:['She works IN Monday.','The meeting is ON Monday AT 9am.','I\'ll see you AT Monday.','The call is IN 3pm.'], answer:1, explanation:'ON for days, AT for times. "The meeting is ON Monday AT 9am" is correct.' },
      { q:'Which is correct? "I had ___ meeting with ___ new client."', opts:['the / a','a / the','a / a','the / the'], answer:2, explanation:'First mention of an unspecified noun → use "a". Both are new introductions here.' },
      { q:'Complete: "I have worked here ___ 2019."', opts:['since','for','from','in'], answer:0, explanation:'"Since" = from a specific point in time until now. "For" = a length of time.' },
      { q:'Which is passive voice?', opts:['The manager approved the proposal.','The proposal was approved by the manager.','The manager has approved the proposal.','The manager approves proposals.'], answer:1, explanation:'Passive = subject receives the action. "The proposal was approved" — passive voice.' },
    ]
  },

  ielts: {
    id:'ielts', name:'IELTS Speaking', day:'Tuesday', icon:'🎤', color:'#FFF3CC', price:'14.99',
    desc:'Parts 1, 2 & 3 practice with model answers, phrases, and examiner tips.',
    lessons:[
      { title:'Lesson 1: Part 1 – Introduction Questions', type:'ielts' },
      { title:'Lesson 2: Part 2 – Long Turn', type:'ielts' }
    ],
    topics:[
      {
        part:'Part 1 – Introduction', badge:'PART 1',
        question:'Describe your current job or studies.',
        shouldSay:['What you do and where you work','Why you chose this field','What your role involves day-to-day'],
        sampleAnswer:'I currently work as a marketing coordinator for an international firm. I chose this field because I have always been passionate about communication and strategy. My role involves managing campaigns and coordinating with global teams to ensure consistent brand messaging.',
        phrases:['I work as...','My role involves...','I chose this career because...','I am responsible for...','On a daily basis, I...'],
        tips:['Speak naturally — extend answers with reasons and examples','Aim for 3–5 sentences per Part 1 answer','Use a variety of vocabulary — avoid repeating the same words']
      },
      {
        part:'Part 2 – Long Turn', badge:'PART 2',
        question:'Describe a successful project you were involved in.',
        shouldSay:['What the project was','What your role was','What challenges you faced','What the outcome was'],
        sampleAnswer:'The project I\'d like to talk about was a product launch I coordinated last year. My role was to manage the timeline and liaise with the design team. One challenge was a very tight deadline, but by prioritising tasks and communicating clearly, we delivered on time and exceeded our sales targets by 20%.',
        phrases:['I\'d like to talk about...','My role was to...','One challenge was...','As a result...','Looking back, I think...'],
        tips:['Speak for the full 2 minutes — use all your preparation time','Use signposting language: "firstly", "additionally", "finally"','Include specific details — numbers and outcomes make answers memorable']
      },
      {
        part:'Part 3 – Discussion', badge:'PART 3',
        question:'Do you think communication skills are more important than technical skills in the workplace?',
        shouldSay:['Your opinion','Reasons and evidence','Consideration of both sides'],
        sampleAnswer:'I believe both are important, but in today\'s globalised workplace, communication skills are increasingly valued. Even the most technically skilled person must be able to present ideas clearly and work effectively with others. However, technical skills remain essential in specialised fields. It really depends on the role and industry.',
        phrases:['In my opinion...','On the one hand...','On the other hand...','It depends on...','From my experience...'],
        tips:['Show critical thinking — explore more than one perspective','Use phrases like "It depends on..." to show nuance','Avoid very basic vocabulary — use sophisticated language to boost your score']
      }
    ]
  },

  roleplay: {
    id:'roleplay', name:'Roleplay Conversation', day:'Thursday', icon:'💬', color:'#FDE8E8', price:'12.99',
    desc:'Real-life professional scenarios with full dialogue scripts and speaking challenges.',
    lessons:[
      { title:'Lesson 1: Job Interview', type:'roleplay' },
      { title:'Lesson 2: Business Phone Call', type:'roleplay' }
    ],
    scenarios:[
      {
        title:'At the Airport – Check-in Desk', icon:'✈️',
        context:'You are travelling abroad for a business trip. Talk to the airline staff and check in your luggage.',
        dialogue:[
          { speaker:'Airline Staff', role:'left',  avatar:'👩‍✈️', text:'Good morning! Where are you <span class="key-phrase">flying to</span> today?' },
          { speaker:'You',           role:'right', avatar:'💼', text:'Good morning. I\'m <span class="key-phrase">flying to</span> London for a business conference.' },
          { speaker:'Airline Staff', role:'left',  avatar:'👩‍✈️', text:'May I have your <span class="key-phrase">passport</span> and <span class="key-phrase">ticket</span>, please?' },
          { speaker:'You',           role:'right', avatar:'💼', text:'Of course, here you are.' },
          { speaker:'Airline Staff', role:'left',  avatar:'👩‍✈️', text:'Do you have any <span class="key-phrase">baggage</span> to check in?' },
          { speaker:'You',           role:'right', avatar:'💼', text:'Yes, I have one suitcase. It\'s for a three-day business trip.' },
          { speaker:'Airline Staff', role:'left',  avatar:'👩‍✈️', text:'Would you like a <span class="key-phrase">window seat</span> or an <span class="key-phrase">aisle seat</span>?' },
          { speaker:'You',           role:'right', avatar:'💼', text:'An <span class="key-phrase">aisle seat</span>, please — I have some work to do during the flight.' },
          { speaker:'Airline Staff', role:'left',  avatar:'👩‍✈️', text:'Here is your <span class="key-phrase">boarding pass</span>. Have a pleasant flight!' },
          { speaker:'You',           role:'right', avatar:'💼', text:'Thank you very much! Have a great day!' },
        ],
        expressions:['Where are you flying to?','May I have your...?','Do you have any...?','Would you like...?','Here you are.','Have a pleasant flight!'],
        challenge:'Practise with a partner. Then adapt it: you\'re checking in for a 7-day work trip to New York with two bags.'
      },
      {
        title:'Job Interview', icon:'🤝',
        context:'You are being interviewed for a marketing role at a UK company.',
        dialogue:[
          { speaker:'Interviewer', role:'left',  avatar:'👔', text:'Good morning. Could you start by <span class="key-phrase">telling me a little about yourself</span>?' },
          { speaker:'You',         role:'right', avatar:'💼', text:'Good morning. Thank you for having me. I have five years of experience in digital marketing, working across international campaigns.' },
          { speaker:'Interviewer', role:'left',  avatar:'👔', text:'That\'s great. Why are you <span class="key-phrase">interested in this particular role</span>?' },
          { speaker:'You',         role:'right', avatar:'💼', text:'I\'m really drawn to this role because of your company\'s strong global presence. I believe my <span class="key-phrase">expertise in digital strategy</span> would add significant value.' },
          { speaker:'Interviewer', role:'left',  avatar:'👔', text:'Can you give me an example of a <span class="key-phrase">challenge you faced at work</span>?' },
          { speaker:'You',         role:'right', avatar:'💼', text:'Certainly. We had a very tight product launch deadline. I <span class="key-phrase">prioritised key tasks</span>, communicated clearly, and we delivered on time. The launch exceeded our targets by 20%.' },
        ],
        expressions:['Tell me about yourself.','I\'m particularly interested in...','My experience includes...','I believe I can contribute...','For example...','As a result...'],
        challenge:'Record yourself answering: "What is your greatest professional achievement?" Aim for 60–90 seconds.'
      }
    ]
  },

  phrasal: {
    id:'phrasal', name:'Phrasal Verbs', day:'Friday', icon:'🔤', color:'#F3E8FD', price:'9.99',
    desc:'Business phrasal verbs with formality levels, examples, and fill-in-the-blank practice.',
    lessons:[
      { title:'Lesson 1: Office & Project Verbs', type:'flashcard+fitb' },
      { title:'Lesson 2: Communication Verbs', type:'flashcard+fitb' }
    ],
    flashcards:[
      { word:'FOLLOW UP', pos:'Phrasal Verb', meaning:'To continue dealing with something or check on progress', example:'I will follow up with the client after the presentation.', context:'Emails / Meetings' },
      { word:'CARRY OUT', pos:'Phrasal Verb', meaning:'To do or complete a task or plan', example:'The team will carry out the audit next Monday.', context:'Project management' },
      { word:'BRING UP',  pos:'Phrasal Verb', meaning:'To mention or introduce a topic in a conversation', example:'She brought up an important point about the budget.', context:'Meetings' },
      { word:'LOOK INTO', pos:'Phrasal Verb', meaning:'To investigate or find information about something', example:'We will look into the complaint and respond within 48 hours.', context:'Customer service' },
      { word:'SET UP',    pos:'Phrasal Verb', meaning:'To organise or establish something', example:'Could you set up a meeting with the marketing team?', context:'Emails / Admin' },
      { word:'FLAG UP',   pos:'Phrasal Verb', meaning:'To draw attention to something important', example:'I just wanted to flag up a potential issue with the timeline.', context:'Emails / Meetings' },
      { word:'SCALE UP',  pos:'Phrasal Verb', meaning:'To increase the size, scope, or level of something', example:'The company is planning to scale up its operations in Asia.', context:'Business strategy' },
      { word:'DRAW UP',   pos:'Phrasal Verb', meaning:'To prepare a formal document or plan', example:'The legal team will draw up the contract by Thursday.', context:'Legal / Admin' },
    ],
    fitb:[
      { sentence:'I\'ll ___ ___ with the supplier next week to check on the delivery.', blanks:['follow','up'], hint:'check on progress after earlier contact', tip:'"Follow up" is one of the most common phrases in professional emails.' },
      { sentence:'We need to ___ ___ a full review of the process before the launch.', blanks:['carry','out'], hint:'complete a task', tip:'"Carry out" is formal and interchangeable with "conduct".' },
      { sentence:'Could you ___ ___ a meeting with the finance team for Tuesday?', blanks:['set','up'], hint:'organise or arrange', tip:'"Set up a meeting" is extremely common in workplace emails.' },
      { sentence:'He ___ ___ an important concern about the budget at the board meeting.', blanks:['brought','up'], hint:'mentioned in a meeting', tip:'"Bring up" = introduce a topic. Use it to raise issues in meetings.' },
      { sentence:'I just wanted to ___ ___ a potential issue with the timeline.', blanks:['flag','up'], hint:'draw attention to', tip:'"Flag up" signals something needs attention — useful in professional emails.' },
    ],
    quiz:[
      { q:'What does "follow up" mean in a business context?', opts:['Cancel a meeting','Check on progress after an earlier action','Argue about a decision','Submit a document'], answer:1, explanation:'"Follow up" means to continue dealing with something. Very common in emails.' },
      { q:'Which phrasal verb means "to prepare a formal document"?', opts:['carry out','flag up','draw up','set up'], answer:2, explanation:'"Draw up" is used specifically for documents, contracts, and plans.' },
      { q:'Complete: "The team will ___ the audit next week."', opts:['carry out','follow up','scale up','bring up'], answer:0, explanation:'"Carry out" = to do or complete a task. Interchangeable with "conduct".' },
      { q:'Which phrasal verb means "to increase size or scope"?', opts:['phase out','flag up','scale up','look into'], answer:2, explanation:'"Scale up" means to grow or expand. Common in business strategy discussions.' },
    ]
  },

  pronunciation: {
    id:'pronunciation', name:'Pronunciation Practice', day:'Saturday', icon:'🔊', color:'#E8F0FD', price:'9.99',
    desc:'Focus sounds, practice words, and professional tips to speak clearly and confidently.',
    lessons:[
      { title:'Lesson 1: TH Sounds', type:'pronunciation' },
      { title:'Lesson 2: Word Stress', type:'pronunciation' }
    ],
    topics:[
      {
        title:'The TH Sounds', symbol:'/θ/ and /ð/',
        soundName:'Voiceless TH (think) & Voiced TH (this)',
        howTo:'For voiceless /θ/: place your tongue lightly between your teeth and push air out without using your voice. For voiced /ð/: same position, but use your voice.',
        columns:[
          { title:'Voiceless TH /θ/', subtitle:'think, three, thank', words:[{ word:'think', ex:'I think it\'s a great idea.' },{ word:'three', ex:'I have three meetings today.' },{ word:'thank', ex:'Thank you for your time.' },{ word:'through', ex:'We worked through the problem.' },{ word:'thorough', ex:'Please do a thorough review.' }] },
          { title:'Voiced TH /ð/', subtitle:'this, that, these', words:[{ word:'this', ex:'This is my proposal.' },{ word:'that', ex:'That\'s a great point.' },{ word:'these', ex:'These are the results.' },{ word:'the', ex:'The deadline is Friday.' },{ word:'there', ex:'The office is over there.' }] },
        ],
        practiseSentences:['I think this is the best solution.','Thank you for attending the meeting.','There are three things I need to discuss.','The deadline is this Thursday at three.','Through thorough preparation, we achieved the target.'],
        tips:['Practise tongue placement in a mirror — it should visibly go between your teeth','The TH sound is one of the most recognisable markers of fluent English','Mastering TH makes a strong impression in interviews and presentations']
      },
      {
        title:'Word Stress: Nouns vs Verbs', symbol:'Stress Shift',
        soundName:'Two-syllable words that change stress',
        howTo:'Many two-syllable words change stress depending on whether they are used as a noun or verb. Stress the FIRST syllable for nouns, the SECOND for verbs.',
        columns:[
          { title:'NOUN — stress 1st syllable', subtitle:'REcord, PROgress, PREsent', words:[{ word:'REcord', ex:'Please check the record.' },{ word:'PROgress', ex:'The progress report is ready.' },{ word:'PREsent', ex:'I have a present for you.' },{ word:'PROtest', ex:'There was a protest outside.' },{ word:'CONflict', ex:'We have a conflict of interest.' }] },
          { title:'VERB — stress 2nd syllable', subtitle:'reCORD, proGRESS, preSENT', words:[{ word:'reCORD', ex:'We need to record the meeting.' },{ word:'proGRESS', ex:'How are you progressing?' },{ word:'preSENT', ex:'She will present the results.' },{ word:'proTEST', ex:'Staff may protest the changes.' },{ word:'conFLICT', ex:'This may conflict with policy.' }] },
        ],
        practiseSentences:['She will present the annual progress report to the board.','Please record the meeting so we have a full record.','The conflict of interest may conflict with company policy.','I\'d like to present an update on our progress.'],
        tips:['Stress errors change the meaning of the word entirely','Listen carefully in meetings — notice how native speakers stress these words','Correct stress is a key marker of professional, fluent English']
      }
    ]
  },

  quiz: {
    id:'quiz', name:'English Quiz Pack', day:'Sunday', icon:'📝', color:'#FFF8E1', price:'7.99',
    desc:'Mixed-topic multiple choice quizzes to test your knowledge and track your progress.',
    lessons:[
      { title:'Quiz 1: Vocabulary & Grammar', type:'quiz' },
      { title:'Quiz 2: Phrasal Verbs & IELTS', type:'quiz' }
    ],
    questions:[
      { q:'Which word means "to work together to achieve a goal"?', opts:['Negotiate','Collaborate','Implement','Correspond'], answer:1, topic:'Vocabulary', explanation:'Collaborate means to work jointly with others towards a shared goal.' },
      { q:'The meeting is ___ Monday ___ 9am.', opts:['in / in','on / in','on / at','at / on'], answer:2, topic:'Grammar', explanation:'Use ON for days of the week and AT for specific times.' },
      { q:'What does "follow up" mean in a business context?', opts:['Cancel a meeting','Check on progress after an earlier action','Argue about a decision','Submit a document'], answer:1, topic:'Phrasal Verbs', explanation:'"Follow up" means to continue dealing with something or check on progress.' },
      { q:'Which phrase is best for beginning an IELTS Part 2 answer?', opts:['I think maybe...','The thing I want to say is...','The topic I\'d like to talk about is...','I don\'t know much about this...'], answer:2, topic:'IELTS', explanation:'"The topic I\'d like to talk about is..." is clear, fluent, and signals confidence.' },
      { q:'Which sentence is written in the passive voice?', opts:['The manager approved the proposal.','The proposal was approved by the manager.','The manager has approved the proposal.','The manager approves the proposal.'], answer:1, topic:'Grammar', explanation:'Passive voice: subject receives the action. "The proposal was approved" is passive.' },
      { q:'Which word has stress on the FIRST syllable when used as a NOUN?', opts:['reCORD','preSENT','proGRESS','REcord'], answer:3, topic:'Pronunciation', explanation:'As a noun, REcord stresses the first syllable. As a verb, it is reCORD.' },
      { q:'What does "draw up" mean?', opts:['To cancel a plan','To prepare a formal document','To increase the scope','To raise a topic'], answer:1, topic:'Phrasal Verbs', explanation:'"Draw up" is used specifically for documents, contracts, and plans.' },
      { q:'Which is the most polite professional request?', opts:['Send me the report now.','You should send the report.','Could you please send me the report by Friday?','Send the report, please.'], answer:2, topic:'Grammar', explanation:'"Could you please..." is the most polite and appropriate for professional communication.' },
      { q:'Complete: "She ___ an important point about the budget at the meeting."', opts:['brought up','set up','flagged down','carried on'], answer:0, topic:'Phrasal Verbs', explanation:'"Bring up" means to mention or introduce a topic in a meeting.' },
      { q:'Which phrase shows you are considering both sides of an argument?', opts:['I completely agree.','On the one hand... on the other hand...','I don\'t think this is right.','Everyone knows that...'], answer:1, topic:'IELTS', explanation:'"On the one hand... on the other hand..." shows critical thinking — highly valued by IELTS examiners.' },
    ]
  }
};

// Product list for shop display
const PRODUCT_LIST = [
  { id:'vocab',         name:'Vocabulary for Work',    day:'Monday',    icon:'📚', color:'#D6E4F7', price:'9.99',  desc:'Essential business words with meanings, examples, and professional context.', features:['16 key business words','Meanings & example sentences','Professional context for each word','Flashcard practice','Usage tips'], featured:false },
  { id:'ielts',         name:'IELTS Speaking',         day:'Tuesday',   icon:'🎤', color:'#FFF3CC', price:'14.99', desc:'Parts 1, 2 & 3 practice with model answers, useful phrases, and examiner tips.', features:['8 IELTS speaking topics','Model answers for all parts','Useful phrases library','Examiner tips for high scores','Practice prompts'], featured:true },
  { id:'grammar',       name:'Grammar Fix',            day:'Wednesday', icon:'✏️', color:'#E8F5E9', price:'9.99',  desc:'Common grammar mistakes fixed. Clear rules, professional examples, and exercises.', features:['8 grammar topics','Common mistakes explained','Professional examples','Practice exercises with answers','Quick reference rules'], featured:false },
  { id:'roleplay',      name:'Roleplay Conversation',  day:'Thursday',  icon:'💬', color:'#FDE8E8', price:'12.99', desc:'Real-life professional scenarios with full dialogue scripts and speaking challenges.', features:['8 workplace scenarios','Full dialogue scripts','Useful expressions','Speaking challenges','Interview roleplay included'], featured:false },
  { id:'phrasal',       name:'Phrasal Verbs',          day:'Friday',    icon:'🔤', color:'#F3E8FD', price:'9.99',  desc:'Business phrasal verbs with formality levels, examples, and fill-in-the-blank practice.', features:['16 business phrasal verbs','Formal vs informal guide','Example sentences','Fill-in-the-blank exercises','Memory tips'], featured:false },
  { id:'pronunciation', name:'Pronunciation Practice', day:'Saturday',  icon:'🔊', color:'#E8F0FD', price:'9.99',  desc:'Focus sounds, practice words, and tips to speak clearly and confidently.', features:['8 pronunciation topics','Focus sounds for professionals','Practice words & sentences','Common error guidance','Confidence-building tips'], featured:false },
  { id:'quiz',          name:'English Quiz Pack',      day:'Sunday',    icon:'📝', color:'#FFF8E1', price:'7.99',  desc:'Mixed-topic multiple choice quizzes to test and track your progress.', features:['24 quiz questions','Covers all 6 topic areas','Instant answers & explanations','Score tracking','Challenge yourself weekly'], featured:false },
];

// Time slots for booking
const TIME_SLOTS = [
  { day:'Mon 26 Jan', time:'10:00am', booked:false },
  { day:'Mon 26 Jan', time:'2:00pm',  booked:true  },
  { day:'Tue 27 Jan', time:'11:00am', booked:false },
  { day:'Wed 28 Jan', time:'9:00am',  booked:false },
  { day:'Wed 28 Jan', time:'3:00pm',  booked:true  },
  { day:'Thu 29 Jan', time:'1:00pm',  booked:false },
  { day:'Fri 30 Jan', time:'10:00am', booked:false },
  { day:'Sat 31 Jan', time:'11:00am', booked:false },
];

// Demo user
const DEMO_USER = {
  name: 'Sarah',
  fullName: 'Sarah Johnson',
  email: 'demo@learnwithbarbara.com',
  ownedPacks: ['vocab', 'grammar'],
  memberSince: 'January 2025',
  purchases: [
    { pack:'Vocabulary for Work', date:'15 Jan 2025', amount:'£9.99' },
    { pack:'Grammar Fix',         date:'15 Jan 2025', amount:'£9.99' },
  ]
};
