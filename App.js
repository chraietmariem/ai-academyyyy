import { useState, useEffect, useRef } from "react";

// ── BRAND COLORS ───────────────────────────────────────────────────────────────
const brand = {
  bg: "#050810", surface: "#0c1120", card: "#101827",
  border: "rgba(0,200,255,0.12)", neon: "#00c8ff",
  neonDim: "rgba(0,200,255,0.18)", neonGlow: "0 0 24px rgba(0,200,255,0.35)",
  accent: "#7b5cf5", accentGlow: "0 0 24px rgba(123,92,245,0.4)",
  green: "#00e5a0", red: "#ff4d6d", text: "#e2eaf5", dim: "#6b7a99",
};

// ── TRANSLATIONS ───────────────────────────────────────────────────────────────
const T = {
  fr: {
    appName: "AI Academy", home: "Accueil", courses: "Cours", chat: "AI Chat",
    tools: "Outils", profile: "Profil", dashboard: "Dashboard",
    completed: "Complétés", score: "Score", allCourses: "Tous les cours",
    lesson: "Leçon", quiz: "Quiz", nextQ: "Question suivante →",
    seeResult: "Voir le résultat 🎉", retry: "Réessayer", back: "Retour",
    myProfile: "Mon Profil", totalScore: "Score total", progress: "Progression",
    notStarted: "Non commencé", aiTools: "Outils AI populaires",
    aiAssistant: "🤖 AI Assistant", askAI: "Pose toutes tes questions sur l'IA",
    placeholder: "Pose ta question...", quickAccess: "Accès rapide",
    newsAI: "Nouveautés AI", passQuiz: "Passer au Quiz →",
    startTimer: "⏱️ Démarrer le timer", stopTimer: "⏹ Stop",
    timerRunning: "Timer en cours", timeSpent: "Temps passé",
    notifications: "🔔 Notifications", noNotifs: "Aucune notification",
    markRead: "Tout lire", notifTitle: "Notifications",
    dashboardTitle: "📊 Dashboard",
    avgScore: "Score moyen", totalTime: "Temps total",
    courseDone: "Cours terminé", perfectScore: "Score parfait !",
    quizDone: "Quiz complété", studyReminder: "Rappel d'étude",
    perfect: "Parfait ! Bravo 🎉", great: "Très bien !", study: "Relis la leçon 💪",
    lang: "Langue",
  },
  ar: {
    appName: "أكاديمية الذكاء", home: "الرئيسية", courses: "الدروس", chat: "محادثة",
    tools: "الأدوات", profile: "الملف", dashboard: "لوحة التحكم",
    completed: "مكتمل", score: "النقاط", allCourses: "كل الدروس",
    lesson: "الدرس", quiz: "الاختبار", nextQ: "السؤال التالي →",
    seeResult: "النتيجة 🎉", retry: "إعادة", back: "رجوع",
    myProfile: "ملفي الشخصي", totalScore: "مجموع النقاط", progress: "التقدم",
    notStarted: "لم يبدأ", aiTools: "أدوات الذكاء الاصطناعي",
    aiAssistant: "🤖 المساعد الذكي", askAI: "اسأل عن الذكاء الاصطناعي",
    placeholder: "اكتب سؤالك...", quickAccess: "وصول سريع",
    newsAI: "آخر الأخبار", passQuiz: "ابدأ الاختبار →",
    startTimer: "⏱️ ابدأ المؤقت", stopTimer: "⏹ إيقاف",
    timerRunning: "المؤقت يعمل", timeSpent: "الوقت المستغرق",
    notifications: "🔔 الإشعارات", noNotifs: "لا توجد إشعارات",
    markRead: "قراءة الكل", notifTitle: "الإشعارات",
    dashboardTitle: "📊 لوحة التحكم",
    avgScore: "متوسط النقاط", totalTime: "الوقت الكلي",
    courseDone: "تم إكمال الدرس", perfectScore: "نتيجة مثالية!",
    quizDone: "تم الاختبار", studyReminder: "تذكير بالدراسة",
    perfect: "ممتاز! أحسنت 🎉", great: "جيد جداً!", study: "راجع الدرس 💪",
    lang: "اللغة",
  },
  en: {
    appName: "AI Academy", home: "Home", courses: "Courses", chat: "AI Chat",
    tools: "Tools", profile: "Profile", dashboard: "Dashboard",
    completed: "Completed", score: "Score", allCourses: "All Courses",
    lesson: "Lesson", quiz: "Quiz", nextQ: "Next question →",
    seeResult: "See result 🎉", retry: "Retry", back: "Back",
    myProfile: "My Profile", totalScore: "Total score", progress: "Progress",
    notStarted: "Not started", aiTools: "Popular AI Tools",
    aiAssistant: "🤖 AI Assistant", askAI: "Ask anything about AI",
    placeholder: "Ask your question...", quickAccess: "Quick Access",
    newsAI: "AI News", passQuiz: "Start Quiz →",
    startTimer: "⏱️ Start timer", stopTimer: "⏹ Stop",
    timerRunning: "Timer running", timeSpent: "Time spent",
    notifications: "🔔 Notifications", noNotifs: "No notifications",
    markRead: "Mark all read", notifTitle: "Notifications",
    dashboardTitle: "📊 Dashboard",
    avgScore: "Average score", totalTime: "Total time",
    courseDone: "Course completed", perfectScore: "Perfect score!",
    quizDone: "Quiz completed", studyReminder: "Study reminder",
    perfect: "Perfect! Bravo 🎉", great: "Well done!", study: "Review the lesson 💪",
    lang: "Language",
  },
};

