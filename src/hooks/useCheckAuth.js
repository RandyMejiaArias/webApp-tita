import { useEffect } from "react";
import nextSnkrsApi from '../api/titaApi';
import { useAuthStore } from "../store/auth/auth.store";

export const useCheckAuth = () => {

  const userStatus = useAuthStore(state => state.status);

  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    const fetchUser = async () => {
      const userToken = localStorage.getItem('userToken');
      if(!userToken) return logout();
      try {
        const { data: userData } = await nextSnkrsApi.get(
          'users/me'
        )

        if(!userData) return logout();

      } catch ({ response, request, message }) {
        console.log({ response, request, message })
        if(response) {
          logout()
        }else if(request) {
          logout()
        }else 
          logout()
      }
    }

    fetchUser()
  }, []);

  return { userStatus };
}