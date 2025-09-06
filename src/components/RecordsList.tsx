import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { JankenRecord } from "@/types/janken"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getHandEmoji, getResultSymbol, deleteRecord} from "@/lib/janken"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useOpponents } from "@/hooks/useOpponents";
import { useState } from "react";

interface RecordsListProps {
  records: JankenRecord[]
  onRecordDeleted?: (id: string) => void
}

export function RecordsList({ records, onRecordDeleted }: RecordsListProps) {
  const { opponents,byId } = useOpponents();
   const [selectedOpponentId, setSelectedOpponentId] = useState<string | "">("");
  
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">まだ記録がありません</p>
        </CardContent>
      </Card>
    )
  }

 // 対戦相手によるフィルタリング → 直近10件
  const filteredRecords = selectedOpponentId
    ? records.filter((r) => r.opponentId === selectedOpponentId)
    : records;

  // 直近10件に制限
  const latestRecords = filteredRecords.slice(0, 10) 

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

   const handleDelete = (id: string) => {
    deleteRecord(id)           // localStorageから削除
    onRecordDeleted?.(id)      // 親に通知してstate更新
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">履歴一覧</CardTitle>
        <select
        value={selectedOpponentId}
        onChange={(e) => setSelectedOpponentId(e.target.value)}
        className="mt-2 w-full rounded-md border px-2 py-1 text-sm">
        
        <option value="">すべて表示</option>
        {opponents.map((o) => (
        <option key={o.id} value={o.id}>
        {o.name}
        </option>
      ))}

  </select>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {latestRecords.map((record) => {
            const opponent = record.opponentId ? byId.get(record.opponentId) : null; // 👈 ここで名前取得

            return (
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

              <span className="text-sm text-muted-foreground">
              {record.importance ? record.importance : "　"}
              </span>

              <span className="ml-2 text-sm text-muted-foreground whitespace-nowrap">
              {opponent ? opponent.name : "（相手なし）"}
              </span>
               </div>

              <div className="flex items-center justify-end gap-2 w-full">
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
               
              {/* 削除ボタン */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="p-1 text-muted-foreground hover:text-destructive  ml-4">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>削除の確認</AlertDialogTitle>
                    <AlertDialogDescription>
                      この記録を本当に削除しますか？ この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => handleDelete(record.id)}
                    >
                      削除する
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
            );
          })} 
        </div>
      </CardContent>
    </Card>
  )
}
