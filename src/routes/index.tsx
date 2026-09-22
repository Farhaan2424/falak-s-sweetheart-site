import { Link, createFileRoute } from "@tanstack/react-router";
import { Heart, Image, Music2, Pause, Play, Printer, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Falak | A Little Love Letter" },
      { name: "description", content: "A soft, handmade birthday letter filled with memories and little reasons to smile." },
      { property: "og:title", content: "Happy Birthday Falak 💗" },
      { property: "og:description", content: "A soft, handmade birthday letter filled with memories and little reasons to smile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sections = ["home", "memories", "video", "letter", "reasons"] as const;
const memories = [
  "That day we couldn't stop laughing",
  "A quiet moment worth keeping",
  "Your happiest little smile",
  "One of our favorite adventures",
  "A perfectly ordinary, lovely day",
  "A memory to remember",
];
const reasons = [
  ["01", "Your kindness", "You make ordinary moments feel gentle and safe."],
  ["02", "Your laugh", "It has a way of making every room feel warmer."],
  ["03", "The little things", "You notice what matters, even when no one else does."],
  ["04", "Simply you", "There is nobody else I would rather make memories with."],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [flipped, setFlipped] = useState<number[]>([]);
  const [musicNotice, setMusicNotice] = useState(false);

  useEffect(() => {
    const nodes = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          setActiveSection(entry.target.id);
        }
      }),
      { threshold: 0.3 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="crochet-bg relative overflow-hidden bg-background font-body text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <span className="float-doodle left-[8%] top-[16%]">♡</span>
        <span className="float-doodle float-delay left-[82%] top-[27%]">✿</span>
        <span className="float-doodle float-slow left-[15%] top-[70%]">୨୧</span>
        <span className="float-doodle float-delay left-[88%] top-[79%]">♡</span>
      </div>

      <nav className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 rounded-full border border-border/70 bg-background/80 px-2 py-3 shadow-soft backdrop-blur-md md:right-7" aria-label="Page sections">
        {sections.map((section) => (
          <button key={section} type="button" aria-label={`Go to ${section}`} onClick={() => scrollTo(section)} className={`nav-dot ${activeSection === section ? "is-active" : ""}`} />
        ))}
      </nav>

      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {musicNotice && <span className="rounded-full border border-border bg-background/90 px-3 py-2 text-xs text-muted-foreground shadow-soft backdrop-blur">Add your song here</span>}
        <Button variant="love" size="icon" aria-label={musicNotice ? "Hide music note" : "Music is muted"} title="Music placeholder — muted" onClick={() => setMusicNotice((value) => !value)}>
          {musicNotice ? <Pause /> : <Music2 />}
        </Button>
      </div>

      <Button variant="outline" className="fixed bottom-5 left-5 z-40 rounded-full bg-background/90 shadow-soft backdrop-blur" asChild>
        <Link to="/print"><Printer /> Printable card</Link>
      </Button>

      <section id="home" className="reveal-section relative z-10 flex min-h-[92svh] items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">A little birthday letter · just for you</p>
          <div className="mb-5 text-4xl animate-gentle-bob" aria-hidden="true">୨୧</div>
          <h1 className="font-script text-6xl leading-[1.08] text-primary sm:text-7xl md:text-8xl lg:text-9xl">Happy Birthday Falak <Heart className="ml-2 inline h-[.52em] w-[.52em] fill-current align-middle" aria-label="with love" /></h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">A little corner of the internet, made slowly and lovingly, to celebrate all the warmth you bring into the world.</p>
          <Button variant="love" size="lg" className="mt-10" onClick={() => scrollTo("memories")}>
            Do you want to see more? <span className="text-lg" aria-hidden="true">୨୧</span>
          </Button>
          <div className="mt-12 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="h-px w-12 bg-border" /> unwrap your letter <span className="h-px w-12 bg-border" /></div>
        </div>
      </section>

      <section id="memories" className="reveal-section relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 text-center"><p className="section-kicker">A few pieces of us</p><h2 className="section-title">Our sweetest memories</h2><p className="section-copy">Six little windows for the moments you want to keep close.</p></header>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map((caption, index) => (
              <article key={caption} className={`polaroid ${index % 2 === 0 ? "rotate-left" : "rotate-right"}`}>
                <div className="photo-placeholder"><Image className="h-8 w-8" strokeWidth={1.5} /><span>Add your photo here</span><span className="text-xs opacity-70">Photo {String(index + 1).padStart(2, "0")}</span></div>
                <p className="mt-4 text-center font-medium text-foreground">{caption} <span className="text-primary" aria-hidden="true">♡</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="reveal-section relative z-10 bg-secondary/45 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">Press play when you’re ready</p><h2 className="section-title">A little something for you <Video className="ml-2 inline h-7 w-7 text-primary" aria-hidden="true" /></h2>
          <div className="video-frame mt-10"><div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-3xl bg-muted/55 text-primary"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-love"><Play className="ml-1 h-7 w-7" fill="currentColor" /></span><div><p className="font-semibold">Add your video here</p><p className="mt-1 text-sm text-muted-foreground">A favorite clip, message, or montage</p></div></div></div>
        </div>
      </section>

      <section id="letter" className="reveal-section relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 text-center"><p className="section-kicker">Words I wanted you to keep</p><h2 className="section-title">A letter for Falak</h2></header>
          <article className="letter-paper">
            <span className="absolute right-8 top-7 text-3xl text-primary/60" aria-hidden="true">♡</span>
            <p className="font-script text-4xl text-primary">My dearest Falak,</p>
            <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>Some people make life brighter simply by being in it. You are one of those rare people—the kind whose presence feels like a favorite song and whose kindness stays long after the moment has passed.</p>
              <p>On your birthday, I hope you remember how deeply you are appreciated. May this next chapter bring soft mornings, loud laughter, brave dreams, and a hundred little reasons to smile.</p>
              <p>This space is waiting for the words only you two share. Replace this letter with your own memories, hopes, and all the things that deserve to be said.</p>
            </div>
            <div className="mt-10 text-right"><p className="text-sm text-muted-foreground">Signed with love,</p><p className="mt-1 font-script text-4xl text-primary">Always yours ♡</p></div>
          </article>
        </div>
      </section>

      <section id="reasons" className="reveal-section relative z-10 bg-secondary/45 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">A tiny extra surprise</p><h2 className="section-title">Reasons I love you</h2><p className="section-copy">Tap each note to unfold a little reason.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reasons.map(([number, title, reason], index) => {
              const isFlipped = flipped.includes(index);
              return <button key={title} type="button" aria-pressed={isFlipped} onClick={() => setFlipped((values) => values.includes(index) ? values.filter((item) => item !== index) : [...values, index])} className={`reason-card ${isFlipped ? "is-flipped" : ""}`}>
                <span className="reason-card-inner"><span className="reason-face reason-front"><span className="text-xs font-bold tracking-[0.2em] text-primary/70">{number}</span><Heart className="h-7 w-7 text-primary" /><strong className="text-lg">{title}</strong><span className="text-xs text-muted-foreground">Tap to reveal</span></span><span className="reason-face reason-back"><Sparkles className="h-6 w-6 text-primary" /><strong className="font-script text-3xl text-primary">{title}</strong><span className="max-w-xs text-sm leading-6 text-muted-foreground">{reason}</span></span></span>
              </button>;
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 overflow-hidden px-6 py-24 text-center">
        <div className="rising-hearts" aria-hidden="true"><span>♡</span><span>♡</span><span>♥</span><span>♡</span><span>♡</span></div>
        <Video className="mx-auto mb-5 h-5 w-5 text-primary/50" aria-hidden="true" />
        <p className="font-script text-4xl text-primary">For Falak, with all my heart</p><p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">Made with <Heart className="h-4 w-4 fill-current text-primary" aria-label="love" /> and a little bit of magic.</p>
      </footer>
    </main>
  );
}
