import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns"
import { ja } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { JankenRecord } from "@/types/janken"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRecordsByDate, getResultSymbol, formatDate } from "@/lib/janken"
import { startOfWeek, endOfWeek } from "date-fns"
import { cn } from "@/lib/utils"

interface JankenCalendarProps {
  records: JankenRecord[]
  onDateClick?: (date: Date) => void
}

export function JankenCalendar({ records, onDateClick }: JankenCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  const calendarStart = startOfWeek(monthStart, { locale: ja })
  const calendarEnd = endOfWeek(monthEnd, { locale: ja })

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getRecordsForDate = (date: Date): JankenRecord[] => {
    const dateString = formatDate(date)
    return records.filter(record => record.date === dateString)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">カレンダー</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[100px] text-center">
              {format(currentDate, "yyyy年M月", { locale: ja })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date) => {
            const dayRecords = getRecordsForDate(date)
            const hasRecords = dayRecords.length > 0
            
            return (
              <button
                key={date.toString()}
                onClick={() => onDateClick?.(date)}
                className={cn(
                  "h-12 flex flex-col items-center justify-center text-xs border rounded-md transition-colors hover:bg-accent",
                  isSameMonth(date, currentDate) 
                    ? "text-foreground" 
                    : "text-muted-foreground",
                  isToday(date) && "bg-primary/10 border-primary",
                  hasRecords && "bg-accent/50"
                )}
              >
                <span className="font-medium">
                  {format(date, "d")}
                </span>
                {hasRecords && (
                  <div className="flex gap-[1px] mt-1">
                    {dayRecords.slice(0, 4).map((record, index) => (
                      <span
                        key={index}
                        className={cn(
                          "text-[10px] leading-none",
                          record.result === "勝ち" && "text-win",
                          record.result === "負け" && "text-lose",
                          record.result === "あいこ" && "text-draw"
                        )}
                      >
                        {getResultSymbol(record.result)}
                      </span>
                    ))}
                    {dayRecords.length > 4 && (
                      <span className="text-[8px] text-muted-foreground">...</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="text-win font-bold">◯</span>
            <span>勝ち</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lose font-bold">×</span>
            <span>負け</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-draw font-bold">△</span>
            <span>あいこ</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}