# MarketingHub — All-in-One Marketing Tools

Platform web app untuk marketing professional, dibangun dengan **Next.js 16 + TypeScript + Tailwind CSS**.

## Features

### 1. Content & Copywriting AI
- **AI Copywriting Generator** — Generate marketing copy for Instagram, Twitter, LinkedIn, Email, Ads, Product Descriptions, Blog Outlines
- **SEO Content Optimizer** — Analyze content for SEO score, keyword density, readability, and get improvement suggestions
- **Content Ideation** — Generate content pillars, ideas, and 4-week content calendar

### 2. Analytics & Reporting
- **Dashboard** — KPI cards with interactive charts (Recharts)
- **UTM Builder** — Create UTM-tagged URLs with presets for common campaigns
- **ROI Calculator** — Calculate ROI%, Cost Per Lead, ROAS, and Profit Margin
- **Reports** — Generate and view performance reports

### 3. Social Media Management
- **Content Calendar** — Monthly view with scheduled posts
- **Post Scheduler** — Create and schedule posts with best time suggestions
- **Hashtag Research** — Find hashtags by keyword with popularity indicators

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Dark Mode | next-themes |
| Date Handling | date-fns |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Dashboard
│   ├── (marketing)/
│   │   ├── content/            # Content & AI module
│   │   ├── analytics/          # Analytics module
│   │   └── social/             # Social media module
│   └── api/                    # API routes
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── layout/                 # Layout components
├── lib/                        # Utilities
└── types/                      # TypeScript types
```

## AI Integration

The copywriting generator currently uses mock data. To enable real AI generation:

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add it to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Update the API route in `src/app/api/ai/route.ts`

## License

MIT
