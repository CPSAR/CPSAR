"use client";

import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { Activity, AlertTriangle, ArrowDown, ArrowLeft, ArrowRight, ClipboardList, ExternalLink, HeartHandshake, Mail, Phone, RotateCcw, ShieldCheck, Wine } from "lucide-react";

type AnswerOption = { label: string; value: number };
type Assessment = {
  id: "gad7" | "phq9" | "audit";
  name: string;
  shortName: string;
  description: string;
  timeframe: string;
  icon: typeof Activity;
  questions: string[];
  options: AnswerOption[][];
  result: (score: number) => { label: string; detail: string; tone: string };
};

const frequencyOptions: AnswerOption[] = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];
const EMPTY_ANSWERS: number[] = [];

const gadQuestions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const phqQuestions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite: being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const auditQuestions = [
  "How often do you have a drink containing alcohol?",
  "How many drinks containing alcohol do you have on a typical day when you are drinking?",
  "How often do you have five or more drinks on one occasion?",
  "How often during the last year have you found that you were not able to stop drinking once you had started?",
  "How often during the last year have you failed to do what was normally expected of you because of drinking?",
  "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
  "How often during the last year have you had a feeling of guilt or remorse after drinking?",
  "How often during the last year have you been unable to remember what happened the night before because of your drinking?",
  "Have you or someone else been injured because of your drinking?",
  "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?",
];

const auditFrequency: AnswerOption[] = [
  { label: "Never", value: 0 },
  { label: "Less than monthly", value: 1 },
  { label: "Monthly", value: 2 },
  { label: "Weekly", value: 3 },
  { label: "Daily or almost daily", value: 4 },
];

const assessments: Assessment[] = [
  {
    id: "gad7",
    name: "Anxiety check-in",
    shortName: "GAD-7",
    description: "A brief check-in on common anxiety symptoms.",
    timeframe: "Over the last two weeks",
    icon: Activity,
    questions: gadQuestions,
    options: gadQuestions.map(() => frequencyOptions),
    result: (score) => {
      if (score <= 4) return { label: "Minimal range", detail: "Your responses fall in the minimal symptom range.", tone: "calm" };
      if (score <= 9) return { label: "Mild range", detail: "Your responses fall in the mild symptom range.", tone: "calm" };
      if (score <= 14) return { label: "Moderate range", detail: "Consider discussing these symptoms with a qualified health professional, especially if they affect daily life.", tone: "attention" };
      return { label: "Severe range", detail: "Consider reaching out to a qualified health professional for support and a fuller assessment.", tone: "attention" };
    },
  },
  {
    id: "phq9",
    name: "Mood check-in",
    shortName: "PHQ-9",
    description: "A nine-question check-in on mood and related symptoms.",
    timeframe: "Over the last two weeks",
    icon: HeartHandshake,
    questions: phqQuestions,
    options: phqQuestions.map(() => frequencyOptions),
    result: (score) => {
      if (score <= 4) return { label: "Minimal range", detail: "Your responses fall in the minimal symptom range.", tone: "calm" };
      if (score <= 9) return { label: "Mild range", detail: "Your responses fall in the mild symptom range.", tone: "calm" };
      if (score <= 14) return { label: "Moderate range", detail: "Consider discussing these symptoms with a qualified health professional, particularly if they persist or affect daily life.", tone: "attention" };
      if (score <= 19) return { label: "Moderately severe range", detail: "A conversation with a qualified health professional can help you understand the support options available.", tone: "attention" };
      return { label: "Severe range", detail: "Please reach out to a qualified health professional for timely support and a fuller assessment.", tone: "attention" };
    },
  },
  {
    id: "audit",
    name: "Alcohol use check-in",
    shortName: "AUDIT",
    description: "A check-in on alcohol use and related experiences.",
    timeframe: "Answer based on the period named in each question",
    icon: Wine,
    questions: auditQuestions,
    options: [
      ["Never", "Monthly or less", "2–4 times a month", "2–3 times a week", "4 or more times a week"].map((label, value) => ({ label, value })),
      ["0–2", "3–4", "5–6", "7–9", "10 or more"].map((label, value) => ({ label, value })),
      ...Array.from({ length: 6 }, () => auditFrequency),
      ...Array.from({ length: 2 }, () => [
        { label: "No", value: 0 },
        { label: "Yes, but not in the last year", value: 2 },
        { label: "Yes, in the last year", value: 4 },
      ]),
    ],
    result: (score) => {
      if (score <= 3) return { label: "Zone I · Lower risk", detail: "The attached form describes this range as lower risk. If you have concerns, a health professional can help you review them.", tone: "calm" };
      if (score <= 9) return { label: "Zone II · Risky range", detail: "The attached form recommends a brief conversation about reducing use.", tone: "attention" };
      if (score <= 13) return { label: "Zone III · Harmful range", detail: "The attached form recommends discussing support and follow-up with a health professional.", tone: "attention" };
      return { label: "Zone IV · Higher concern", detail: "The attached form recommends further assessment and support from a qualified provider.", tone: "attention" };
    },
  },
];

