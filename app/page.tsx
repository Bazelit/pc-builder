import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";

import {
  ArrowRight,
  Cpu,
  Settings,
  Shield,
  Zap,
  Star,
  Users,
  Monitor,
  Server,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">

      <section className="relative  overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/5 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Cpu className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Build Your Dream PC</span>
            </div>

            <TypographyH1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
              Build Your <br />
              <span className="text-primary">Perfect Computer</span>
            </TypographyH1>

            <TypographyP className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Choose components, compare specifications, and build a powerful PC
              for gaming, work, or creativity. An intuitive builder helps you
              create the perfect setup.
            </TypographyP>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group text-lg px-8" asChild>
                <Link href="/dashboard">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link href="/builds/explore">
                  <Monitor className="mr-2 h-5 w-5" />
                  Pre-built Configs
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12">
              {[
                { label: "Pre-built Configs", value: "500+", icon: Star },
                { label: "Happy Customers", value: "10K+", icon: Users },
                { label: "Components", value: "1000+", icon: Server },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <TypographyH2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us?
            </TypographyH2>
            <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
              We help you build the perfect computer that will delight you for
              years to come
            </TypographyP>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Perfect Compatibility",
                description: "Automatic compatibility check for all components",
                color: "text-blue-500",
              },
              {
                icon: Settings,
                title: "Flexible Configuration",
                description: "Choose components for any task and budget",
                color: "text-green-500",
              },
              {
                icon: Zap,
                title: "Peak Performance",
                description: "Optimized builds for maximum performance",
                color: "text-yellow-500",
              },
              {
                icon: Shield,
                title: "Premium Reliability",
                description: "Only trusted brands and components",
                color: "text-red-500",
              },
              {
                icon: Star,
                title: "Expert Support",
                description: "Professional help with your component selection",
                color: "text-purple-500",
              },
              {
                icon: Monitor,
                title: "Easy Comparison",
                description: "Compare specifications of different components",
                color: "text-pink-500",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 hover:bg-background/5 backdrop-blur-sm"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-0 bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
            <CardContent className="p-8 md:p-12 text-center">
              <TypographyH2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Build Your Perfect PC?
              </TypographyH2>
              <TypographyP className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start building now and get personalized recommendations
              </TypographyP>
              <Button size="lg" className="group" asChild>
                <Link href="/dashboard">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
