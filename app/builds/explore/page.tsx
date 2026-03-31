import { auth } from "@/auth";
import { BuildCard } from "@/components/build-card";
import { TypographyH2 } from "@/components/ui/typography";
import { getPublickBuilds } from "@/lib/builds";
import { notFound } from "next/navigation";
import { toggleLikeAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function ExplorePage() {
  const session = await auth();

  if (!session?.user.id) {
    notFound();
  }

  const builds = await getPublickBuilds(session.user.id);

  // Calculate some stats
  const totalBuilds = builds.length;
  const totalLikes = builds.reduce((sum, build) => sum + (build.likes?.length || 0), 0);
  const mostLikedBuild = builds.sort((a, b) => 
    (b.likes?.length || 0) - (a.likes?.length || 0)
  )[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <TypographyH2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Public Builds
            </TypographyH2>
          </div>
          <p className="text-muted-foreground mt-2">
            Discover amazing PC builds from the community. Get inspired and find your perfect configuration.
          </p>
        </div>

        {/* Stats Cards */}
        {totalBuilds > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Builds</p>
                    <p className="text-3xl font-bold mt-1">{totalBuilds}</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                    <p className="text-3xl font-bold mt-1">{totalLikes}</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/20">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {mostLikedBuild && (
              <Card className="border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Most Liked</p>
                      <p className="text-lg font-semibold mt-1 line-clamp-1">
                        {mostLikedBuild.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {mostLikedBuild.likes?.length || 0} likes
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-500/20">
                      <TrendingUp className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Builds Grid */}
        {totalBuilds > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {totalBuilds} public build{totalBuilds !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Sort by popularity
                </span>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {builds.map((build) => {
                const isLiked = Array.isArray(build.likes) && build.likes.length > 0;
                const likeCount = build.likes?.length || 0;

                return (
                  <BuildCard key={build.id} build={build}>
                    <form action={toggleLikeAction} className="w-full">
                      <input type="hidden" name="buildId" value={build.id} />
                      <Button
                        type="submit"
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        className={`
                          w-full gap-2 transition-all duration-200
                          ${isLiked 
                            ? "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg" 
                            : "hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                          }
                        `}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-transform ${isLiked ? "fill-current" : ""}`}
                        />
                        <span>{isLiked ? "Liked" : "Like"}</span>
                        {likeCount > 0 && (
                          <span className={`
                            ml-1 px-1.5 py-0.5 rounded-full text-xs font-medium
                            ${isLiked 
                              ? "bg-white/20" 
                              : "bg-muted text-muted-foreground"
                            }
                          `}>
                            {likeCount}
                          </span>
                        )}
                      </Button>
                    </form>
                  </BuildCard>
                );
              })}
            </div>
          </>
        ) : (
          <Card className="border-dashed border-2 bg-background/50 backdrop-blur-sm mt-8">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No public builds yet</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Be the first to share your PC build with the community!
              </p>
              <Button asChild variant="default">
                <a href="/dashboard">Create Your First Build</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}