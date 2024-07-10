import { Plus } from "lucide-react";
import { useState } from "react";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Guests } from "./guests";
import { ImportantLinks } from "./important-links";
import { Button } from "../../components/button";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80">
          <div className="space-y-6">
            <ImportantLinks />
            <div className="h-px w-full bg-zinc-800" />
            <Guests />
          </div>
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
