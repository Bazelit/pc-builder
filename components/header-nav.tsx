"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  CpuIcon,
  Users,
  LogIn,
  LogOut,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  session: Session | null;
};

export default function HeaderNav({ session }: Props) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session?.user) {
    return (
      <div className="flex justify-end">
        <Button variant="default" size="sm" asChild className="gap-2">
          <Link href="/login">
            <LogIn className="h-4 w-4" />
            Log in
          </Link>
        </Button>
      </div>
    );
  }

  const userInitial = session.user.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1" />

      <div className="flex justify-center">
        <Tabs value={tabValue} className="w-fit">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="dashboard" asChild>
              <Link href="/dashboard" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="builds" asChild>
              <Link href="/builds" className="gap-2">
                <CpuIcon className="h-4 w-4" />
                <span className="hidden sm:inline">My Builds</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="explore" asChild>
              <Link href="/builds/explore" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Explore</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/builds" className="cursor-pointer">
                  <CpuIcon className="h-4 w-4" />
                  My Builds
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/" })}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
