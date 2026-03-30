import { auth } from "@/auth";
import { BuildCard } from "@/components/build-card";
import { DeleteBuildButton } from "@/components/delete-build-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";
import { getMyBuilds } from "@/lib/builds";
import {
  Plus,
  Computer,
  AlertCircle,
  Share2,
  Lock,
  LockIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { deleteBuildAction, setBuildPublicAction } from "./actions";

export default async function MyBuilds() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/login");
  }

  const builds = await getMyBuilds(session.user.id);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <TypographyH3 className="text-3xl md:text-4xl font-bold tracking-tight">
              My Builds
            </TypographyH3>
            <p className="text-muted-foreground mt-2">
              Manage and organize your custom PC configurations
            </p>
          </div>
          <Button asChild className="group gap-2">
            <Link href="/dashboard">
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
              New Build
            </Link>
          </Button>
        </div>

        {builds.length === 0 ? (
          <Card className="border-dashed border-2 bg-background/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Computer className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">No builds yet</CardTitle>
              <CardDescription className="max-w-md mb-6">
                Start creating your first PC build. Choose components and create
                your dream configuration.
              </CardDescription>
              <Button asChild variant="default">
                <Link href="/dashboard">Create Your First Build</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <BuildCard key={build.id} build={build}>
                <DeleteBuildButton
                  buildId={build.id}
                  deleteAction={deleteBuildAction}
                />
                <form action={setBuildPublicAction} className="contents">
                  <input type="hidden" name="buildId" value={build.id} />
                  <input
                    type="hidden"
                    name="isPublic"
                    value={build.isPublic ? "false" : "true"}
                  />
                  <Button
                    type="submit"
                    variant={build.isPublic ? "secondary" : "ghost"}
                    size="sm"
                  >
                    {build.isPublic ? (
                      <LockIcon
                        className={`h-4 w-4 ${!build.isPublic ? "fill-background" : ""}`}
                      />
                    ) : (
                      <Share2
                        className={`h-4 w-4 ${build.isPublic ? "fill-background" : ""}`}
                      />
                    )}
                    <span className="md:hidden ml-2">
                      {build.isPublic ? "Private" : "Public"}
                    </span>
                  </Button>
                </form>
              </BuildCard>
            ))}
          </div>
        )}

        {builds.length > 0 && (
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
                Pro Tips
              </CardTitle>
              <CardDescription>
                Make the most out of your PC builds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="font-medium text-sm">💡 Compare Performance</p>
                  <p className="text-xs text-muted-foreground">
                    Check benchmarks and reviews for your components
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">🔄 Check Compatibility</p>
                  <p className="text-xs text-muted-foreground">
                    Ensure all parts work together perfectly
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">📊 Share Your Build</p>
                  <p className="text-xs text-muted-foreground">
                    Get feedback from the community
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
