"use client";

import { useAuth } from "@/components/auth-provider";

const KPI_CARDS = [
  { label: "GMV (mies.)", value: "28 340 zł", change: "+12%", positive: true },
  { label: "Zamówienia", value: "187", change: "+8%", positive: true },
  { label: "Zwroty", value: "18,4%", change: "-2,1 pp", positive: true },
  { label: "Prowizja", value: "5 952 zł", change: "+10%", positive: true },
];

const RECENT_ORDERS = [
  { id: "FH-20481", date: "16 maj", product: "Sukienka midi kremowa", amount: "249 zł", status: "Nowe" },
  { id: "FH-20479", date: "16 maj", product: "Bluza oversize czarna", amount: "189 zł", status: "Wysłane" },
  { id: "FH-20471", date: "15 maj", product: "Spodnie wide leg", amount: "319 zł", status: "Wysłane" },
  { id: "FH-20464", date: "15 maj", product: "Top bawełniany biały", amount: "89 zł", status: "Dostarczone" },
  { id: "FH-20451", date: "14 maj", product: "Sukienka midi kremowa", amount: "249 zł", status: "Zwrócone" },
];

const STATUS_STYLES: Record<string, string> = {
  Nowe: "bg-blue-50 text-blue-700",
  Wysłane: "bg-amber-50 text-amber-700",
  Dostarczone: "bg-emerald-50 text-emerald-700",
  Zwrócone: "bg-red-50 text-red-600",
};

const CHART_BARS = [38, 52, 45, 61, 55, 70, 65, 80, 72, 85, 78, 90, 82, 95];

export default function SellerDashboard() {
  const { user } = useAuth();
  const maxBar = Math.max(...CHART_BARS);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#212121]">Dzień dobry, {user?.firstName} 👋</h1>
        <p className="text-[13px] text-[#6b6b6b] mt-1">Podsumowanie za ostatnie 30 dni</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-[#6b6b6b] mb-2">{kpi.label}</p>
            <p className="text-2xl font-semibold text-[#212121]">{kpi.value}</p>
            <p className={`text-[12px] mt-1 font-medium ${kpi.positive ? "text-emerald-600" : "text-red-500"}`}>
              {kpi.change} vs. poprzedni mies.
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* GMV chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-[13px] font-medium text-[#212121] mb-5">GMV - ostatnie 14 dni</h2>
          <div className="flex items-end gap-1.5 h-32">
            {CHART_BARS.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#212121] rounded-sm"
                  style={{ height: `${(val / maxBar) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#6b6b6b]">
            <span>3 maj</span>
            <span>16 maj</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-[13px] font-medium text-[#212121] mb-5">Kategorie produktów</h2>
          <div className="space-y-3">
            {[
              { cat: "Sukienki", pct: 42, gmv: "11 903 zł" },
              { cat: "Bluzki / topy", pct: 28, gmv: "7 935 zł" },
              { cat: "Spodnie", pct: 18, gmv: "5 101 zł" },
              { cat: "Inne", pct: 12, gmv: "3 401 zł" },
            ].map((row) => (
              <div key={row.cat}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-[#212121]">{row.cat}</span>
                  <span className="text-[#6b6b6b]">{row.gmv}</span>
                </div>
                <div className="h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#212121] rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-black/8 flex items-center justify-between">
          <h2 className="text-[13px] font-medium text-[#212121]">Ostatnie zamówienia</h2>
          <a href="/seller/orders" className="text-[12px] text-[#6b6b6b] hover:text-[#212121] transition-colors underline">
            Zobacz wszystkie
          </a>
        </div>
        <div className="divide-y divide-black/5">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-medium text-[#212121] w-20">{order.id}</span>
                <div>
                  <p className="text-[13px] text-[#212121]">{order.product}</p>
                  <p className="text-[11px] text-[#6b6b6b]">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[13px] font-medium text-[#212121]">{order.amount}</span>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
