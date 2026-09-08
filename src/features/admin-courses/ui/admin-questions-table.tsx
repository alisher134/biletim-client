"use client";

import { useState } from "react";

import { TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Question } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { ConfirmDeleteDialog } from "@/shared/ui/confirm-delete-dialog";
import { Show } from "@/shared/ui/show";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { showSuccessToast } from "@/shared/utils";

import { useDeleteQuestion } from "../model/use-delete-question";
import { QuestionDialog } from "./question-dialog";

type AdminQuestionsTableProps = {
  courseId: string;
  testId: string;
  questions: Question[];
};

export function AdminQuestionsTable({
  courseId,
  testId,
  questions,
}: AdminQuestionsTableProps) {
  const t = useTranslations("adminCourses");
  const { mutate, isPending } = useDeleteQuestion(courseId, testId);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const sortedQuestions = [...questions].sort(
    (left, right) => left.order - right.order,
  );

  const handleDelete = (questionId: string) =>
    new Promise<void>((resolve, reject) => {
      mutate(questionId, {
        onSuccess: () => {
          showSuccessToast(t("successDelete"));
          resolve();
        },
        onError: (error) => {
          reject(new Error(getErrorMessage(error, t("errors.deleteFailed"))));
        },
      });
    });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{t("questions")}</h2>
        <Button type="button" onClick={() => setIsCreateOpen(true)}>
          {t("addQuestion")}
        </Button>
      </div>

      <QuestionDialog
        courseId={courseId}
        testId={testId}
        question={editingQuestion ?? undefined}
        nextOrder={sortedQuestions.length}
        open={isCreateOpen || editingQuestion != null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setIsCreateOpen(false);
            setEditingQuestion(null);
          }
        }}
      />

      <Show
        when={sortedQuestions.length > 0}
        fallback={
          <p className="text-sm text-muted-foreground">{t("emptyQuestions")}</p>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("questionText")}</TableHead>
              <TableHead>{t("points")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="max-w-md truncate font-medium">
                  {question.text}
                </TableCell>
                <TableCell>{question.points}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingQuestion(question)}
                    >
                      {t("editQuestion")}
                    </Button>
                    <ConfirmDeleteDialog
                      title={t("deleteQuestionTitle")}
                      description={t("deleteQuestionDescription")}
                      confirmLabel={t("deleteConfirm")}
                      cancelLabel={t("deleteCancel")}
                      isPending={isPending}
                      onConfirm={() => handleDelete(question.id)}
                      trigger={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={t("deleteQuestionTitle")}
                        >
                          <TrashIcon aria-hidden />
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Show>
    </section>
  );
}
