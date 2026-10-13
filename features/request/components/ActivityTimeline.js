"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getStatusClass } from "@/config/status";

const DOT_COLOR_BY_STATUS = {
  "Order dibuat": "bg-gray-400",
  "Menunggu Review": "bg-amber-400",
  "Review disetujui": "bg-amber-400",
  "Menunggu Persetujuan": "bg-amber-400",
  "Diminta Revisi": "bg-red-500",
  "Order disetujui": "bg-blue-500",
  "Order diproses": "bg-cyan-500",
  "Order selesai": "bg-green-500",
  "Order ditolak": "bg-red-500",
  "Order dibatalkan": "bg-gray-400",
};

function getDotColor(label) {
  return DOT_COLOR_BY_STATUS[label] || "bg-gray-400";
}

function StatusPill({ value }) {
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-sm ${getStatusClass(value)}`}
    >
      {value}
    </span>
  );
}

function ChangeRow({ change }) {
  if (change.from !== undefined || change.to !== undefined) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-gray-900 w-full">
          {change.field}
        </span>

        {change.from && <StatusPill value={change.from} />}

        {change.from && change.to && (
          <span className="text-gray-400 text-xs">-</span>
        )}

        {change.to && <StatusPill value={change.to} />}
      </div>
    );
  }

  return (
    <div>
      <span className="text-xs font-semibold text-gray-900 block">
        {change.field}
      </span>
      <span className="text-xs text-gray-600">{change.value}</span>
    </div>
  );
}

export default function ActivityTimeline({ activities = [] }) {
  const [showAll, setShowAll] = useState(false);

  if (activities.length === 0) return null;

  // Tampilkan aktivitas terbaru 
  const ordered = [...activities].reverse();

  const visibleActivities = showAll ? ordered : ordered.slice(0, 3);

  const remainingCount = ordered.length - 3;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-4">
        Riwayat Aktivitas
      </h3>

      <div>
        {visibleActivities.map((act, idx) => {
          const isLast = idx === visibleActivities.length - 1;

          return (
            <div
              key={idx}
              className={`relative flex gap-3 ${isLast ? "" : "pb-5"}`}
            >
              {!isLast && (
                <span className="absolute left-[3px] top-3 bottom-0 w-px bg-gray-200" />
              )}

              <span
                className={`relative z-10 w-2 h-2 rounded-full mt-1.5 shrink-0 ${getDotColor(act.label)}`}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <StatusPill value={act.label} />

                  {act.actor && (
                    <span className="text-gray-400 text-xs">{act.actor}</span>
                  )}
                </div>

                <div className="text-xs text-gray-400 mt-1">{act.time}</div>

                {act.changes && act.changes.length > 0 && (
                  <details className="mt-1.5 group">
                    <summary className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer select-none list-none">
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                      {act.changes.length} perubahan
                    </summary>

                    <div className="mt-2 bg-gray-50 border border-gray-100 rounded-md p-3 space-y-2">
                      {act.changes.map((change, cIdx) => (
                        <ChangeRow key={cIdx} change={change} />
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {ordered.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className={`mt-2 flex items-center gap-1 text-xs font-medium cursor-pointer ${
            showAll
              ? "text-gray-500 hover:text-gray-700"
              : "text-primary hover:text-green-600"
          }`}
        >
          {showAll ? (
            <>
              <ChevronUp className="size-3.5" />
              Sembunyikan
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5" />
              Tampilkan {remainingCount} aktivitas lainnya
            </>
          )}
        </button>
      )}
    </div>
  );
}
