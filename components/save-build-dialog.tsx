"use client";

import { saveBuildAction, SaveBuildFromState } from "@/app/dashboard/actions";
import { Component } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
};

const initialState: SaveBuildFromState = { status: "idle" };

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath,
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(saveBuildAction, initialState);

  const componentIds = useMemo(
    () =>
      Object.values(selectedByCategory)
        .filter((componnet): componnet is Component => componnet !== null)
        .map((component) => component.id),
    [selectedByCategory],
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Build saved", {
        style: {
          background: "lab(8 0 0)",
          border: "1px solid #bfcb6c",
          color: "var(--primary)",
          fontFamily: "var(--font-mono)",
        } as React.CSSProperties,
      });

      formRef.current?.reset();
      onOpenChange(false);

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.refresh();
      }
    }
  }, [onOpenChange, redirectPath, router, state.status]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formRef.current?.reset();
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save build</DialogTitle>
          <DialogDescription>Write a name for your build</DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Build name"
            defaultValue={defaultName}
            required
          />
          <input
            type="hidden"
            name="componentIds"
            value={componentIds.join(",")}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={pending || componentIds.length === 0}
            >
              {pending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
