import { AxiosError } from "axios";
import { create } from "zustand";
import titaApi from "../../api/titaApi";
import { devtools } from "zustand/middleware";

const usersStore = (set, get) => ({
  users: [],
  total: 0,
  errorMessage: undefined,
  loading: false,

  getUsers: async () => {
    try {
      const { data } = await titaApi.get('/users');

      set({ users: data.data, total: data.total });
    } catch (error) {
      if(error instanceof AxiosError) {
        set( { users: [], total: 0, errorMessage: error.response.data.message } );
      } else {
        set( { users: [], total: 0, errorMessage: 'Unable to fetch users' } );
      }
      throw 'Server Error';
    }
  },

  createUser: async (user) => {
    try {
      const dataToSend = {
        ...user,
        password: user.username,
        role: 'user'
      }
      const { data } = await titaApi.post('/users', dataToSend);
      
      set({ users: [...get().users, data.data] });
    } catch (error) {
      if(error instanceof AxiosError) {
        set( { errorMessage: error.response.data.message } );
      } else {
        set( { errorMessage: 'Unable to create user' } );
      }
      throw 'Server Error';
    }
  },
  
  removeUser: async (userId) => {
    try {
      await titaApi.delete(`/users/admin/${userId}`);
      
      set({ users: get().users.filter(user => user.id !== userId) });
    } catch (error) {
      if(error instanceof AxiosError) {
        set( { errorMessage: error.response.data.message } );
      } else {
        set( { errorMessage: 'Unable to remove user' } );
      }
      throw 'Server Error';
    }
  },
  
  updateUser: (user) => set(state => ({ users: state.users.map(u => u.id === user.id ? user : u) })),

  confirmUser: async (token) => {
    try {
      set({ loading: true });
      await titaApi.get(`/users/confirm/${token}`);
      
      set({ loading: false });
    } catch (error) {
      if(error instanceof AxiosError) {
        set( { errorMessage: error.response.data.message, loading: false } );
      } else {
        set( { errorMessage: 'Unable to confirm user', loading: false } );
      }
      throw 'Server Error';
    }
  },
  
});

export const useUsersStore = create(
  devtools(
    usersStore
  )
);