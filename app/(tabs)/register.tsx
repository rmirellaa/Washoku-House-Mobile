import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/AuthContext';

export default function TelaRegister() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userExists, addUser, login } = useAuth();

  const handleRegister = async () => { 
    if (!usuario.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (senha.length < 3) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 3 caracteres');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(usuario.trim())) {
      Alert.alert('Erro', 'O nome de usuário deve conter apenas letras, números e underscore');
      return;
    }

    setLoading(true);

    try {
      
      const username = usuario.trim();

      if (userExists(username)) { 
        Alert.alert('Erro', 'Este nome de usuário já está em uso. Escolha outro.');
        setLoading(false); 
        return;
      }

      const success = await addUser(username, senha); 

      if (success) {
        login(username); 
        router.replace('/home'); 
      } else {
       
        Alert.alert('Erro', 'Não foi possível cadastrar o usuário. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Cadastre-se </Text>

      <TextInput
        placeholder="Nome de usuário"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        maxLength={20}
      />

      <TextInput
        placeholder="Senha (mín. 3 caracteres)"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        editable={!loading}
        maxLength={50}
      />

      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        style={styles.input}
        editable={!loading}
        maxLength={50}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={[styles.buttonText, { marginLeft: 8 }]}>Cadastrando...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={navigateToLogin} 
        disabled={loading}
      >
        <Text style={styles.linkText}>Já tem conta? Faça login</Text>
      </TouchableOpacity>

      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>Regras para cadastro:</Text>
        <Text style={styles.tipsText}>• Nome de usuário único (apenas letras, números e _)</Text>
        <Text style={styles.tipsText}>• Senha com pelo menos 3 caracteres</Text>
        <Text style={styles.tipsText}>• Confirme sua senha corretamente</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#D90429',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    color: 'white',
    backgroundColor: '#222',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#930d0d',
  },
  buttonDisabled: {
    backgroundColor: '#666',
    elevation: 0,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#D90429',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  tips: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  tipsTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipsText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 3,
  },
});