import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base.query";
import { CreateVendorRequest, CreateVendorResponse, IVendor } from "@/app/@types/vendor.type";
import { ApiResponse } from "@/app/@types/base.type";

export enum VendorTags {
    USER = "Vendor",
    USERS= "Vendors",
}

const vendorApi = createApi({
    reducerPath: "vendorApi",
    baseQuery: baseQuery,
    tagTypes: Object.values(VendorTags),
    endpoints: (builder) => ({
        createVendor: builder.mutation<CreateVendorResponse,CreateVendorRequest>({
            query: (vendorData) => ({
                url: "vendors",
                method: "POST",
                body: vendorData,
            }),
            invalidatesTags: [VendorTags.USERS],
        }),
        updateVendor: builder.mutation<CreateVendorResponse,{vendorId: string,vendorData: Partial<CreateVendorRequest>}>({
            query: ({ vendorId, vendorData }) => ({
                url: `vendors/${vendorId}`,
                method: "PATCH",
                body: vendorData,
            }),
            invalidatesTags:(_, error, { vendorId }) => [{ type: VendorTags.USER, id: vendorId }, VendorTags.USERS],
        }),
        deleteVendor: builder.mutation<any, string>({
            query: (vendorId) => ({
                url: `vendors/${vendorId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, error, vendorId) => [{ type: VendorTags.USER, id: vendorId }, VendorTags.USERS],
        }),
        getVendor: builder.query<CreateVendorResponse, string>({
            query: (vendorId) => ({
                url: `vendors/${vendorId}`,
                method: "GET",
            }),
            providesTags: (result, error, vendorId) => [{ type: VendorTags.USER, id: vendorId }, VendorTags.USERS],
        }),
        getVendors: builder.query<ApiResponse<IVendor[]>, string>({
            query: (params) => {
                const queryString = new URLSearchParams(params).toString();
                return {
                    url: `vendors?${queryString}`,
                    method: "GET",
                };
            },
            providesTags: [VendorTags.USERS],
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