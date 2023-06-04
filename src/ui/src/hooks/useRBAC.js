import jwt_decode from 'jwt-decode';
import useAuth from './useAuth';

function useRBAC() {
  const { user } = useAuth();

  let token;

  try {
    token = jwt_decode(user?.data?.token);
  } catch {
    return [];
  }

  return token.role.length === 1 ? [token.role] : token.role;
}

export default useRBAC;
