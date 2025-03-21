import { api } from '@/redux/api';
import type {
  APIResponse,
  PaginatedRequest,
  PaginatedResponse,
} from '@/types/global';

// TODO: add these in your types.ts see auth.api.ts for more information
// interface StockBase {
//   // Types
// }

// interface CreateStockRequest extends StockBase {
//   // Types
// }

// interface EditStockRequest extends StockBase {
//   // Types
// }

// interface StockResponse extends StockBase {
//   // Types
// }

export const accessControlApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getStocks: builder.query<PaginatedResponse<StockResponse>, number>({
    //   query: (page = 1) => `stocks/?page=${page}`,
    //   providesTags: ['Stock'],
    // }),
    // createStock: builder.mutation<
    //   APIResponse<StockResponse>,
    //   CreateStockRequest
    // >({
    //   query: (values) => ({
    //     url: 'stocks',
    //     method: 'POST',
    //     body: values,
    //   }),
    //   invalidatesTags: ['Stock'],
    // }),
    // editStock: builder.mutation<APIResponse<StockResponse>, EditStockRequest>({
    //   query: (values) => ({
    //     url: `stocks/${values.id}`,
    //     method: 'PUT',
    //     body: values,
    //   }),
    //   invalidatesTags: (result) => [{ type: 'Stock', id: result?.data?.id }],
    // }),
    // deleteStock: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `stocks/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Stock'],
    // }),
  }),
});

export const {
  // useGetStocksQuery,
  // useCreateStockMutation,
  // useEditStockMutation,
  // useDeleteStockMutation,
} = accessControlApi;
