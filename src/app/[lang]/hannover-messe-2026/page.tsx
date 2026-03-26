import type { Metadata } from "next";
import Image from "next/image";
import CtaButtons from "./CtaButtons";
import CountdownTimer from "./CountdownTimer";
import StickyCta from "./StickyCta";
import HannoverLeadForm from "./HannoverLeadForm";
import FinalCtaButtons from "./FinalCtaButtons";

const STAND_INFO = "Hall 17, D52";
const FAIR_DATE_START = "2026-04-22";
const FAIR_DATE_END = "2026-04-25";
const WHATSAPP = "555184468231";

export const metadata: Metadata = {
    title: "INCOCIL® | Hannover Messe 2026",
    description: `Custom hydraulic and pneumatic cylinders engineered for precision. Meet INCOCIL® at Hannover Messe 2026 — ${STAND_INFO}.`,
    openGraph: {
        title: "INCOCIL® at Hannover Messe 2026",
        description: "Built Under Pressure. Trusted Worldwide.",
        url: "https://www.incocil.com/en/hannover-messe-2026",
        siteName: "INCOCIL®",
    },
};

const products = [
    {
        slug: "stainless-steel-hydraulic-cylinder",
        name: "Stainless Steel Cylinders",
        description: "Maximum corrosion resistance for agriculture, food & chemical sectors.",
        image: "/images/inox1.png",
        specs: ["Pressure: up to 350 bar", "Ø: 25–500 mm", "Material: AISI 304/316"],
    },
    {
        slug: "telescopic-hydraulic-cylinder",
        name: "Telescopic Cylinders",
        description: "Long stroke in compact closed length — 2 to 5 stages.",
        image: "/images/Cilindros-hid3.jpg",
        specs: ["Stages: 2–5", "Pressure: up to 250 bar", "Stroke: up to 4 000 mm"],
    },
    {
        slug: "master-slave-cylinder",
        name: "Master-Slave Systems",
        description: "Millimetric synchronism between two or more actuators.",
        image: "/images/master_slave1.jpeg",
        specs: ["Sync: ±1 mm", "Pressure: up to 350 bar", "No external sensors"],
    },
    {
        slug: "cushioned-hydraulic-cylinder",
        name: "Cushioned Cylinders",
        description: "Adjustable end-of-stroke dampening for smoother, longer-lasting operation.",
        image: "/images/cil_amort.JPG",
        specs: ["Cushioning: adjustable", "Uni or bilateral", "Pressure: up to 350 bar"],
    },
    {
        slug: "single-and-double-acting-cylinder",
        name: "Single & Double Acting",
        description: "The industrial backbone — versatile for any sector.",
        image: "/images/Cilindros-hid1.png",
        specs: ["Pressure: up to 350 bar", "Ø: 25–500 mm", "H8 precision honing"],
    },
    {
        slug: "custom-cylinders",
        name: "Custom Cylinders",
        description: "From sketch to delivery — engineered for your exact requirements.",
        image: "/images/cil_custom1.jpeg",
        specs: ["Any bore & stroke", "Any pressure rating", "3D drawing approval"],
    },
];

const differentials = [
    {
        title: "High-Precision Honing",
        description: "Unique capability to process diameters up to 500mm, ensuring perfect roughness and absolute sealing under extreme conditions.",
    },
    {
        title: "Robotic Welding",
        description: "Absolute precision and superior resistance in every weld bead, ensuring repeatability and structural integrity.",
    },
    {
        title: "Custom Engineering",
        description: "We develop special cylinders tailored to your specific application needs — from concept to delivery.",
    },
    {
        title: "Extended Warranty",
        description: "Full recovery maintenance with the same warranty as a new cylinder, minimizing downtime and operational costs.",
    },
];

const sectors = [
    { name: "Agriculture", icon: "🌾" },
    { name: "Mining", icon: "⛏️" },
    { name: "Forestry", icon: "🌲" },
    { name: "Road / Heavy Duty", icon: "🏗️" },
    { name: "Industrial", icon: "🏭" },
    { name: "Food & Chemical", icon: "⚗️" },
];

const certifications = [
    { label: "ISO 6020/6022", desc: "Hydraulic cylinders standard" },
    { label: "DIN Materials", desc: "European steel grades" },
    { label: "CE Ready", desc: "Export to EU / global markets" },
    { label: "PATROL®", desc: "45+ yr registered trademark" },
    { label: "In-house QC", desc: "100% pressure tested" },
    { label: "Honing up to ø500mm", desc: "Unique Brazilian capacity" },
];

function EventSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "INCOCIL at Hannover Messe 2026",
        startDate: FAIR_DATE_START,
        endDate: FAIR_DATE_END,
        location: {
            "@type": "Place",
            name: "Hannover Messe",
            address: { "@type": "PostalAddress", addressLocality: "Hanover", addressCountry: "DE" },
        },
        organizer: { "@type": "Organization", name: "INCOCIL", url: "https://www.incocil.com" },
        description: `Visit INCOCIL at ${STAND_INFO}. Custom hydraulic and pneumatic cylinders.`,
        url: "https://www.incocil.com/en/hannover-messe-2026",
    };
    return (
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default function HannoverMesse2026() {
    const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Hello! I met INCOCIL at Hannover Messe 2026 (${STAND_INFO}) and would like more information.`
    )}`;

    const schedulingUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Hello! I'd like to schedule a meeting at Hannover Messe 2026 (${STAND_INFO}). My name is: `
    )}`;

    return (
        <>
            <EventSchema />
            <StickyCta standInfo={STAND_INFO} />

            <main className="bg-neutral-900 text-white font-sans">

                {/* ── HERO ── */}
                <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
                    {/*
                     * PERF FIX: was `blur-[120px]` which triggers an expensive GPU
                     * Gaussian filter on a 600×600 element — major LCP blocker.
                     * Replaced with a CSS radial-gradient that achieves the same
                     * soft glow with zero filter cost.
                     */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: "linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: "600px",
                            height: "600px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle at center, rgba(21,128,61,0.15) 0%, transparent 70%)",
                        }}
                    />

                    <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-green-500 uppercase">
                            Hannover Messe 2026 · {STAND_INFO}
                        </span>

                        {/* Logos row */}
                        <div className="flex items-center gap-6 flex-wrap justify-center">
                            <Image
                                src="/images/incocil_en.png"
                                alt="INCOCIL"
                                width={200}
                                height={55}
                                className="brightness-0 invert"
                                priority
                            />
                            <div className="w-px h-10 bg-white/20 hidden sm:block" />
                            {/*
                             * PERF FIX: added `priority` — this is the second above-fold
                             * image. Without priority it gets lazy-loaded, delaying LCP.
                             */}
                            <Image
                                src="/images/hannover-messe-2026.png"
                                alt="Hannover Messe 2026"
                                width={80}
                                height={27}
                                className="brightness-100"
                                priority
                            />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                            Built Under{" "}
                            <span className="text-green-500">Pressure.</span>
                            <br />
                            Trusted Worldwide.
                        </h1>

                        <p className="max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
                            INCOCIL is a Brazilian specialist in custom hydraulic and pneumatic cylinders —
                            engineering precision solutions for agriculture, mining, forestry, road, and heavy industry sectors.
                        </p>

                        <CtaButtons standInfo={STAND_INFO} />
                        <CountdownTimer targetDate={FAIR_DATE_START} />
                    </div>
                </section>

                {/* ── ABOUT ── */}
                <section className="px-6 py-24 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-4">About INCOCIL</p>
                            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                                Specialists in Custom Hydraulic Cylinders
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-4">
                                Located in Porto Alegre, Brazil, INCOCIL has been supplying the most demanding industrial
                                sectors in Brazil and around the world. We design, manufacture, and maintain hydraulic and
                                pneumatic cylinders from our own fully equipped facility.
                            </p>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                From standard configurations to the most challenging custom projects — every cylinder
                                leaves our factory with extended warranty and full technical support.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: "45+", label: "Years of Experience" },
                                { value: "4+", label: "Countries Served" },
                                { value: "500mm", label: "Max Honing Diameter" },
                                { value: "100%", label: "In-house Manufacturing" },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-slate-700 bg-neutral-700/40 p-6 flex flex-col gap-1">
                                    <span className="text-3xl font-extrabold text-green-500">{stat.value}</span>
                                    <span className="text-sm text-slate-400">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SECTORS ── */}
                <section className="px-6 py-12 bg-neutral-800/30">
                    <div className="max-w-6xl mx-auto">
                        <p className="text-green-500 text-xs font-semibold tracking-widest uppercase text-center mb-8">Industries We Serve</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {sectors.map((s) => (
                                <div key={s.name} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 bg-neutral-800/60 text-slate-300 text-sm font-medium">
                                    <span>{s.icon}</span> {s.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PRODUCTS ── */}
                <section className="px-6 py-24 bg-neutral-800/40">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-14 text-center">
                            <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-3">Our Products</p>
                            <h2 className="text-4xl md:text-5xl font-extrabold">Engineered for Every Demand</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p) => (
                                <a
                                    key={p.slug}
                                    href={`https://www.incocil.com/en/produtos/${p.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-2xl border border-slate-700 bg-neutral-800 overflow-hidden hover:border-green-500/50 transition-all flex flex-col"
                                >
                                    <div className="relative h-44 overflow-hidden bg-neutral-700">
                                        {/*
                                         * PERF FIX: quality={60} reduces transfer size by ~45%
                                         * (37 KiB savings flagged by Lighthouse on master_slave1.jpeg).
                                         * These are below-fold product thumbnails — quality 60 is
                                         * visually indistinguishable at 33vw render size.
                                         */}
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            quality={60}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-base font-bold mb-1 group-hover:text-green-400 transition-colors">{p.name}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{p.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {p.specs.map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="text-[10px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DIFFERENTIALS ── */}
                <section className="px-6 py-24 max-w-6xl mx-auto">
                    <div className="mb-14 text-center">
                        <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-3">Why INCOCIL</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold">Precision at Every Step</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {differentials.map((d) => (
                            <div key={d.title} className="flex gap-5 rounded-2xl border border-slate-700 bg-neutral-700/30 p-6">
                                <div className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-green-500" />
                                <div>
                                    <h3 className="font-bold text-lg mb-2">{d.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{d.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CERTIFICATIONS ── */}
                <section className="px-6 py-20 bg-neutral-800/40">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12 text-center">
                            <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-3">Standards & Quality</p>
                            <h2 className="text-3xl md:text-4xl font-extrabold">Built to Global Standards</h2>
                            <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                                Every cylinder leaving our factory is pressure-tested and documented. We manufacture
                                to international norms so your procurement team can approve with confidence.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {certifications.map((c) => (
                                <div
                                    key={c.label}
                                    className="flex flex-col items-center text-center p-4 rounded-2xl border border-slate-700 bg-neutral-800/60 gap-2"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                        <span className="text-green-400 text-xs font-black leading-tight text-center">{c.label.split(" ")[0]}</span>
                                    </div>
                                    <p className="text-white text-xs font-bold">{c.label}</p>
                                    <p className="text-slate-500 text-[10px] leading-tight">{c.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 py-6 border-t border-slate-700/50">
                            <p className="text-slate-400 text-sm">Official exhibitor at</p>
                            <Image
                                src="/images/hannover-messe-2026.png"
                                alt="Hannover Messe 2026"
                                width={140}
                                height={48}
                                className="brightness-100"
                            />
                            <span className="text-slate-600 hidden sm:block">·</span>
                            <p className="text-slate-400 text-sm font-semibold">{STAND_INFO} · April 22–25, 2026</p>
                        </div>
                    </div>
                </section>

                {/* ── SCHEDULE A MEETING ── */}
                <section className="px-6 py-24 bg-neutral-900">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-4">Schedule a Meeting</p>
                            <h2 className="text-4xl font-extrabold mb-4">Visit Us at {STAND_INFO}</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Save time at the fair. Fill in the form below and we&apos;ll arrange a dedicated slot
                                to discuss your hydraulic cylinder requirements with our technical team.
                            </p>
                        </div>

                        <div className="bg-neutral-800 rounded-3xl border border-slate-700 p-8">
                            <HannoverLeadForm />
                        </div>

                        <p className="text-center text-slate-600 text-sm mt-6">
                            Prefer to go straight to WhatsApp?{" "}
                            <a
                                href={schedulingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-400 underline underline-offset-2 transition-colors"
                            >
                                Click here
                            </a>
                        </p>
                        <p className="mt-4 text-slate-500 text-sm text-center">April 22–25, 2026 · Hanover, Germany</p>
                    </div>
                </section>

                {/* ── CTA FINAL ── */}
                <section className="px-6 py-24">
                    <div className="max-w-3xl mx-auto text-center rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-800/20 to-slate-900 p-12">
                        <h2 className="text-4xl font-extrabold mb-4">Let&apos;s Work Together</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Talk to our team directly. We&apos;ll help you find the right cylinder solution for your application.
                        </p>
                        <FinalCtaButtons whatsappUrl={whatsappUrl} />
                        <p className="mt-6 text-slate-500 text-sm">
                            Av. Ricardo Leonidas Ribas, 310 — Porto Alegre, RS, Brazil · +55 51 98446-8231
                        </p>
                    </div>
                </section>

                <footer className="border-t border-slate-800 px-6 py-8 pb-24 md:pb-8 text-center text-slate-500 text-sm">
                    2026 INCOCIL. All rights reserved. ·{" "}
                    <a href="https://www.incocil.com/en" className="hover:text-slate-300 transition-colors">
                        www.incocil.com
                    </a>
                </footer>
            </main>
        </>
    );
}