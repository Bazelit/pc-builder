import { auth } from "@/auth";
import { BuildCard } from "@/components/build-card";
import { TypographyH2 } from "@/components/ui/typography";
import { getPublickBuilds } from "@/lib/builds";
import { notFound } from "next/navigation";
import { toggleLikeAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default async function ExplorePage() {
  const session = await auth();

  if (!session?.user.id) {
    notFound();
  }

  const builds = await getPublickBuilds(session.user.id);

  return (
    <>
      <div className="py-6">
        <TypographyH2>Public Builds</TypographyH2>
        <br />
        {builds.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {builds.map((build) => {
              const isLiked =
                Array.isArray(build.likes) && build.likes.length > 0;

              return (
                <BuildCard key={build.id} build={build}>
                  <div className="flex flex-wrap gap-2">
                    <form action={toggleLikeAction} className="contents">
                      <input type="hidden" name="buildId" value={build.id} />
                      <Button
                        type="submit"
                        variant={isLiked ? "destructive" : "outline"}
                        size="sm"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        {isLiked ? "Unlike" : "Like"}
                        <span className="ml-2 font-bold">{build.likes.length}</span>
                      </Button>
                      <span className="sr-only">likes</span>
                    </form>
                  </div>
                </BuildCard>
              );
            })}
          </div>
        ) : (
          <p>No builds found</p>
        )}
      </div>
    </>
  );
}
