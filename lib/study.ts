export type SYItem = { c: string; t: string; lvl: string; sub: string; kind: string; acc: string; board: string; year: number };

/* [id, title, colour index, three bullet lines] */
export const SY_CATS: [string, string, number, string[]][] = [
  ["uni", "University Admission", 0, ["Previous admission questions.", "University-wise and unit-wise preparation.", "MCQ practice and mock tests."]],
  ["med", "Medical Admission", 0, ["Biology, Chemistry, Physics and other subjects.", "Previous questions and explanations.", "Practice tests and model exams."]],
  ["eng", "Engineering Admission", 0, ["BUET, KUET, RUET, CUET and other universities.", "Math, Physics and Chemistry preparation.", "Previous questions and mock tests."]],
  ["ssc", "SSC Preparation", 1, ["Subject-wise and chapter-wise questions.", "Board questions with answers.", "MCQ practice and model tests."]],
  ["hsc", "HSC Preparation", 1, ["Science, Humanities and Business Studies.", "Chapter-wise questions and explanations.", "Board questions and model tests."]],
  ["col", "College Admission", 0, ["College admission information.", "Preparation questions and practice tests.", "Admission notices and requirements."]],
  ["board", "Board Questions", 1, ["SSC and HSC previous board questions.", "Search by year, board and subject.", "Answers and explanations."]],
  ["mcq", "MCQ Practice", 2, ["Practice questions by subject and chapter.", "Instant answers and explanations.", "Track correct and incorrect answers."]],
  ["mock", "Mock Exams", 2, ["Take timed online examinations.", "Get automatic results after submission.", "Review mistakes and improve performance."]],
  ["res", "Results and Rankings", 2, ["Check exam and mock exam results.", "See how you rank among other students.", "Track your improvement over time."]],
  ["mat", "Study Materials", 3, ["Notes, summaries and important formulas.", "Subject-wise learning materials.", "100% free resources for every student."]],
  ["vid", "Video Lessons", 3, ["Watch subject-wise video lessons.", "Learn from teachers and educators.", "Save lessons and track progress."]],
  ["com", "Study Community", 3, ["Ask questions and share knowledge.", "Discuss subjects with other students.", "Learn from teachers and other learners."]],
  ["plan", "Study Planner", 2, ["Create daily and weekly study plans.", "Set study goals and exam countdowns.", "Track study progress."]],
];
export const SY_COLS = ["classic", "modern", "nonfiction", "combo"];
export const SY_CM: Record<string, (typeof SY_CATS)[number]> = Object.fromEntries(SY_CATS.map((c) => [c[0], c]));

