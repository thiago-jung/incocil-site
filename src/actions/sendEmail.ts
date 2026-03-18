"use server";
import nodemailer from "nodemailer";

export async function sendEmailAction(data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem: string;
    produto: string;
}) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: false, // true para 465, false para outras portas como 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                // Não falha se o certificado do localhost for inválido
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER, // Remetente (seu próprio email autenticado)
            to: process.env.RECEIVER_EMAIL, // Para quem vai (você)
            replyTo: data.email, // Se você clicar em responder, vai para o cliente
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
            `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return { success: false, error: "Falha ao enviar o e-mail." };
    }
}
