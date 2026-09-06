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

export function ChangeRegion() {
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
          <DialogTitle>Выберите регион</DialogTitle>
        </DialogHeader>
        <SearchInput />
      </DialogContent>
    </Dialog>
  );
}
