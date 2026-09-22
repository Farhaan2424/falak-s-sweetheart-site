import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Heart, Image, Printer, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

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

function PhotoSpace({ label }: { label: string }) {
  return (
    <div className="print-photo-space">
      <Image className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
      <span>Add your photo here</span>
      <small>{label}</small>
    </div>
  );
}

function PrintableCard() {
  return (
    <main className="print-card-page min-h-screen bg-muted font-body text-foreground">
      <div className="print-toolbar sticky top-0 z-50 border-b border-border bg-background/95 px-4 py-3 shadow-soft backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Button variant="ghost" asChild>
            <Link to="/" aria-label="Back to birthday page"><ArrowLeft /> Back</Link>
          </Button>
          <p className="hidden text-sm text-muted-foreground sm:block">A4 landscape · double-sided · flip on short edge</p>
          <Button variant="love" onClick={() => window.print()}><Printer /> Print card</Button>
        </div>
      </div>

      <div className="print-instructions mx-auto max-w-5xl px-6 py-8 text-center">
        <p className="font-semibold">Print both pages at 100% scale, double-sided, then fold down the center.</p>
        <p className="mt-1 text-sm text-muted-foreground">Choose “flip on short edge” in your printer settings.</p>
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
              <PhotoSpace label="Memory one" />
              <PhotoSpace label="Memory two" />
            </div>
            <p className="mt-6 font-script text-4xl text-primary">Reasons I love you</p>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
              {reasons.map((reason) => (
                <p key={reason} className="flex items-center gap-2 text-sm font-semibold"><Heart className="h-3.5 w-3.5 fill-current text-primary" aria-hidden="true" />{reason}</p>
              ))}
            </div>
          </article>
          <article className="print-panel print-letter-panel">
            <Sparkles className="absolute right-8 top-8 h-5 w-5 text-primary/60" aria-hidden="true" />
            <p className="font-script text-4xl text-primary">My dearest Falak,</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>Some people make life brighter simply by being in it. You are one of those rare people—the kind whose presence feels like a favorite song and whose kindness stays long after the moment has passed.</p>
              <p>On your birthday, I hope this next chapter brings soft mornings, loud laughter, brave dreams, and a hundred little reasons to smile.</p>
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