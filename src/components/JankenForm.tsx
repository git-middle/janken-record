import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Hand, JankenRecord } from "@/types/janken"
import { HandSelector } from "./HandSelector"
import { GameButton } from "@/components/ui/game-button"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { judgeJanken, saveRecord, formatDate } from "@/lib/janken"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface JankenFormProps {
  onRecordSaved: (record: JankenRecord) => void
}

export function JankenForm({ onRecordSaved }: JankenFormProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [opponentHand, setOpponentHand] = useState<Hand | null>(null)
  const [myHand, setMyHand] = useState<Hand | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [importance, setImportance] = useState<"低" | "中" | "高" | "">("")

  const canSubmit = opponentHand && myHand && !isSubmitting

  const handleSubmit = async () => {
    if (!canSubmit) return

    setIsSubmitting(true)
    try {
      const result = judgeJanken(myHand, opponentHand)
      const record = saveRecord({
        date: formatDate(date),
        opponentHand,
        myHand,
        result,
        importance: importance as "低" | "中" | "高"
      })

      onRecordSaved(record)
      
      // Reset form
      setOpponentHand(null)
      setMyHand(null)
      
      toast({
        title: "記録しました！",
        description: `結果: ${result}`,
      })
    } catch (error) {
      toast({
        title: "エラー",
        description: "記録の保存に失敗しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">じゃんけん記録</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">日付</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy年MM月dd日") : <span>日付を選択</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Hand Selectors */}
        <div className="space-y-6">
          <HandSelector
            title="相手の手"
            selectedHand={opponentHand}
            onHandSelect={setOpponentHand}
          />
          
          <HandSelector
            title="自分の手"
            selectedHand={myHand}
            onHandSelect={setMyHand}
          />
        </div>
        
        {/* Importance Selector */}
        <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">このじゃんけんの重要度</label>
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value as "低" | "中" | "高")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          required>
        <option value="">選択してください</option>
        <option value="低">低</option>
        <option value="中">中</option>
        <option value="高">高</option>
        </select>
        </div>

        {/* Submit Button */}
        <div className="space-y-2">
          <GameButton
            variant="record"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            記録する
          </GameButton>
          
          {!opponentHand || !myHand ? (
            <p className="text-xs text-muted-foreground text-center">
              じゃんけんの対戦履歴を記録してください
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}