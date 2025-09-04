import { JankenRecord } from "@/types/janken"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  records: JankenRecord[]
}

export function StatsCard({ records }: StatsCardProps) {
  const totalGames = records.length
  const wins = records.filter(r => r.result === "勝ち").length
  const losses = records.filter(r => r.result === "負け").length
  const draws = records.filter(r => r.result === "あいこ").length
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0

  if (totalGames === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">統計</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">データがありません</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">統計</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">{totalGames}</div>
            <div className="text-xs text-muted-foreground">総試合数</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-win">{winRate}%</div>
            <div className="text-xs text-muted-foreground">勝率</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xl font-semibold text-win">{wins}</div>
            <div className="text-xs text-muted-foreground">勝ち</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xl font-semibold text-lose">{losses}</div>
            <div className="text-xs text-muted-foreground">負け</div>
          </div>
        </div>
        
        {draws > 0 && (
          <div className="mt-4 text-center">
            <div className="text-lg font-semibold text-draw">{draws}</div>
            <div className="text-xs text-muted-foreground">あいこ</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}