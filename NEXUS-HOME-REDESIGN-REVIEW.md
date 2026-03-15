# Nexus Home Redesign Review
## AI-Powered Command Center for Cannabis Retail

**Date:** March 15, 2026
**Agent Squad:** Architecture + UI/UX + Data + Agentic Systems
**Scope:** Complete reimagining of the NexusHome page as a powerful, agentic command center

---

## Executive Summary

The current NexusHome is a solid dashboard with 14+ tiles, but it's fundamentally a **passive display** — static cards showing pre-rendered metrics. The user scrolls through tiles reading numbers. The AI agent (CustomerBridge with 11 intent lanes) is buried behind a FAB button overlay.

**The vision:** Transform the home page from a metrics dashboard into an **intelligent command center** where AI is the primary interface, data is alive, and every element is actionable. Retailers should feel like they have a co-pilot managing their operation, not a spreadsheet summarizing it.

---

## Part 1: What to Keep, What to Kill, What to Transform

### KEEP (High Value, Already Strong)
| Component | Why | Lines |
|-----------|-----|-------|
| SalesReportingTile | Rich — period tabs, chart metrics toggle, category bars, top stores. 531 lines of depth. | 1672-2203 |
| SentimentTile | Multi-source sentiment with NPS, themes, AI summaries. 222 lines. | 769-991 |
| OmnichannelTile | SMS/Ecomm/Voice/QR channel collection. Unique and powerful. 319 lines. | 992-1311 |
| Morning Briefing | Compact KPI strip. Clean and useful. | 2277-2309 |
| NexusLauncher | Action pills + input bar. Good concept, needs enhancement. | 2225-2271 |

### KILL (Low Value, Static, or Redundant)
| Component | Why |
|-----------|-----|
| AccountHealthTile | Static gauge, no actionability |
| IntegrationStatusTile | Static list of green dots — not useful daily |
| FeatureAdoptionTile | Internal metric, not retailer-facing value |
| PeerBenchmarkTile | Static comparisons, no interaction |
| LockedTile x6 | "Coming in Phase 3" placeholders — dead weight |
| AgentBar | Redundant with launcher + sidebar navigation |

### TRANSFORM (Partially Good, Needs Reimagining)
| Component | Current | Proposed |
|-----------|---------|----------|
| SalesTodayTile | 4 static KPI cards | → **Live Pulse Strip** with real-time counters + sparklines |
| InventoryTile | Basic stockout list | → **Smart Alerts Feed** with AI recommendations + one-click actions |
| PricingTile | Scatter plot only | → **Pricing Radar** with competitive heat and auto-reprice suggestions |
| LoyaltyTile | 3 static numbers | → Merge into Morning Briefing or Pulse Strip |
| BrandTile | Basic bar list | → Merge into Sales Reporting or kill |
| VoiceAITile | 3 static metrics | → Merge into Omnichannel or kill |
| UnifiedPipelineTile | Pipeline funnel | → **Live Activity Ticker** showing real-time events |

---

## Part 2: New Components & Features

### 2.1 — THE NEXUS COMMAND BAR (Replaces NexusLauncher)

**Concept:** A prominent, always-visible command interface at the top of the page. Not just pills — it's the **primary input** for the entire application.

**Design:**
```
┌─────────────────────────────────────────────────────────────────┐
│  🌀 Nexus AI                                    11 lanes active │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🔍  What would you like to do?                    ⌘K   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Quick actions:                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ 📦 Reorder│ │ 📢 Launch │ │ 💰 Reprice│ │ 📊 Report │         │
│  │ Inventory │ │ Campaign │ │  Menu    │ │  Weekly  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│                                                                 │
│  Recent:  "Show me stockout report" • "Reprice Blue Dream"     │
└─────────────────────────────────────────────────────────────────┘
```

**New features over current launcher:**
- **Command history** — shows your last 3 queries as clickable chips
- **Contextual suggestions** — pills change based on time of day, day of week, and current alerts
  - Monday morning → "Weekly performance summary"
  - Alert active → "3 stockouts detected — Reorder now"
  - End of month → "Monthly P&L report"
- **Keyboard shortcut** — Cmd+K focuses the input from anywhere
- **Voice input indicator** — mic icon with "Speak to Nexus" tooltip
- **Active lane indicator** — "11 agent lanes active" with green pulse dot

### 2.2 — LIVE PULSE STRIP (Replaces Morning Briefing + SalesTodayTile)

**Concept:** A horizontal strip of live-updating KPI counters inspired by a stock ticker. Numbers count up in real-time. Each metric is clickable to drill down.

