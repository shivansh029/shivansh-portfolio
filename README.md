# Shivansh Verma — Personal Portfolio

> A living record of my journey as a software engineer — built in public, one commit at a time.

---

## 👋 About

I’m Shivansh Verma, a Software Engineer who enjoys building scalable backend systems, clean APIs, and reliable services. This is the source code for my personal portfolio — a curated reflection of the problems I've solved, the projects I've shipped, and the technologies I've explored.

---

## ✨ Features

- **Interactive Terminal** — A custom built CLI experience to explore my profile
- **API Driven** — Content is served via dynamic API endpoints for modularity
- **Shortlink System** — Custom redirection engine at `/link/[slug]` backed by Airtable

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| UI | [React](https://react.dev/) |
| Styling | Vanilla CSS + TokyoNight Palette |
| Deployment | [Vercel](https://vercel.com/) |

---

##  Project Structure

```
.
├── app/               # Next.js App Router (Pages, Layouts, APIs)
├── components/        # Terminal, Input, Output components
├── public/            # Static assets (Resume, Images)
├── utils/             # commandHelper for terminal logic
└── link/              # Custom redirection logic
```

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- pnpm (`npm i -g pnpm`)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Airtable credentials

### Local Development
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ☁️ Deployment

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add the following **Environment Variables** in the Vercel project settings:
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_ID`
   - `AIRTABLE_TOKEN`
4. Deploy!

---

## 📬 Contact

Reach out via the terminal's `contact` command or find me on LinkedIn.
