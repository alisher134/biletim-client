"use client";

import { useTranslations } from "next-intl";

import { MaterialListItem } from "@/entities/course/ui/material-list-item";
import type { LessonMaterial } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { Show } from "@/shared/ui/show";
import { showErrorToast } from "@/shared/utils";

import { useDownloadMaterial } from "../model/use-download-material";

type LessonMaterialsProps = {
  materials: LessonMaterial[];
};

export function LessonMaterials({ materials }: LessonMaterialsProps) {
  const t = useTranslations("lessonPlayer");
  const { mutate, isPending } = useDownloadMaterial();
  const sortedMaterials = [...materials].sort(
    (left, right) => left.order - right.order,
  );

  const handleDownload = (materialId: string) => {
    mutate(materialId, {
      onSuccess: (result) => {
        window.open(result.downloadUrl, "_blank", "noopener,noreferrer");
      },
      onError: (error) => {
        showErrorToast(getErrorMessage(error, t("errors.downloadFailed")));
      },
    });
  };

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{t("materials")}</h2>

      <Show
        when={sortedMaterials.length > 0}
        fallback={
          <p className="text-sm text-muted-foreground">{t("noMaterials")}</p>
        }
      >
        <ul className="divide-y divide-border rounded-xl border border-border">
          {sortedMaterials.map((material) => (
            <MaterialListItem
              key={material.id}
              title={material.title}
              fileName={material.fileName}
              fileSize={material.fileSize}
              action={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleDownload(material.id)}
                >
                  {t("download")}
                </Button>
              }
            />
          ))}
        </ul>
      </Show>
    </section>
  );
}
