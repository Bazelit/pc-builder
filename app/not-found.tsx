"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-xl border-0">
        <CardHeader className="space-y-4">
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Page not found
          </CardTitle>
          <CardDescription className="text-base">
            Sorry, the page you are looking for does not exist or was moved.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск по сайту..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <div className="text-sm text-muted-foreground">
            You might be interested in:
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button variant="link" size="sm" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard">Create Build</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/builds">My Builds</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/builds/explore">Publick Builds</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
