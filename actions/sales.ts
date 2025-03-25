"use server";

import { cookies } from "next/headers";

export async function fetchWeekdaySalesCount(
  organization_id: string,
  product_id: string,
  date_range_end: string,
  date_range_start?: string,
  sale_status?: string
) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!organization_id || !product_id || !date_range_end) {
      return { error: "Missing required query parameters" };
    }

    const url = new URL("https://api.timbu.cloud/sales/weekday-count");
    url.searchParams.append("organization_id", organization_id);
    url.searchParams.append("product_id", product_id);
    url.searchParams.append("date_range_end", date_range_end);

    if (date_range_start)
      url.searchParams.append("date_range_start", date_range_start);
    if (sale_status) url.searchParams.append("sale_status", sale_status);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Cookie: refreshToken ? `refresh_token=${refreshToken}` : "",
      },
    });

    if (!res.ok) {
      return { error: "Failed to fetch sales data", status: res.status };
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error in server action:", error);
    return { error: "Internal Server Error", details: error?.message || error };
  }
}
