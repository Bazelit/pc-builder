"use client";

import { Component, ComponentCategory } from "@/lib/types";
import {
  Box,
  Cpu,
  Fan,
  HardDrive,
  MemoryStick,
  Monitor,
  Plus,
  Server,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import AddComponentDialog from "./add-component-dialog";

const iconMap: Record<ComponentCategory["icon"], React.ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
};

type CategoryRow = {
  id: string;
  name: string;
  icon: string;
};

type Props = {
  components: CategoryRow[];
  selectedByCategory: Record<string, Component | null>;
  onSelectComponent: (categoryId: string, component: Component | null) => void;
};

export default function TableParts({
  components,
  selectedByCategory,
  onSelectComponent,
}: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const totalPrice = Object.values(selectedByCategory).reduce(
    (sum, component) => sum + (component?.price ?? 0),
    0,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map((category) => {
          const ComponentIcon = iconMap[category.icon];
          const selected = selectedByCategory[category.id];

          return (
            <TableRow key={category.id} className="my-2">
              <TableCell className="font-medium">
                <div className="flex tems-center">
                  <ComponentIcon className="h-5 w-5 mr-1" />
                </div>
              </TableCell>

              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{selected?.name ?? "-"}</TableCell>
              <TableCell>{selected?.price ?? "-"}</TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={openCategoryId === category.id}
                  onOpenChange={(open) =>
                    setOpenCategoryId(open ? category.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                      <Plus className="mr-1 h-4 w-4" />
                      {selected ? "Change" : "Select"}
                    </Button>
                  </DialogTrigger>
                  <AddComponentDialog
                    categoryId={category.id}
                    categoryName={category.name}
                    onSelect={(component) => {
                      onSelectComponent(category.id, component);
                      setOpenCategoryId(null);
                    }}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <p className="font-medium">Total price:</p>
            <p className="font-large text-gray-500">
              {new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              }).format(totalPrice)}
            </p>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
