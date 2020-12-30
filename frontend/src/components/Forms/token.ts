const AUTH_TOKEN = 'access-token';

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: any) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);