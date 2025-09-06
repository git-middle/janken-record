import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOpponents } from "@/hooks/useOpponents";
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
import { Trash2 } from "lucide-react";

export function OpponentsCard() {
const { opponents , remove} = useOpponents(); 

   return (
    <Card>
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
                className="flex items-center justify-between p-2 border rounded-md bg-card text-sm"
              >
              <span>{o.name}</span>
      
         {/* 削除ボタン */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="p-1 text-muted-foreground hover:text-destructive">
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
                      onClick={() => remove(o.id)}
                    >
                      削除する
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
             </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}