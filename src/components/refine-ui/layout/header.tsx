import {useActiveAuthProvider, useGetIdentity, useLogout, useRefineOptions,} from "@refinedev/core";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {ThemeToggle} from "@/components/refine-ui/theme/theme-toggle";
import {UserAvatar} from "@/components/refine-ui/layout/user-avatar";
import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {LogOutIcon, UserIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import type {User} from "@/types";

export const Header = () => {
    const {isMobile} = useSidebar();

    return <>{isMobile ? <MobileHeader/> : <DesktopHeader/>}</>;
};

function DesktopHeader() {
    return (
        <header
            className={cn(
                "sticky",
                "top-0",
                "flex",
                "h-16",
                "shrink-0",
                "items-center",
                "gap-4",
                "border-b",
                "border-border",
                "bg-sidebar",
                "pr-3",
                "justify-end",
                "z-40"
            )}
        >
            <ThemeToggle/>
            <UserDropdown/>
        </header>
    );
}

function MobileHeader() {
    const {open, isMobile} = useSidebar();
    const {title} = useRefineOptions();

    return (
        <header
            className={cn(
                "sticky",
                "top-0",
                "flex",
                "h-12",
                "shrink-0",
                "items-center",
                "gap-2",
                "border-b",
                "border-border",
                "bg-sidebar",
                "pr-3",
                "justify-between",
                "z-40"
            )}
        >
            <SidebarTrigger
                className={cn(
                    "text-muted-foreground",
                    "rotate-180",
                    "ml-1",
                    {
                        "opacity-0": open,
                        "opacity-100": !open || isMobile,
                        "pointer-events-auto": !open || isMobile,
                        "pointer-events-none": open && !isMobile,
                    }
                )}
            />

            <div
                className={cn(
                    "whitespace-nowrap",
                    "flex",
                    "flex-row",
                    "h-full",
                    "items-center",
                    "justify-start",
                    "gap-2",
                    "transition-discrete",
                    "duration-200",
                    {
                        "pl-3": !open,
                        "pl-5": open,
                    }
                )}
            >
                <div>{title.icon}</div>

                <h2
                    className={cn(
                        "text-sm",
                        "font-bold",
                        "transition-opacity",
                        "duration-200",
                        {
                            "opacity-0": !open,
                            "opacity-100": open,
                        }
                    )}
                >
                    {title.text}
                </h2>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle className={cn("h-8", "w-8")}/>
                <UserDropdown/>
            </div>
        </header>
    );
}

const UserDropdown = () => {
    const {mutate: logout, isPending: isLoggingOut} = useLogout();

    const authProvider = useActiveAuthProvider();

    const {data: user, isLoading} = useGetIdentity<User>();

    if (!authProvider?.getIdentity) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "rounded-full",
                        "outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-ring",
                        "focus-visible:ring-offset-2"
                    )}
                >
                    <UserAvatar/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64"
            >
                {/* User information */}
                <div className="px-3 py-3">
                    <div className="flex items-center gap-3">
                        <UserAvatar/>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                                {isLoading
                                    ? "Loading..."
                                    : user?.name ?? "User"}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                                {user?.email ?? ""}
                            </p>
                        </div>
                    </div>

                    {/* Role */}
                    {user?.role && (
                        <div className="mt-3">
                            <span
                                className={cn(
                                    "inline-flex",
                                    "items-center",
                                    "rounded-full",
                                    "px-2.5",
                                    "py-1",
                                    "text-xs",
                                    "font-semibold",
                                    "bg-primary/10",
                                    "text-primary"
                                )}
                            >
                                {user.role.toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator/>

                <DropdownMenuItem
                    disabled
                    className="cursor-default"
                >
                    <UserIcon/>
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>

                <DropdownMenuItem
                    onClick={() => {
                        logout();
                    }}
                    disabled={isLoggingOut}
                >
                    <LogOutIcon
                        className="text-destructive"
                    />

                    <span className="text-destructive">
                        {isLoggingOut
                            ? "Logging out..."
                            : "Logout"}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Header.displayName = "Header";
MobileHeader.displayName = "MobileHeader";
DesktopHeader.displayName = "DesktopHeader";