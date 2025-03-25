"use server";

import { cookies } from "next/headers";

export async function fetchWeekdaySalesCount(
  organization_id: string,
  product_id: string,
  date_range_end?: string,
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
    const params = {
      organization_id,
      product_id,
      date_range_start,
      date_range_end,
      sale_status,
    };

    // Append only provided parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    // Ensure at least one parameter is provided
    if (!url.searchParams.toString()) {
      return { error: "At least one query parameter is required." };
    }

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