const ROWS = [
  "uni|DU admission questions|University|All units|Question bank|Free||2024", "uni|DU unit-wise preparation|University|Unit-wise|Study guide|Free||2025", "uni|JU admission questions|University|All units|Question bank|Free||2024", "uni|RU admission questions|University|All units|Question bank|Free||2024", "uni|CU admission questions|University|All units|Question bank|Free||2024", "uni|GST cluster preparation|University|Cluster|Study guide|Free||2025", "uni|University MCQ practice|University|Mixed|MCQ set|Free||2025", "uni|University mock test|University|Mixed|Mock exam|Free||2025",
  "med|Medical Biology practice|Medical|Biology|MCQ set|Free||2025", "med|Medical Chemistry practice|Medical|Chemistry|MCQ set|Free||2025", "med|Medical Physics practice|Medical|Physics|MCQ set|Free||2025", "med|Previous medical questions|Medical|All subjects|Question bank|Free||2024", "med|Medical model exam|Medical|All subjects|Mock exam|Free||2025",
  "eng|BUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|KUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|RUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|CUET admission questions|Engineering|Math, Physics, Chemistry|Question bank|Free||2024", "eng|Engineering Math preparation|Engineering|Math|Study guide|Free||2025", "eng|Engineering Physics preparation|Engineering|Physics|Study guide|Free||2025", "eng|Engineering Chemistry preparation|Engineering|Chemistry|Study guide|Free||2025", "eng|Engineering mock test|Engineering|Mixed|Mock exam|Free||2025",
  "ssc|SSC Physics questions|SSC|Physics|Question bank|Free||2025", "ssc|SSC Chemistry questions|SSC|Chemistry|Question bank|Free||2025", "ssc|SSC Biology questions|SSC|Biology|Question bank|Free||2025", "ssc|SSC Higher Math questions|SSC|Higher Math|Question bank|Free||2025", "ssc|SSC General Math questions|SSC|General Math|Question bank|Free||2025", "ssc|SSC English questions|SSC|English|Question bank|Free||2025", "ssc|SSC Bangla questions|SSC|Bangla|Question bank|Free||2025", "ssc|SSC ICT questions|SSC|ICT|Question bank|Free||2025", "ssc|SSC model test|SSC|All subjects|Mock exam|Free||2025",
  "hsc|HSC Physics questions|HSC|Physics|Question bank|Free||2025", "hsc|HSC Chemistry questions|HSC|Chemistry|Question bank|Free||2025", "hsc|HSC Biology questions|HSC|Biology|Question bank|Free||2025", "hsc|HSC Higher Math questions|HSC|Higher Math|Question bank|Free||2025", "hsc|HSC ICT questions|HSC|ICT|Question bank|Free||2025", "hsc|HSC Accounting (Business Studies)|HSC|Accounting|Question bank|Free||2025", "hsc|HSC Economics (Humanities)|HSC|Economics|Question bank|Free||2025", "hsc|HSC Bangla questions|HSC|Bangla|Question bank|Free||2025", "hsc|HSC model test|HSC|All subjects|Mock exam|Free||2025",
  "col|College admission information|College|Admission info|Guide|Free||2026", "col|College admission practice test|College|Mixed|Practice test|Free||2025", "col|Admission notices|College|Notices|Notice|Free||2026", "col|Admission requirements|College|Requirements|Guide|Free||2026", "col|Preparation questions|College|Mixed|Question bank|Free||2025",
  "board|SSC Dhaka Board questions|SSC|All subjects|Board questions|Free|Dhaka|2024", "board|SSC Rajshahi Board questions|SSC|All subjects|Board questions|Free|Rajshahi|2024", "board|SSC Chattogram Board questions|SSC|All subjects|Board questions|Free|Chattogram|2024", "board|SSC Comilla Board questions|SSC|All subjects|Board questions|Free|Comilla|2023", "board|SSC Jashore Board questions|SSC|All subjects|Board questions|Free|Jashore|2023", "board|HSC Dhaka Board questions|HSC|All subjects|Board questions|Free|Dhaka|2024", "board|HSC Rajshahi Board questions|HSC|All subjects|Board questions|Free|Rajshahi|2024", "board|HSC Chattogram Board questions|HSC|All subjects|Board questions|Free|Chattogram|2023", "board|HSC Barishal Board questions|HSC|All subjects|Board questions|Free|Barishal|2023",
  "mcq|SSC Physics MCQ|SSC|Physics|MCQ set|Free||2025", "mcq|SSC Chemistry MCQ|SSC|Chemistry|MCQ set|Free||2025", "mcq|SSC Math MCQ|SSC|General Math|MCQ set|Free||2025", "mcq|HSC Physics MCQ|HSC|Physics|MCQ set|Free||2025", "mcq|HSC Chemistry MCQ|HSC|Chemistry|MCQ set|Free||2025", "mcq|HSC Biology MCQ|HSC|Biology|MCQ set|Free||2025", "mcq|HSC ICT MCQ|HSC|ICT|MCQ set|Free||2025", "mcq|Daily admission MCQ|University|Mixed|MCQ set|Free||2026",
  "mock|SSC full mock exam|SSC|All subjects|Mock exam|Free||2025", "mock|HSC full mock exam|HSC|All subjects|Mock exam|Free||2025", "mock|Weekly subject quiz|All levels|Mixed|Mock exam|Free||2026", "mock|Timed practice exam|All levels|Mixed|Mock exam|Free||2026", "mock|Admission full mock|University|Mixed|Mock exam|Free||2025",
  "res|SSC results|SSC|All subjects|Results|Free||2025", "res|HSC results|HSC|All subjects|Results|Free||2025", "res|Admission results|University|Mixed|Results|Free||2026", "res|Mock exam results|All levels|Mixed|Results|Free||2026", "res|National rankings|All levels|Mixed|Rankings|Free||2026", "res|Weekly leaderboard|All levels|Mixed|Rankings|Free||2026",
  "mat|Physics formula sheet|HSC|Physics|Notes|Free||2025", "mat|Chemistry short notes|HSC|Chemistry|Notes|Free||2025", "mat|Biology summaries|HSC|Biology|Notes|Free||2025", "mat|Higher Math important formulas|SSC|Higher Math|Notes|Free||2025", "mat|English grammar summary|SSC|English|Notes|Free||2025", "mat|ICT quick notes|HSC|ICT|Notes|Free||2025", "mat|Admission formula book|University|Mixed|Notes|Free||2026",
  "vid|Physics video lessons|HSC|Physics|Video lessons|Free||2025", "vid|Chemistry video lessons|HSC|Chemistry|Video lessons|Free||2025", "vid|Math video lessons|SSC|General Math|Video lessons|Free||2025", "vid|Biology video lessons|HSC|Biology|Video lessons|Free||2025", "vid|English video lessons|SSC|English|Video lessons|Free||2025", "vid|Admission math lessons|University|Math|Video lessons|Free||2026",
  "com|Ask a question|All levels|Mixed|Community|Free||", "com|Physics discussion|All levels|Physics|Community|Free||", "com|Admission discussion|All levels|Mixed|Community|Free||", "com|Ask a teacher|All levels|Mixed|Community|Free||", "com|Share your notes|All levels|Mixed|Community|Free||",
  "plan|Daily study planner|All levels|Planner|Planner|Free||", "plan|Weekly study planner|All levels|Planner|Planner|Free||", "plan|Exam countdown|All levels|Planner|Planner|Free||", "plan|Study goal tracker|All levels|Planner|Planner|Free||",
];
export const SY_I: SYItem[] = ROWS.map((r) => {
  const p = r.split("|");
  return { c: p[0], t: p[1], lvl: p[2], sub: p[3], kind: p[4], acc: p[5], board: p[6], year: +p[7] || 0 };
});

