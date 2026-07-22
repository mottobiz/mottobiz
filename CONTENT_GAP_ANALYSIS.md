# Content Gap Analysis for AI Citation

Based on AI SEO citation data (comparisons ~33%, guides ~15%, data ~12%, lists ~10%, products ~10%, how-to ~8%, opinion ~10%).

## Current Content Mix

| Type | Count | Citation Share Potential | Status |
|------|-------|------------------------|--------|
| Industry guides | 47 | 10% (product/service pages) | ✅ Strong |
| Location guides | 27 | 10% (local service pages) | ✅ Strong |
| How-to guides | 15 | 8% | ✅ Good |
| Comparisons | 7 | 33% | ⚠️ Underserved (only 7 vs ~33% of citations) |
| Case studies | 1 | 10% (original data) | ❌ Gap |
| Listicles ("Best of") | 0 | 10% | ❌ Gap |
| Original research | 0 | 12% | ❌ Gap |
| Thought leadership | 0 | 10% | ❌ Gap |

## Gaps to Fill (Priority Order)

### 🔴 P1: Expand Comparisons (7 → 15+)
Comparisons get ~33% of AI citations. Current comparisons:
- n8n vs Make
- WhatsApp Business API vs Automation Tools
- Free vs Paid Automation
- Pabbly Connect vs Zapier
- Zapier vs Make vs n8n Pricing

**Suggested additions:**
- "ChatGPT vs Google AI Overviews vs Perplexity: Which AI Search is Best for Business?"
- "WhatsApp Business API vs WhatsApp Cloud API vs Automation Tools"
- "Tally vs Zoho Books vs QuickBooks for Indian Small Businesses"
- "Shopify vs WooCommerce vs Custom Website for Indian E-commerce"
- "AI Agent vs Virtual Assistant vs Employee: Cost Comparison for Indian SMBs"
- "Instagram Automation vs Facebook Automation vs LinkedIn Automation"

### 🔴 P1: Add Original Research (0 → 3+)
Original data gets ~12% of citations and is the most shareable content.

**Suggested studies:**
1. **"Surat WhatsApp Business Survey 2026"** — Survey 100+ Surat businesses via WhatsApp
   - Questions: How many WhatsApp messages/day? Response time? Lost deals? Tools used?
   - Format: Blog post + downloadable PDF (Perplexity cites PDFs!)
   - GEO boost: Original data + external citations + PDF = maximum visibility

2. **"Cost of Manual Operations for Surat Textile Traders"** — Time study
   - Track time spent on: inquiries, quotes, follow-ups, inventory checks
   - Publish as infographic + blog post

3. **"AI Adoption in Gujarat SMBs 2026"** — Survey results
   - % using automation, tools used, ROI reported, barriers
   - Publish as PDF whitepaper

### 🟡 P2: Add Listicles (0 → 5+)
Listicles get ~10% of citations.

**Suggested:**
- "Top 10 Automation Tools for Small Businesses in India"
- "5 Best WhatsApp Business Automation Tools for Surat Traders"
- "7 Automation Workflows Every Surat Shop Needs"
- "Top 5 CRMs for Indian Small Businesses (Compared)"
- "8 Ways to Automate Your Textile Business in 2026"

### 🟡 P2: Add Author Attribution (0 → All)
Every article needs a named author for E-E-A-T:
- Add `author: { name, title, credentials }` to enrichment.ts
- Every article in the database has author info at the enrichment level
- Creates E-E-A-T signals that Google AI Overviews weights heavily

### 🟢 P3: Add Thought Leadership (0 → 3+)
Opinion/analysis pieces get ~10% of citations.

**Suggested:**
- "Why Surat Businesses Are Choosing AI Agents Over Employees"
- "The Future of Surat's Textile Market: AI-Enabled Trading"
- "Why Most Business Automation Fails (And How to Make It Work in Surat)"

## Implementation Priority

1. This week: Create 3 comparison articles (quick wins, high citation potential)
2. This week: Add author names to enrichment.ts for all 97 articles
3. Next week: Design and launch the Surat WhatsApp Business Survey 2026
4. Next week: Create 3 listicles
5. Month 2: Publish original research results as blog + PDF
6. Month 2: Write 2 thought leadership pieces
