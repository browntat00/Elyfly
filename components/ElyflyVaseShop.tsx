"use client";
import React, { useMemo, useState } from "react";

export default function ElyflyVaseShop() {
  const products = useMemo(
    () => [
      {
        id: "blossom-bop",
        name: "Blossom Bop",
        tagline: "Faux real peonies, zero drama.",
        price: 79,
        color: "from-pink-400 to-rose-500",
        bg: "bg-rose-50",
        imgAlt: "Pink peony arrangement in a hand-painted vase",
      },
      {
        id: "sunny-side-up",
        name: "Sunny Side Up",
        tagline: "Daisies that refuse to wilt—like your optimism.",
        price: 69,
        color: "from-yellow-300 to-amber-400",
        bg: "bg-amber-50",
        imgAlt: "Cheerful daisies with a bright yellow pop-art vase",
      },
      {
        id: "mint-to-be",
        name: "Mint To Be",
        tagline: "Eucalyptus chic. Smells like compliments (not actually).",
        price: 84,
        color: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50",
        imgAlt: "Soft eucalyptus and white roses in a mint vase",
      },
      {
        id: "violet-vibes",
        name: "Violet Vibes",
        tagline: "Lavender dreams with main‑character energy.",
        price: 89,
        color: "from-violet-400 to-indigo-500",
        bg: "bg-violet-50",
        imgAlt: "Lavender sprigs in a glossy violet vase",
      },
      {
        id: "coral-caper",
        name: "Coral Caper",
        tagline: "Tropical pop that says ‘I water on airplane mode.’",
        price: 74,
        color: "from-orange-400 to-pink-500",
        bg: "bg-orange-50",
        imgAlt: "Coral tinted arrangement in a graphic ceramic vase",
      },
    ],
    []
  );

  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (id: string) => {
    setCart((c) => {
      const idx = c.findIndex((x) => x.id === id);
      if (idx >= 0) {
        const copy = [...c];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...c, { id, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((c) => c.filter((x) => x.id !== id));
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = products.find((p) => p.id === item.id);
      return p ? sum + p.price * item.qty : sum;
    }, 0);
  }, [cart, products]);

  const mailtoCheckout = () => {
    const lines = cart
      .map((item) => {
        const p = products.find((p) => p.id === item.id);
        return p ? `• ${p.name} x${item.qty} — $${p.price * item.qty}` : "";
      })
      .join("%0D%0A");
    const subject = encodeURIComponent("Elyfly Order Inquiry");
    const body = encodeURIComponent(
      `Hi Elyfly,\\n\\nI’d like to order:\\n${decodeURIComponent(lines)}\\n\\nTotal (approx): $${total}.\\n\\nShip to: [your address]\\nPreferred contact: [phone/email]\\n\\nThanks!`
    );
    window.location.href = `mailto:orders@elyfly.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-fuchsia-50 to-sky-50 text-slate-800">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-amber-400 shadow-md" />
            <span className="font-black tracking-tight text-xl">elyfly</span>
            <span className="ml-2 hidden sm:inline text-xs font-semibold px-2 py-1 rounded-full bg-slate-900 text-white">Faux & Fabulous</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#collections" className="hover:text-fuchsia-600">Collections</a>
            <a href="#about" className="hover:text-fuchsia-600">About</a>
            <a href="#faq" className="hover:text-fuchsia-600">FAQ</a>
          </nav>
          <button
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow md:hover:-translate-y-0.5 transition"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="ml-1 bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full">{cart.reduce((a, b) => a + b.qty, 0)}</span>
            )}
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Faux flowers, <span className="bg-gradient-to-r from-fuchsia-600 to-amber-500 bg-clip-text text-transparent">real compliments</span>.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-slate-600 max-w-prose">
              Hand‑designed vases paired with forever‑bloom florals. Zero watering. Zero wilting. Maximum “whoa, where’d you get that?”.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#collections" className="rounded-full bg-slate-900 text-white px-6 py-3 font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition">Shop the 5</a>
              <a href="#about" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold shadow-sm hover:-translate-y-0.5 transition">Why faux?</a>
            </div>
            <p className="mt-3 text-sm text-slate-500">Free US shipping over $100 · 30‑day “no‑wilt” happiness promise</p>
          </div>

          <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-3xl bg-white shadow-xl p-6 md:p-10">
            <div className="absolute -top-10 -right-8 md:-right-16 h-40 w-40 md:h-56 md:w-56 rounded-full bg-gradient-to-tr from-fuchsia-400 to-amber-300 blur-2xl opacity-60" />
            <div className="grid grid-cols-3 gap-4 h-full">
              {products.slice(0, 3).map((p) => (
                <GradientVase key={p.id} label={p.name} gradient={p.color} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">The Cheeky Five</h2>
          <span className="text-sm text-slate-500">Hand‑designed. Limited small‑batch.</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.slice(0, 5).map((p) => (
            <article key={p.id} className={`group rounded-3xl border border-slate-200 ${p.bg} p-4 md:p-6 shadow-sm hover:shadow-lg transition`}>              
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white flex items-center justify-center">
                <VaseArt gradient={p.color} />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold tracking-tight">{p.name}</h3>
                <p className="text-slate-600 text-sm mt-1">{p.tagline}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold">${p.price}</span>
                  <button
                    onClick={() => addToCart(p.id)}
                    className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-black tracking-tight">Low‑maintenance. High vibe.</h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-500"/>Each vase is hand‑designed in tiny batches—no two are exactly alike.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-amber-400"/>Premium faux florals that keep their glow without water or sunlight.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"/>Perfect for desks, entryways, and gifting “I thought of you” moments.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"/>30‑day happiness promise—if it doesn’t spark joy, send it back.</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-3xl bg-white p-6 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              {products.slice(1, 5).map((p) => (
                <div key={p.id} className="aspect-square rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  <VaseArt gradient={p.color} subtle />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Kind words from stylish humans</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "My coworkers think I grew a green thumb overnight.",
                name: "Jess P.",
              },
              {
                quote: "Apartment approved! No mess, all wow.",
                name: "Marco L.",
              },
              {
                quote: "Mom said ‘finally something that doesn’t die.’ Bought two.",
                name: "Renee K.",
              },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-white to-slate-50">
                <blockquote className="text-slate-700">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">FAQ (Fabulously Asked Questions)</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <FaqItem q="Are the flowers real?" a="They’re premium faux florals chosen to look lush year‑round—no watering can required." />
          <FaqItem q="How big are the arrangements?" a="Most pieces are 8–14 inches tall. Each listing shows exact dimensions when you add photos." />
          <FaqItem q="Can I customize colors?" a="Yes! Hit the cart button and use the email checkout to request a custom palette." />
          <FaqItem q="What if I change my mind?" a="30‑day returns in original condition. We want you grinning, not guessing." />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Elyfly. Hand‑designed in small batches.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm hover:text-fuchsia-600">Instagram</a>
            <a href="#" className="text-sm hover:text-fuchsia-600">TikTok</a>
            <a href="#" className="text-sm hover:text-fuchsia-600">Email</a>
          </div>
        </div>
      </footer>

      <div className={`fixed inset-0 z-40 ${cartOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-slate-900/40 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setCartOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-slate-200 transition-transform ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
          aria-label="Shopping cart"
        >
          <div className="p-6 flex items-center justify-between border-b border-slate-200">
            <h3 className="text-xl font-bold">Your cart</h3>
            <button onClick={() => setCartOpen(false)} className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold">Close</button>
          </div>
          <div className="p-6 space-y-4 max-h-[calc(100%-180px)] overflow-auto">
            {cart.length === 0 && (
              <p className="text-slate-500">It’s a little empty in here. Add a vase that sparks joy ✨</p>
            )}
            {cart.map((item) => {
              const p = products.find((p) => p.id === item.id)!;
              return (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-200">
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                    <VaseArt gradient={p.color} subtle />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold leading-tight">{p.name}</div>
                    <div className="text-xs text-slate-500">Qty {item.qty} · ${p.price} each</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${p.price * item.qty}</div>
                    <button onClick={() => removeFromCart(item.id)} className="mt-1 text-xs text-rose-600 hover:underline">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-lg font-extrabold">${total}</span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={mailtoCheckout}
              className="w-full rounded-full bg-slate-900 text-white px-6 py-3 font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Email order request
            </button>
            <p className="mt-2 text-xs text-slate-500">Secure checkout coming soon. For now, email us your cart and we’ll confirm details + payment.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function GradientVase({ label, gradient }: { label: string; gradient: string }) {
  return (
    <div className="relative flex items-end justify-center">
      <div className={`absolute inset-x-6 bottom-0 h-40 rounded-t-[2rem] bg-gradient-to-b ${gradient} shadow-2xl`} />
      <div className="absolute -bottom-2 h-12 w-[80%] rounded-full bg-slate-300/40 blur-lg" />
      <span className="relative z-10 mb-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold shadow">{label}</span>
    </div>
  );
}

function VaseArt({ gradient, subtle = false }: { gradient: string; subtle?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <linearGradient id={`g-${gradient}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="white" />
      <g transform="translate(100,120)">
        <ellipse cx="0" cy="60" rx="45" ry="10" fill="#e5e7eb" />
        <path d="M -30 -70 C -10 -40 -10 -10 -10 0 C -10 40 -45 50 -45 55 L 45 55 C 45 50 10 40 10 0 C 10 -10 10 -40 30 -70 Z" className={`fill-current text-transparent bg-clip-text bg-gradient-to-b ${gradient}`} />
        <rect x="-12" y="-80" width="24" height="12" rx="6" className={`fill-current text-transparent bg-clip-text bg-gradient-to-b ${gradient}`} />
      </g>
      <g stroke="#16a34a" strokeWidth="2" fill="none">
        <path d="M100 40 C 90 80, 95 95, 100 120" />
        <path d="M100 40 C 110 80, 105 95, 100 120" />
      </g>
      <g transform="translate(100,40)">
        <circle r="10" fill="#f59e0b" opacity={subtle ? 0.6 : 1} />
        <g fill="#a78bfa" opacity={subtle ? 0.5 : 1}>
          <circle cx="0" cy="-20" r="8" />
          <circle cx="18" cy="-10" r="8" />
          <circle cx="-18" cy="-10" r="8" />
          <circle cx="10" cy="10" r="8" />
          <circle cx="-10" cy="10" r="8" />
        </g>
      </g>
    </svg>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left flex items-center justify-between">
        <span className="font-semibold">{q}</span>
        <span className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border ${open ? "bg-slate-900 text-white" : "border-slate-300"}`}>
          {open ? "–" : "+"}
        </span>
      </button>
      {open && <p className="mt-3 text-slate-600 text-sm">{a}</p>}
    </div>
  );
}
