"use client";

import type { Component } from "@/lib/types";
import { useCallback, useState } from "react";
import { TypographyH1 } from "./ui/typography";
import { Button } from "./ui/button";
import TableParts from "./table-parts";
import { componentCategories } from "@/lib/constants";
import { SaveBuildDialog } from "./save-build-dialog";
import { Save } from "lucide-react";

export const CurrentBuild = () => {
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, Component | null>
  >({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const onSelectComponent = useCallback(
    (categoryId: string, component: Component | null) => {
      setSelectedByCategory((prev) => ({
        ...prev,
        [categoryId]: component,
      }));
    },
    [],
  );

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH1>Build your PC</TypographyH1>
        <Button onClick={() => setSaveDialogOpen(true)}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <TableParts
          components={componentCategories}
          onSelectComponent={onSelectComponent}
          selectedByCategory={selectedByCategory}
        />
        <SaveBuildDialog
          open={saveDialogOpen}
          onOpenChange={setSaveDialogOpen}
          selectedByCategory={selectedByCategory}
        />
      </div>
    </>
  );
};
