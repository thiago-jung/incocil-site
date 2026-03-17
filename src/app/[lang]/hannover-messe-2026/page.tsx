import type { Metadata } from 'next'
import Image from 'next/image'
import CtaButtons from './CtaButtons'

export const metadata: Metadata = {
    title: 'INCOCIL® | Hannover Messe 2026',
    description:
        'Custom hydraulic and pneumatic cylinders engineered for precision. Meet INCOCIL® at Hannover Messe 2026 — Hall 6, Stand C42.',
    openGraph: {
        title: 'INCOCIL® at Hannover Messe 2026',
        description: 'Built Under Pressure. Trusted Worldwide.',
        url: 'https://www.incocil.com/en/hannover-messe-2026',
        siteName: 'INCOCIL®',
    },
}

const products = [
    {
        slug: 'stainless-steel-hydraulic-cylinder',
        name: 'Stainless Steel Hydraulic Cylinders',
        description: 'Maximum durability and corrosion resistance for aggressive environments.',
        icon: '⚙️',
    },
    {
        slug: 'telescopic-hydraulic-cylinder',
        name: 'Telescopic Cylinders',
        description: 'Compact design for long-stroke applications in confined spaces.',
        icon: '🔩',
    },
    {
        slug: 'master-slave-cylinder',
        name: 'Master-Slave Systems',
        description: 'High-precision synchronized systems for uniform heavy-load movement.',
        icon: '🔧',
    },
    {
        slug: 'cushioned-hydraulic-cylinder',
        name: 'Cushioned Hydraulic Cylinders',
        description: 'Adjustable dampening for smooth operations and extended equipment life.',
        icon: '🛡️',
    },
    {
        slug: 'single-and-double-acting-cylinder',
        name: 'Single & Double Acting',
        description: 'Versatile and robust for diverse industrial and agricultural applications.',
        icon: '⚡',
    },
    {
        slug: 'custom-cylinders',
        name: 'Custom Cylinders',
        description: 'Special projects engineered for severe and highly specific applications.',
        icon: '🏗️',
    },
]

const differentials = [
    {
        title: 'High-Precision Honing',
        description: 'Unique capability to process diameters up to 500mm, ensuring perfect roughness and absolute sealing under extreme conditions.',
    },
    {
        title: 'Robotic Welding',
        description: 'Absolute precision and superior resistance in every weld bead, ensuring repeatability and structural integrity.',
    },
    {
        title: 'Custom Engineering',
        description: 'We develop special cylinders tailored to your specific application needs — from concept to delivery.',
    },
    {
        title: 'Extended Warranty',
        description: 'Full recovery maintenance with the same warranty as a new cylinder, minimizing downtime and operational costs.',
    },
]

