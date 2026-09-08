"use client";

import { useTranslations } from "next-intl";

import {
  getCourseNextActionLabelKey,
  getLearningNextActionHref,
  type LearningNextAction,
} from "@/entities/learning";
import { SUBSCRIPTION_PLANS_HREF } from "@/shared/config/routes";
import { LinkButton } from "@/shared/ui/link-button";
import { Show } from "@/shared/ui/show";

type CourseNextActionCtaProps = {
  courseSlug: string;
  nextAction: LearningNextAction | null | undefined;
  canAccess: boolean;
  isLoading: boolean;
};

export function CourseNextActionCta({
  courseSlug,
  nextAction,
  canAccess,
  isLoading,
}: CourseNextActionCtaProps) {
  const t = useTranslations("courses");

  if (isLoading || nextAction === undefined) {
    return null;
  }

  return (
    <Show
      when={nextAction != null}
      data={nextAction!}
      fallback={
        <p className="text-sm font-medium">{t("courseCompleted")}</p>
      }
    >
      {(action) => (
        <LinkButton
          href={
            canAccess
              ? getLearningNextActionHref(courseSlug, action)
              : SUBSCRIPTION_PLANS_HREF
          }
          size="sm"
        >
          {canAccess
            ? t(getCourseNextActionLabelKey(action))
            : t("viewPlans")}
        </LinkButton>
      )}
    </Show>
  );
}
