import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PeriodSelector() {
const [period, setPeriod] = useState<"all" | "day" | "week" | "month" | "year">("all")

return(
<Select 
defaultValue="all"
onValueChange={(value: "all" | "day" | "week" | "month" | "year") => setPeriod(value)}>
  <SelectTrigger className="w-[180px]">
     <SelectValue />
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
