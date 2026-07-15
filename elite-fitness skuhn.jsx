import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Star,
  Plus,
  Minus,
  Menu,
  X,
  Dumbbell,
} from "lucide-react";

/* ---------------------------------------------------------------
   DATA
--------------------------------------------------------------- */

const NAV_LINKS = ["HOME", "ABOUT", "PROGRAMS", "TRAINERS", "MEMBERSHIP", "CONTACT"];

const HIGHLIGHTS = [
  "Certified Trainers",
  "Premium Equipment",
  "Functional Training",
  "Strength Programs",
  "Nutrition Coaching",
  "Recovery Guidance",
];

const STATS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Members" },
  { value: 35, suffix: "+", label: "Certified Coaches" },
  { value: 100, suffix: "%", label: "Commitment" },
];

const PROGRAMS = [
  { title: "Strength Training", tags: "POWER / BARBELL / PROGRESSIVE OVERLOAD" },
  { title: "Bodybuilding", tags: "HYPERTROPHY / PHYSIQUE / VOLUME" },
  { title: "Weight Loss", tags: "METCON / NUTRITION / ACCOUNTABILITY" },
  { title: "CrossFit", tags: "WOD / COMMUNITY / INTENSITY" },
  { title: "HIIT", tags: "CONDITIONING / FAT LOSS / SPEED" },
  { title: "Functional Training", tags: "MOBILITY / MOVEMENT / CONTROL" },
  { title: "Personal Training", tags: "1-ON-1 / CUSTOM / FOCUSED" },
  { title: "Cardio Conditioning", tags: "ENDURANCE / STAMINA / CAPACITY" },
];

const TRAINERS = [
  { name: "MARCUS REID", spec: "Strength & Powerlifting", years: "12 YRS" },
  { name: "DANIELA CRUZ", spec: "Bodybuilding & Physique", years: "9 YRS" },
  { name: "JAMES OKAFOR", spec: "CrossFit & Conditioning", years: "8 YRS" },
  { name: "ANNA KOVACS", spec: "Functional & Mobility", years: "7 YRS" },
];

const PLANS = [
  {
    name: "STARTER",
    price: "$49",
    period: "/MO",
    features: ["Gym Floor Access", "Standard Hours", "Locker Room", "Free Trial Class"],
    highlighted: false,
  },
  {
    name: "PRO",
    price: "$89",
    period: "/MO",
    features: [
      "24/7 Gym Access",
      "2 Trainer Sessions / MO",
      "Group Classes",
      "Basic Diet Guidance",
    ],
    highlighted: true,
  },
  {
    name: "ELITE",
    price: "$149",
    period: "/MO",
    features: [
      "24/7 Gym Access",
      "Unlimited Trainer Support",
      "Full Diet Guidance",
      "Recovery & Priority Booking",
    ],
    highlighted: false,
  },
];

const TESTIMONIALS = [
  {
    name: "RYAN COLE",
    role: "MEMBER SINCE 2021",
    rating: 5,
    review:
      "This place rebuilt my discipline from the ground up. The coaching is relentless and it works.",
  },
  {
    name: "SOPHIE ADAMS",
    role: "MEMBER SINCE 2022",
    rating: 5,
    review:
      "I've trained at a dozen gyms. None pushed me like Elite Fitness. Real results, real fast.",
  },
  {
    name: "DEREK MOSS",
    role: "MEMBER SINCE 2020",
    rating: 5,
    review:
      "The trainers know exactly how to get the most out of every session. No wasted time here.",
  },
];

const FAQS = [
  {
    q: "Can beginners join?",
    a: "Absolutely. Every program scales to your current level, and your first session includes a full movement assessment with a coach.",
  },
  {
    q: "Do you provide personal trainers?",
    a: "Yes. PRO and ELITE members get dedicated 1-on-1 sessions, and STARTER members can book personal training separately.",
  },
  {
    q: "Do you offer diet plans?",
    a: "PRO members receive basic diet guidance, while ELITE members get a fully customized nutrition plan built around their goals.",
  },
  {
    q: "Are there separate timings for women?",
    a: "We run dedicated women's-only training blocks each weekday morning and evening. Ask the front desk for the current schedule.",
  },
  {
    q: "Do you provide trial sessions?",
    a: "Yes, every new visitor gets one free trial class before committing to a membership plan.",
  },
];

