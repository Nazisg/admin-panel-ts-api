// import { createApi } from '@reduxjs/toolkit/query/react'

// import { APIBaseQuery } from '../axiosBase';
// import { UserApiType } from '@/shared/types';



// export const userApi = createApi({
//     reducerPath: 'userApi',
//     baseQuery: APIBaseQuery,
//     tagTypes: ['User'],

//     endpoints: (builder) => ({
//         getUserById: builder.query<UserApiType, number>({
//             query: (id: number) => ({
//                 url: `users/${id}`
//             }),
//             providesTags: ['User']
//         }),
//     }),
// })

// export const {
//     useGetUserByIdQuery
// } = userApi

