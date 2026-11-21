/* ============================================================
   "HOW TO GROW FROM SCRATCH" — the seven rules Roni speaks on.
   One source for the home-page section, the Person/ItemList schema,
   llms-full.txt and the Speaking page. Every `story` is a fact already
   stated elsewhere on the site; do not add claims here that are not.
   ============================================================ */

export type Rule = {
  /* The chapter of Roni's life that taught the rule. */
  chapter: string;
  when: string;
  /* The rule itself, as an imperative. */
  rule: string;
  /* What happened, third person, facts only. */
  story: string;
  /* The lesson in Roni's words. */
  lesson: string;
  /* One thing the reader can do this week. */
  tryIt: string;
};

export const PLAYBOOK_SLUG = "how-to-grow-from-scratch";
export const PLAYBOOK_TITLE = "How to grow from scratch";
export const PLAYBOOK_SUB =
  "Roni speaks on entrepreneurship the way he has lived it. Three companies since 2019: one closed, one he still runs, one he is building in public. Each chapter left a rule.";
export const PLAYBOOK_FOR = ["Students choosing their own path", "First-time founders", "Founders starting again", "Family-business kids"];

export const PLAYBOOK: Rule[] = [
  {
    chapter: "Medical school",
    when: "Around 2019",
    rule: "Leave for something, not from something.",
    story:
      "Roni studied medicine abroad and left before the degree. Not because it was hard, but because he kept seeing that what failed patients was rarely the medicine. It was everything around it. He left to build those missing parts.",
    lesson:
      "The world outside has its own exams. They are harder, and nobody grades on a curve. So do not quit to escape. Quit towards a problem you can name.",
    tryIt: "Finish this sentence on paper: \"I am leaving for…\". If you cannot finish it, stay until you can.",
  },
  {
    chapter: "The family counter",
    when: "Assam",
    rule: "Start where you have an unfair advantage.",
    story:
      "He grew up in a family that runs a pharmacy, a drug-distribution business and a diagnostic centre. Long before he founded anything, he knew how a chemist buys on credit, stocks against expiry and prices against the next shop.",
    lesson:
      "Everyone has a room they grew up in that an outsider would need years to understand. Mine was a dispensary. Find yours before you go looking for an idea.",
    tryIt: "List five things you know about one trade that a smart outsider would need a year to learn.",
  },
  {
    chapter: "Company one",
    when: "Hospitality, launched into Covid",
    rule: "Treat your first company as tuition.",
    story:
      "His first company was a hospitality business that opened as Covid arrived. It grew fast in its first year. Then the second wave took the industry apart, and the company closed.",
    lesson:
      "A company can fail without the founder failing. Mine closed. The lessons stayed, and they were the capital for the next one.",
    tryIt: "Ask yourself: if this closed tomorrow, what would I walk away knowing how to do? Build that on purpose.",
  },
  {
    chapter: "Bengaluru",
    when: "Chief Operating Officer, healthcare startup",
    rule: "Take a job on purpose.",
    story:
      "After the first company he moved to Bengaluru and joined a healthcare startup as Chief Operating Officer, working with hospitals and as a partner in the business.",
    lesson:
      "I took that role to learn how technology companies actually ship, hire and earn trust. A job chosen for what it teaches is not a step back. It is paid training.",
    tryIt: "Name the one skill your next venture needs that you do not have. Go and work where it is practised every day.",
  },
  {
    chapter: "Company two",
    when: "A media agency he still runs",
    rule: "Learn to tell the story.",
    story:
      "His second company is a media and film agency, built from scratch, which he still runs. It taught him the other half of the craft: how to tell a story people act on.",
    lesson:
      "A good product nobody has heard of does not exist. Building is half the job. Being understood is the other half.",
    tryIt: "Explain what you do in one sentence a shopkeeper would repeat to the next customer.",
  },
  {
    chapter: "MedMate",
    when: "2026, the first months",
    rule: "Listen before you build.",
    story:
      "MedMate is the business he grew up inside. He still spent its first months sitting behind the counters of Bengaluru's chemists, watching which jobs took longest and which were done twice, before deciding what to build.",
    lesson:
      "Sit behind the counter for a morning before you write a feature. The customer will tell you what to build. They will not call it software.",
    tryIt: "Spend one morning watching a customer do the job you want to improve. Do not pitch. Count what they do twice.",
  },
  {
    chapter: "The ₹200 Crore Challenge",
    when: "Daily since 17 July 2026",
    rule: "Show the work every day.",
    story:
      "He is building MedMate in public: one Reel a day for 730 days, showing what ships, what breaks and what pharmacy owners say along the way.",
    lesson:
      "One true sentence about the day, on camera. It is the most useful management tool I have found, because it forces the day to have had a point.",
    tryIt: "Post one true sentence about today's work. Then do it again tomorrow.",
  },
];
