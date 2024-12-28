import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <Card className="max-w-[80%] bg-muted">
        <CardContent className="p-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
