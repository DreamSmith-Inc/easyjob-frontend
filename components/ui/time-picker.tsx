"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

type TimePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
}: TimePickerProps) {
  const generateTimeOptions = () => {
    return Array.from({ length: 96 }).map((_, i) => {
      const hour = Math.floor(i / 4)
        .toString()
        .padStart(2, "0");
      const minute = ((i % 4) * 15).toString().padStart(2, "0");
      return `${hour}:${minute}`;
    });
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="font-normal focus:ring-0 w-full focus:ring-offset-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[15rem]">
          {generateTimeOptions().map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
