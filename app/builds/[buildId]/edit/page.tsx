import { auth } from "@/auth";
import { EditBuildForm } from "@/components/edit-build-form";
import { getBuildToEdit } from "@/lib/builds";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ buildId: string }>;
};

export default async function EditBuildPage({ params }: Props) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const { buildId } = await params;

  const build = await getBuildToEdit(buildId);

  if (!build) {
    return;
  }

  const buildComponents = build?.components.map((buildComponent) => ({
    id: buildComponent.component.id,
    name: buildComponent.component.name,
    price: buildComponent.component.price,
    type: buildComponent.component.type,
    socket: buildComponent.component.socket,
  }));

  return (
    <div className="py-6">
      <EditBuildForm buildName={build.name} buildComponents={buildComponents} />
    </div>
  );
  // 6.33
}
