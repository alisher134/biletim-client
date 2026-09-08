export type SubscriptionPlan = {
  id: string;
  slug: string;
  title: string;
  durationMonths: number;
  priceKzt: number;
};

export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";

export type UserSubscription = {
  id: string;
  status: SubscriptionStatus;
  startsAt: string;
  expiresAt: string;
  remainingSeconds: number;
  remainingDays: number;
  isExpired: boolean;
  monthlyPriceKzt: number;
  plan: SubscriptionPlan;
};

export type MySubscription = {
  isActive: boolean;
  subscription: UserSubscription | null;
};

export type GrantSubscriptionInput = {
  planId: string;
};