**Design:**
```
┌──────────────────────────────────────────────────────────────────┐
│ ▸ TODAY                                          ● Live  2:34 PM│
│                                                                  │
│  Revenue        Transactions    Avg Basket    Margin    Stockouts│
│  $47,230 ↑12%   312 ↑8%        $151.38 ↑3%   51.2%    3 ⚠     │
│  ━━━━━━━━░░     ━━━━━━░░░░     ━━━━━━━░░░    ━━━━━━   ━━░░░░░░│
│  [mini sparkline for each metric]                                │
│                                                                  │
│  🏆 Top: Ascend Springfield IL $8.2K  │  📉 Watch: Ascend       │
│     Detroit MI — basket down 15%                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Key innovations:**
- **Counting animation** — Numbers animate up from 0 on page load (like a scoreboard)
- **Mini sparklines** — Tiny inline area charts under each metric (last 7 hours)
- **Progress bars** — Show progress toward daily/weekly targets
- **Anomaly callouts** — Bottom row highlights best performer and any store needing attention
- **Live dot** — Pulsing green indicator with timestamp, refreshes every 60s
- Clicking any metric opens the full Sales Reporting view with that metric focused

### 2.3 — SMART ALERTS & ACTIONS FEED (Replaces InventoryTile)

**Concept:** A vertical feed of AI-prioritized alerts, each with context and one-click resolution. Think "notifications" but intelligent.

**Design:**
```
┌──────────────────────────────────────────────────┐
│  🔔 Smart Alerts                         7 new   │
│─────────────────────────────────────────────────│
│  🔴 CRITICAL — 2m ago                           │
│  Blue Dream 3.5g out of stock at 4 stores       │
│  AI: "Vendor has stock. Reorder 200 units for   │
│  $2,840. Est. delivery: 2 days."                │
│  [Approve Reorder]  [Modify]  [Dismiss]         │
│─────────────────────────────────────────────────│
│  🟡 WARNING — 15m ago                           │
│  Stiiizy Pod LLR priced 18% above market avg    │
│  AI: "Competitors at $42 avg. Suggest $44.99    │
│  (currently $52). Projected +23% velocity."     │
│  [Apply Price]  [View Competitors]              │
│─────────────────────────────────────────────────│
│  🟢 OPPORTUNITY — 1h ago                        │
│  Sentiment spike for "Jeeter" brand (+34% WoW)  │
│  AI: "Trending on social. 2 stores don't stock  │
│  it yet. Contact vendor for initial order?"     │
│  [Draft PO]  [View Sentiment]                   │
│─────────────────────────────────────────────────│
│  💡 INSIGHT — 3h ago                            │
│  Tuesday traffic pattern: 62% of sales after    │
│  4pm. Consider shifting staff coverage.         │
│  [View Staffing]  [Acknowledge]                 │
│─────────────────────────────────────────────────│
│  ──── Earlier Today ────                        │
│  ✅ Auto-resolved: Springfield IL register sync │
│  ✅ Campaign "March Madness" launched (3 stores)│
└──────────────────────────────────────────────────┘
```

**Key innovations:**
- **Severity tiers** — Critical (red), Warning (amber), Opportunity (green), Insight (blue)
- **AI recommendations** — Each alert has a suggested action with projected impact
- **One-click resolution** — Primary CTA executes the AI recommendation immediately
- **Auto-resolved section** — Shows things Nexus handled automatically (builds trust)
- **Time-grouped** — "Just now", "Earlier today", "Yesterday"
- **Clicking any alert** can optionally open NexusChat for deeper conversation about it

### 2.4 — LIVE ACTIVITY TICKER (Replaces UnifiedPipelineTile)

**Concept:** Inspired by dutchie-connect's LiveFeed — a continuously scrolling horizontal ticker showing real-time store events.

**Design:**
```
┌──────────────────────────────────────────────────────────────────┐
│ ● Live Feed                                                      │
│ ←←← [💰 $156 sale Springfield IL 2m] [📦 PO #4421 received     │
│      Hoboken NJ 5m] [⭐ 5-star Google review Detroit MI 8m]     │
│      [📱 SMS opt-in x12 Chicago IL 11m] [🎯 Campaign click     │
│      x47 "Spring Sale" 15m] ←←←                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Key innovations:**
- **Infinite scroll** — duplicated array technique, 90s cycle
- **Event categories** — Sales (green), Inventory (blue), Reviews (gold), Marketing (purple), Alerts (red)
- **Clickable pills** — Clicking a pill opens relevant detail view
- **Pulsing live dot** — confirms real-time data flow
- **Filterable** — click category filters to show only sales, only reviews, etc.

### 2.5 — STORE HEALTH MATRIX (New — Replaces Static Tiles)

**Concept:** A grid of all stores with composite health scores shown as conic gradient donuts. Sortable and filterable. The "fleet management" view.

