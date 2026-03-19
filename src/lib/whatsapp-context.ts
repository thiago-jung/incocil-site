"use client";

/**
 * setWhatsAppContext — define o produto atual para o botão flutuante
 *
 * Como funciona:
 *   1. Chamado em ProductViewTracker.tsx ao montar a página de produto
 *   2. Dispara um CustomEvent que o WhatsAppButton.tsx escuta
 *   3. O botão flutuante passa a enviar uma mensagem pré-preenchida
 *      com o nome do produto, em vez da mensagem genérica
 *
 * Zero dependências externas — usa a API nativa do browser.
 */
export function setWhatsAppContext(productName: string) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
        new CustomEvent("whatsapp:context", {
            detail: { productName },
        })
    );
}

/** Limpa o contexto ao sair da página de produto */
export function clearWhatsAppContext() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("whatsapp:context", { detail: { productName: "" } }));
}