export const SD_USER = {
  recent: [["SUBJECT", "HSC Physics", "Chapter 5 · Video lesson", "vid", 64], ["COURSE", "Medical Biology course", "Lesson 12 of 30", "med", 38], ["COURSE", "SSC Higher Math", "Chapter 3 of 10", "ssc", 30]] as [string, string, string, string, number][],
  done: 12, doneWeek: 3, acc: 78, time: "24h 30m",
  week: [["Sat", 3], ["Sun", 4], ["Mon", 2.5], ["Tue", 5], ["Wed", 3.5], ["Thu", 4.5], ["Fri", 2]] as [string, number][],
  prog: 62,
};

/* [title, subtitle, colour index, [[id, title, text], ...]] */
export const SD_SECS: [string, string, number, [string, string, string][]][] = [
  ["Admission Preparation", "Get ready for the admission test you are aiming for.", 0, [["uni", "University Admission", "Previous questions, unit-wise preparation and mock tests."], ["med", "Medical Admission", "Biology, Chemistry and Physics practice with explanations."], ["eng", "Engineering Admission", "BUET, KUET, RUET and CUET preparation in Math, Physics and Chemistry."], ["col", "College Admission", "Admission information, practice tests, notices and requirements."]]],
  ["Board Examination", "Everything for SSC and HSC in one place.", 1, [["ssc", "SSC Preparation", "Subject-wise and chapter-wise questions with answers."], ["hsc", "HSC Preparation", "Science, Humanities and Business Studies."], ["board", "Board Questions", "Previous SSC and HSC questions by year, board and subject."], ["mat", "Study Materials", "Notes, summaries and important formulas."]]],
  ["Practice & Exams", "Practice often, test yourself, track your rank.", 2, [["mcq", "MCQ Practice", "Practice by subject and chapter with instant answers."], ["mock", "Mock Exams", "Timed online exams with automatic results."], ["res", "Results and Rankings", "Check your results and see how you rank."]]],
  ["Learning Resources", "Learn at your own pace.", 3, [["vid", "Video Lessons", "Subject-wise lessons from teachers and educators."], ["com", "Study Community", "Ask questions and discuss with other students."], ["plan", "Study Planner", "Daily and weekly plans, goals and exam countdowns."]]],
];
