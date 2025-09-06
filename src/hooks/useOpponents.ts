import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Opponent } from "../types/opponent";
import { createOpponent, deleteOpponent, listOpponents, updateOpponent } from "../lib/opponents";


// localStorage 変更を購読する簡易ストア
const subscribers = new Set<() => void>();
function emit() { subscribers.forEach((fn) => fn()); }


window.addEventListener("storage", (e) => {
if (e.key === "opponents:v1") emit();
});

function subscribe(callback: () => void) {
subscribers.add(callback);
return () => subscribers.delete(callback);
}

// 他タブ更新の反映
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "opponents:v1") emit();
  });
}

// 追加：キャッシュ
let _cache: Opponent[] = [];
let _cacheKey = "";

function computeKey(list: Opponent[]) {
  // 中身が同じなら同じキーになるよう軽量に
  return list.map(o => `${o.id}:${o.name}:${o.updatedAt}`).join("|");
}

function getSnapshot() {
  const next = listOpponents();           
  const nextKey = computeKey(next);
  if (nextKey === _cacheKey) {
  
    return _cache;
  }
  _cache = next;
  _cacheKey = nextKey;
  return _cache;
}

function getServerSnapshot() {
  // SSR 用の初期値
  return [] as Opponent[];
}

export function useOpponents() {
const opponents = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);


const byId = useMemo(() => new Map(opponents.map((o) => [o.id, o])), [opponents]);


const add = useCallback((name: string) => {
const created = createOpponent(name);
emit();
return created;
}, []);


const rename = useCallback((id: string, name: string) => {
const updated = updateOpponent(id, name);
emit();
return updated;
}, []);


const remove = useCallback((id: string) => {
const ok = deleteOpponent(id);
emit();
return ok;
}, []);


return { opponents, byId, add, rename, remove };
}