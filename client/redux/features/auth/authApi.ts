import { apiSlice } from "../api/apiSlice";
import {
  userLoggedIn,
  userLoggedOut,
  userRegistration,
} from "./authSlice";
import Cookies from "js-cookie";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  avatar?: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationResponse {
  message: string;
  activationToken: string;
}

export interface ActivationRequest {
  activation_token: string;
  activation_code: string;
}

export interface ActivationResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SocialAuthRequest {
  name: string;
  email: string;
  avatar?: string;
}

export interface SocialAuthResponse {
  accessToken: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (body) => ({
        url: "registration",
        method: "POST",
        body,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userRegistration({ token: data.activationToken }));
        } catch (e) {
          console.error(e);
        }
      },
    }),

    activation: builder.mutation<ActivationResponse, ActivationRequest>({
      query: (body) => ({
        url: "activate-user",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("accessToken", data.accessToken);
          Cookies.set("refreshToken", data.refreshToken);
          dispatch(
            userLoggedIn({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              user: data.user,
            })
          );
        } catch (e) {
          console.error(e);
        }
      },
    }),

    socialAuth: builder.mutation<SocialAuthResponse, SocialAuthRequest>({
      query: (body) => ({
        url: "social-auth",
        method: "POST",
        body,
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled ;
          dispatch(
            userLoggedIn({
              accessToken: data.accessToken,
              refreshToken:"",
              user: data.user,
            })
          );
        } catch (e) {
          console.error(e);
        }
      },
    }),

    logOut: builder.query<LogoutResponse, void>({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
