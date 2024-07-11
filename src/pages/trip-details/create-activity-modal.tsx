import { X, Tag, Calendar } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const accoursAt = data.get("accours_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      occurs_at: accoursAt,
      title: title,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeCreateActivityModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="accours_at"
                placeholder="Data e horário da atividade"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  );
}
