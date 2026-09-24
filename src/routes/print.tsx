import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Heart, Printer, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import falak1 from "@/assets/falak-1.jpg.jpg";
import falak2 from "@/assets/falak-2.jpg.jpg";

export const Route = createFileRoute("/print")({
  head: () => ({
    meta: [
      { title: "Printable Birthday Card for Falak" },
      { name: "description", content: "A print-ready A4 folded birthday keepsake made for Falak." },
      { property: "og:title", content: "A Birthday Card for Falak" },
      { property: "og:description", content: "A print-ready A4 folded birthday keepsake made for Falak." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrintableCard,
});

const reasons = ["Your kindness", "Your laugh", "The little things", "Simply you"];

function PrintableCard() {
  return (
    <main className="print-card-page min-h-screen bg-muted font-body text-foreground">
      <div className="print-toolbar sticky top-0 z-50 border-b border-border bg-background/95 px-4 py-3 shadow-soft backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Button variant="ghost" asChild>
            <Link to="/" aria-label="Back to birthday page"><ArrowLeft /> Back</Link>
          </Button>
          <p className="hidden text-sm text-muted-foreground sm:block"></p>
          <Button variant="love" onClick={() => window.print()}><Printer /> Print card</Button>
        </div>
      </div>

      <div className="print-instructions mx-auto max-w-5xl px-6 py-8 text-center">
        <p className="font-semibold"></p>
        <p className="mt-1 text-sm text-muted-foreground"></p>
      </div>

      <div className="print-sheet-wrap">
        <p className="print-sheet-label">Outside · page 1</p>
        <section className="print-sheet print-sheet-outside" aria-label="Outside of folded birthday card">
          <article className="print-panel print-back-panel">
            <span className="print-doodle" aria-hidden="true">♡</span>
            <div>
              <p className="font-script text-4xl text-primary">For Falak</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Made with <Heart className="inline h-3.5 w-3.5 fill-current text-primary" aria-label="love" /> and a little bit of magic.</p>
            </div>
          </article>
          <article className="print-panel print-front-panel">
            <div className="print-front-ornament" aria-hidden="true">୨୧</div>
            <p className="text-xs font-bold uppercase text-primary">A special birthday wish just for you</p>
            <h1 className="mt-5 font-script text-7xl leading-none text-primary">Happy Birthday<br />Falak</h1>
            <Heart className="mt-7 h-8 w-8 fill-current text-primary" aria-label="with love" />
            <p className="mt-6 max-w-xs text-center text-sm leading-6 text-muted-foreground">For all the warmth you bring into the world.</p>
          </article>
        </section>
      </div>

      <div className="print-sheet-wrap">
        <p className="print-sheet-label">Inside · page 2</p>
        <section className="print-sheet print-sheet-inside" aria-label="Inside of folded birthday card">
          <article className="print-panel print-inside-left">
            <p className="text-xs font-bold uppercase text-primary">A few pieces of you</p>
            <div className="mt-5 grid w-full grid-cols-2 gap-4">
              <img src={falak1} alt="Memory one" className="aspect-square w-full rounded-xl object-cover shadow-soft" />
              <img src={falak2} alt="Memory two" className="aspect-square w-full rounded-xl object-cover shadow-soft" />
            </div>
            <p className="mt-6 font-script text-4xl text-primary">Reasons I love you</p>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
              {reasons.map((reason) => (
                <p key={reason} className="flex items-center gap-2 text-sm font-semibold"><Heart className="h-3.5 w-3.5 fill-current text-primary" aria-hidden="true" />{reason}</p>
              ))}
            </div>
          </article>
          <article className="print-panel print-letter-panel" style={{ height: "auto", maxHeight: "none", overflow: "visible" }}>
            <Sparkles className="absolute right-8 top-8 h-5 w-5 text-primary/60" aria-hidden="true" />
            <p className="font-script text-4xl text-primary">My dearest Falak,</p>
            <div className="mt-4 space-y-2" style={{ fontSize: "9px", lineHeight: "1.35" }}>
              <p className="text-muted-foreground">Happiest birthday Falak 😘💗 It's one of the most special days for me because it's the day you came into this world 🫠🫂 You are my home you are the love of my life in you I have found the biggest blessing of my life 🥹🫂 I am so grateful that you chose me as your partner I am the luckiest man because I have a girl like you 🫠🫂 I am so grateful to Allah that He made me yours I love you with all my heart 😘💗</p>

              <p className="text-muted-foreground">You are the sweetest girl I have ever met I can't express in words what I feel for you but I hope you understand 😘🫂 You have eyes that make me fall in love every time I see them 🥹💗 I love every single thing about you You were my crush and you will forever be my crush and I feel so happy about the fact that I'm in a relationship with my crush You are my dream girl the one I always imagined 🫠😘</p>

              <p className="text-muted-foreground">You have loved me exactly like I always wanted Sometimes my eyes fill with tears of happiness after seeing your love for me 🥹🥹 I love you more than anything in the world I know the trust you have in me you trust me blindly and In Sha Allah I will never break that trust I will always love you the same way I do today 😘🫂 You are my home my safe place and with every passing day my love for you grows more and more 🫠😌</p>

              <p className="text-muted-foreground">Last birthday I was hoping that by this one I would be able to tell you how much I love you and what you mean to me This year Alhamdulillah I got that chance I still don't think I can fully express my love and my feelings for you in words but I hope my actions do 😘🫂</p>

              <p className="text-muted-foreground">I hope when you see this website and this message your face lights up with a beautiful smile 😘😘 You are the sweetest girl and In Sha Allah I will never hurt you I will always take care of you I will listen when you talk I will always be there for you through every difficult situation I am all yours Falak 🫠🫂🫂</p>

              <p className="text-muted-foreground">When I came to Ahmedabad and you were sitting in yellow dress in hall I was just starring at you I fell in love more and more every single time I saw you 🫠🫂</p>

              <p className="text-muted-foreground">And like I always say I hope we celebrate all your future birthdays together In Sha Allah 🥹🫂</p>

              <p className="text-muted-foreground">Happiest birthday my baby girl Thank you for always being there for me I hope all your wishes come true... Ameen Stay happy my baby Allah Umar Daraz Kare Ameen ❤️</p>

              <p className="text-muted-foreground">I love you I love you And I will love you forever and ever 😘😘😘</p>
            </div>
            <div className="mt-7 text-right">
              <p className="text-xs text-muted-foreground">Signed with love,</p>
              <p className="mt-1 font-script text-4xl text-primary">Always yours ♡</p>
              <p className="mt-1 font-script text-3xl text-primary">Farhaan</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}