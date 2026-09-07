function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("ru-RU").format(amount)} ₸`;
}

export function formatPlanPrice(amount: number) {
  return formatPrice(amount);
}

export function formatPlanPricePerMonth(total: number, months: number) {
  return formatPrice(Math.round(total / months));
}

export const planPricing = [
  { id: "month1", months: 1, price: 9990, href: "/sign-up" as const },
  { id: "month3", months: 3, price: 26990, href: "/sign-up" as const },
  { id: "month6", months: 6, price: 49990, href: "/sign-up" as const },
  {
    id: "month12",
    months: 12,
    price: 89990,
    href: "/sign-up" as const,
    featured: true,
  },
] as const;
