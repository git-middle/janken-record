import { useState } from "react"
import { JankenRecord } from "@/types/janken"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PeriodSelector } from "@/components/ui/PeriodSelector"
import {OpponentSelectStats} from "@/components/ui/OpponentSelectStats"
import { filterByPeriod, filterByOpponent } from "@/lib/janken"  

interface StatsCardProps {
  records: JankenRecord[]
}

export function StatsCard({ records }: StatsCardProps) {
  const [period, setPeriod] = useState<"all" | "day" | "week" | "month" | "year">("all")
  const [opponent, setOpponent] = useState<string | "all">("all")

  const filteredByPeriod = filterByPeriod(records, period)
  const filteredRecords = filterByOpponent(filteredByPeriod, opponent)

  const totalGames = filteredRecords.length
  const wins = filteredRecords.filter(r => r.result === "勝ち").length
  const losses = filteredRecords.filter(r => r.result === "負け").length
  const draws = filteredRecords.filter(r => r.result === "あいこ").length
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0  

  if (totalGames === 0) {
    return (
      <Card>
        <CardHeader>
        <div className="flex flex-col gap-2 w-full items-start">
        <CardTitle className="text-lg">統計</CardTitle>
        <div className="flex gap-2 w-full">
        <PeriodSelector period={period} setPeriod={setPeriod} />
        <OpponentSelectStats opponent={opponent}
  setOpponent={setOpponent}
  records={records}
/>

    </div>
  </div>
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
      <div className="flex flex-col gap-2 w-full items-start">
      <CardTitle className="text-lg">統計</CardTitle>
      <div className="flex gap-2 w-full">
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <OpponentSelectStats opponent={opponent} setOpponent={setOpponent} />
    </div>
  </div>
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