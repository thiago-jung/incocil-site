'use client'

const whatsappUrl =
    'https://wa.me/555132612205?text=Hello!%20I%20met%20INCOCIL%20at%20Hannover%20Messe%202026%20and%20would%20like%20more%20information.'

declare const window: Window & { gtag?: (...args: unknown[]) => void }

export default function CtaButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    console.log('click fired', typeof window.gtag)
                    window.gtag?.('event', 'whatsapp_click', { page: 'hannover-messe-2026' })
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-4 text-base font-bold text-white hover:bg-green-400 transition-colors"
            >
                💬 Contact via WhatsApp
            </a>
            <a
                href="mailto:incocil@incocil.com.br"
                onClick={() => window.gtag?.('event', 'email_click', { page: 'hannover-messe-2026' })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-600 px-8 py-4 text-base font-semibold text-neutral-200 hover:border-neutral-400 hover:text-white transition-colors"
            >
                ✉️ Send an Email
            </a>
        </div>
    )
}