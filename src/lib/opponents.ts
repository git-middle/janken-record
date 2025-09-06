import { Opponent } from "../types/opponent";
import { storage } from "./storage";


const KEY = "opponents:v1";


export function listOpponents(): Opponent[] {
return storage.get<Opponent[]>(KEY, []).sort((a, b) => a.name.localeCompare(b.name, "ja"));
}


export function createOpponent(name: string): Opponent {
const now = new Date().toISOString();
const next: Opponent = {
id: (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)),
name: name.trim(),
createdAt: now,
updatedAt: now,
};
const all = listOpponents();
all.push(next);
storage.set(KEY, all);
return next;
}


export function updateOpponent(id: string, name: string): Opponent | null {
const all = listOpponents();
const idx = all.findIndex((o) => o.id === id);
if (idx === -1) return null;
const now = new Date().toISOString();
all[idx] = { ...all[idx], name: name.trim(), updatedAt: now };
storage.set(KEY, all);
return all[idx];
}


export function deleteOpponent(id: string): boolean {
const all = listOpponents();
const next = all.filter((o) => o.id !== id);
storage.set(KEY, next);
return next.length !== all.length;
}