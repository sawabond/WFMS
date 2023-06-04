import useAuth from './useAuth';

export default function useAuthHeaders() {
  const { user } = useAuth();

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: user?.data?.token ? `Bearer ${user.data.token}` : null,
    },
  };

  return headers;
}
