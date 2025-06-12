import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/AuthContext'; 

export default function TelaLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { validateLogin, login } = useAuth();

  const handleLogin = async () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const isValid = validateLogin(usuario.trim(), senha);
      
      if (isValid) {
        login(usuario.trim());
        router.push('/home');
      } else {
        Alert.alert('Erro de login', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍣 Washoku House - Login</Text>

      <TextInput
        placeholder="Usuário"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={navigateToRegister}
        disabled={loading}
      >
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#111' 
  },
  title: { 
    fontSize: 20, 
    marginBottom: 24, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#D90429' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: 'lightgray', 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 16, 
    color: 'white', 
    backgroundColor: '#222' 
  },
  button: { 
    backgroundColor: 'darkgreen', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 15, 
    width: '100%', 
    alignItems: 'center', 
    backgroundColor: '#930d0d',
  },
  buttonDisabled: {
    backgroundColor: '#666'
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center'
   
  },
  linkText: {
    color: '#D90429',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  testUsers: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center'
  },
  testUsersTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8
  },
  testUsersText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 2
  }

});




