"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [persets, setPersets] = React.useState<
    { label: string; value: string }[]
  >([]);

  const getPersets = async () => {
    const res = await fetch("/api/preset", {
      method: "POST",
    });
    const { data: response } = await res.json();

    setPersets(
      response.map((item: any) => ({
        label: item.name,
        value: item._id,
      }))
    );
    setValue(response[0]._id);
  };
  React.useEffect(() => {
    getPersets();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px]  sm:w-[200px] justify-between p"
        >
          {value ? (
            <span className="text-overflow-ellipsis overflow-hidden whitespace-nowra">
              {persets.find((framework) => framework.value === value)?.label}
            </span>
          ) : (
            "选择预设..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜索预设..." />
          <CommandEmpty>未找到任何预设.</CommandEmpty>
          <CommandGroup>
            {persets.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 overflow-hidden",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
