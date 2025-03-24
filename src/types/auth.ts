export interface AuthData {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null | undefined;
}

export interface User {
  email: string;
  name: string;
  id: string;
  role: string;
}
