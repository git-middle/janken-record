import { useState, useEffect } from "react"
import { JankenRecord } from "@/types/janken"
import { JankenForm } from "@/components/JankenForm"
import { RecordsList } from "@/components/RecordsList"
import { JankenCalendar } from "@/components/JankenCalendar"
import { StatsCard } from "@/components/StatsCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRecords } from "@/lib/janken"

const Index = () => {
  const [records, setRecords] = useState<JankenRecord[]>([])

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
          <h1 className="text-3xl font-bold text-foreground mb-2">✊✌️✋</h1>
          <h2 className="text-2xl font-bold text-foreground mb-1">じゃんけん記録帳</h2>
          <p className="text-muted-foreground">じゃんけんの結果を記録して、勝敗を振り返ろう！</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-1">
              <JankenForm onRecordSaved={handleRecordSaved} />
            </div>

            {/* Results Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="history">履歴</TabsTrigger>
                  <TabsTrigger value="calendar">カレンダー</TabsTrigger>
                  <TabsTrigger value="stats">統計</TabsTrigger>
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
                  <JankenCalendar records={records} />
                </TabsContent>
                
                <TabsContent value="stats" className="mt-6">
                  <StatsCard records={records} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