**Design:**
```
┌──────────────────────────────────────────────────────────────────┐
│  🏪 Store Health Matrix                    Sort: Score ▼  │ All │
│──────────────────────────────────────────────────────────────────│
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │   (92)      │ │   (87)      │ │   (74)      │               │
│  │ Springfield │ │  Hoboken    │ │  Chicago    │  ...          │
│  │  IL ● $8.2K │ │  NJ ● $6.1K│ │  IL ● $5.8K│               │
│  │ ↑12% today  │ │ ↑5% today  │ │ ↓3% today  │               │
│  │ [2 alerts]  │ │ [0 alerts] │ │ [1 alert]  │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                  │
│  Legend: (score) = conic gradient donut                          │
│  🟢 ≥75 Healthy  🟡 ≥55 Watch  🔴 ≥35 At Risk  ⚫ <35 Critical│
└──────────────────────────────────────────────────────────────────┘
```

**Key innovations:**
- **Conic gradient health donuts** — inspired by dutchie-connect pattern
- **Composite scoring** — Revenue + Sentiment + Stockouts + Compliance + Marketing
- **Click to drill** — Opens full store detail view
- **Color-coded status** — Instantly see which stores need attention
- **Compact mode** — Can collapse to just show scores in a single row

### 2.6 — AGENT THINKING STEPS (Enhancement to NexusChat)

**Concept:** When a user sends a query via the Command Bar, show contextual thinking steps before the response arrives. Borrowed directly from dutchie-connect's `AgentThinking` component.

**Implementation:** Match query keywords to show relevant data-fetching steps:
- "inventory" → "Pulling SKU velocity data" → "Checking vendor availability" → "Calculating reorder quantities"
- "campaign" → "Analyzing audience segments" → "Checking budget allocation" → "Drafting creative"
- "pricing" → "Fetching competitor prices" → "Running elasticity model" → "Generating recommendations"

Each step shows as a pill with:
- ✅ Completed steps (faded, checkmark)
- 🔄 Current step (green border, spinning indicator, elapsed timer)
- Smooth animation transitions between steps (1.4s interval)

### 2.7 — CONTEXTUAL MORNING BRIEFING (Enhanced)

**Concept:** The morning briefing becomes AI-generated and contextual, not just 4 static numbers.

**Design:**
```
┌──────────────────────────────────────────────────────────────────┐
│  Good morning, Tim.                          Thu Mar 15 • 9:42 AM│
│                                                                  │
│  "Yesterday was your best Tuesday this quarter. Springfield IL   │
│   drove 34% of revenue. 3 items need reordering, and your       │
│   Google rating improved to 4.6 stars across all stores.         │
│   I've already drafted a reorder PO for your review."           │
│                                                                  │
│  $47.2K rev │ 312 txns │ 4.6★ avg │ 3 alerts │ All systems ● │
└──────────────────────────────────────────────────────────────────┘
```

**Key innovations:**
- **AI-generated narrative** — Not just numbers, but a paragraph explaining what matters
- **Comparative context** — "Best Tuesday this quarter" (compares to same day-of-week)
- **Proactive actions** — "I've already drafted a PO for your review"
- **Compact KPI row** — Still shows key metrics, but the story comes first

---

## Part 3: New Page Layout (Top to Bottom)

```
┌──────────────────────────────────────────────────────────────────┐
│                    CONTEXTUAL MORNING BRIEFING                   │
│              AI-generated narrative + compact KPI strip           │
├──────────────────────────────────────────────────────────────────┤
│                       LIVE ACTIVITY TICKER                       │
│              Scrolling feed of real-time store events             │
├──────────────────────────────────────────────────────────────────┤
│                       NEXUS COMMAND BAR                          │
│         Search input + action pills + command history             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   LIVE PULSE STRIP              │    SMART ALERTS FEED           │
│   5 KPI counters + sparklines   │    AI-prioritized alerts       │
│   with target progress bars     │    with one-click resolution   │
│                                 │                                │
│   (40% width)                   │    (60% width)                 │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                     STORE HEALTH MATRIX                          │
│        Grid of store cards with conic gradient health donuts      │
│             Sortable, filterable, clickable                       │
├──────────────────────────────────────────────────────────────────┤
│                     SALES REPORTING                              │
│        Full sales dashboard (keep existing SalesReportingTile)    │
├──────────────────────────────────────────────────────────────────┤
│              SENTIMENT          │      OMNICHANNEL               │
│           AI summaries          │    Collection channels          │
│           NPS trends            │    SMS/Ecomm/Voice/QR          │
│                                 │                                │
│           (50% width)           │    (50% width)                 │
├──────────────────────────────────────────────────────────────────┤
│                        PRICING RADAR                             │
│     Competitive heat map + auto-reprice suggestions               │
└──────────────────────────────────────────────────────────────────┘
```

