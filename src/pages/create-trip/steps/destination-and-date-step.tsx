import { format } from "date-fns";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean;
  openGuestInput: () => void;
  closeGuestInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (date: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  closeGuestInput,
  isGuestInputOpen,
  openGuestInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? `${format(eventStartAndEndDates.from, "d ' de ' LLL")} até ${format(eventStartAndEndDates.to, "d ' de ' LLL")}`
      : null;

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          onChange={(event) => setDestination(event.target.value)}
          disabled={isGuestInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <button
        disabled={isGuestInputOpen}
        className="flex w-[240px] items-center gap-2"
        onClick={openDatePicker}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="w-48 flex-1 text-left text-lg text-zinc-400">
          {displayedDate ? displayedDate : "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    className="size-5 text-zinc-400"
                    onClick={closeDatePicker}
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestInputOpen ? (
        <Button onClick={closeGuestInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestInput}>
          Continuar
          <ArrowRight className="size-5 text-lime-950" />
        </Button>
      )}
    </div>
  );
}
