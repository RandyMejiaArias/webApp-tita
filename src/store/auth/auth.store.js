
import titaApi from "../../api/titaApi";
import { persist } from 'zustand/middleware';
import { AxiosError } from 'axios';
import { create } from "zustand";

const authStore = (set) => ({
  status: 'checking', //'checking', 'not-authenticated', 'authenticated'
  token: undefined,
  user: undefined,
  errorMessage: undefined,

  loginUser: async (email, password) => {
    try {
      const { data } = await titaApi.post(
        '/auth/signin', 
        { email, password }
      );

      const { token } = data.data;
      localStorage.setItem('userToken', token);

      const { data: userData } = await titaApi.get(
        '/users/me'
      );

      set({
        status: 'authenticated',
        token,
        user: userData,
        errorMessage: undefined
      })
    } catch (error) {
      if(error instanceof AxiosError) {
        set( { status: 'not-authenticated', token: undefined, user: undefined, errorMessage: error.response.data.message } );
        throw 'Unauthorized';
      } else {
        set( { status: 'not-authenticated', token: undefined, user: undefined, errorMessage: 'Unable to login' } );
      }
      throw 'Unauthorized';
    }
  },

  logout: () => set({ status: 'not-authenticated', token: undefined, user: undefined }),
    
  checkingCredentials: () => set({ status: 'checking' })
});

export const useAuthStore = create(
  persist(
    authStore
  )
);