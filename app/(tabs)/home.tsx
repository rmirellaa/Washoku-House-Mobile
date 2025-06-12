import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/AuthContext';

export default function Home() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();



  const handleLogout = () => {
    Alert.alert(
      'Confirmar Saída',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/'); 
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍣 Washoku House</Text>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Bem-vindo(a),{' '}
          <Text style={styles.username}>
            {currentUser || 'Usuário'}
          </Text>
          !
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Inspirado nos izakayas e sushiyas do Japão, o restaurante se destaca pela
        qualidade dos ingredientes frescos, pela apresentação impecável dos pratos
        e pelo ambiente acolhedor com decoração japonesa. O objetivo é oferecer uma
        jornada sensorial completa, tornando cada refeição uma ocasião especial de
        conexão, cultura e celebração. Venha conhecer nosso restaurante!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/listaProdutos')}
      >
        <Text style={styles.buttonText}>Ver Cardápio</Text>
      </TouchableOpacity>

      {/* Botão de Sair */}
      <TouchableOpacity
        style={[styles.secondaryButton, styles.logoutButton]} 
        onPress={handleLogout}
      >
        <Text style={styles.secondaryButtonText}>Sair</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Logado como: {currentUser || 'Desconhecido'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#111' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#D90429', 
    textAlign: 'center',
    marginBottom: 16
  },
  welcomeContainer: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  username: {
    color: '#D90429',
    fontWeight: 'bold'
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'justify', 
    marginVertical: 20, 
    color: 'white',
    lineHeight: 24
  },
  button: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: { 
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutButton: { 
    backgroundColor: '#8B0000', 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  infoContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center'
  },
  infoText: {
    color: '#ccc',
    fontSize: 12,
    fontStyle: 'italic'
  }
});





