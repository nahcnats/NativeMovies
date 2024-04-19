import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage, zustandStorage } from './storage';

export type AuthState = {
    username: string,
    request_token: string  
}

type UserState = {
    value: AuthState,
    logIn: (value: AuthState) => void,
    logOut: () => void,
}

const user = {
    username: '',
    request_token: ''
} as AuthState;

export const useUserStore = create(
    persist<UserState>(
        (set, get) => ({
            value: user,
            logIn: (value: AuthState) => set((state) => {
                return {...state.value, value: value};
            }),
            logOut: () => set((state) => {
                storage.clearAll();

                return {
                    value: user
                }
            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
)