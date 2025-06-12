import React, { createContext, useContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

// Interface do usuário
export interface User {
  username: string;
  password: string;
}

// Interface do contexto
interface AuthContextType {
  users: User[];
  currentUser: string | null;
  validateLogin: (username: string, password: string) => boolean;
  userExists: (username: string) => boolean;
  addUser: (username: string, password: string) => Promise<boolean>; 
  login: (username: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


const initialUsers: User[] = [
  { username: 'admin', password: '123' },
  { username: 'cliente', password: 'abc' }
];

const USERS_FILE_URI = FileSystem.documentDirectory + 'users.json';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const loadUsersFromFile = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(USERS_FILE_URI);
        if (fileInfo.exists) {
          console.log('Arquivo users.json encontrado. Carregando...');
          const fileContent = await FileSystem.readAsStringAsync(USERS_FILE_URI);
          const parsedUsers = JSON.parse(fileContent);
          if (Array.isArray(parsedUsers)) {
            setUsers(parsedUsers);
          } else {
            console.warn('Conteúdo de users.json não é um array. Usando initialUsers.');
            setUsers(initialUsers);
            await saveUsersToFile(initialUsers); 
          }
        } else {
          console.log('Arquivo users.json não encontrado. Criando com initialUsers...');
          setUsers(initialUsers);
          await saveUsersToFile(initialUsers);
        }
      } catch (error) {
        console.error('Erro ao carregar usuários do arquivo:', error);
       
        setUsers(initialUsers);
        await saveUsersToFile(initialUsers).catch(e => console.error("Falha ao salvar initialUsers após erro de carregamento:", e));
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsersFromFile();
  }, []);

  const saveUsersToFile = async (usersToSave: User[]) => {
    try {
      const jsonString = JSON.stringify(usersToSave, null, 2); 
      await FileSystem.writeAsStringAsync(USERS_FILE_URI, jsonString);
      console.log('Usuários salvos em users.json');
    } catch (error) {
      console.error('Erro ao salvar usuários no arquivo:', error);
    }
  };

  const validateLogin = (username: string, password: string): boolean => {
    if (loadingUsers) return false; // Não valida se ainda está carregando
    return users.some(user => user.username === username && user.password === password);
  };

  const userExists = (username: string): boolean => {
    if (loadingUsers) return true; // Assume que existe para evitar cadastro duplicado enquanto carrega
    return users.some(user => user.username === username);
  };

  const addUser = async (username: string, password: string): Promise<boolean> => {
    if (loadingUsers) {
        console.warn("Tentativa de adicionar usuário enquanto os dados estão carregando.");
        return false;
    }
    if (userExists(username)) {
      return false;
    }
    const newUser = { username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    await saveUsersToFile(updatedUsers);
    return true;
  };

  const login = (username: string): void => {
    setCurrentUser(username);
  };

  const logout = (): void => {
    setCurrentUser(null);
  };

  if (loadingUsers) {
   
    console.log("AuthContext: Carregando usuários...");
  }


  return (
    <AuthContext.Provider value={{
      users,
      currentUser,
      validateLogin,
      userExists,
      addUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}


