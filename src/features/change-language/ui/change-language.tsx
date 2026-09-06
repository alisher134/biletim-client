import { buttonVariants } from "@/shared/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

export function ChangeLanguage() {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "font-medium text-base gap-1 items-center",
        )}
      >
        <span className="uppercase text-muted-foreground">Каз</span>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </PopoverTrigger>

      <PopoverContent className="w-40">
        <PopoverHeader>
          <PopoverTitle>Выберите язык</PopoverTitle>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
