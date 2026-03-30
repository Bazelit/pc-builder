import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { TypographyH3 } from "./ui/typography";
import { Pencil, Calendar, Package, Cpu, DollarSign, User } from "lucide-react";

type BuildCard = {
  user: {
    email: string;
  };
  id: string;
  name: string;
  totalPrice: number;
  createdAt: Date | null;
  components: Array<{
    id: string;
    component: {
      name: string;
    };
  }>;
};

type Props = {
  build: BuildCard;
  children?: React.ReactNode;
};

export function BuildCard({ build, children }: Props) {
  const formattedDate = build.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(build.createdAt)
    : null;

  const componentCount = build.components.length;

  return (
    <Card className="group flex flex-col overflow-hidden border-0 bg-gradient-to-br from-background via-background to-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="line-clamp-1">
              <TypographyH3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {build.name || "Untitled Build"}
              </TypographyH3>
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="gap-1">
                <User className="h-3 w-3" />
                <span className="text-xs">
                  {build.user?.email?.split("@")[0] || "Anonymous"}
                </span>
              </Badge>
              {componentCount > 0 && (
                <Badge variant="outline" className="gap-1">
                  <Package className="h-3 w-3" />
                  <span className="text-xs">{componentCount} parts</span>
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
            asChild
          >
            <Link href={`/builds/${build.id}`}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit build</span>
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0 space-y-3">
        {componentCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-lg border-muted">
            <Cpu className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">
              No components added yet
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Start adding parts to your build
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Components
            </p>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {build.components.map((bc, index) => (
                <div
                  key={bc.id}
                  className="flex items-center gap-2 text-sm py-1 border-b border-border/50 last:border-0"
                >
                  <div className="w-1 h-1 rounded-full bg-primary/60" />
                  <span className="text-foreground/80 line-clamp-1">
                    {bc.component.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col pt-4 border-t border-border/50">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold tracking-tight">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(build.totalPrice)}
              </span>
            </div>
            {formattedDate && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Created {formattedDate}</span>
              </div>
            )}
          </div>
          {children && (
            <div className="flex flex-row gap-2 items-center">{children}</div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
