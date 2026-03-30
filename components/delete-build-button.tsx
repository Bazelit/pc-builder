"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";

type Props = {
  buildId: string;
  deleteAction: (formData: FormData) => void;
};

export function DeleteBuildButton({ buildId, deleteAction }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (
      !confirm(
        "Are you sure you want to delete this build? This action cannot be undone.",
      )
    ) {
      return;
    }

    const fd = new FormData();
    fd.set("buildId", buildId);

    startTransition(() => {
      deleteAction(fd);
    });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size={"sm"}
      disabled={isPending}
      onClick={handleClick}
    >
      Delete Build
    </Button>
  );
}
