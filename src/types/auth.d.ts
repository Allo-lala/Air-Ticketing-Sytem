export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  }
  
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, name: string) => Promise<void>;
  }
  