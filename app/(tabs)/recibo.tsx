
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Recibo() {
  const router = useRouter();
  const { carrinho, total, formaPagamento } = useLocalSearchParams();

  let carrinhoDetalhado: MenuItem[] = [];
  let totalPago = typeof total === 'string' ? parseFloat(total).toFixed(2) : '0.00';
  let metodoPagamento = typeof formaPagamento === 'string' ? formaPagamento : 'Não informado';

  try {
    if (typeof carrinho === 'string') {
      carrinhoDetalhado = JSON.parse(carrinho);
    }
  } catch (error) {
    console.error('Erro ao decodificar carrinho no recibo:', error);
  }

  const voltarParaHome = () => {
    router.replace('/home');
  };

  const fazerNovoPedido = () => {
    router.replace('/listaProdutos');
  };

  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const horaFormatada = dataAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>🍣 Washoku House</Text>
          <Text style={styles.pageSubtitle}>Recibo do Pedido</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTextStrong}>Pedido: #{Math.floor(Math.random() * 100000)}</Text>
          <Text style={styles.infoText}>Data: {dataFormatada} às {horaFormatada}</Text>
        </View>

        <Text style={styles.sectionTitle}>Itens do Pedido:</Text>

        {carrinhoDetalhado.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum item no recibo.</Text>
        ) : (
          carrinhoDetalhado.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.itemCard}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
              </View>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
          ))
        )}

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Forma de Pagamento:</Text>
            <Text style={styles.summaryValuePayment}>{metodoPagamento}</Text>
          </View>
          <View style={styles.summaryRowTotal}>
            <Text style={styles.totalLabel}>Total Pago:</Text>
            <Text style={styles.totalValue}>R$ {totalPago}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusIcon}>✅</Text>
          <Text style={styles.statusText}>Pagamento Confirmado!</Text>
          <Text style={styles.statusSubtext}>Obrigado por seu pedido! Ele já está sendo preparado com carinho.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={fazerNovoPedido}>
            <Text style={styles.primaryButtonText}>Fazer Novo Pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={voltarParaHome}>
            <Text style={styles.secondaryButtonText}>Voltar para o Início</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#111111',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D90429',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 20,
    color: '#8c8787',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#D90429'
  },
  infoTextStrong: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  infoText: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#c7c2c2',
    marginBottom: 15,
  },
  emptyText: {
    color: '#AAAAAA',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: '#1A1A1A',
    marginBottom: 10,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  itemPrice: {
    color: '#90EE90',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 25,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#444444',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  summaryValuePayment: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D90429',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#1A2E1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#006400',
  },
  statusIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#90EE90',
    marginBottom: 8,
  },
  statusSubtext: {
    fontSize: 15,
    color: '#DDDDDD',
    textAlign: 'justify',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#006400',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  secondaryButton: {
    backgroundColor: '#333333',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});