"use client";

import { Component, dbTypeToCategoryId } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";
import { TypographyH3 } from "./ui/typography";
import TableParts from "./table-parts";
import { componentCategories } from "@/lib/constants";
import { Button } from "./ui/button";
import { SaveBuildDialog } from "./save-build-dialog";

type buildComponentInput = {
  id: string;
  name: string;
  price: number;
  type: Component["type"];
  socket: string | null;
};

type Props = {
  buildName: string;
  buildComponents: buildComponentInput[];
};

function buildInitialSelected(
  buildComponents: buildComponentInput[],
): Record<string, Component | null> {
  const selected: Record<string, Component | null> = {};

  for (const c of buildComponents) {
    const categoryId = dbTypeToCategoryId[c.type];

    if (categoryId) {
      selected[categoryId] = {
        id: c.id,
        name: c.name,
        price: c.price,
        type: c.type,
        socket: c.socket,
      };
    }
  }

  return selected;
}

export function EditBuildForm({ buildName, buildComponents }: Props) {
  const initialSelected = useMemo(
    () => buildInitialSelected(buildComponents),
    [buildComponents],
  );
  const [selectedByCategory, setSelectedByCategory] =
    useState<Record<string, Component | null>>(initialSelected);
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
        <TypographyH3>Edit - {buildName}</TypographyH3>
        <Button onClick={() => setSaveDialogOpen(true)}>Save</Button>
      </div>

      <div className="flex justify-center">
        <TableParts
          components={componentCategories}
          selectedByCategory={selectedByCategory}
          onSelectComponent={onSelectComponent}
        />
      </div>
      <SaveBuildDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        selectedByCategory={selectedByCategory}
        defaultName={buildName}
        redirectPath="/builds"
      />
    </>
  );
}
