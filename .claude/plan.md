# Plan: Diversify Mobile Alerts + Add Reporting Tab

## Problem Analysis

### 1. Alerts Too Transfer-Heavy
The first 5 alerts (most visible) are ALL vault-to-floor transfers. While the list does include pricing, campaign, compliance, and insight alerts further down, the visual impression is "this is a transfer app." Need to reorder and add more variety at the top.

### 2. No At-a-Glance Reporting
The mobile app has Home, Alerts, Floor, Chat, Actions — but no reporting. The **Floor** tab is very niche (vault-to-floor transfers only) and duplicates what alerts already handle. We should **replace Floor with Reports** and keep transfer functionality accessible via alerts.

### 3. Generic Toast Messages
Several alert action handlers show vague toasts like "Compliance action started", "Details loaded", "Price adjustment applied". These should be specific to the alert content.

---

## Implementation Steps

### Step 1: Reorder INITIAL_ALERTS for better variety
Reorder the 15 alerts so the top ones are a mix of types, not 5 transfers in a row. New order (by severity, then variety):

1. `a01` — CRITICAL: Blue Dream out of stock (transfer)
2. `a06` — WARNING: Stiiizy Battery priced 14% below market (pricing)
3. `a08` — OPPORTUNITY: Win-Back campaign ready (campaign)
4. `a11` — INFO: 3 products expiring in 30 days (compliance)
5. `a14` — INSIGHT: Tuesday projected 920 customers, understaffed (staffing)
6. `a02` — CRITICAL: Kiva Lost Farm out 2 days (transfer)
7. `a07` — WARNING: Cookies Gary Payton 6% above market (pricing)
8. `a10` — OPPORTUNITY: BOGO Edibles — recommend kill (promo)
9. `a03` — CRITICAL: Wyld Elderberry out since yesterday (transfer)
10. `a12` — INFO: Daily inventory reconciliation due (compliance)
11. `a04` — WARNING: Stiiizy Live Resin low stock (transfer)
12. `a09` — OPPORTUNITY: Happy Hour driving 23% lift (campaign)
13. `a13` — INFO: Jeeter shipment arriving 2:30 PM (receive)
14. `a05` — WARNING: Jeeter Infused running low (transfer)
15. `a15` — INSIGHT: Jeeter sentiment surging +34% (insight)

Plus add 3 new non-transfer alerts to further diversify:
- **CRITICAL: Labor gap** — "Afternoon shift coverage gap: 2 budtenders called out, peak hours 4-7pm uncovered"
- **WARNING: Loyalty churn** — "Loyalty member visits down 18% this week vs prior 4-week avg. 23 VIPs haven't returned in 14+ days"
- **INFO: License renewal** — "IL cannabis license renewal due in 45 days. 3 documents need updating."

### Step 2: Replace Floor tab with Reports tab
Change bottom nav from `Floor` (ArrowRightLeft) to `Reports` (BarChart3).

Create a new `ScreenReports` component with at-a-glance KPIs:

**Section 1: Today's Snapshot** (4 KPI cards in 2x2 grid)
- Revenue today ($47.8K of $52K goal) with progress ring
- Transactions (312) with sparkline
- Avg Order Value ($68.40) with delta
- Conversion Rate (34%) with delta

**Section 2: Revenue Trend** (mini bar chart, last 7 days)
- Simple bar chart showing daily revenue with day labels

**Section 3: Top Products Today** (top 5 list)
- Product name, units sold, revenue, margin %

**Section 4: Category Mix** (horizontal stacked bar or pill breakdown)
- Flower 38%, Vapes 24%, Edibles 18%, Pre-Rolls 12%, Other 8%

**Section 5: Hourly Traffic** (mini area chart)
- Shows traffic by hour with current hour highlighted

**Section 6: Quick Comparisons** (2 mini cards)
- vs Yesterday: +7.1% revenue, +12 transactions
- vs Last Week: +11.3% revenue, +5.8% AOV

### Step 3: Fix generic toast messages in handleAlertAction
Replace vague toasts with contextual ones that reference the alert's actual content:

- `price`: Use alert title — `"Price updated: ${alert.title.split('—')[0].trim()}"`
- `compliance`: Use alert title — `"${alert.action} started: ${alert.title}"`
- `info`/default: Use alert title — `"${alert.title}"` instead of "Details loaded"
- `receive`: Use alert detail for specifics

### Step 4: Update Smart Briefing and home screen
- The Smart Briefing "Transfer All" button currently navigates to 'floor'. Since we're replacing Floor with Reports, change it to handle the transfer inline (toast confirmation) or navigate to alerts.
- Update any other references to 'floor' navigation.

### Step 5: Keep vault transfer accessible
Vault transfer functionality (the current Floor screen) should remain accessible:
- Transfer alerts in the Alerts screen already navigate and handle transfers
- Add "Vault Transfers" as an action in the Actions tab (it may already be there)
- The ScreenFloor component stays in code but is accessed via Actions or Alerts, not its own tab

---

## Files to Modify

1. **`src/pages/NexusMobileWeb.jsx`**:
   - Reorder `INITIAL_ALERTS` array + add 3 new diverse alerts
   - Add `ScreenReports` component
   - Update `BottomNav` tabs: replace `floor` with `reports`
   - Update screen routing in the main component
   - Fix `handleAlertAction` toast messages
   - Update Smart Briefing "Transfer All" to navigate to 'alerts' instead of 'floor'
   - Keep `ScreenFloor` but make it accessible from Actions tab

2. No other files need changes.
