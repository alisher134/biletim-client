import { apiClient } from "@/shared/api";

import { parsePurchaseLink } from "../lib/parse-subscription";
import type { PurchaseLink } from "../model/types";

export async function getPurchaseLink(): Promise<PurchaseLink> {
  const { data } = await apiClient.get("/subscriptions/purchase-link");

  return parsePurchaseLink(data);
}