// ── COURSE DATA ────────────────────────────────────────────────────────────────
const COURSES = [
  {
    id: 1, emoji: "🤖", color: brand.neon,
    title: { fr: "Introduction à l'IA", ar: "مقدمة في الذكاء الاصطناعي", en: "Introduction to AI" },
    duration: "15 min", level: { fr: "Débutant", ar: "مبتدئ", en: "Beginner" },
    content: `## Introduction à l'Intelligence Artificielle\n\nL'Intelligence Artificielle (IA) est la simulation de l'intelligence humaine par des machines.\n\n### Les grands types d'IA :\n- **IA Étroite (ANI)** : spécialisée dans une seule tâche (ex: reconnaissance faciale)\n- **IA Générale (AGI)** : capable de raisonner comme un humain (encore théorique)\n- **IA Superintelligente (ASI)** : dépasse l'intelligence humaine (futur lointain)\n\n### Comment l'IA apprend-elle ?\nLes modèles d'IA apprennent à partir de **données massives**. Plus il y a de données, plus le modèle devient précis.\n\n### Applications concrètes :\n- ChatGPT pour la rédaction et le code\n- DALL-E / Midjourney pour les images\n- Sora / Runway pour les vidéos\n- Copilot pour la programmation\n\n### Les risques à connaître :\n- **Biais algorithmiques** : l'IA reproduit les biais des données\n- **Hallucinations** : l'IA peut inventer des faits\n- **Vie privée** : les données personnelles peuvent être exploitées\n- **Désinformation** : deepfakes et fausses informations`,
    quiz: [
      { q: "Qu'est-ce que l'IA Étroite (ANI) ?", options: ["Une IA qui dépasse l'intelligence humaine", "Une IA spécialisée dans une seule tâche", "Une IA capable de tout faire comme un humain", "Un robot physique"], answer: 1 },
      { q: "Pourquoi une IA peut-elle 'halluciner' ?", options: ["Elle manque d'électricité", "Elle invente des faits non présents dans ses données", "Son écran est défectueux", "Elle est trop intelligente"], answer: 1 },
      { q: "Quel outil utilise-t-on pour générer des vidéos avec l'IA ?", options: ["ChatGPT", "Copilot", "Sora / Runway", "Excel"], answer: 2 },
    ],
  },
  {
    id: 2, emoji: "🧠", color: brand.accent,
    title: { fr: "Machine Learning", ar: "تعلم الآلة", en: "Machine Learning" },
    duration: "20 min", level: { fr: "Intermédiaire", ar: "متوسط", en: "Intermediate" },
    content: `## Machine Learning — Apprendre par les données\n\nLe Machine Learning (ML) est une branche de l'IA où les machines apprennent automatiquement sans être explicitement programmées.\n\n### Les 3 types d'apprentissage :\n\n**1. Apprentissage Supervisé**\n- L'algorithme apprend à partir d'exemples étiquetés\n- Ex : classer des emails en spam / non-spam\n\n**2. Apprentissage Non Supervisé**\n- L'algorithme trouve des patterns dans des données non étiquetées\n- Ex : segmentation de clients\n\n**3. Apprentissage par Renforcement**\n- L'agent apprend par essais/erreurs et récompenses\n- Ex : AlphaGo, robots autonomes\n\n### Les algorithmes clés :\n- **Régression linéaire** : prédire une valeur continue\n- **Arbres de décision** : classification simple\n- **Réseaux de neurones** : reconnaissance d'images, NLP\n- **Transformers** : base de ChatGPT, Gemini, Claude\n\n### Cycle de vie d'un projet ML :\nCollecte données → Nettoyage → Entraînement → Évaluation → Déploiement → Monitoring`,
    quiz: [
      { q: "Dans l'apprentissage supervisé, les données sont :", options: ["Aléatoires", "Étiquetées avec des réponses connues", "Non structurées", "Générées par l'IA elle-même"], answer: 1 },
      { q: "Quel modèle est à la base de ChatGPT ?", options: ["Arbre de décision", "Régression linéaire", "Transformer", "SVM"], answer: 2 },
      { q: "L'apprentissage par renforcement fonctionne grâce à :", options: ["Des données étiquetées", "Des récompenses et pénalités", "La copie de l'internet", "Un programmeur humain"], answer: 1 },
    ],
  },
  {
    id: 3, emoji: "✍️", color: brand.green,
    title: { fr: "Prompt Engineering", ar: "هندسة البرومبت", en: "Prompt Engineering" },
    duration: "18 min", level: { fr: "Pratique", ar: "تطبيقي", en: "Practical" },
    content: `## Prompt Engineering — L'art de parler à l'IA\n\nUn **prompt** est l'instruction que tu donnes à une IA. La qualité du résultat dépend directement de la qualité du prompt.\n\n### La formule du prompt parfait :\n\`[Rôle] + [Contexte] + [Tâche] + [Format] + [Contraintes]\`\n\n**Exemple faible :**\n> "Écris un email"\n\n**Exemple fort :**\n> "Tu es un expert en communication B2B. Écris un email professionnel de relance pour un client qui n'a pas répondu depuis 2 semaines. Ton = formel mais chaleureux. Max 150 mots. Inclure un CTA clair."\n\n### Techniques avancées :\n\n**Chain of Thought (CoT)**\nDemande à l'IA de raisonner étape par étape :\n> "Réfléchis étape par étape avant de répondre..."\n\n**Few-Shot Prompting**\nDonne des exemples dans ton prompt :\n> "Voici 2 exemples de ce que je veux... Maintenant fais pareil pour..."\n\n**Role Prompting**\n> "Tu es un expert en [domaine] avec 20 ans d'expérience..."\n\n### Erreurs à éviter :\n- Prompts trop vagues → résultats génériques\n- Pas de format spécifié → réponse imprévisible\n- Trop de tâches en une → confusion de l'IA`,
    quiz: [
      { q: "Quelle est la formule du prompt parfait ?", options: ["Question courte et simple", "Rôle + Contexte + Tâche + Format + Contraintes", "Juste le sujet en un mot", "Copier-coller depuis Google"], answer: 1 },
      { q: "La technique 'Chain of Thought' sert à :", options: ["Écrire plus vite", "Faire raisonner l'IA étape par étape", "Générer des images", "Traduire en plusieurs langues"], answer: 1 },
      { q: "Le 'Few-Shot Prompting' consiste à :", options: ["Poser peu de questions", "Donner des exemples dans le prompt", "Utiliser peu de mots", "Répéter la même question"], answer: 1 },
    ],
  },
  {
    id: 4, emoji: "🛠️", color: "#ff8c42",
    title: { fr: "AI Tools", ar: "أدوات الذكاء الاصطناعي", en: "AI Tools" },
    duration: "12 min", level: { fr: "Pratique", ar: "تطبيقي", en: "Practical" },
    content: `## Les meilleurs outils AI en 2025\n\n### 📝 Texte & Rédaction\n- **ChatGPT (OpenAI)** — Le plus populaire, excellent pour tout\n- **Claude (Anthropic)** — Meilleur pour l'analyse et la rédaction longue\n- **Gemini (Google)** — Intégré à Google Workspace\n\n### 🎨 Images\n- **Midjourney** — Qualité artistique exceptionnelle\n- **DALL-E 3** — Intégré à ChatGPT\n- **Adobe Firefly** — Respecte les droits d'auteur\n\n### 🎬 Vidéos\n- **Sora (OpenAI)** — Vidéos cinématiques\n- **Runway Gen-4** — Contrôle caméra avancé\n- **Kling AI** — Visages réalistes, lip-sync\n- **Google Veo 3** — Gratuit, qualité professionnelle\n\n### 💻 Code\n- **GitHub Copilot** — Autocomplétion intelligente\n- **Cursor** — IDE avec IA intégrée\n- **Claude** — Excellent pour déboguer\n\n### 🔊 Audio & Voix\n- **ElevenLabs** — Voix IA ultra-réalistes\n- **Suno** — Génération musicale\n- **Whisper** — Transcription audio`,
    quiz: [
      { q: "Quel outil est le meilleur pour les vidéos avec visages réalistes ?", options: ["Midjourney", "ElevenLabs", "Kling AI", "Whisper"], answer: 2 },
      { q: "Claude est particulièrement fort pour :", options: ["Générer des images", "L'analyse et la rédaction longue", "Créer de la musique", "Faire des vidéos"], answer: 1 },
      { q: "Quel outil de code propose l'autocomplétion intelligente dans VS Code ?", options: ["Suno", "DALL-E", "GitHub Copilot", "Runway"], answer: 2 },
    ],
  },
];