export default function HannoverMesse2026() {
    const whatsappUrl =
        'https://wa.me/555132612205?text=Hello!%20I%20met%20INCOCIL%20at%20Hannover%20Messe%202026%20and%20would%20like%20more%20information.'

    return (
        <main className="bg-neutral-900 text-white font-sans">

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
                {/* Background grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            'linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Glow */}
                <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-700/15 blur-[120px]" />

                <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto">
                    {/* Event badge */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-green-500 uppercase">
                        Hannover Messe 2026
                    </span>

                    {/* Logo */}
                    <Image
                        src="/images/incocil.png"
                        alt="INCOCIL®"
                        width={220}
                        height={60}
                        className="brightness-0 invert"
                        priority
                    />

                    {/* Tagline */}
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        Built Under{' '}
                        <span className="text-green-500">Pressure.</span>
                        <br />
                        Trusted Worldwide.
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
                        INCOCIL® is a Brazilian specialist in custom hydraulic and pneumatic cylinders —
                        engineering precision solutions for agriculture, mining, forestry, road, and heavy industry sectors.
                    </p>

                    {/* CTAs */}
                    <CtaButtons />
                    {/*<div className="flex flex-col sm:flex-row gap-4 mt-2">*/}
                    {/*    <a*/}
                    {/*        href={whatsappUrl}*/}
                    {/*        target="_blank"*/}
                    {/*        rel="noopener noreferrer"*/}
                    {/*        className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-4 text-base font-bold text-slate-900 hover:bg-green-400 transition-colors"*/}
                    {/*    >*/}
                    {/*        💬 Contact via WhatsApp*/}
                    {/*    </a>*/}
                    {/*    <a*/}
                    {/*        href="mailto:incocil@incocil.com.br"*/}
                    {/*        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-8 py-4 text-base font-semibold text-slate-200 hover:border-slate-400 hover:text-white transition-colors"*/}
                    {/*    >*/}
                    {/*        ✉️ Send an Email*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>

                {/* Scroll hint */}
                {/*<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase">*/}
                {/*    <span>Scroll</span>*/}
                {/*    <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />*/}
                {/*</div>*/}
            </section>

            {/* ── ABOUT ── */}
            <section className="px-6 py-24 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-4">
                            About INCOCIL®
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Specialists in Custom Hydraulic Cylinders
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-4">
                            Located in Porto Alegre, Brazil, INCOCIL® has been supplying the most demanding industrial
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
                            { value: '45+', label: 'Years of Experience' },
                            { value: '4+', label: 'Countries Served' },
                            { value: '500mm', label: 'Max Honing Diameter' },
                            { value: '100%', label: 'In-house Manufacturing' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-slate-700 bg-neutral-700/40 p-6 flex flex-col gap-1"
                            >
                                <span className="text-3xl font-extrabold text-green-500">{stat.value}</span>
                                <span className="text-sm text-slate-400">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRODUCTS ── */}
            <section className="px-6 py-24 bg-neutral-800/40">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-14 text-center">
                        <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-3">
                            Our Products
                        </p>
                        <h2 className="text-4xl md:text-5xl font-extrabold">
                            Engineered for Every Demand
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <a
                                key={p.slug}
                                href={`https://www.incocil.com/en/produtos/${p.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl border border-slate-700 bg-neutral-700/40 p-6 hover:border-green-500/50 hover:bg-neutral-800 transition-all"
                            >
                                <span className="text-3xl mb-4 block">{p.icon}</span>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-green-500 transition-colors">
                                    {p.name}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DIFFERENTIALS ── */}
            <section className="px-6 py-24 max-w-6xl mx-auto">
                <div className="mb-14 text-center">
                    <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Why INCOCIL®
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold">
                        Precision at Every Step
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {differentials.map((d) => (
                        <div
                            key={d.title}
                            className="flex gap-5 rounded-2xl border border-slate-700 bg-neutral-700/30 p-6"
                        >
                            <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-green-500 mt-2" />
                            <div>
                                <h3 className="font-bold text-lg mb-2">{d.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{d.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 py-24">
                <div className="max-w-3xl mx-auto text-center rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-800/20 to-slate-900 p-12">
                    <h2 className="text-4xl font-extrabold mb-4">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Talk to our team directly. We&apos;ll help you find the right cylinder solution for your application.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-4 font-bold text-slate-900 hover:bg-green-400 transition-colors"
                        >
                            💬 WhatsApp
                        </a>
                        <a
                            href="mailto:incocil@incocil.com.br"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-8 py-4 font-semibold text-slate-200 hover:border-slate-400 transition-colors"
                        >
                            ✉️ incocil@incocil.com.br
                        </a>
                    </div>
                    <p className="mt-6 text-slate-500 text-sm">
                        Av. Ricardo Leônidas Ribas, 310 — Porto Alegre, RS, Brazil &nbsp;·&nbsp; +55 51 3261-2205
                    </p>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-slate-800 px-6 py-8 text-center text-slate-500 text-sm">
                © 2026 INCOCIL®. All rights reserved. &nbsp;·&nbsp;{' '}
                <a href="https://www.incocil.com/en" className="hover:text-slate-300 transition-colors">
                    www.incocil.com
                </a>
            </footer>
        </main>
    )
}