import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ErrorScreenProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
};

export function ErrorPageElement({
  title = "Что-то пошло не так",
  description = "Попробуйте обновить страницу.",
  onRetry,
  onGoHome,
}: ErrorScreenProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <span className="text-xl" aria-hidden>
              !
            </span>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="text-center text-sm text-muted-foreground">
          {description}
        </CardContent>

        {(onRetry || onGoHome) && (
          <CardFooter className="flex justify-center gap-2">
            {onRetry && <Button onClick={onRetry}>Повторить</Button>}
            {onGoHome && (
              <Button variant="outline" onClick={onGoHome}>
                На главную
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
