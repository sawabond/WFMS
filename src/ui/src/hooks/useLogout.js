import useAuth from './useAuth';

export default function useLogout() {
  const { setUser } = useAuth();

  function logOut() {
    setUser(null);
    sessionStorage.removeItem('user');
  }
  return logOut;
}
