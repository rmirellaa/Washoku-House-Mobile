import { Stack } from 'expo-router';
import { AuthProvider } from '../../utils/AuthContext'; 

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Login',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="register" 
          options={{ 
            title: 'Cadastro',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="home" 
          options={{ 
            title: 'Home',
            headerShown: false,
           
            gestureEnabled: false
          }} 
        />
        <Stack.Screen 
          name="listaProdutos" 
          options={{ 
            title: 'Cardápio',
            headerShown: false 
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}


