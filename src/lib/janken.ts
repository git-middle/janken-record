import { Hand, Result, JankenRecord } from "@/types/janken"
import { format, parse, isSameWeek} from "date-fns"

export function filterByPeriod(
  records: JankenRecord[],
  period: "all" | "day" | "week" | "month" | "year"
) {
  const now = new Date()
  if (period === "all") return records

  return records.filter(r => {
    const d = new Date(r.date)
    if (period === "day") return d.toDateString() === now.toDateString()
    if (period === "week") return isSameWeek(d, now, { weekStartsOn: 1 })
    if (period === "month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    if (period === "year") return d.getFullYear() === now.getFullYear()
  })
}

export function filterByOpponent(records: JankenRecord[], opponentId: string | "all") {
  if (opponentId === "all") return records
  return records.filter(r => r.opponentId === opponentId)
}

export function judgeJanken(myHand: Hand, opponentHand: Hand): Result {
  if (myHand === opponentHand) {
    return "あいこ"
  }
  
  if (
    (myHand === "グー" && opponentHand === "チョキ") ||
    (myHand === "チョキ" && opponentHand === "パー") ||
    (myHand === "パー" && opponentHand === "グー")
  ) {
    return "勝ち"
  }
  
  return "負け"
}

export function getHandEmoji(hand: Hand): string {
  switch (hand) {
    case "グー":
      return "✊"
    case "チョキ":
      return "✌️"
    case "パー":
      return "✋"
  }
}

export function getResultSymbol(result: Result): string {
  switch (result) {
    case "勝ち":
      return "◯"
    case "負け":
      return "×"
    case "あいこ":
      return "△"
  }
}

export function formatDate(date: Date): string {
  // デバイスのローカルタイムで YYYY-MM-DD を返す
  return format(date, "yyyy-MM-dd")
}

export function parseDate(dateString: string): Date {
  return parse(dateString, "yyyy-MM-dd", new Date())
}

// LocalStorage utilities
const STORAGE_KEY = 'janken-records'

export function saveRecord(record: Omit<JankenRecord, 'id' | 'createdAt'>): JankenRecord {
  const records = getRecords()
  const newRecord: JankenRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date()
  }
  
  records.push(newRecord)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  return newRecord
}

export function getRecords(): JankenRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return parsed.map((record: any) => ({
      ...record,
      createdAt: new Date(record.createdAt)
    }))
  } catch {
    return []
  }
}

export function getRecordsByDate(date: string): JankenRecord[] {
  return getRecords().filter(record => record.date === date)
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter(record => record.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}