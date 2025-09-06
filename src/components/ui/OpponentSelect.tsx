import React, { useId, useMemo, useState } from "react";
import { useOpponents } from "@/hooks/useOpponents";

export type OpponentSelectProps = {
  label?: string;
  value: string | null; // opponentId
  onChange: (opponentId: string | null) => void;
  required?: boolean;
  className?: string;
};

const NEW_VALUE = "__NEW__";

export default function OpponentSelect({
  label = "対戦相手",
  value,
  onChange,
  required,
  className,
}: OpponentSelectProps) {
  const id = useId();
  const { opponents, add } = useOpponents();
  const [newName, setNewName] = useState("");
  const [mode, setMode] = useState<"select" | "create">("select");

  const options = useMemo(() => opponents, [opponents]);
  const selectedIsNew = mode === "create";

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    if (v === NEW_VALUE) {
      setMode("create");
      setNewName("");
    } else {
      if (v !== value) {
      onChange(v || null);
    }
  }
}

  function handleCreate() {
    const name = newName.trim();
    if (!name) return;
    const created = add(name);
    onChange(created.id);
    setMode("select");
    setNewName("");
  }

return (
<div className={"flex flex-col gap-2 " + (className ?? "")}>
{label && <label htmlFor={id} className="text-sm font-medium">{label}</label>}


{selectedIsNew ? (
<div className="flex gap-2">
<input
id={id}
autoFocus
type="text"
className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring"
placeholder="相手の名前を入力"
value={newName}
onChange={(e) => setNewName(e.target.value)}
onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); if (e.key === "Escape") setMode("select"); }}
/>
<button
type="button"
className="rounded-xl border px-3 py-2 hover:bg-gray-50"
onClick={() => setMode("select")}
aria-label="キャンセル"
>キャンセル</button>
<button
type="button"
className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-40"
disabled={!newName.trim()}
onClick={handleCreate}
>登録</button>
</div>
) : (
<select
id={id}
required={required}
className="rounded-xl border px-3 py-2"
value={value ?? ""}
onChange={handleSelect}
>
<option value="">— 選択してください —</option>
{options.map((o) => (
<option key={o.id} value={o.id}>{o.name}</option>
))}
<option value={NEW_VALUE}>＋ 新規登録…</option>
</select>
)}
</div>
);
}