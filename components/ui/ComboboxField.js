"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function ComboboxField({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
}) {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const wrapperRef = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current)
        setTriggerWidth(wrapperRef.current.getBoundingClientRect().width);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div ref={wrapperRef} className="w-full">
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            />
          }
        >
          <span
            className={cn(
              "truncate",
              selected ? "text-gray-800" : "text-gray-400",
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronsUpDown className="w-4 h-4 text-gray-400 shrink-0" />
        </PopoverTrigger>
      </div>

      <PopoverContent
        className="p-0"
        align="start"
        style={triggerWidth ? { width: `${triggerWidth}px` } : undefined}
      >
        <Command>
          <CommandInput placeholder="Cari..." />
          <CommandList>
            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => {
                      onChange(isSelected ? "" : opt.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`w-4 h-4 ${isSelected ? "opacity-100" : "opacity-0"}`}
                    />
                    {opt.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
