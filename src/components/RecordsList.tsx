import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { JankenRecord } from "@/types/janken"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getHandEmoji, getResultSymbol } from "@/lib/janken"

interface RecordsListProps {
  records: JankenRecord[]
}

export function RecordsList({ records }: RecordsListProps) {
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">まだ記録がありません</p>
        </CardContent>
      </Card>
    )
  }

  const getResultVariant = (result: string) => {
    switch (result) {
      case "勝ち":
        return "default" // Will be styled with win colors
      case "負け":
        return "destructive"
      case "あいこ":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">履歴一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  {format(new Date(record.date), "M/d", { locale: ja })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg" title={`相手: ${record.opponentHand}`}>
                    {getHandEmoji(record.opponentHand)}
                  </span>
                  <span className="text-muted-foreground text-sm">vs</span>
                  <span className="text-lg" title={`自分: ${record.myHand}`}>
                    {getHandEmoji(record.myHand)}
                  </span>
                </div>

                {record.importance && (
                  <span className="text-sm text-muted-foreground">
                  {record.importance}
                  </span>
                )}
                </div>
              
              <div className="flex items-center gap-2">
                <span 
                  className={`text-lg font-bold ${
                    record.result === "勝ち" ? "text-win" :
                    record.result === "負け" ? "text-lose" :
                    "text-draw"
                  }`}
                >
                  {getResultSymbol(record.result)}
                </span>
                <Badge
                  variant={getResultVariant(record.result)}
                  className={
                    record.result === "勝ち" ? "bg-win text-win-foreground hover:bg-win/90" :
                    record.result === "負け" ? "bg-lose text-lose-foreground hover:bg-lose/90" :
                    "bg-draw text-draw-foreground hover:bg-draw/90"
                  }
                >
                  {record.result}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}