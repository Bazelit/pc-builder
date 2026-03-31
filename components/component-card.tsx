import { Plus, Star, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

type Props = {
  name: string;
  price: number;
  rating?: number;
  popularity?: number;
  onClick?: () => void;
};

export default function ComponentCard({ 
  name, 
  price, 
  rating, 
  popularity,
  onClick 
}: Props) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-secondary/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
            {name}
          </CardTitle>
          {popularity && popularity > 80 && (
            <Badge variant="secondary" className="shrink-0 gap-1">
              <TrendingUp className="h-3 w-3" />
              Popular
            </Badge>
          )}
        </div>
        <CardDescription className="text-lg font-bold text-primary mt-2">
          {formatPrice(price)}
        </CardDescription>
      </CardHeader>

      {rating && (
        <CardContent className="pt-0 pb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
        </CardContent>
      )}

      <CardFooter className="pt-2">
        <Button
          onClick={onClick}
          className="w-full gap-2 group/btn"
          size="sm"
          variant="default"
        >
          <Plus className="h-4 w-4 group-hover/btn:rotate-90 transition-transform" />
          Add to Build
        </Button>
      </CardFooter>
    </Card>
  );
}