import { createContext } from 'react';

export const userContext = createContext(sessionStorage.getItem('user')?.data);
