import { getPopularBuilds } from "@/lib/builds";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";

export async function PopularBuildCard() {
  const builds = await getPopularBuilds();

  if (builds.length === 0) {
    return (
      <Card className="w-full shrink-0 lg:w-64">
        <CardHeader>
          <CardTitle>Popular builds</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No popular builds found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shrink-0 lg:w-64">
      <CardHeader>
        <CardTitle>Popular builds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {builds.map((build) => (
          <div
            key={build.id}
            className="flex flex-col gap-1 rounded-lg border bg-muted/30 px-3 py-2"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm leading-tight min-w-0">
                {build.name}
              </p>
              <Button
                size="icon"
                variant={"ghost"}
                className="h-8 w-8 shrink-0"
                asChild
              >
                <Link href={`/builds/${build.id}/edit`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="tabular-nums">
                ₽ {new Intl.NumberFormat("ru-RU").format(build.totalPrice)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {build._count.likes}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
