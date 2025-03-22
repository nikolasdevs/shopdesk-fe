import axiosRequest from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const token = req.headers.get('authorization');
    const organization_id = url.searchParams.get('organization_id');

    const productResponse = await axiosRequest.get(
      `/products?organization_id=${organization_id}`
    );

    const productData = await productResponse.json();

    const productIds = productData.map((product: Product) => product.id);

    const response = await axiosRequest.post(
      `/stocks/by-products?organization_id=${organization_id}`,
      {
        product_ids: productIds,
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 }
    );
  }
}
