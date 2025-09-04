import { Hand } from "@/types/janken"
import { GameButton } from "@/components/ui/game-button"
import { getHandEmoji } from "@/lib/janken"

interface HandSelectorProps {
  title: string
  selectedHand: Hand | null
  onHandSelect: (hand: Hand) => void
}

const hands: Hand[] = ["ぐー", "ちょき", "ぱー"]

export function HandSelector({ title, selectedHand, onHandSelect }: HandSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground text-center">{title}</h3>
      <div className="flex justify-center gap-4">
        {hands.map((hand) => (
          <GameButton
            key={hand}
            variant={selectedHand === hand ? "hand-selected" : "hand"}
            size="hand-lg"
            onClick={() => onHandSelect(hand)}
            aria-pressed={selectedHand === hand}
            role="radio"
            aria-label={`${hand}を選択`}
          >
            <span className="text-lg" role="img" aria-label={hand}>
              {getHandEmoji(hand)}
            </span>
            <span className="text-xs font-medium">{hand}</span>
          </GameButton>
        ))}
      </div>
    </div>
  )
}