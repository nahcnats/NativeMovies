import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';

type AuthState = {
    username: string,
    request_token: string  
}

type UserState = {
    value: AuthState,
    logIn: (value: AuthState) => void,
    logOut: () => void,
}

export const useUserStore = create(
    persist<UserState>(
        (set, get) => ({
            value: {
                username: '',
                request_token: ''
            },
            logIn: (value: AuthState) => set((state) => {
                return {...state.value, value: value};
            }),
            logOut: () => set((state) => {
                return {
                    value: {
                        username: '',
                        request_token: ''
                    }
                }
            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
)