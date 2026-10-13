"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function formatDisplay(dateStr) {
  if (!dateStr) return "";

  const d = new Date(dateStr + "T00:00:00");

  return d.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

export default function DateFilter({
  label,
  from,
  to,
  onChange,
  triggerClassName = "",
}) {
  const [open, setOpen] = useState(false);

  const selectedRange =
    from || to
      ? {
          from: from ? new Date(from + "T00:00:00") : undefined,
          to: to ? new Date(to + "T00:00:00") : undefined,
        }
      : undefined;

  const handleSelect = (range) => {
    onChange({
      from: range?.from ? toDateKey(range.from) : "",
      to: range?.to ? toDateKey(range.to) : "",
    });
  };

  const handleClear = () => {
    onChange({
      from: "",
      to: "",
    });

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "max-w-full border-dashed",
              triggerClassName
            )}
          >
            <CirclePlus className="w-4 h-4 text-gray-800" />

            {label}

            {from && to && (
              <span className="font-normal text-slate-500">
                {formatDisplay(from)} - {formatDisplay(to)}
              </span>
            )}

            {from && !to && (
              <span className="font-normal text-slate-500">
                From {formatDisplay(from)}
              </span>
            )}

            {!from && to && (
              <span className="font-normal text-slate-500">
                Until {formatDisplay(to)}
              </span>
            )}
          </Button>
        }
      />

      <PopoverContent
        className="w-auto max-w-[calc(100vw-2rem)] p-0"
        align="start"
      >
        <Calendar
          mode="range"
          selected={selectedRange}
          className="[&_button]:cursor-pointer"
          onSelect={handleSelect}
        />

        {(from || to) && (
          <div className="border-t border-gray-200 p-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="w-fit cursor-pointer justify-start text-gray-600"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}