/* ---------------------------------------------------------------
   HELPERS
--------------------------------------------------------------- */

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value]);

  return (
    <div ref={ref} className="ef-stat-number">
      {count}
      {suffix}
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------------- */

export default function EliteFitness() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="ef-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        .ef-root {
          --orange: #FF4D00;
          --black: #000000;
          --white: #FFFFFF;
          font-family: 'Inter', sans-serif;
          background: var(--white);
          color: var(--black);
          overflow-x: hidden;
        }
        .ef-root * { box-sizing: border-box; }
        .ef-display {
          font-family: 'Archivo Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          line-height: 0.85;
        }
        .ef-mono {
          font-family: 'Space Mono', monospace;
        }
        .ef-section {
          max-width: 1440px;
          margin: 0 auto;
          padding: 80px 32px;
        }
        @media (min-width: 768px) {
          .ef-section { padding: 120px 48px; }
        }
        @media (min-width: 1200px) {
          .ef-section { padding: 160px 64px; }
        }

        /* NAV */
        .ef-nav-wrap {
          position: fixed;
          top: 20px;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 0 16px;
        }
        .ef-nav {
          background: var(--black);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 10px 12px 10px 24px;
          width: 100%;
          max-width: 1100px;
        }
        .ef-nav-logo {
          color: var(--white);
          font-family: 'Archivo Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-size: 16px;
          white-space: nowrap;
        }
        .ef-nav-links {
          display: none;
          gap: 28px;
        }
        @media (min-width: 900px) {
          .ef-nav-links { display: flex; }
        }
        .ef-nav-links a {
          color: var(--white);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s;
        }
        .ef-nav-links a:hover { color: var(--orange); }
        .ef-nav-cta {
          background: var(--orange);
          color: var(--black);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          border-radius: 999px;
          padding: 12px 22px;
          border: 2px solid var(--orange);
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .ef-nav-cta:hover { background: var(--black); color: var(--orange); }
        .ef-nav-burger {
          display: flex;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
          padding: 8px;
        }
        @media (min-width: 900px) {
          .ef-nav-burger { display: none; }
        }
        .ef-mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--black);
          z-index: 200;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 32px;
        }
        .ef-mobile-menu a {
          color: var(--white);
          font-family: 'Archivo Black', sans-serif;
          text-transform: uppercase;
          font-size: 32px;
          text-decoration: none;
          letter-spacing: -0.03em;
        }
        .ef-mobile-close {
          position: absolute;
          top: 32px;
          right: 32px;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
        }

        /* HERO */
        .ef-hero {
          background: var(--orange);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 140px;
        }
        .ef-hero-headline {
          font-size: 16vw;
          color: var(--black);
          text-align: center;
          padding: 0 16px;
        }
        @media (min-width: 900px) {
          .ef-hero-headline { font-size: 11vw; }
        }
        .ef-hero-desc {
          max-width: 560px;
          margin: 32px auto 0;
          text-align: center;
          font-size: 16px;
          line-height: 1.5;
          padding: 0 24px;
        }
        .ef-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 40px;
          padding: 0 24px;
        }
        .ef-btn-primary {
          background: var(--black);
          color: var(--white);
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          padding: 18px 36px;
          border-radius: 999px;
          border: 2px solid var(--black);
          cursor: pointer;
          transition: transform 0.3s, background 0.3s;
        }
        .ef-btn-primary:hover { transform: translateY(-4px); }
        .ef-btn-outline {
          background: transparent;
          color: var(--black);
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          padding: 18px 36px;
          border-radius: 999px;
          border: 2px solid var(--black);
          cursor: pointer;
          transition: all 0.3s;
        }
        .ef-btn-outline:hover { background: var(--black); color: var(--orange); }

        .ef-hero-bottom {
          border-top: 2px solid var(--black);
          margin-top: 64px;
          padding: 24px 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ef-hero-bottom-text {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          line-height: 1.6;
        }

        /* ROTATING INDICATOR */
        .ef-rotator {
          width: 110px;
          height: 110px;
          position: relative;
          flex-shrink: 0;
        }
        .ef-rotator svg { animation: ef-spin 12s linear infinite; }
        @keyframes ef-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .ef-rotator-arrow {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MARQUEE */
        .ef-marquee-section {
          background: var(--black);
          padding: 20px 0;
          transform: skewY(-2deg);
          margin: -20px 0;
          overflow: hidden;
        }
        .ef-marquee-row {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }
        .ef-marquee-row span {
          font-family: 'Archivo Black', sans-serif;
          text-transform: uppercase;
          font-size: 8vw;
          padding-right: 40px;
        }
        .ef-marquee-1 { animation: ef-marquee-l 22s linear infinite; }
        .ef-marquee-2 { animation: ef-marquee-r 26s linear infinite; }
        .ef-marquee-1 span { color: var(--orange); }
        .ef-marquee-2 span { color: var(--white); opacity: 0.8; }
        @keyframes ef-marquee-l {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes ef-marquee-r {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        /* ABOUT */
        .ef-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-top: 56px;
        }
        @media (min-width: 900px) {
          .ef-about-grid { grid-template-columns: 1fr 1fr; align-items: start; }
        }
        .ef-about-image {
          background: var(--black);
          aspect-ratio: 4/5;
          border: 2px solid var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--orange);
        }
        .ef-about-body p {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .ef-highlight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .ef-highlight-item {
          border-top: 2px solid var(--black);
          padding-top: 12px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.02em;
        }

        /* STATS */
        .ef-stats-section { background: var(--orange); }
        .ef-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .ef-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .ef-stat-number {
          font-family: 'Archivo Black', sans-serif;
          font-size: 10vw;
          letter-spacing: -0.04em;
          line-height: 0.9;
        }
        @media (min-width: 900px) {
          .ef-stat-number { font-size: 4.2vw; }
        }
        .ef-stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          margin-top: 8px;
        }

        /* PROGRAMS */
        .ef-programs-section { background: var(--black); color: var(--white); }
        .ef-program-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 28px 12px;
          border-top: 2px solid #2a2a2a;
          cursor: pointer;
          transition: background 0.3s;
        }
        .ef-program-row:last-child { border-bottom: 2px solid #2a2a2a; }
        .ef-program-row:hover { background: #0d0d0d; }
        .ef-program-number {
          font-family: 'Space Mono', monospace;
          color: var(--orange);
          font-size: 14px;
          width: 32px;
          flex-shrink: 0;
        }
        .ef-program-title {
          font-family: 'Archivo Black', sans-serif;
          text-transform: uppercase;
          font-size: 6vw;
          letter-spacing: -0.03em;
          flex: 1;
          transition: transform 0.3s;
        }
        @media (min-width: 900px) {
          .ef-program-title { font-size: 2.6vw; }
        }
        .ef-program-row:hover .ef-program-title { transform: translateX(16px); }
        .ef-program-tags {
          display: none;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #999;
          letter-spacing: 0.03em;
        }
        @media (min-width: 900px) {
          .ef-program-tags { display: block; }
        }
        .ef-program-arrow {
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
          color: var(--orange);
          flex-shrink: 0;
        }
        .ef-program-row:hover .ef-program-arrow { opacity: 1; transform: translateX(8px); }

        /* TRANSFORMATION */
        .ef-transform-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .ef-transform-grid { grid-template-columns: 1fr 1fr; }
        }
        .ef-transform-image {
          background: var(--orange);
          aspect-ratio: 4/3;
          border: 2px solid var(--black);
        }
        .ef-transform-heading {
          font-size: 8vw;
        }
        @media (min-width: 900px) {
          .ef-transform-heading { font-size: 3.6vw; }
        }
        .ef-link-arrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          margin-top: 28px;
          cursor: pointer;
          text-transform: uppercase;
        }
        .ef-link-arrow svg { transition: transform 0.3s; }
        .ef-link-arrow:hover svg { transform: translate(4px, -4px); }

        /* TRAINERS */
        .ef-trainer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 56px;
        }
        @media (min-width: 700px) {
          .ef-trainer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1100px) {
          .ef-trainer-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .ef-trainer-card {
          position: relative;
          background: #111;
          aspect-ratio: 3/4;
          overflow: hidden;
          border: 2px solid var(--black);
        }
        .ef-trainer-photo {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1a1a1a, #000);
          filter: grayscale(1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #444;
        }
        .ef-trainer-overlay {
          position: absolute;
          inset: 0;
          background: var(--orange);
          opacity: 0;
          transform: translateY(100%);
          transition: transform 0.35s, opacity 0.35s;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          color: var(--black);
        }
        .ef-trainer-card:hover .ef-trainer-overlay { opacity: 1; transform: translateY(0); }
        .ef-trainer-name {
          font-family: 'Archivo Black', sans-serif;
          font-size: 22px;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .ef-trainer-spec {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          margin-top: 6px;
        }
        .ef-trainer-book {
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--black);
          color: var(--white);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          padding: 10px 16px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          width: fit-content;
        }

        /* MEMBERSHIP */
        .ef-plans-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 56px;
        }
        @media (min-width: 900px) {
          .ef-plans-grid { grid-template-columns: repeat(3, 1fr); align-items: center; }
        }
        .ef-plan-card {
          border: 2px solid var(--black);
          padding: 40px 28px;
          transition: transform 0.3s, box-shadow 0.3s;
          background: var(--white);
        }
        .ef-plan-card.highlighted {
          background: var(--black);
          color: var(--white);
          transform: scale(1.05);
        }
        .ef-plan-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .ef-plan-card.highlighted:hover { transform: translateY(-8px) scale(1.07); }
        .ef-plan-name {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.1em;
        }
        .ef-plan-price {
          font-family: 'Archivo Black', sans-serif;
          font-size: 15vw;
          margin-top: 12px;
        }
        @media (min-width: 900px) {
          .ef-plan-price { font-size: 3.4vw; }
        }
        .ef-plan-period {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
        }
        .ef-plan-features {
          list-style: none;
          padding: 0;
          margin: 28px 0;
        }
        .ef-plan-features li {
          font-size: 14px;
          padding: 10px 0;
          border-top: 1px solid rgba(0,0,0,0.15);
        }
        .ef-plan-card.highlighted .ef-plan-features li { border-top: 1px solid rgba(255,255,255,0.2); }
        .ef-plan-join {
          width: 100%;
          padding: 16px;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          border-radius: 999px;
          border: 2px solid var(--black);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ef-plan-card.highlighted .ef-plan-join {
          border: 2px solid var(--orange);
          color: var(--white);
        }
        .ef-plan-join:hover { background: var(--orange); border-color: var(--orange); color: var(--black); }

        /* TESTIMONIALS */
        .ef-testimonial-section { background: var(--black); color: var(--white); }
        .ef-quote-mark {
          font-family: 'Archivo Black', sans-serif;
          font-size: 20vw;
          color: var(--orange);
          line-height: 0.6;
          opacity: 0.9;
        }
        @media (min-width: 900px) { .ef-quote-mark { font-size: 8vw; } }
        .ef-testimonial-text {
          font-size: 6vw;
          font-family: 'Archivo Black', sans-serif;
          letter-spacing: -0.03em;
          line-height: 1.05;
          text-transform: uppercase;
          max-width: 900px;
          min-height: 160px;
        }
        @media (min-width: 900px) { .ef-testimonial-text { font-size: 2.6vw; } }
        .ef-testimonial-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
        }
        .ef-avatar {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: var(--orange);
          color: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Archivo Black', sans-serif;
          font-size: 16px;
        }
        .ef-stars { display: flex; gap: 4px; margin-top: 4px; }

        /* FAQ */
        .ef-faq-item {
          border-top: 2px solid var(--black);
          padding: 24px 0;
          cursor: pointer;
        }
        .ef-faq-item:last-child { border-bottom: 2px solid var(--black); }
        .ef-faq-q {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Archivo Black', sans-serif;
          font-size: 4vw;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        @media (min-width: 900px) { .ef-faq-q { font-size: 1.6vw; } }
        .ef-faq-a {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.35s ease;
          font-size: 16px;
          line-height: 1.6;
          color: #333;
        }

        /* CONTACT */
        .ef-contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          margin-top: 56px;
        }
        @media (min-width: 900px) {
          .ef-contact-grid { grid-template-columns: 1fr 1.2fr; }
        }
        .ef-contact-info div { margin-bottom: 28px; }
        .ef-contact-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #777;
        }
        .ef-contact-value { font-size: 18px; margin-top: 6px; }
        .ef-form-field {
          margin-bottom: 20px;
        }
        .ef-form-field label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          display: block;
          margin-bottom: 8px;
        }
        .ef-form-field input,
        .ef-form-field textarea {
          width: 100%;
          border: 2px solid var(--black);
          padding: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          background: transparent;
        }
        .ef-form-field input:focus,
        .ef-form-field textarea:focus {
          outline: 3px solid var(--orange);
          outline-offset: -2px;
        }
        .ef-map-block {
          margin-top: 40px;
          border: 2px solid var(--black);
          aspect-ratio: 16/6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          color: #777;
          background: repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #ececec 10px, #ececec 20px);
        }

        /* GIANT CTA */
        .ef-giant-cta {
          background: var(--orange);
          text-align: center;
        }
        .ef-giant-cta h2 { font-size: 12vw; }
        @media (min-width: 900px) { .ef-giant-cta h2 { font-size: 6vw; } }
        .ef-giant-cta button { margin-top: 40px; }

        /* FOOTER */
        .ef-footer { background: var(--black); color: var(--white); }
        .ef-footer h3 { font-size: 12vw; }
        @media (min-width: 900px) { .ef-footer h3 { font-size: 5vw; } }
        .ef-footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 64px;
          border-top: 2px solid #2a2a2a;
          padding-top: 40px;
        }
        @media (min-width: 700px) {
          .ef-footer-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .ef-footer-col-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #777;
          margin-bottom: 14px;
        }
        .ef-footer-col a, .ef-footer-col p {
          display: block;
          color: var(--white);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .ef-copyright {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #666;
          margin-top: 48px;
          border-top: 2px solid #2a2a2a;
          padding-top: 24px;
        }

        .ef-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          color: var(--orange);
          margin-bottom: 16px;
          display: block;
        }
        .ef-section-heading {
          font-size: 10vw;
        }
        @media (min-width: 900px) { .ef-section-heading { font-size: 4.5vw; } }
      `}</style>

      {/* NAV */}
      <div className="ef-nav-wrap">
        <div className="ef-nav">
          <span className="ef-nav-logo">ELITE FITNESS</span>
          <div className="ef-nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link} onClick={() => scrollTo(link.toLowerCase())}>
                {link}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button className="ef-nav-cta" onClick={() => scrollTo("membership")}>
              JOIN NOW
            </button>
            <button className="ef-nav-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="ef-mobile-menu">
          <button className="ef-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) => (
            <a key={link} onClick={() => scrollTo(link.toLowerCase())}>
              {link}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="ef-hero">
        <h1 className="ef-display ef-hero-headline">
          TRAIN
          <br />
          HARDER
          <br />
          LIVE
          <br />
          STRONGER
        </h1>
        <p className="ef-hero-desc">
          Elite coaching, world-class equipment, and personalized fitness programs designed to
          transform your body.
        </p>
        <div className="ef-hero-ctas">
          <button className="ef-btn-primary" onClick={() => scrollTo("membership")}>
            JOIN TODAY
          </button>
          <button className="ef-btn-outline" onClick={() => scrollTo("contact")}>
            BOOK FREE TRIAL
          </button>
        </div>

        <div className="ef-hero-bottom">
          <div className="ef-hero-bottom-text">
            BASED IN
            <br />
            AUSTIN, TX
          </div>

          <div className="ef-rotator">
            <svg viewBox="0 0 200 200" width="110" height="110">
              <defs>
                <path
                  id="ef-circle-path"
                  d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                  fill="none"
                />
              </defs>
              <circle cx="100" cy="100" r="98" fill="none" stroke="#000" strokeWidth="1" opacity="0.3" />
              <text fontSize="12.5" fontFamily="Space Mono, monospace" letterSpacing="1" fill="#000">
                <textPath href="#ef-circle-path">
                  SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
                </textPath>
              </text>
            </svg>
            <div className="ef-rotator-arrow">
              <ArrowDown size={22} />
            </div>
          </div>

          <div className="ef-hero-bottom-text" style={{ textAlign: "right" }}>
            OPEN DAILY
            <br />
            5AM – 11PM
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="ef-marquee-section">
        <div className="ef-marquee-row ef-marquee-1">
          <span>TRAIN • SWEAT • REPEAT • BUILD • PERFORM • ELITE • </span>
          <span>TRAIN • SWEAT • REPEAT • BUILD • PERFORM • ELITE • </span>
        </div>
        <div className="ef-marquee-row ef-marquee-2" style={{ marginTop: "12px" }}>
          <span>NO EXCUSES • CONSISTENCY • DISCIPLINE • STRENGTH • </span>
          <span>NO EXCUSES • CONSISTENCY • DISCIPLINE • STRENGTH • </span>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="ef-section">
        <span className="ef-eyebrow">01 — ABOUT US</span>
        <h2 className="ef-display ef-section-heading">WHY TRAIN WITH US</h2>
        <div className="ef-about-grid">
          <div className="ef-about-image">
            <Dumbbell size={64} />
          </div>
          <div className="ef-about-body">
            <p>
              Elite Fitness was built for people who refuse to settle for average. Every program
              is engineered by certified coaches, backed by real equipment, and measured by real
              results — not motivational posters.
            </p>
            <p>
              Whether you're chasing your first pull-up or your next competition, our floor is
              built to push you past where you'd stop on your own.
            </p>
            <div className="ef-highlight-grid">
              {HIGHLIGHTS.map((h) => (
                <div key={h} className="ef-highlight-item">
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ef-stats-section">
        <div className="ef-section" style={{ padding: "80px 32px" }}>
          <div className="ef-stats-grid">
            {STATS.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <div className="ef-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="ef-programs-section">
        <div className="ef-section">
          <span className="ef-eyebrow">02 — PROGRAMS</span>
          <h2 className="ef-display ef-section-heading">TRAINING PROGRAMS</h2>
          <div style={{ marginTop: "48px" }}>
            {PROGRAMS.map((p, i) => (
              <div key={p.title} className="ef-program-row">
                <span className="ef-program-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="ef-program-title">{p.title}</span>
                <span className="ef-program-tags">{p.tags}</span>
                <ArrowUpRight className="ef-program-arrow" size={28} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRANSFORMATION */}
      <section className="ef-section">
        <div className="ef-transform-grid">
          <div className="ef-transform-image" />
          <div>
            <span className="ef-eyebrow">03 — RESULTS</span>
            <h2 className="ef-display ef-transform-heading">
              REAL RESULTS.
              <br />
              REAL DISCIPLINE.
            </h2>
            <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: 1.6, maxWidth: "440px" }}>
              Every transformation on our wall started the same way everyone else's does — showing
              up on a hard day.
            </p>
            <div className="ef-link-arrow">
              VIEW SUCCESS STORIES <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="ef-section">
        <span className="ef-eyebrow">04 — TRAINERS</span>
        <h2 className="ef-display ef-section-heading">MEET THE COACHES</h2>
        <div className="ef-trainer-grid">
          {TRAINERS.map((t) => (
            <div key={t.name} className="ef-trainer-card">
              <div className="ef-trainer-photo">
                <Dumbbell size={40} />
              </div>
              <div className="ef-trainer-overlay">
                <div className="ef-trainer-name">{t.name}</div>
                <div className="ef-trainer-spec">
                  {t.spec} · {t.years}
                </div>
                <button className="ef-trainer-book">
                  <Instagram size={14} /> BOOK TRAINER
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="ef-section">
        <span className="ef-eyebrow">05 — MEMBERSHIP</span>
        <h2 className="ef-display ef-section-heading">CHOOSE YOUR PLAN</h2>
        <div className="ef-plans-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`ef-plan-card ${plan.highlighted ? "highlighted" : ""}`}>
              <div className="ef-plan-name">{plan.name}</div>
              <div>
                <span className="ef-plan-price">{plan.price}</span>
                <span className="ef-plan-period">{plan.period}</span>
              </div>
              <ul className="ef-plan-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="ef-plan-join">JOIN {plan.name}</button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ef-testimonial-section">
        <div className="ef-section">
          <div className="ef-quote-mark">"</div>
          <div className="ef-testimonial-text">{TESTIMONIALS[testimonialIdx].review}</div>
          <div className="ef-testimonial-meta">
            <div className="ef-avatar">
              {TESTIMONIALS[testimonialIdx].name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="ef-mono" style={{ fontSize: "13px" }}>
                {TESTIMONIALS[testimonialIdx].name} · {TESTIMONIALS[testimonialIdx].role}
              </div>
              <div className="ef-stars">
                {Array.from({ length: TESTIMONIALS[testimonialIdx].rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#FF4D00" color="#FF4D00" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ef-section">
        <span className="ef-eyebrow">06 — FAQ</span>
        <h2 className="ef-display ef-section-heading">QUESTIONS</h2>
        <div style={{ marginTop: "48px" }}>
          {FAQS.map((f, i) => (
            <div key={f.q} className="ef-faq-item" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
              <div className="ef-faq-q">
                {f.q}
                {openFaq === i ? <Minus size={22} /> : <Plus size={22} />}
              </div>
              <div
                className="ef-faq-a"
                style={{
                  maxHeight: openFaq === i ? "160px" : "0px",
                  opacity: openFaq === i ? 1 : 0,
                  marginTop: openFaq === i ? "16px" : "0px",
                }}
              >
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="ef-section">
        <span className="ef-eyebrow">07 — CONTACT</span>
        <h2 className="ef-display ef-section-heading">START YOUR FITNESS JOURNEY</h2>
        <div className="ef-contact-grid">
          <div className="ef-contact-info">
            <div>
              <div className="ef-contact-label">ADDRESS</div>
              <div className="ef-contact-value">412 Barton Springs Rd, Austin, TX 78704</div>
            </div>
            <div>
              <div className="ef-contact-label">PHONE</div>
              <div className="ef-contact-value">(512) 555-0134</div>
            </div>
            <div>
              <div className="ef-contact-label">EMAIL</div>
              <div className="ef-contact-value">train@elitefitness.com</div>
            </div>
            <div>
              <div className="ef-contact-label">OPENING HOURS</div>
              <div className="ef-contact-value">Daily 5AM – 11PM</div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ef-form-field">
              <label htmlFor="ef-name">NAME</label>
              <input id="ef-name" type="text" placeholder="Your full name" />
            </div>
            <div className="ef-form-field">
              <label htmlFor="ef-phone">PHONE</label>
              <input id="ef-phone" type="tel" placeholder="(___) ___-____" />
            </div>
            <div className="ef-form-field">
              <label htmlFor="ef-email">EMAIL</label>
              <input id="ef-email" type="email" placeholder="you@email.com" />
            </div>
            <div className="ef-form-field">
              <label htmlFor="ef-goal">FITNESS GOAL</label>
              <input id="ef-goal" type="text" placeholder="Strength, weight loss, conditioning..." />
            </div>
            <div className="ef-form-field">
              <label htmlFor="ef-message">MESSAGE</label>
              <textarea id="ef-message" rows={4} placeholder="Tell us about your goals" />
            </div>
            <button type="submit" className="ef-btn-primary">
              JOIN NOW
            </button>
          </form>
        </div>
        <div className="ef-map-block">MAP — 412 BARTON SPRINGS RD, AUSTIN, TX</div>
      </section>

      {/* GIANT CTA */}
      <section className="ef-giant-cta">
        <div className="ef-section">
          <h2 className="ef-display">READY TO BECOME STRONGER?</h2>
          <button className="ef-btn-primary" onClick={() => scrollTo("membership")}>
            JOIN ELITE FITNESS
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="ef-footer">
        <div className="ef-section">
          <h3 className="ef-display">
            TRAIN HARD.
            <br />
            LIVE BETTER.
          </h3>
          <div className="ef-footer-grid">
            <div className="ef-footer-col">
              <div className="ef-footer-col-title">PROGRAMS</div>
              {PROGRAMS.slice(0, 4).map((p) => (
                <a key={p.title} onClick={() => scrollTo("programs")}>
                  {p.title}
                </a>
              ))}
            </div>
            <div className="ef-footer-col">
              <div className="ef-footer-col-title">SOCIAL MEDIA</div>
              <a>Instagram</a>
              <a>YouTube</a>
              <a>TikTok</a>
            </div>
            <div className="ef-footer-col">
              <div className="ef-footer-col-title">CONTACT</div>
              <p>412 Barton Springs Rd, Austin, TX</p>
              <p>(512) 555-0134</p>
              <p>train@elitefitness.com</p>
            </div>
          </div>
          <div className="ef-copyright">© 2026 ELITE FITNESS. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
