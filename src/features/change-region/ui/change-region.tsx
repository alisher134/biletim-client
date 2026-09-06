import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { SearchInput } from "@/shared/ui/search-input";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

export async function ChangeRegion() {
  const t = await getTranslations("changeRegion");

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "font-medium text-base gap-1 items-center",
        )}
      >
        <span className="font-medium">Алматы</span>
        <ChevronDownIcon className="size-4" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <SearchInput placeholder={t("searchPlaceholder")} />
      </DialogContent>
    </Dialog>
  );
}