const AI_TOOLS = [
  { name: "ChatGPT", url: "https://chatgpt.com", emoji: "💬", desc: "Texte & code" },
  { name: "Midjourney", url: "https://midjourney.com", emoji: "🎨", desc: "Images artistiques" },
  { name: "Runway", url: "https://runwayml.com", emoji: "🎬", desc: "Vidéos cinéma" },
  { name: "Canva AI", url: "https://canva.com", emoji: "✏️", desc: "Design facile" },
  { name: "ElevenLabs", url: "https://elevenlabs.io", emoji: "🔊", desc: "Voix réalistes" },
  { name: "Claude", url: "https://claude.ai", emoji: "🤖", desc: "Analyse & rédaction" },
];

async function askClaude(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": process.env.REACT_APP_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: "Tu es un assistant pédagogique expert en Intelligence Artificielle. Tu réponds en français, de façon claire, concise et adaptée aux débutants. Tu utilises des emojis. Maximum 200 mots par réponse.", messages }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Désolé, une erreur s'est produite.";
}

function RenderMD({ text }) {
  const html = text
    .replace(/^### (.+)$/gm, `<h3 style="color:#00c8ff;font-size:1rem;margin:1.2rem 0 0.4rem;font-family:'Space Grotesk',sans-serif">$1</h3>`)
    .replace(/^## (.+)$/gm, `<h2 style="color:#e2eaf5;font-size:1.15rem;margin:0 0 1rem;font-family:'Space Grotesk',sans-serif">$1</h2>`)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:#00c8ff">$1</strong>`)
    .replace(/`(.+?)`/g, `<code style="background:rgba(0,200,255,0.1);color:#00e5a0;padding:1px 6px;border-radius:4px;font-size:0.85em">$1</code>`)
    .replace(/^- (.+)$/gm, `<li style="margin:0.3rem 0;padding-left:0.5rem">$1</li>`)
    .replace(/\n\n/g, `</p><p style="margin:0.6rem 0">`)
    .replace(/^> (.+)$/gm, `<blockquote style="border-left:3px solid #7b5cf5;padding:0.5rem 1rem;margin:0.8rem 0;color:#a0b0cc;background:rgba(123,92,245,0.08);border-radius:0 6px 6px 0;font-style:italic">$1</blockquote>`);
  return <div dangerouslySetInnerHTML={{ __html: `<p style="margin:0.6rem 0">${html}</p>` }} style={{ lineHeight: 1.75, fontSize: "0.9rem", color: brand.text }} />;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ══════════════════════════════════════════════════════════════════════════════
export default function AILearningApp() {
  const [lang, setLang] = useState("fr");
  const t = T[lang];
  const isRTL = lang === "ar";

  const [page, setPage] = useState("home");
  const [activeCourse, setActiveCourse] = useState(null);
  const [courseView, setCourseView] = useState("lesson");
  const [quizState, setQuizState] = useState({ step: 0, score: 0, selected: null, done: false });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const [timeSpent, setTimeSpent] = useState({});
  const chatEndRef = useRef(null);

  // ── TIMER ──────────────────────────────────────────────────────────────────
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const startTimer = () => { setTimerSeconds(0); setTimerActive(true); };
  const stopTimer = (courseId) => {
    setTimerActive(false);
    if (courseId) setTimeSpent(p => ({ ...p, [courseId]: (p[courseId] || 0) + timerSeconds }));
  };

  // ── NOTIFICATIONS ──────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Bienvenue sur AI Academy ! 🎉", time: "Maintenant", read: false },
    { id: 2, text: "Rappel : Continue ta progression quotidienne 📚", time: "Il y a 1h", read: false },
    { id: 3, text: "Nouveau contenu disponible : AI Tools 🛠️", time: "Il y a 2h", read: true },
  ]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotif = (text) => {
    setNotifications(n => [{ id: Date.now(), text, time: "Maintenant", read: false }, ...n]);
  };

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  // ── CHAT ──────────────────────────────────────────────────────────────────
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const nav = (p) => { setPage(p); setActiveCourse(null); setShowNotifs(false); setShowLangMenu(false); };

  const openCourse = (course) => {
    setActiveCourse(course);
    setCourseView("lesson");
    setQuizState({ step: 0, score: 0, selected: null, done: false });
    setPage("course");
    setTimerActive(false);
    setTimerSeconds(0);
  };

  const selectAnswer = (idx) => {
    if (quizState.selected !== null) return;
    const correct = idx === activeCourse.quiz[quizState.step].answer;
    setQuizState(s => ({ ...s, selected: idx, score: correct ? s.score + 1 : s.score }));
  };

  const nextQuestion = () => {
    const next = quizState.step + 1;
    if (next >= activeCourse.quiz.length) {
      const finalScore = quizState.score + (quizState.selected === activeCourse.quiz[quizState.step].answer ? 1 : 0);
      setQuizState(s => ({ ...s, done: true, score: finalScore }));
      setProgress(p => ({ ...p, [activeCourse.id]: finalScore }));
      stopTimer(activeCourse.id);
      if (finalScore === activeCourse.quiz.length) addNotif(`🏆 ${t.perfectScore} — ${activeCourse.title[lang]}`);
      else addNotif(`✅ ${t.quizDone} — ${activeCourse.title[lang]}`);
    } else {
      setQuizState(s => ({ ...s, step: next, selected: null }));
    }
  };

  const sendChat = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    const userMsg = { role: "user", content: msg };
    setChatMessages(m => [...m, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const reply = await askClaude([...chatMessages, userMsg]);
      setChatMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages(m => [...m, { role: "assistant", content: "❌ Erreur de connexion." }]);
    }
    setChatLoading(false);
  };

  const totalScore = Object.values(progress).reduce((a, b) => a + b, 0);
  const completedCourses = Object.keys(progress).length;
  const totalTimeSeconds = Object.values(timeSpent).reduce((a, b) => a + b, 0);
  const avgScore = completedCourses > 0 ? Math.round((totalScore / (completedCourses * 3)) * 100) : 0;

  // ── STYLES ─────────────────────────────────────────────────────────────────
  const S = {
    app: { minHeight: "100vh", background: brand.bg, color: brand.text, fontFamily: "'DM Sans', sans-serif", maxWidth: 480, margin: "0 auto", position: "relative", overflowX: "hidden", direction: isRTL ? "rtl" : "ltr" },
    header: { padding: "0.9rem 1.2rem", background: `linear-gradient(180deg, ${brand.surface} 0%, transparent 100%)`, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)", borderBottom: `1px solid ${brand.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" },
    logo: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 700, color: brand.neon, letterSpacing: "0.05em", textShadow: brand.neonGlow },
    section: { padding: "1.2rem" },
    sectionTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", color: brand.dim, textTransform: "uppercase", marginBottom: "0.8rem" },
    card: { background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 16, padding: "1rem", marginBottom: "0.75rem", cursor: "pointer", transition: "all 0.2s" },
    courseCard: (color) => ({ background: brand.card, border: `1px solid ${brand.border}`, borderLeft: lang !== "ar" ? `3px solid ${color}` : "none", borderRight: lang === "ar" ? `3px solid ${color}` : "none", borderRadius: 16, padding: "1rem 1.1rem", marginBottom: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.9rem", transition: "all 0.2s" }),
    navBar: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: brand.surface, borderTop: `1px solid ${brand.border}`, display: "flex", zIndex: 100, backdropFilter: "blur(20px)" },
    navItem: (active) => ({ flex: 1, padding: "0.7rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", color: active ? brand.neon : brand.dim, fontSize: "0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", transition: "color 0.2s" }),
    btn: (color = brand.neon) => ({ background: `linear-gradient(135deg, ${color}22, ${color}11)`, border: `1px solid ${color}`, borderRadius: 12, color, padding: "0.7rem 1.4rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em" }),
    input: { flex: 1, background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 12, padding: "0.7rem 1rem", color: brand.text, fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none" },
    scoreChip: { background: brand.neonDim, border: `1px solid ${brand.neon}`, borderRadius: 20, padding: "0.25rem 0.6rem", fontSize: "0.7rem", color: brand.neon, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    iconBtn: { background: "none", border: "none", cursor: "pointer", position: "relative", fontSize: "1.1rem", padding: "0.3rem" },
  };

  // ════════════════════════ PAGES ═══════════════════════════════════════════════

  // HOME
  const HomePage = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "2rem 1.2rem 1rem", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🤖</div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 800, background: `linear-gradient(135deg, ${brand.neon}, ${brand.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2, marginBottom: "0.5rem" }}>
          {t.appName}
        </h1>
        <p style={{ color: brand.dim, fontSize: "0.85rem", lineHeight: 1.6 }}>
          {lang === "fr" ? "Maîtrise l'Intelligence Artificielle." : lang === "ar" ? "أتقن الذكاء الاصطناعي." : "Master Artificial Intelligence."}<br />
          {lang === "fr" ? "De zéro à expert." : lang === "ar" ? "من الصفر إلى الاحتراف." : "From zero to expert."}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "0.6rem", padding: "0 1.2rem 1.2rem" }}>
        {[
          { label: t.courses, val: COURSES.length, color: brand.neon },
          { label: t.completed, val: completedCourses, color: brand.accent },
          { label: t.score, val: totalScore, color: brand.green },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: brand.card, border: `1px solid ${s.color}33`, borderRadius: 14, padding: "0.8rem", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: "0.65rem", color: brand.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Nouveautés */}
      <div style={S.section}>
        <div style={S.sectionTitle}>🔥 {t.newsAI}</div>
        {[
          { t: "Google Veo 3 — Vidéo IA gratuite", d: "Disponible depuis avril 2026", c: brand.neon },
          { t: "Claude Sonnet 4 — Nouveau modèle", d: "Meilleure analyse de documents", c: brand.accent },
          { t: "Sora 2 — Stories cohérentes", d: "Narration IA avancée", c: brand.green },
        ].map(n => (
          <div key={n.t} style={{ ...S.card, borderLeft: `3px solid ${n.c}`, padding: "0.8rem 1rem" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: brand.text, fontFamily: "'Space Grotesk', sans-serif" }}>{n.t}</div>
            <div style={{ fontSize: "0.75rem", color: brand.dim, marginTop: 3 }}>{n.d}</div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div style={S.section}>
        <div style={S.sectionTitle}>⚡ {t.quickAccess}</div>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {[
            { l: t.courses, p: "courses", e: "📚", c: brand.neon },
            { l: t.chat, p: "chat", e: "🤖", c: brand.accent },
            { l: t.dashboard, p: "dashboard", e: "📊", c: brand.green },
          ].map(b => (
            <button key={b.p} onClick={() => nav(b.p)} style={{ ...S.btn(b.c), flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0.8rem 0.5rem" }}>
              <span style={{ fontSize: "1.2rem" }}>{b.e}</span>
              <span>{b.l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // DASHBOARD
  const DashboardPage = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={S.section}>
        <div style={S.sectionTitle}>{t.dashboardTitle}</div>

        {/* Big stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.2rem" }}>
          {[
            { label: t.totalScore, val: totalScore, color: brand.neon, emoji: "🏆" },
            { label: t.completed, val: `${completedCourses}/${COURSES.length}`, color: brand.accent, emoji: "📚" },
            { label: t.avgScore, val: `${avgScore}%`, color: brand.green, emoji: "🎯" },
            { label: t.totalTime, val: formatTime(totalTimeSeconds), color: "#ff8c42", emoji: "⏱️" },
          ].map(s => (
            <div key={s.label} style={{ background: brand.card, border: `1px solid ${s.color}33`, borderRadius: 16, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{s.emoji}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.65rem", color: brand.dim, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div style={S.sectionTitle}>📈 {t.progress}</div>
        {COURSES.map(c => {
          const s = progress[c.id];
          const pct = s !== undefined ? (s / c.quiz.length) * 100 : 0;
          const spent = timeSpent[c.id] || 0;
          return (
            <div key={c.id} style={{ marginBottom: "1rem", background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 14, padding: "0.9rem 1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: "0.85rem", color: brand.text, fontWeight: 600 }}>{c.emoji} {c.title[lang]}</span>
                <span style={{ fontSize: "0.75rem", color: s !== undefined ? brand.green : brand.dim, fontWeight: 700 }}>
                  {s !== undefined ? `${s}/${c.quiz.length}` : t.notStarted}
                </span>
              </div>
              <div style={{ height: 6, background: brand.surface, borderRadius: 6, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}, ${brand.neon})`, borderRadius: 6, transition: "width 0.5s" }} />
              </div>
              {spent > 0 && <div style={{ fontSize: "0.7rem", color: brand.dim }}>⏱ {formatTime(spent)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  // COURSES LIST
  const CoursesPage = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={S.section}>
        <div style={S.sectionTitle}>📚 {t.allCourses}</div>
        {COURSES.map(c => (
          <div key={c.id} onClick={() => openCourse(c)} style={S.courseCard(c.color)}>
            <div style={{ fontSize: "2rem" }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: brand.text, marginBottom: 3 }}>{c.title[lang]}</div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: brand.dim }}>{c.duration}</span>
                <span style={{ fontSize: "0.7rem", color: c.color }}>{c.level[lang]}</span>
              </div>
            </div>
            {progress[c.id] !== undefined && (
              <div style={{ background: `${brand.green}22`, border: `1px solid ${brand.green}`, borderRadius: 8, padding: "0.2rem 0.5rem", fontSize: "0.7rem", color: brand.green, fontWeight: 700 }}>
                {progress[c.id]}/{c.quiz.length}
              </div>
            )}
            <span style={{ color: brand.dim }}>{isRTL ? "‹" : "›"}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // COURSE DETAIL
  const CoursePage = () => {
    const q = activeCourse.quiz[quizState.step];
    return (
      <div style={{ paddingBottom: 80 }}>
        {/* Back + Timer */}
        <div style={{ padding: "1rem 1.2rem 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => { stopTimer(activeCourse.id); nav("courses"); }} style={{ background: "none", border: "none", color: brand.dim, cursor: "pointer", fontSize: "1.2rem" }}>{isRTL ? "→" : "←"}</button>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: brand.text }}>{activeCourse.emoji} {activeCourse.title[lang]}</span>
          </div>
          {/* Timer */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {timerActive && <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: brand.neon, background: `${brand.neon}18`, padding: "0.2rem 0.5rem", borderRadius: 8 }}>⏱ {formatTime(timerSeconds)}</span>}
            <button onClick={() => timerActive ? stopTimer(activeCourse.id) : startTimer()} style={{ ...S.btn(timerActive ? brand.red : brand.green), padding: "0.3rem 0.6rem", fontSize: "0.7rem" }}>
              {timerActive ? "⏹" : "▶"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", padding: "1rem 1.2rem 0" }}>
          {["lesson", "quiz"].map(tab => (
            <button key={tab} onClick={() => { setCourseView(tab); if (tab === "quiz") setQuizState({ step: 0, score: 0, selected: null, done: false }); }}
              style={{ ...S.btn(activeCourse.color), flex: 1, opacity: courseView === tab ? 1 : 0.4 }}>
              {tab === "lesson" ? `📖 ${t.lesson}` : `🧠 ${t.quiz}`}
            </button>
          ))}
        </div>

        {/* LESSON */}
        {courseView === "lesson" && (
          <div style={{ padding: "1.2rem", background: brand.card, margin: "1rem 1.2rem", borderRadius: 16, border: `1px solid ${brand.border}` }}>
            <RenderMD text={activeCourse.content} />
            <button onClick={() => { setCourseView("quiz"); setQuizState({ step: 0, score: 0, selected: null, done: false }); if (!timerActive) startTimer(); }}
              style={{ ...S.btn(activeCourse.color), width: "100%", marginTop: "1.2rem", textAlign: "center" }}>
              {t.passQuiz}
            </button>
          </div>
        )}

        {/* QUIZ */}
        {courseView === "quiz" && !quizState.done && (
          <div style={{ padding: "1.2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.75rem", color: brand.dim }}>{t.quiz} {quizState.step + 1}/{activeCourse.quiz.length}</span>
              <span style={{ fontSize: "0.75rem", color: brand.green }}>{t.score}: {quizState.score}</span>
            </div>
            <div style={{ background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 14, padding: "1.2rem", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.5 }}>{q.q}</p>
            </div>
            {q.options.map((opt, i) => {
              const isSelected = quizState.selected === i;
              const isCorrect = i === q.answer;
              const revealed = quizState.selected !== null;
              let bg = brand.card, border = brand.border, color = brand.text;
              if (revealed) {
                if (isCorrect) { bg = `${brand.green}18`; border = brand.green; color = brand.green; }
                else if (isSelected) { bg = `${brand.red}18`; border = brand.red; color = brand.red; }
              } else if (isSelected) { bg = `${activeCourse.color}18`; border = activeCourse.color; }
              return (
                <div key={i} onClick={() => selectAnswer(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "0.8rem 1rem", marginBottom: "0.5rem", cursor: "pointer", color, fontSize: "0.85rem", fontWeight: isSelected ? 600 : 400, transition: "all 0.2s" }}>
                  {revealed && isCorrect ? "✅ " : revealed && isSelected ? "❌ " : `${["A", "B", "C", "D"][i]}. `}{opt}
                </div>
              );
            })}
            {quizState.selected !== null && (
              <button onClick={nextQuestion} style={{ ...S.btn(activeCourse.color), width: "100%", marginTop: "0.8rem" }}>
                {quizState.step + 1 < activeCourse.quiz.length ? t.nextQ : t.seeResult}
              </button>
            )}
          </div>
        )}

        {/* QUIZ DONE */}
        {courseView === "quiz" && quizState.done && (
          <div style={{ padding: "1.2rem", textAlign: "center" }}>
            <div style={{ background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 20, padding: "2rem 1.5rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                {quizState.score === activeCourse.quiz.length ? "🏆" : quizState.score >= 2 ? "🎯" : "📚"}
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 800, color: brand.green }}>
                {quizState.score}/{activeCourse.quiz.length}
              </div>
              <div style={{ color: brand.dim, fontSize: "0.85rem", marginTop: "0.4rem" }}>
                {quizState.score === activeCourse.quiz.length ? t.perfect : quizState.score >= 2 ? t.great : t.study}
              </div>
              {timeSpent[activeCourse.id] > 0 && (
                <div style={{ color: brand.neon, fontSize: "0.8rem", marginTop: "0.5rem" }}>⏱ {formatTime(timeSpent[activeCourse.id])}</div>
              )}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
                <button onClick={() => setQuizState({ step: 0, score: 0, selected: null, done: false })} style={{ ...S.btn(activeCourse.color), flex: 1 }}>{t.retry}</button>
                <button onClick={() => nav("courses")} style={{ ...S.btn(brand.dim), flex: 1 }}>{t.back}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // CHAT
  const ChatPage = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px - 64px)" }}>
      <div style={{ padding: "1rem 1.2rem 0.5rem" }}>
        <div style={S.sectionTitle}>{t.aiAssistant}</div>
        <p style={{ fontSize: "0.75rem", color: brand.dim }}>{t.askAI}</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 1.2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {chatMessages.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💬</div>
            <p style={{ color: brand.dim, fontSize: "0.85rem" }}>{lang === "fr" ? "Salut ! Demande-moi tout sur l'IA." : lang === "ar" ? "مرحباً! اسألني عن الذكاء الاصطناعي." : "Hi! Ask me anything about AI."}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
              {["C'est quoi le Machine Learning ?", "Comment faire un bon prompt ?", "Kling AI vs Runway — lequel choisir ?"].map(q => (
                <div key={q} onClick={() => setChatInput(q)} style={{ background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 10, padding: "0.6rem 0.9rem", fontSize: "0.8rem", color: brand.neon, cursor: "pointer" }}>{q}</div>
              ))}
            </div>
          </div>
        )}
        {chatMessages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "82%", padding: "0.75rem 1rem", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? `linear-gradient(135deg, ${brand.accent}, ${brand.neon}22)` : brand.card, border: `1px solid ${m.role === "user" ? brand.accent : brand.border}`, fontSize: "0.85rem", lineHeight: 1.6 }}>
              {m.role === "assistant" ? <RenderMD text={m.content} /> : m.content}
            </div>
          </div>
        ))}
        {chatLoading && (
          <div style={{ display: "flex", gap: 5, padding: "0.5rem 0" }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: brand.neon, animation: `pulse 1s ${i * 0.2}s infinite`, opacity: 0.6 }} />)}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ padding: "0.75rem 1.2rem", borderTop: `1px solid ${brand.border}`, display: "flex", gap: "0.5rem", background: brand.surface }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder={t.placeholder} style={S.input} />
        <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} style={{ ...S.btn(brand.neon), padding: "0.7rem 1rem", opacity: chatLoading || !chatInput.trim() ? 0.4 : 1 }}>↑</button>
      </div>
    </div>
  );

  // TOOLS
  const ToolsPage = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={S.section}>
        <div style={S.sectionTitle}>🛠️ {t.aiTools}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
          {AI_TOOLS.map(tool => (
            <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer" style={{ ...S.card, textDecoration: "none", textAlign: "center", padding: "1.2rem 0.8rem", marginBottom: 0 }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{tool.emoji}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: brand.text }}>{tool.name}</div>
              <div style={{ fontSize: "0.7rem", color: brand.dim, marginTop: 2 }}>{tool.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  // PROFILE
  const ProfilePage = () => (
    <div style={{ paddingBottom: 80 }}>
      <div style={S.section}>
        <div style={S.sectionTitle}>👤 {t.myProfile}</div>
        <div style={{ background: brand.card, border: `1px solid ${brand.border}`, borderRadius: 20, padding: "1.5rem", textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎓</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: brand.neon }}>{totalScore} pts</div>
          <div style={{ fontSize: "0.75rem", color: brand.dim, marginTop: 3 }}>{t.totalScore}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "0.8rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: brand.accent, fontWeight: 700 }}>{completedCourses}</div>
              <div style={{ fontSize: "0.65rem", color: brand.dim }}>{t.completed}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: brand.green, fontWeight: 700 }}>{avgScore}%</div>
              <div style={{ fontSize: "0.65rem", color: brand.dim }}>{t.avgScore}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#ff8c42", fontWeight: 700 }}>{formatTime(totalTimeSeconds)}</div>
              <div style={{ fontSize: "0.65rem", color: brand.dim }}>{t.totalTime}</div>
            </div>
          </div>
        </div>

        {/* Language selector */}
        <div style={S.sectionTitle}>🌍 {t.lang}</div>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem" }}>
          {[["fr", "🇫🇷 Français"], ["ar", "🇹🇳 العربية"], ["en", "🇬🇧 English"]].map(([code, label]) => (
            <button key={code} onClick={() => setLang(code)} style={{ ...S.btn(lang === code ? brand.neon : brand.dim), flex: 1, padding: "0.5rem 0.3rem", fontSize: "0.75rem" }}>{label}</button>
          ))}
        </div>

        <div style={S.sectionTitle}>📊 {t.progress}</div>
        {COURSES.map(c => {
          const s = progress[c.id];
          const pct = s !== undefined ? (s / c.quiz.length) * 100 : 0;
          return (
            <div key={c.id} style={{ marginBottom: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: "0.8rem", color: brand.text }}>{c.emoji} {c.title[lang]}</span>
                <span style={{ fontSize: "0.75rem", color: s !== undefined ? brand.green : brand.dim }}>{s !== undefined ? `${s}/${c.quiz.length}` : t.notStarted}</span>
              </div>
              <div style={{ height: 4, background: brand.card, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${c.color}, ${brand.neon})`, borderRadius: 4, transition: "width 0.5s" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // NOTIFICATIONS PANEL
  const NotifsPanel = () => (
    <div style={{ position: "fixed", top: 56, right: 0, left: 0, maxWidth: 480, margin: "0 auto", background: brand.surface, border: `1px solid ${brand.border}`, borderRadius: "0 0 20px 20px", zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.4)", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: brand.text }}>{t.notifTitle}</span>
        <button onClick={markAllRead} style={{ background: "none", border: "none", color: brand.neon, fontSize: "0.75rem", cursor: "pointer" }}>{t.markRead}</button>
      </div>
      {notifications.length === 0 ? (
        <p style={{ color: brand.dim, fontSize: "0.85rem", textAlign: "center" }}>{t.noNotifs}</p>
      ) : (
        notifications.slice(0, 5).map(n => (
          <div key={n.id} style={{ padding: "0.6rem 0.8rem", background: n.read ? "transparent" : `${brand.neon}08`, border: `1px solid ${n.read ? brand.border : brand.neon + "33"}`, borderRadius: 10, marginBottom: "0.4rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            {!n.read && <div style={{ width: 6, height: 6, borderRadius: "50%", background: brand.neon, marginTop: 5, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.8rem", color: brand.text }}>{n.text}</div>
              <div style={{ fontSize: "0.7rem", color: brand.dim, marginTop: 2 }}>{n.time}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const pages = { home: <HomePage />, courses: <CoursesPage />, course: <CoursePage />, chat: <ChatPage />, tools: <ToolsPage />, profile: <ProfilePage />, dashboard: <DashboardPage /> };
  const navItems = [
    { p: "home", e: "🏠", l: t.home },
    { p: "courses", e: "📚", l: t.courses },
    { p: "chat", e: "🤖", l: t.chat },
    { p: "dashboard", e: "📊", l: t.dashboard },
    { p: "profile", e: "👤", l: t.profile },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${brand.bg}; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${brand.border}; border-radius: 3px; }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.4);opacity:1} }
        a:hover { opacity: 0.85; }
      `}</style>
      <div style={S.app}>
        {/* Header */}
        <div style={S.header}>
          <span style={S.logo}>⚡ {t.appName}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Timer indicator */}
            {timerActive && <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: brand.green, background: `${brand.green}18`, padding: "0.2rem 0.5rem", borderRadius: 8 }}>⏱ {formatTime(timerSeconds)}</span>}
            {/* Lang quick toggle */}
            <button onClick={() => setLang(l => l === "fr" ? "en" : l === "en" ? "ar" : "fr")} style={{ ...S.scoreChip, cursor: "pointer", border: `1px solid ${brand.accent}`, color: brand.accent, background: `${brand.accent}18` }}>
              {lang === "fr" ? "🇫🇷" : lang === "ar" ? "🇹🇳" : "🇬🇧"}
            </button>
            {/* Notifications bell */}
            <button onClick={() => { setShowNotifs(v => !v); setShowLangMenu(false); }} style={S.iconBtn}>
              🔔
              {unreadCount > 0 && (
                <span style={{ position: "absolute", top: 0, right: 0, background: brand.red, color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{unreadCount}</span>
              )}
            </button>
            <div style={S.scoreChip}>🏆 {totalScore}</div>
          </div>
        </div>

        {/* Notifs Panel */}
        {showNotifs && <NotifsPanel />}
        {showNotifs && <div onClick={() => setShowNotifs(false)} style={{ position: "fixed", inset: 0, zIndex: 150 }} />}

        {/* Page */}
        <div style={{ minHeight: "calc(100vh - 56px - 64px)", overflowY: page === "chat" ? "hidden" : "auto" }}>
          {pages[page]}
        </div>

        {/* Bottom Nav */}
        <div style={S.navBar}>
          {navItems.map(n => (
            <div key={n.p} onClick={() => nav(n.p)} style={S.navItem(page === n.p || (page === "course" && n.p === "courses"))}>
              <span style={{ fontSize: "1.2rem" }}>{n.e}</span>
              {n.l}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
