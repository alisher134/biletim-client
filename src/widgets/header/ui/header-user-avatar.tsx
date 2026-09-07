import { Show } from "@/shared/ui/show";

import { getUserInitials } from "../lib/get-user-initials";

type HeaderUserAvatarProps = {
  name: string;
  avatarUrl?: string;
};

export function HeaderUserAvatar({ name, avatarUrl }: HeaderUserAvatarProps) {
  return (
    <span className="relative flex size-7 shrink-0 overflow-hidden rounded-full bg-primary/10">
      <Show
        when={avatarUrl != null}
        data={avatarUrl}
        fallback={
          <span className="flex size-full items-center justify-center text-xs font-medium text-primary">
            {getUserInitials(name)}
          </span>
        }
      >
        {(url) => <img src={url} alt="" className="size-full object-cover" />}
      </Show>
    </span>
  );
}
