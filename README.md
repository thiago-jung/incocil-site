# 🏗️ INCOCIL | Site Institucional 2026

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)

Plataforma industrial de alta performance desenvolvida para a **Incocil**, especialista em cilindros hidráulicos e pneumáticos em Porto Alegre/RS. Este projeto substitui o site legado por uma infraestrutura focada em **conversão via WhatsApp**, **autoridade visual** e **SEO dinâmico**.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Descrição |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Estilização** | Tailwind CSS v4 com sintaxe `@theme` |
| **Animações** | Framer Motion para transições fluidas |
| **Ícones** | Lucide React |
| **Linguagem** | TypeScript com tipagem rigorosa de Dynamic APIs |
| **Analytics** | Vercel Analytics & Speed Insights integrados |

---

## 📂 Arquitetura do Projeto

A estrutura foi desenhada para separação clara de preocupações e escalabilidade:

* `src/app/`: Rotas, layouts, metadados globais e estilos base.
* `src/components/`: Componentes modulares de UI (BentoFeatures, Stats, Navbar).
* `src/constants/`: Ficheiros de dados que alimentam o catálogo e o blog.
* `public/images/`: Assets estáticos e fotografias reais da fábrica.

---

## 🚀 Funcionalidades Principais

### 1. Sistema de Rotas Dinâmicas
Páginas de produtos e blog utilizam `generateStaticParams`. Devido às atualizações do Next.js 16, os parâmetros (`params`) são tratados como **Promises** e resolvidos com `await`.

### 2. Conversão via WhatsApp (B2B)
O `ProductForm` captura leads e gera links dinâmicos para o número `555132612205`, injetando o contexto do produto e as necessidades do cliente diretamente na mensagem do chat.

### 3. Hub de Conteúdo (Blog & YouTube)
Suporte híbrido para artigos técnicos e vídeos. Conteúdos de vídeo utilizam um `VideoModal` com `backdrop-blur` para manter a retenção do utilizador na plataforma.

### 4. SEO Técnico Industrial
* **Sitemap Dinâmico**: Ficheiro `sitemap.ts` que mapeia automaticamente novas entradas de blog e produtos.
* **OpenGraph**: Configuração completa no `layout.tsx` para pré-visualizações ricas em redes sociais.

---

## 🎨 Design System (Identidade Visual)

As definições de estilo residem no `src/app/globals.css`:

* 🟦 **Industrial Blue**: `#1E40AF` (Azul Royal Oficial).
* 🌑 **Industrial Dark**: `#0F172A` (Contraste Metálico).
* 🟨 **Industrial Accent**: `#FACC15` (Ação/Destaque).
* 🔤 **Tipografia**: Montserrat (Títulos/Display) e Inter (Corpo/Sans).

---

## ⚙️ Guia de Manutenção

Este projeto é "Data-Driven". Podes atualizar o conteúdo sem tocar no código:

* **Novos Produtos**: Adicionar entrada no array em `src/constants/content.ts`.
* **Novo Post/Vídeo**: Adicionar entrada em `src/constants/blog-data.ts`.
    * Para vídeos: Definir `type: "video"` e incluir o `youtubeId`.
    * Para artigos: Definir `type: "article"` e o `slug`.

---

## 💻 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em ambiente de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
