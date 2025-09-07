import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useOpponents } from "@/hooks/useOpponents"

interface OpponentSelectorProps {
  opponent: string | "all"
  setOpponent: (value: string | "all") => void
}

export function OpponentSelectStats({ opponent, setOpponent }: OpponentSelectorProps) {
  // 対戦相手一覧をユニークに抽出
  const {opponents} = useOpponents()

  return (
    <Select value={opponent} onValueChange={setOpponent}>
      <SelectTrigger className="w-[160px]">
      <SelectValue placeholder="相手を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">すべての相手</SelectItem>
        {opponents.map((o) => (
          <SelectItem key={o.id} value={o.id}>
              {o.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
