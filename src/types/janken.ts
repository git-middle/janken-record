export type Hand = "グー" | "チョキ" | "パー"
export type Result = "勝ち" | "負け" | "あいこ"
export type Importance = "低" | "中" | "高"

export interface JankenRecord {
  id: string
  date: string // YYYY-MM-DD format
  opponentHand: Hand
  myHand: Hand
  result: Result
  importance: Importance
  createdAt: Date
  opponentId?: string  
}

export interface JankenStats {
  totalGames: number
  wins: number
  losses: number
  draws: number
  winRate: number
}