export interface AuthServiceProps {
  login: (username: string, password: string) => Promise<number | void>;
  isLoggedIn: boolean;
  logout: () => void;
}
