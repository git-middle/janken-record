import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useOpponents } from "@/hooks/useOpponents";

export default function OpponentsPage() {
  const { opponents } = useOpponents();

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">対戦相手一覧</CardTitle>
      </CardHeader>
      <CardContent>
        {opponents.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center">
            まだ登録された対戦相手はいません
          </p>
        ) : (
          <ul className="space-y-2">
            {opponents.map((o) => (
              <li
                key={o.id}
                className="p-2 border rounded-md bg-card text-sm"
              >
                {o.name}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
