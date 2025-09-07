import { useState, useEffect } from "react"
import { JankenRecord } from "@/types/janken"
import { JankenForm } from "@/components/JankenForm"
import { RecordsList } from "@/components/RecordsList"
import { JankenCalendar } from "@/components/JankenCalendar"
import { StatsCard } from "@/components/StatsCard"
import { OpponentsCard } from "@/components/OpponentsCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRecords } from "@/lib/janken"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

const Index = () => {
  const [records, setRecords] = useState<JankenRecord[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    setRecords(getRecords())
  }, [])

  const handleRecordSaved = (newRecord: JankenRecord) => {
    setRecords(prev => [newRecord, ...prev])
  }

  // Sort records by date (newest first) and createdAt
  const sortedRecords = [...records].sort((a, b) => {
    const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime()
    if (dateCompare !== 0) return dateCompare
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2"></h1>
          <h2 className="text-4xl font-bold text-foreground mb-1">じゃんけん記録帳</h2>
          <p className="text-muted-foreground">じゃんけんの結果を記録して<br></br>勝敗を振り返ることができます。</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-1">
              <JankenForm onRecordSaved={handleRecordSaved} />
            </div>

            {/* Results Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="history">履歴</TabsTrigger>
                  <TabsTrigger value="calendar">カレンダー</TabsTrigger>
                  <TabsTrigger value="stats">統計</TabsTrigger>
                  <TabsTrigger value="opponents">対戦相手の管理</TabsTrigger>
                </TabsList>
                
                <TabsContent value="history" className="mt-6">
                <RecordsList
                records={sortedRecords.slice(0, 10)}   // 直近10件に制限
                onRecordDeleted={(id) =>
                setRecords(prev => prev.filter(r => r.id !== id)) // 削除を親で反映
                }
                />
                </TabsContent>

                
                <TabsContent value="calendar" className="mt-6">
                  <JankenCalendar records={records} onDateClick={setSelectedDate}/>
                </TabsContent>
                
                <TabsContent value="stats" className="mt-6">
                  <StatsCard records={records} />
                </TabsContent>

                <TabsContent value="opponents" className="mt-6">
                  <OpponentsCard records={records} />
                </TabsContent>

              </Tabs>
              
              {/* 日付クリックで開くモーダル */}
              <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
              <DialogContent>
              <DialogHeader>
              <DialogTitle>
              {selectedDate && format(selectedDate, "yyyy年MM月dd日", { locale: ja })} の成績
              </DialogTitle>
              </DialogHeader>
              <RecordsList
              records={records.filter((r) => {
              if (!selectedDate) return false
              const recordDate = new Date(r.date)
              if (isNaN(recordDate.getTime())) return false // 無効日付を除外
              return format(recordDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")})}

              onRecordDeleted={(id) =>
              setRecords((prev) => prev.filter((r) => r.id !== id))}/>
              </DialogContent>
              </Dialog>

              <div className="max-w-5xl mx-auto mt-6">
              <p className="text-muted-foreground text-center">じゃんけん記録帳 - 分析して勝率を上げよう!</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
