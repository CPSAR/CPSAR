"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Globe, Phone, Instagram, Twitter, Facebook, Linkedin, Send, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

const contactDetails = [
  { icon: Globe, label: "Website", value: "www.cpsarwanda.org", href: "https://www.cpsarwanda.org" },
  { icon: Phone, label: "Phone", value: "+250 788 418 232", href: "tel:+250788418232" },
  { icon: Instagram, label: "Instagram", value: "@cpsa_rwanda", href: "https://instagram.com/cpsa_rwanda" },
  { icon: Twitter, label: "X / Twitter", value: "@cpsarwanda", href: "https://x.com/cpsarwanda" },
];

const socials = [
  { icon: Twitter, href: "https://x.com/cpsarwanda", label: "X / Twitter" },
  { icon: Instagram, href: "https://instagram.com/cpsa_rwanda", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/cpsarwanda", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/cpsarwanda", label: "LinkedIn" },
];

const faqs = [
  {
    q: "How can I learn about joining CPSAR?",
    a: "Contact CPSAR to confirm current eligibility, membership fees, and the application process. Visit the Membership page for an overview and the latest contact options.",
  },
  {
    q: "Where can I find CPSAR programmes?",
    a: "Visit the Programmes page to explore published programme information. You can also contact CPSAR if you have a question about a specific activity.",
  },
  {
    q: "Where can I find upcoming events?",
    a: "The Events page lists published upcoming and past activities. Check the event details there for current information.",
  },
  {
    q: "Where can I find reports and other documents?",
    a: "Browse the Resources library for documents published by CPSAR. Contact the team if you cannot find a resource you need.",
  },
];

const subjects = [
  "General Enquiry",
  "Membership",
  "Programmes & Events",
  "Research Collaboration",
  "Partnerships & Sponsorship",
  "Media & Press",
  "Other",
];

