// eslint-disable-next-line no-undef
export const API_URL = process.env.NODE_ENV === 'test' ? "localhost:3000" : import.meta.env.VITE_API_URL;