import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Heart, Music2, Pause, Play, Printer, Sparkles, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Confetti, fireConfetti } from "@/components/Confetti";
import { FlowerSketch, HeartSketch, LaceEdge, RibbonSketch } from "@/components/Sketches";
import { TypedLine } from "@/components/TypedLine";
import { Button } from "@/components/ui/button";
import p1 from "@/assets/falak-1.jpg.jpg";
import p2 from "@/assets/falak-2.jpg.jpg";
import p3 from "@/assets/falak-3.jpg.jpg";
import p4 from "@/assets/falak-4.jpg.jpg";
import p5 from "@/assets/falak-5.jpg.jpg";
import p6 from "@/assets/falak-6.jpg.jpg";
import falakVideo from "@/assets/falak-video.mp4.mp4";

const photos = [p1, p2, p3, p4, p5, p6];

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
  "",
  "",
  "",
  "",
  "",
  "",
];
const reasons: [string, string][] = [
  ["Your kindness", "I love how kind you are how you treat me. You never show any arrogance you are the sweetest soul."],
  ["Your laugh", "I love your smile the way your face glows when you smile the way your chubby cheeks shine. I want to see that smile forever and I want to be the reason you smile."],
  ["The little things", "The little things you do for me taking care of me like a child keeping me posted of everything you do sharing everything with me."],
  ["Simply you", "I just love you. I can't explain in words how much I love you, how much you mean to me. I am grateful to have you my baby. I love you and will always love you forever and ever."],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ScratchCard({ title, reason }: { title: string; reason: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#f6a9c6");
    gradient.addColorStop(1, "#df84ac");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "700 12px 'Nunito Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 8);
    ctx.font = "400 18px 'Great Vibes', cursive";
    ctx.fillText("♡", rect.width / 2, rect.height / 2 + 20);
  }, []);

  function getPos(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function scratchAt(x: number, y: number) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 4 * 10) {
      sampled += 1;
      if (data[i] === 0) clear += 1;
    }
    if (sampled > 0 && clear / sampled > 0.45) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setRevealed(true);
      setTimeout(() => setHidden(true), 550);
    }
  }

  function handleDown(event: React.PointerEvent<HTMLCanvasElement>) {
    scratching.current = true;
    const { x, y } = getPos(event);
    scratchAt(x, y);
  }
  function handleMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!scratching.current) return;
    const { x, y } = getPos(event);
    scratchAt(x, y);
  }
  function handleUp() {
    scratching.current = false;
  }

  return (
    <div ref={wrapRef} className="scratch-card">
      <div className="scratch-card-content">
        <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
        <strong className="font-script text-3xl text-primary">{title}</strong>
        <span className="max-w-xs text-sm leading-6 text-muted-foreground">{reason}</span>
      </div>
      {!hidden && (
        <canvas
          ref={canvasRef}
          className={`scratch-canvas ${revealed ? "is-revealed" : ""}`}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerLeave={handleUp}
          aria-label={`Scratch to reveal: ${title}`}
        />
      )}
    </div>
  );
}

