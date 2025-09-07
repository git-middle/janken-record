import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Trash2,  Edit2, Check, X  } from "lucide-react";

export function OpponentsCard() {
const { opponents , remove , rename} = useOpponents(); 

const [editingId, setEditingId] = useState<string | null>(null);
const [newName, setNewName] = useState("");

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

               {editingId === o.id ? (
                  // 編集モード
                  <div className="flex items-center gap-2 w-full">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 border rounded px-2 py-1 text-sm"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newName.trim()) rename(o.id, newName.trim());
                        setEditingId(null);
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  // 通常表示モード
                  <>
                    <span>{o.name}</span>
                    <div className="flex gap-2">
                      {/* 編集ボタン */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(o.id);
                          setNewName(o.name);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                        </Button>
      
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
             </div>
             </>
            )}
          </li>
        ))}
      </ul>
      )}
      </CardContent>
    </Card>
  );
}