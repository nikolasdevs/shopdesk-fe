"use server";

import { cookies } from "next/headers";
import { getAllProductIds } from ".";

export async function fetchStocks(organization_id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("organization_id:", organization_id);
    if (!organization_id) {
      return { error: "Missing organization_id" };
    }

    if (!accessToken) {
      return { error: "Missing authorization token" };
    }

    const productIds = await getAllProductIds(organization_id, accessToken);

    const stockRes = await fetch(
      `https://api.timbu.cloud/stocks/by-products?organization_id=${organization_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_ids: productIds }),
      }
    );

    if (!stockRes.ok) {
      return { error: "Failed to fetch stocks", status: stockRes.status };
    }

    return await stockRes.json();
  } catch (error: any) {
    console.error("Error in server action:", error);
    return { error: "Internal Server Error", details: error?.message || error };
  }
}
