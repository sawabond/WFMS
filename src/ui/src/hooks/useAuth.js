import { useContext } from 'react';
import { userContext } from '../Contexts/userContext';

export default function useAuth() {
  return useContext(userContext);
}