function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [musicNotice, setMusicNotice] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [candleOut, setCandleOut] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const nodes = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          setActiveSection(entry.target.id);
        }
      }),
      { threshold: 0.05 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = giftOpened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [giftOpened]);

  function openGift() {
    if (opening || giftOpened) return;
    setOpening(true);
    fireConfetti(1.3);
    setTimeout(() => setGiftOpened(true), 750);
  }

  return (
    <main className="crochet-bg relative overflow-hidden bg-background font-body text-foreground">
      {!giftOpened && (
        <div
          className={`opening-overlay ${opening ? "is-opening" : ""}`}
          onClick={openGift}
          role="button"
          tabIndex={0}
          aria-label="Tap to open your gift"
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openGift(); } }}
        >
          <div className="opening-overlay-inner">
            <span className="opening-ribbon" aria-hidden="true">🎀</span>
            <p className="opening-kicker">A little gift for</p>
            <h1 className="opening-title">Falak</h1>
            <p className="opening-hint">Tap anywhere to open ♡</p>
          </div>
        </div>
      )}

      <Confetti />
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

      <section id="home" className="wash-cream reveal-section relative z-10 flex min-h-[92svh] items-center justify-center px-6 py-24 text-center">
        <RibbonSketch className="left-[4%] top-[12%] hidden md:block" />
        <FlowerSketch className="right-[5%] bottom-[14%] hidden md:block" />
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">A special birthday wish just for you</p>
          <div className="mb-5 text-4xl animate-gentle-bob" aria-hidden="true">୨୧</div>
          <h1 className="font-script text-6xl leading-[1.08] text-primary sm:text-7xl md:text-8xl lg:text-9xl">Happy Birthday Falak <Heart className="ml-2 inline h-[.52em] w-[.52em] fill-current align-middle" aria-label="with love" /></h1>
          <TypedLine text="Falak, this whole little surprise was made only for you ♡" className="mx-auto mt-6 justify-center font-script text-3xl text-primary sm:text-4xl" />
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">Made with love to celebrate your special day. I hope you will like it ♡</p>
          <Button variant="love" size="lg" className="mt-10" onClick={() => { fireConfetti(1.4); scrollTo("memories"); }}>
            Do you want to see more? <span className="text-lg" aria-hidden="true">୨୧</span>
          </Button>
          <div className="mt-12 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground"><div className="flex items-center gap-3"><span className="h-px w-12 bg-border" /> go ahead, baby <span className="h-px w-12 bg-border" /></div><ChevronDown className="h-4 w-4 animate-gentle-bob text-primary" aria-hidden="true" /></div>
        </div>
      </section>

      <LaceEdge />

      <section id="memories" className="wash-blush reveal-section relative z-10 px-6 py-24 md:py-32">
        <HeartSketch className="right-[6%] top-[8%] hidden lg:block" />
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 text-center"><p className="section-kicker">A few pieces of you</p><h2 className="section-title">Your sweetest smile</h2></header>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map((caption, index) => (
              <article key={caption} className={`polaroid ${index % 2 === 0 ? "rotate-left" : "rotate-right"}`}>
                <img src={photos[index]} alt={`${caption}`} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
                <p className="mt-4 text-center font-medium text-foreground">{caption} <span className="text-primary" aria-hidden="true">♡</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LaceEdge flipped />

      <section id="video" className="wash-rose reveal-section relative z-10 px-6 py-24 md:py-32">
        <RibbonSketch className="left-[6%] bottom-[10%] hidden lg:block" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">Press play when you’re ready</p><h2 className="section-title">A little something for you <Video className="ml-2 inline h-7 w-7 text-primary" aria-hidden="true" /></h2>
          <div className="video-frame mt-10">
            <video
              src={falakVideo}
              controls
              playsInline
              className="aspect-video w-full rounded-3xl bg-black"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <LaceEdge />

      <section id="letter" className="wash-blush reveal-section relative z-10 px-6 py-24 md:py-32">
        <FlowerSketch className="left-[5%] top-[10%] hidden lg:block" />
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 text-center"><p className="section-kicker"></p><h2 className="section-title">A letter for You</h2></header>
          {!letterOpen ? (
            <div className="text-center">
              <div className={`envelope ${letterOpen ? "is-open" : ""}`} role="button" tabIndex={0} aria-label="Open the letter" onClick={() => setLetterOpen(true)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setLetterOpen(true); } }}>
                <span className="envelope-flap" aria-hidden="true" />
                <span className="envelope-seal" aria-hidden="true"><Heart className="h-6 w-6 fill-current" /></span>
                <span className="envelope-label">Open me</span>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">Tap the envelope to see your letter.</p>
            </div>
          ) : (
            <article className="letter-paper animate-fade-in">
              <span className="absolute right-8 top-7 text-3xl text-primary/60" aria-hidden="true">♡</span>
              <p className="font-script text-4xl text-primary">My dearest Falak,</p>
              <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
                <p>Happiest birthday Falak 😘💗 It's one of the most special days for me because it's the day you came into this world 🫠🫂 You are my home you are the love of my life in you I have found the biggest blessing of my life 🥹🫂 I am so grateful that you chose me as your partner I am the luckiest man because I have a girl like you 🫠🫂 I am so grateful to Allah that He made me yours I love you with all my heart 😘💗

                  You are the sweetest girl I have ever met I can't express in words what I feel for you but I hope you understand 😘🫂 You have eyes that make me fall in love every time I see them 🥹💗 I love every single thing about you You were my crush and you will forever be my crush and I feel so happy about the fact that I'm in a relationship with my crush You are my dream girl the one I always imagined 🫠😘

                  You have loved me exactly like I always wanted Sometimes my eyes fill with tears of happiness after seeing your love for me 🥹🥹 I love you more than anything in the world I know the trust you have in me you trust me blindly and In Sha Allah I will never break that trust I will always love you the same way I do today 😘🫂 You are my home my safe place and with every passing day my love for you grows more and more 🫠😌 </p>
                <p>Last birthday I was hoping that by this one I would be able to tell you how much I love you and what you mean to me This year Alhamdulillah I got that chance I still don't think I can fully express my love and my feelings for you in words but I hope my actions do 😘🫂

                  I hope when you see this website and this message your face lights up with a beautiful smile 😘😘 You are the sweetest girl and In Sha Allah I will never hurt you I will always take care of you I will listen when you talk I will always be there for you through every difficult situation I am all yours Falak 🫠🫂🫂

                  When I came to Ahmedabad and you were sitting in yellow dress in hall I was just starring at you I fell in love more and more every single time I saw you 🫠🫂

                  And like I always say I hope we celebrate all your future birthdays together In Sha Allah 🥹🫂

                  Happiest birthday my baby girl Thank you for always being there for me I hope all your wishes come true... Ameen Stay happy my baby Allah Umar Daraz Kare Ameen ❤️

                  I love you I love you And I will love you forever and ever 😘😘😘</p>
              </div>
              <div className="mt-10 text-right"><p className="text-sm text-muted-foreground">Signed with love,</p><p className="mt-1 font-script text-4xl text-primary">Always yours ♡</p><p className="mt-2 font-script text-3xl text-primary">Farhaan</p></div>
            </article>
          )}
        </div>
      </section>

      <LaceEdge flipped />

      <section id="reasons" className="wash-rose reveal-section relative z-10 px-6 py-24 md:py-32">
        <HeartSketch className="left-[7%] bottom-[12%] hidden lg:block" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-kicker">A tiny extra surprise</p><h2 className="section-title">There are many reasons why I love you but here are some of them</h2><p className="section-copy">Scratch each card to reveal a little reason.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {reasons.map(([title, reason]) => (
              <ScratchCard key={title} title={title} reason={reason} />
            ))}
          </div>
        </div>
      </section>

      <LaceEdge />

      <footer className="wash-cream relative z-10 overflow-hidden px-6 py-24 text-center">
        {candleOut && <div className="rising-hearts" aria-hidden="true"><span>♡</span><span>♡</span><span>♥</span><span>♡</span><span>♡</span></div>}
        <p className="section-kicker">{candleOut ? " ♡" : "One last thing"}</p>
        <h2 className="section-title mb-10">{candleOut ? "Happy birthday, my love" : "Make a wish"}</h2>
        <button type="button" aria-pressed={candleOut} aria-label={candleOut ? "Candle blown out" : "Blow out the candle"} className="mx-auto block rounded-3xl px-6 pb-4 pt-10 transition-transform hover:-translate-y-1" onClick={() => { if (!candleOut) { setCandleOut(true); fireConfetti(1.2); } }}>
          <span className="candle block">
            {candleOut ? <span className="candle-smoke" aria-hidden="true" /> : <span className="candle-flame" aria-hidden="true" />}
            <span className="candle-wick" aria-hidden="true" />
            <span className="candle-body block" aria-hidden="true" />
          </span>
          <span className="mt-5 block text-sm text-muted-foreground">{candleOut ? "I know Your wish is to stay with me Forever ♡" : "Tap the candle"}</span>
        </button>
        <p className="mt-14 font-script text-4xl text-primary">For My Baby Girl, with all my heart</p><p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">Made with <Heart className="h-4 w-4 fill-current text-primary" aria-label="love" /> and a little bit of magic.</p>
      </footer>
    </main>
  );
}