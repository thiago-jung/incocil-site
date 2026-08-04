"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function notifySlack(data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
    produto: string;
}) {
    const webhookUrl = process.env.SLACK_LEADS_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                blocks: [
                    {
                        type: "header",
                        text: { type: "plain_text", text: "🔥 Novo Lead do Site", emoji: true },
                    },
                    {
                        type: "section",
                        fields: [
                            { type: "mrkdwn", text: `*Nome:*\n${data.nome}` },
                            { type: "mrkdwn", text: `*E-mail:*\n${data.email}` },
                            { type: "mrkdwn", text: `*Telefone:*\n${data.telefone}` },
                            { type: "mrkdwn", text: `*Interesse:*\n${data.produto}` },
                        ],
                    },
                    {
                        type: "section",
                        text: { type: "mrkdwn", text: `*Mensagem:*\n${data.mensagem}` },
                    },
                ],
            }),
        });
    } catch (error) {
        console.error("Erro ao notificar Slack:", error);
    }
}

export async function sendEmailAction(data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
    produto: string;
}) {
    try {
        await resend.emails.send({
            from: "Site INCOCIL <contato-site@incocil.com>", // ← use seu domínio verificado no Resend
            to: process.env.RECEIVER_EMAIL!,
            ...(isValidEmail(data.email) && { replyTo: data.email }),
            subject: `🔥 Novo Lead do Site: ${data.nome}`,
            text: `
Você recebeu um novo contato através do site!

DADOS DO CLIENTE:
Nome: ${data.nome}
E-mail: ${data.email}
Telefone/WhatsApp: ${data.telefone}

INTERESSE:
${data.produto}

MENSAGEM/NECESSIDADE:
${data.mensagem}

Lembrete: O cliente foi redirecionado para o WhatsApp, mas caso ele não tenha enviado a mensagem, você pode usar os dados acima para contatá-lo.
            `.trim(),
        });

        await notifySlack(data);

        return { success: true };
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        await notifySlack(data);
        return { success: false, error: "Falha ao enviar o e-mail." };
    }
}
