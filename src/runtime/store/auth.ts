import { defineStore } from 'pinia';
import type { User } from '../../types';

export type State = {
  user: User | null;
};

export type Getters = {
  loggedIn: boolean;
};

export type Actions = {
  setUser(user: User | null): void;
};

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): State => {
    return {
      user: null,
    };
  },

  getters: {
    loggedIn(): boolean {
      return !!this.user;
    },
  },

  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
  },
});
