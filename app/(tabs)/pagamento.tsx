import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Pagamento() {
  const router = useRouter();
  const { carrinho, total } = useLocalSearchParams();
  const [formaPagamento, setFormaPagamento] = useState('');

  let carrinhoDetalhado: MenuItem[] = [];
  let totalCalculado = '0.00';

  try {
    if (typeof carrinho === 'string') {
      carrinhoDetalhado = JSON.parse(carrinho);
      totalCalculado = carrinhoDetalhado.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);
    }
  } catch (error) {
    console.error('Erro ao decodificar carrinho:', error);
    Alert.alert('Erro', 'Erro ao carregar dados do carrinho');
  }

  const finalizarCompra = () => {
    if (!formaPagamento) {
      Alert.alert('Atenção', 'Por favor, selecione a forma de pagamento.');
      return;
    }

    if (carrinhoDetalhado.length === 0) {
      Alert.alert('Erro', 'Carrinho vazio. Adicione produtos antes de finalizar.');
      return;
    }

    router.push({
      pathname: '/recibo',
      params: {
        carrinho: JSON.stringify(carrinhoDetalhado),
        total: totalCalculado,
        formaPagamento,
      },
    });
  };

  const voltarParaCardapio = () => {
    router.replace('/listaProdutos'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 Finalizar Pagamento</Text>

      {carrinhoDetalhado.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Carrinho vazio ou erro ao carregar.</Text>
          <TouchableOpacity style={styles.voltarButton} onPress={voltarParaCardapio}>
            <Text style={styles.voltarText}>Voltar ao Cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Resumo do Pedido:</Text>
          <ScrollView style={styles.scroll}>
            {carrinhoDetalhado.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.item}>
                <View style={styles.itemInfo}>
                  <Text style={styles.nome}>{item.name}</Text>
                  <Text style={styles.descricao}>{item.description}</Text>
                </View>
                <Text style={styles.preco}>R$ {item.price.toFixed(2)}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: R$ {totalCalculado}</Text>
          </View>

          <Text style={styles.label}>Escolha a forma de pagamento:</Text>
          <View style={styles.paymentOptions}>
            {[
              { key: 'PIX', label: 'PIX', icon: '🟢' },
              { key: 'Cartão Débito', label: 'Débito', icon: '🧾' },
              { key: 'Cartão Crédito', label: 'Crédito', icon: '💰' }
            ].map((opcao) => (
              <TouchableOpacity
                key={opcao.key}
                style={[
                  styles.paymentButton,
                  formaPagamento === opcao.key && styles.paymentSelected,
                ]}
                onPress={() => setFormaPagamento(opcao.key)}
              >
                <Text style={styles.paymentIcon}>{opcao.icon}</Text>
                <Text
                  style={[
                    styles.paymentText,
                    formaPagamento === opcao.key && styles.paymentTextSelected,
                  ]}
                >
                  {opcao.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, !formaPagamento && styles.buttonDisabled]}
            onPress={finalizarCompra}
            disabled={!formaPagamento}
          >
            <Text style={styles.buttonText}>
              {formaPagamento ? `Pagar com ${formaPagamento}` : 'Selecione forma de pagamento'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={voltarParaCardapio}>
            <Text style={styles.cancelText}>Voltar ao Cardápio</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20
  },
  title: {
    fontSize: 23,
    color: '#8c8787',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left'
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20
  },
  scroll: {
    marginBottom: 20,
    maxHeight: 300,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#222',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: 'darkgreen'
  },
  itemInfo: {
    flex: 1,
    marginRight: 10
  },
  nome: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  descricao: {
    color: 'gray',
    fontSize: 14,
    marginTop: 2
  },
  preco: {
    color: 'lightgreen',
    fontSize: 16,
    fontWeight: 'bold'
  },
  totalContainer: {
    marginBottom: 20,
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'darkgreen'
  },
  totalText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 10
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#444',
    backgroundColor: '#222',
    alignItems: 'center',
  },
  paymentSelected: {
    borderColor: 'lightgreen',
    backgroundColor: '#333'
  },
  paymentIcon: {
    fontSize: 20,
    marginBottom: 5
  },
  paymentText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },
  paymentTextSelected: {
    color: 'lightgreen'
  },
  button: {
    backgroundColor: 'darkgreen',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10
  },
  buttonDisabled: {
    backgroundColor: '#666'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  cancelButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
  },
  cancelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  },
  voltarButton: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 10,
  },
  voltarText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});
