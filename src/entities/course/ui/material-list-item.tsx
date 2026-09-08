import type { ReactNode } from "react";

import { FileTextIcon } from "lucide-react";

import { formatFileSize } from "@/shared/lib/format-file-size";

type MaterialListItemProps = {
  title: string;
  fileName: string;
  fileSize: number;
  action: ReactNode;
};

export function MaterialListItem({
  title,
  fileName,
  fileSize,
  action,
}: MaterialListItemProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <FileTextIcon
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">
          {fileName} · {formatFileSize(fileSize)}
        </p>
      </div>
      {action}
    </li>
  );
}
