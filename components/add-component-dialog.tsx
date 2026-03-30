// add-component-dialog.tsx
"use client";

import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import ComponentCard from "./component-card";
import { getComponentsByCategory } from "@/app/dashboard/actions";
import { Spinner } from "./ui/spinner";
import type { Component } from "@/lib/types";
import { Search, Cpu, Filter } from "lucide-react";

type Props = {
  categoryId: string;
  categoryName: string;
  onSelect: (component: Component) => void;
};

export default function AddComponentDialog({
  categoryId,
  categoryName,
  onSelect,
}: Props) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getComponentsByCategory(categoryId).then((data) => {
      setComponents(data);
      setLoading(false);
      setFilteredComponents(data);
    });
  }, [categoryId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredComponents(components);
    } else {
      const filtered = components.filter((component) =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredComponents(filtered);
    }
  }, [searchQuery, components]);

  return (
    <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
      <DialogHeader className="px-6 pt-6 pb-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Add Component to{" "}
              <span className="text-primary">{categoryName}</span>
            </DialogTitle>
            <DialogDescription className="mt-1.5">
              Choose a component to add to your build
            </DialogDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <Cpu className="h-3 w-3" />
            {filteredComponents.length} available
          </Badge>
        </div>
      </DialogHeader>

      <div className="px-6 py-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner className="h-8 w-8" />
            <p className="text-sm text-muted-foreground mt-3">
              Loading components...
            </p>
          </div>
        ) : filteredComponents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                name={component.name}
                price={component.price}
                onClick={() => onSelect(component)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              No components found
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "No components available in this category"}
            </p>
          </div>
        )}
      </ScrollArea>
    </DialogContent>
  );
}