const cards = [
  { id: "gad7" as const, icon: Activity, tint: "from-sky-100 to-cyan-50", iconColor: "text-sky-800" },
  { id: "phq9" as const, icon: HeartHandshake, tint: "from-indigo-100 to-blue-50", iconColor: "text-indigo-800" },
  { id: "audit" as const, icon: Wine, tint: "from-teal-100 to-emerald-50", iconColor: "text-teal-800" },
];

export default function ScreeningAssessments() {
  const resultRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<Assessment["id"] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const active = assessments.find(({ id }) => id === activeId) ?? null;
  const currentAnswers = active ? answers[active.id] ?? EMPTY_ANSWERS : EMPTY_ANSWERS;
  const complete = active ? currentAnswers.filter((value) => Number.isInteger(value)).length === active.questions.length : false;
  const score = useMemo(() => currentAnswers.reduce((sum, value) => sum + value, 0), [currentAnswers]);
  const result = active && complete ? active.result(score) : null;
  const phqSafetyFlag = active?.id === "phq9" && complete && currentAnswers[8] > 0;
  const clinicReferral = Boolean(active && complete && (
    (active.id === "gad7" && score >= 15) ||
    (active.id === "phq9" && (score >= 15 || currentAnswers[8] > 0)) ||
    (active.id === "audit" && score >= 14)
  ));
  const progress = active ? Math.round((currentAnswers.filter((value) => Number.isInteger(value)).length / active.questions.length) * 100) : 0;

  useEffect(() => {
    if (!complete) return;
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [complete, activeId]);

  function start(id: Assessment["id"]) {
    setActiveId(id);
    setAnswers((previous) => ({ ...previous, [id]: [] }));
    setDifficulty(null);
  }

  function setAnswer(questionIndex: number, value: number) {
    if (!active) return;
    setAnswers((previous) => {
      const next = [...(previous[active.id] ?? [])];
      next[questionIndex] = value;
      return { ...previous, [active.id]: next };
    });
  }

  function reset() {
    if (!active) return;
    setAnswers((previous) => ({ ...previous, [active.id]: [] }));
    setDifficulty(null);
  }

  return (
    <section aria-labelledby="screening-title" className="mt-16 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_-60px_rgba(20,54,95,0.5)] sm:mt-20">
      <div className="relative isolate overflow-hidden bg-[#14365F] px-6 py-9 text-white sm:px-10 sm:py-12">
        <div aria-hidden="true" className="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full border border-white/10 sm:h-[28rem] sm:w-[28rem]" />
        <div aria-hidden="true" className="absolute -right-6 -top-16 -z-10 h-64 w-64 rounded-full border border-white/10 sm:h-96 sm:w-96" />
        <div className="flex max-w-3xl items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#83dcf1]"><span className="h-px w-8 bg-[#5BC0DE]" />CPSAR self-check tools</div>
        <h2 id="screening-title" className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">A private moment to check in.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">Choose a short questionnaire. Your answers are scored in this browser and are not saved or sent to CPSAR.</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-blue-100 sm:text-sm">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" />Private by design</span>
          <span className="inline-flex items-center gap-2"><ClipboardList size={16} aria-hidden="true" />About 2–4 minutes each</span>
        </div>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        {!active ? (
          <>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-sm font-semibold text-[#2877a7]">Start where you are</p><h3 className="mt-1 text-2xl font-bold tracking-tight text-[#14365F]">Choose a check-in</h3></div>
              <ArrowDown className="mb-1 hidden text-slate-400 sm:block" size={20} aria-hidden="true" />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {assessments.map((assessment) => {
                const card = cards.find(({ id }) => id === assessment.id)!;
                const Icon = card.icon;
                return <article key={assessment.id} className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_18px_45px_-28px_rgba(20,54,95,0.45)] sm:p-6">
                  <div className="flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${card.tint} ${card.iconColor}`}><Icon size={22} aria-hidden="true" /></span><span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold tracking-wide text-slate-500">{assessment.shortName}</span></div>
                  <h4 className="mt-5 text-lg font-bold text-[#14365F]">{assessment.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{assessment.description}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{assessment.timeframe}</p>
                  <button type="button" onClick={() => start(assessment.id)} className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 pt-6 text-left font-bold text-[#1c6795] transition hover:text-[#14365F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1c6795]">
                    Start check-in <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 transition group-hover:translate-x-1 group-hover:bg-sky-100"><ArrowRight size={16} aria-hidden="true" /></span>
                  </button>
                </article>;
              })}
            </div>
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm leading-6 text-slate-600 sm:p-5"><strong className="text-[#14365F]">A note before you begin:</strong> these questionnaires help you reflect on symptoms; they do not diagnose a condition or replace care from a qualified health professional.</div>
          </>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={() => setActiveId(null)} className="inline-flex min-h-11 items-center gap-2 rounded-lg pr-3 font-semibold text-slate-600 hover:text-[#14365F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c6795]"><ArrowLeft size={17} aria-hidden="true" />All check-ins</button>
              <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold tracking-wide text-[#1c6795]">{active.shortName}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold text-[#2877a7]">{active.timeframe}</p><h3 className="mt-1 text-2xl font-bold text-[#14365F]">{active.name}</h3></div><p className="text-sm font-semibold text-slate-500">{complete ? "Complete" : `${currentAnswers.filter((value) => Number.isInteger(value)).length} of ${active.questions.length}`}</p></div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Questionnaire progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={complete ? 100 : progress}><div className="h-full rounded-full bg-gradient-to-r from-[#2877a7] to-[#5BC0DE] transition-all duration-500" style={{ width: `${complete ? 100 : progress}%` }} /></div>

            {!complete ? <div className="mt-7 space-y-4">
              {active.questions.map((question, index) => <fieldset key={`${active.id}-${index}`} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                <legend className="max-w-full px-1 text-sm font-semibold leading-6 text-slate-800 sm:text-base"><span className="mr-2 inline-grid h-7 min-w-7 place-items-center rounded-full bg-[#14365F] px-2 text-xs font-bold text-white">{index + 1}</span>{question}</legend>
                <div className={`mt-4 grid gap-2 ${active.id === "audit" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
                  {active.options[index].map((option) => {
                    const selected = currentAnswers[index] === option.value;
                    return <label key={`${option.label}-${option.value}`} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-[#2877a7] ${selected ? "border-[#2877a7] bg-sky-50 text-[#14365F] shadow-sm" : "border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50"}`}>
                      <input type="radio" name={`${active.id}-q${index}`} value={option.value} checked={selected} onChange={() => setAnswer(index, option.value)} className="h-4 w-4 shrink-0 accent-[#1c6795]" />
                      <span className="leading-5">{option.label}</span>
                    </label>;
                  })}
                </div>
              </fieldset>)}
              {active.id === "phq9" && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>Please take question 9 seriously.</strong> Any answer other than “Not at all” will show a reminder to seek support. If you feel in immediate danger, contact local emergency services or go to the nearest emergency department.</div>}
              {active.id === "phq9" && <fieldset className="rounded-2xl border border-slate-200 p-4 sm:p-5"><legend className="px-1 text-sm font-semibold leading-6 text-slate-800 sm:text-base">How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?</legend><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"].map((option) => <label key={option} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-[#2877a7] ${difficulty === option ? "border-[#2877a7] bg-sky-50 text-[#14365F]" : "border-slate-200 text-slate-700 hover:border-sky-300"}`}><input type="radio" name="phq9-difficulty" value={option} checked={difficulty === option} onChange={() => setDifficulty(option)} className="h-4 w-4 accent-[#1c6795]" /><span>{option}</span></label>)}</div><p className="mt-2 text-xs text-slate-500">This additional question is not included in the PHQ-9 total score.</p></fieldset>}
            </div> : <section ref={resultRef} aria-live="polite" className={`mt-7 rounded-3xl border p-5 shadow-sm sm:p-8 ${clinicReferral ? "border-rose-300 bg-gradient-to-br from-rose-50 via-white to-red-50" : "border-slate-200 bg-gradient-to-br from-[#f5faff] via-white to-[#eff9fc]"}`}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className={`grid h-32 w-32 shrink-0 place-items-center rounded-full border-[10px] bg-white shadow-inner sm:h-40 sm:w-40 ${clinicReferral ? "border-rose-200" : "border-sky-100"}`}><div className="text-center"><p className={`text-4xl font-bold tracking-tight ${clinicReferral ? "text-rose-800" : "text-[#14365F]"}`}>{score}</p><p className="text-xs font-semibold text-slate-500">out of {active.id === "gad7" ? 21 : active.id === "phq9" ? 27 : 40}</p></div></div>
                <div className="flex-1"><p className={`text-xs font-bold uppercase tracking-[0.18em] ${clinicReferral ? "text-rose-800" : "text-[#2877a7]"}`}>Your screening result</p><h4 className={`mt-2 flex items-center gap-2 text-2xl font-bold ${clinicReferral ? "text-rose-800" : "text-[#14365F]"}`}>{clinicReferral && <AlertTriangle size={23} aria-hidden="true" />}{result?.label}</h4><p className="mt-2 max-w-2xl leading-7 text-slate-600">{result?.detail}</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500"><span className="rounded-full bg-white px-3 py-1.5">{active.shortName}</span><span className="rounded-full bg-white px-3 py-1.5">Responses stay on this device</span></div></div>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gradient-to-r from-[#2877a7] to-[#5BC0DE]" style={{ width: `${Math.max(3, (score / (active.id === "gad7" ? 21 : active.id === "phq9" ? 27 : 40)) * 100)}%` }} /></div>
              {clinicReferral && <div className="mt-6 rounded-2xl border border-[#b9dff0] bg-white p-5 shadow-sm sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2877a7]">More support is available</p><h5 className="mt-2 text-lg font-bold text-[#14365F]">Consider contacting Solid Minds Clinic</h5><p className="mt-2 text-sm leading-6 text-slate-600">Your result is in a higher-concern range. A qualified professional can talk through what you’re experiencing and help you decide on next steps.</p><div className="mt-4 flex flex-wrap gap-3"><a href="tel:+250788503528" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#14365F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e4e7e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2877a7]"><Phone size={16} aria-hidden="true" />Call +250 788 503 528</a><a href="mailto:info@solidminds.rw" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#14365F] transition hover:border-[#2877a7] hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2877a7]"><Mail size={16} aria-hidden="true" />Email Solid Minds</a><a href="https://solidminds.rw/contact/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#14365F] transition hover:border-[#2877a7] hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2877a7]">Visit contact page<ExternalLink size={15} aria-hidden="true" /></a></div></div>}
              {phqSafetyFlag && <div role="alert" className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-950"><strong className="block text-base">Your answer to question 9 matters, whatever your total score.</strong><span className="mt-1 block">Please contact someone you trust and a qualified mental health professional as soon as possible. If you may act on these thoughts or cannot stay safe, contact local emergency services or go to the nearest emergency department now. You do not have to manage this alone.</span></div>}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5"><p className="max-w-2xl text-xs leading-5 text-slate-500">This is a screening result, not a diagnosis. A qualified professional can interpret it in context. Your answers have not been stored.</p><button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 font-semibold text-[#14365F] transition hover:border-[#2877a7] hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2877a7]"><RotateCcw size={16} aria-hidden="true" />Retake</button></div>
            </section>}
          </div>
        )}
      </div>
    </section>
  );
}