type FormState = { name: string; email: string; subject: string; message: string };

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600"
        style={{ fontFamily: "var(--font-display)" }}>
        {label}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: subjects[0], message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email is required.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const data = new FormData(e.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "min-h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-[#24578E] focus:outline-none focus:ring-2 focus:ring-[#24578E]/20";
  const errorInputClass = "border-red-300 focus:border-red-400";

  return (
    <main className="pt-[60px] lg:pt-[92px] text-slate-900">

      {/* Dark hero */}
      <section className="relative isolate overflow-hidden bg-[#173a60] py-14 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute -right-20 -top-24 -z-10 size-80 rounded-full border border-white/10 sm:size-[28rem]" />
        <div aria-hidden="true" className="absolute -right-8 -top-12 -z-10 size-56 rounded-full border border-[#71C0DF]/20 sm:size-96" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.45 }} className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#9be0f5]" style={{ fontFamily: "var(--font-display)" }}>Contact CPSAR</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl" style={{ fontFamily: "var(--font-display)" }}>Let&apos;s start a conversation.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">Questions about membership, programmes, research, or working together? Send us a message or connect with CPSAR through our official channels.</p>
          </motion.div>
        </div>
      </section>

      <div className="bg-white">

        {/* Contact details strip */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              {contactDetails.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith("https://") ? "_blank" : undefined}
                  rel={c.href.startsWith("https://") ? "noreferrer" : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.07, duration: reduceMotion ? 0 : 0.35 }}
                  className="group flex min-h-24 items-center gap-4 px-2 py-5 transition-colors hover:bg-slate-50 sm:px-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#24578E]/10 transition-colors group-hover:bg-[#24578E]/15">
                    <c.icon aria-hidden="true" className="size-5 text-[#24578E]" />
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500"
                      style={{ fontFamily: "var(--font-display)" }}>
                      {c.label}
                    </div>
                    <div className="break-all text-sm font-semibold text-[#173a60] transition-colors group-hover:text-[#24578E]"
                      style={{ fontFamily: "var(--font-display)" }}>
                      {c.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Form + Map */}
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">

            {/* Left: Form */}
            <motion.div initial={reduceMotion ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.45 }}>
              <h2 className="mb-2 text-2xl font-bold text-[#173a60] sm:text-3xl"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                Send a Message
              </h2>
              <p className="mb-7 text-sm leading-6 text-slate-600">Use the form below and the CPSAR team will follow up with you.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className="border border-[#71C0DF]/30 bg-[#71C0DF]/5 p-10 text-center"
                  >
                    <div className="w-12 h-12 bg-[#71C0DF]/15 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-6 h-6 text-[#71C0DF]" />
                    </div>
                    <h3 className="font-bold text-xl text-[#0a0a0a] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}>
                      Message received!
                    </h3>
                    <p className="mb-6 text-sm leading-6 text-slate-600">
                      Thank you, {form.name.split(" ")[0]}. Your message has been sent. CPSAR will follow up at {form.email}.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: subjects[0], message: "" }); }}
                      className="rounded-sm text-sm font-semibold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-7">
                    <div className="absolute h-px w-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="contact-website">Leave this field empty</label>
                      <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField id="contact-name" label="Full Name" error={errors.name}>
                        <input
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "contact-name-error" : undefined}
                          placeholder="Jean Baptiste Nkurunziza"
                          maxLength={120}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
                        />
                      </FormField>
                      <FormField id="contact-email" label="Email Address" error={errors.email}>
                        <input
                          id="contact-email"
                          name="email"
                          autoComplete="email"
                          type="email"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "contact-email-error" : undefined}
                          placeholder="jean@example.com"
                          maxLength={254}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                        />
                      </FormField>
                    </div>

                    <FormField id="contact-subject" label="Subject">
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                      >
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </FormField>

                    <FormField id="contact-message" label="Message" error={errors.message}>
                      <textarea
                        id="contact-message"
                        name="message"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "contact-message-error" : "contact-message-count"}
                        rows={6}
                        placeholder="Tell us how we can help..."
                        value={form.message}
                        maxLength={500}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} resize-none ${errors.message ? errorInputClass : ""}`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message
                          ? <span className="text-xs text-red-500">{errors.message}</span>
                          : <span />}
                        <span id="contact-message-count" className="ml-auto text-xs text-slate-500">{form.message.length}/500</span>
                      </div>
                    </FormField>

                    {submitError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{submitError}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#24578E] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#173a60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E] disabled:cursor-wait disabled:opacity-70"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Map + Social */}
            <motion.div initial={reduceMotion ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.08 }}>
              <h2 className="mb-2 text-2xl font-bold text-[#173a60] sm:text-3xl"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                Connect with CPSAR
              </h2>
              <p className="mb-7 max-w-lg text-sm leading-6 text-slate-600">Choose an official social channel to keep up with CPSAR and get in touch with the team.</p>

              {/* Social links */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                  style={{ fontFamily: "var(--font-display)" }}>Follow CPSAR</p>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[#173a60] transition-colors hover:border-[#71C0DF] hover:bg-[#f4faff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E]"
                    >
                      <Icon aria-hidden="true" className="size-4 text-[#24578E]" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Press note */}
              <div className="mt-6 rounded-xl border-l-4 border-[#71C0DF] bg-[#f4f8fb] p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#24578E]"
                  style={{ fontFamily: "var(--font-display)" }}>Press & Media</p>
                <p className="text-sm leading-6 text-slate-600">
                  For media enquiries, interview requests, or partnership proposals, visit the{" "}
                  <a href="https://www.cpsarwanda.org" target="_blank" rel="noreferrer" className="text-[#71C0DF] hover:underline">CPSAR website</a>{" "}
                  or reach out through our official social channels.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <section className="bg-neutral-50 border-t border-neutral-100 py-20">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.35 }} className="mb-8 sm:mb-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#24578E]"
                style={{ fontFamily: "var(--font-display)" }}>FAQ</p>
              <h2 className="text-3xl font-bold text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
                Frequently Asked Questions.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Need more help? <a href="https://www.cpsarwanda.org" target="_blank" rel="noreferrer" className="font-semibold text-[#24578E] underline-offset-4 hover:underline">Visit the CPSAR website.</a>
              </p>
            </motion.div>

            <div className="divide-y divide-neutral-200">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.05, duration: reduceMotion ? 0 : 0.3 }}
                >
                  <button
                    className="group flex min-h-14 w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`contact-faq-answer-${i}`}
                  >
                    <span
                      className={`text-sm font-semibold leading-snug transition-colors ${openFaq === i ? "text-[#24578E]" : "text-[#173a60] group-hover:text-[#24578E]"}`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-all duration-200 ${openFaq === i ? "rotate-180 text-[#71C0DF]" : "text-neutral-300"}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        id={`contact-faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.22 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm leading-6 text-slate-600">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#173a60] py-12 text-white sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 text-lg font-bold"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                Ready to take part in CPSAR?
              </p>
              <p className="text-sm leading-6 text-blue-100">Explore membership and find the latest steps for getting involved.</p>
            </div>
            <a
              href="/membership"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-md bg-[#9be0f5] px-6 text-sm font-bold text-[#102d50] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:self-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Join CPSAR <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
