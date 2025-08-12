import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// create AuthContext with null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider typed props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const authData = localStorage.getItem("authData");
    return authData ? (JSON.parse(authData).user as User) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const authData = localStorage.getItem("authData");
    return authData ? (JSON.parse(authData).isLoggedIn) : false
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("authData", JSON.stringify({ user, isLoggedIn }));
    } else {
      localStorage.removeItem("authData");
    }
  }, [user, isLoggedIn]);

  const login = (user: User) => {
    setIsLoggedIn(true);
    setUser(user);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
