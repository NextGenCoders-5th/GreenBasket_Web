import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base.query";
import { CreateVendorRequest, CreateVendorResponse, IVendor } from "@/types/vendor.type";
import { ApiResponse } from "@/types/base.type";

export enum VendorTags {
    VENDOR = "Vendor",
    VENDORS= "Vendors",
}

const vendorApi = createApi({
    reducerPath: "vendorApi",
    baseQuery: baseQuery,
    tagTypes: Object.values(VendorTags),
    endpoints: (builder) => ({
        createVendor: builder.mutation<CreateVendorResponse,FormData>({
            query: (vendorData) => ({
                url: "vendors",
                method: "POST",
                body: vendorData,
            }),
            invalidatesTags: [VendorTags.VENDORS],
        }),
        updateVendor: builder.mutation<CreateVendorResponse,{vendorId: string,vendorData: Partial<CreateVendorRequest>}>({
            query: ({ vendorId, vendorData }) => ({
                url: `vendors/${vendorId}`,
                method: "PATCH",
                body: vendorData,
            }),
            invalidatesTags:(_, error, { vendorId }) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
        }),
        deleteVendor: builder.mutation<any, string>({
            query: (vendorId) => ({
                url: `vendors/${vendorId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, error, vendorId) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
        }),
        getVendor: builder.query<CreateVendorResponse, string>({
            query: (vendorId) => ({
                url: `vendors/${vendorId}`,
                method: "GET",
            }),
            providesTags: (result, error, vendorId) => [{ type: VendorTags.VENDOR, id: vendorId }, VendorTags.VENDORS],
        }),
        getVendors: builder.query<ApiResponse<IVendor[]>, string>({
            query: (params) => {
                const queryString = new URLSearchParams(params).toString();
                return {
                    url: `vendors?${queryString}`,
                    method: "GET",
                };
            },
            providesTags: [VendorTags.VENDORS],
        }),
    }),
})

export const {
    useCreateVendorMutation,
    useUpdateVendorMutation,
    useDeleteVendorMutation,
    useGetVendorQuery,
    useGetVendorsQuery,
} = vendorApi;
