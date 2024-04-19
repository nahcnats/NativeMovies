import { Platform, Keyboard, NativeModules } from "react-native";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ENV_VAR } from '@env';

// import { useUserStore } from "../store/userStore";;

export const queryClient = new QueryClient();
export const IS_ANDROID = Platform.OS === 'android';

const fetchBaseUrl = (): string => {
    let BASE_URL;

    if (NativeModules.RNConfig.env === (IS_ANDROID ? 'internal' : 'Internal')) {
        BASE_URL = ENV_VAR.TMDB_BASE_URL;
    } else if (NativeModules.RNConfig.env === (IS_ANDROID ? 'staging' : 'Staging')) {
        BASE_URL = ENV_VAR.TMDB_BASE_URL;
    } else {
        BASE_URL = ENV_VAR.TMDB_BASE_URL;
    }

    return BASE_URL;
}

// const request_token = useUserStore.getState().value.request_token;

// TODO:: implement axios interceptors
export const server = axios.create({
    baseURL: fetchBaseUrl(),
    headers: {
        'Content-type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${ENV_VAR.TMDB_TOKEN}`,
        // 'Authorization': `Bearer ${request_token}`,
        'Accept': 'application/json'
    }
});

export const dismissKeyboard = () => {
    Keyboard.dismiss();
    return false;
}

export const apiErrorHandler = (error: Error) => {
    let message = 'Opps, something went wrong!';

    if (error.message) {
        message = error.message;
    }

    return new Error(message);
}