**Key layout principles:**
1. **AI-first** — Briefing + Command Bar are the first things you see
2. **Live data** — Ticker + Pulse Strip give a sense of real-time operation
3. **Action-oriented** — Smart Alerts are above static reporting
4. **Progressive disclosure** — Most important content at top, detail below
5. **No dead tiles** — Every component is interactive and actionable

---

## Part 4: Agentic Features (Beyond UI)

### 4.1 — Auto-Resolved Actions Log
Show things Nexus has already handled automatically:
- "Auto-reordered Blue Dream 3.5g (200 units) — vendor confirmed"
- "Adjusted Springfield IL hours for daylight savings"
- "Published weekly email digest to 2,400 loyalty members"

This builds trust and shows the AI is working even when the user isn't looking.

### 4.2 — Predictive Alerts
Nexus proactively warns about future issues:
- "Based on current velocity, Stiiizy Pods will stock out at Hoboken NJ by Thursday"
- "March Madness weekend: expect 22% traffic increase. Recommend pre-stocking top 10 SKUs"
- "Competitor 'The Botanist' dropped flower prices by avg 8% — monitor impact on your traffic"

### 4.3 — Multi-Step Agent Workflows
When a user clicks "Approve Reorder" in the Smart Alerts feed:
1. Show thinking steps: "Validating vendor availability" → "Checking budget" → "Generating PO"
2. Present a pre-filled form (editable) with the order details
3. On confirm, show success with tracking info
4. Log in Auto-Resolved Actions

### 4.4 — Natural Language Everywhere
Every tile header has a small chat icon. Clicking it sends a contextual query:
- Clicking chat on Sales Reporting → "Tell me about today's sales performance"
- Clicking chat on Sentiment → "Summarize customer sentiment this week"
- Clicking chat on Store Health → "Which stores need my attention?"

---

## Part 5: Design System Enhancements

### Animation Budget
- **Page load:** Stagger all sections with 100ms delay between groups
- **Counters:** Count-up animation over 1.2s with ease-out
- **Charts:** Draw-in animation over 0.8s
- **Cards:** Fade-up with spring (stiffness: 300, damping: 25)
- **Ticker:** 90s infinite scroll
- **Alerts:** Slide-in from right with 0.3s ease

### Color Enhancements
| Token | Current | Proposed |
|-------|---------|----------|
| Critical alert bg | — | `rgba(248,81,73,0.08)` |
| Warning alert bg | — | `rgba(210,153,34,0.08)` |
| Opportunity alert bg | — | `rgba(0,194,124,0.08)` |
| Insight alert bg | — | `rgba(100,168,224,0.08)` |
| Live indicator | — | Pulsing `#00C27C` with `animate-ping` |

### Typography
- Morning briefing narrative: 15px, line-height 1.65, italic
- KPI big numbers: 28px, font-weight 800, tabular-nums
- Alert AI recommendations: 12px, italic, slightly muted
- Ticker pills: 12px, font-weight 500

---

## Part 6: Implementation Priority

### Phase A — Core Restructure (Highest Impact)
1. **Nexus Command Bar** — Replace NexusLauncher, add history + contextual pills
2. **Live Pulse Strip** — Replace Morning Briefing + SalesTodayTile with animated KPIs
3. **Smart Alerts Feed** — New component, highest agentic value
4. **Remove dead tiles** — Kill 6 locked tiles, 4 static tiles

### Phase B — Live & Immersive
5. **Live Activity Ticker** — Real-time scrolling feed
6. **Store Health Matrix** — Conic gradient health cards
7. **Enhanced Morning Briefing** — AI-generated narrative

### Phase C — Deep Agentic
8. **Agent Thinking Steps** — Add to NexusChat overlay
9. **Auto-Resolved Actions Log** — Trust-building section
10. **Natural Language Everywhere** — Chat icons on all tiles
11. **Multi-Step Workflows** — Interactive alert resolution

---

## Summary: Before vs After

| Aspect | Current | Proposed |
|--------|---------|----------|
| Primary interface | Scrolling tile dashboard | AI command center |
| Data freshness | Static mock data | Simulated real-time with animations |
| Actionability | View only | One-click resolutions, inline forms |
| AI presence | Hidden behind FAB | Front and center, proactive alerts |
| Store management | No fleet view | Health matrix with composite scores |
| Alerts | None | Prioritized feed with AI recommendations |
| Real-time feel | None | Live ticker + pulse strip + counting numbers |
| Dead content | 10 low-value tiles | Zero — everything earns its place |
| Personality | Corporate dashboard | Intelligent co-pilot |

The goal: when a cannabis retailer opens Nexus, they should feel like they have a **brilliant operations manager** who already knows what needs attention, has recommendations ready, and can execute on their behalf with one click.
