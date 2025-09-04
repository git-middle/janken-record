export type Hand = "ぐー" | "ちょき" | "ぱー"
export type Result = "勝ち" | "負け" | "あいこ"

export interface JankenRecord {
  id: string
  date: string // YYYY-MM-DD format
  opponentHand: Hand
  myHand: Hand
  result: Result
  createdAt: Date
}

export interface JankenStats {
  totalGames: number
  wins: number
  losses: number
  draws: number
  winRate: number
}