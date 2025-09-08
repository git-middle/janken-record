import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Period = "all" | "day" | "week" | "month" | "year"

export function PeriodSelector({
  period,
  setPeriod,
}: {
  period: Period
  setPeriod: (p: Period) => void
}) {
return (
    <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="すべての期間" />
      </SelectTrigger>
      <SelectContent>
    <SelectItem value="all">すべての期間</SelectItem>
    <SelectItem value="day">日</SelectItem>
    <SelectItem value="week">週</SelectItem>
    <SelectItem value="month">月</SelectItem>
    <SelectItem value="year">年</SelectItem>
  </SelectContent>
</Select>
)
}
