import {useGetIdentity} from "@refinedev/core";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";
import type {User} from "@/types";

export function UserAvatar() {
    const {data: user, isLoading: userIsLoading} = useGetIdentity<User>();

    if (userIsLoading || !user) {
        return (
            <Skeleton
                className={cn(
                    "h-10",
                    "w-10",
                    "rounded-full"
                )}
            />
        );
    }

    return (
        <Avatar
            className={cn(
                "h-10",
                "w-10",
                "border",
                "border-border",
                "cursor-pointer"
            )}
        >
            {user.image && (
                <AvatarImage
                    src={user.image}
                    alt={user.name}
                />
            )}

            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {getInitials(user.name)}
            </AvatarFallback>
        </Avatar>
    );
}

const getInitials = (name = "") => {
    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 0) {
        return "?";
    }

    if (parts.length === 1) {
        return parts[0][0]?.toUpperCase() ?? "?";
    }

    return `${parts[0][0] ?? ""}${
        parts[parts.length - 1][0] ?? ""
    }`.toUpperCase();
};

UserAvatar.displayName = "UserAvatar";