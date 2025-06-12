import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, Image, StyleSheet,
  TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import menuData from '../../assets/data/menu.json';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export default function ListaProdutos() {
  const router = useRouter();
  const [carrinho, setCarrinho] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (menuData) {
      setTimeout(() => setLoading(false), 500); 
      Alert.alert('Erro', 'Não foi possível carregar o cardápio.');
      setLoading(false);
    }
  }, []);

  const adicionarAoCarrinho = (produto: MenuItem) => {
    setCarrinho([...carrinho, produto]);
    Alert.alert('🍣 Adicionado!', `${produto.name} foi adicionado ao carrinho.`);
  };

  const removerDoCarrinho = (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const total = carrinho.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const realizarPagamento = () => {
    if (carrinho.length > 0) {
      router.push({
        pathname: '/pagamento',
        params: { carrinho: JSON.stringify(carrinho), total },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#D90429" />
        <Text style={styles.loadingText}>Carregando cardápio...</Text>
      </View>
    );
  }

  if (!menuData || menuData.length === 0) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Cardápio não disponível no momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>🍣 Cardápio</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {menuData.map((category: MenuCategory, categoryIndex: number) => (
          <View key={`${category.category}-${categoryIndex}`} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            {category.items.map((produto: MenuItem) => (
              <View key={produto.id} style={styles.card}>
                <Image source={{ uri: produto.image }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.nome}>{produto.name}</Text>
                  <Text style={styles.descricao}>{produto.description}</Text>
                  <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => adicionarAoCarrinho(produto)}
                  >
                    <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}

        {carrinho.length > 0 && (
          <View style={styles.carrinhoBox}>
            <Text style={styles.carrinhoTitle}>🛒 Carrinho:</Text>
            {carrinho.map((item, index) => (
              <View key={`${item.id}-cart-${index}`} style={styles.itemCarrinho}>
                <Text style={styles.itemText}>{item.name} - R$ {item.price.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => removerDoCarrinho(index)}>
                  <Text style={styles.removerText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))}
             <View style={styles.totalCarrinhoContainer}>
                <Text style={styles.totalCarrinhoText}>Subtotal: R$ {total}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {carrinho.length > 0 && (
        <View style={styles.footerControls}>
          <View style={styles.totalFinalContainer}>
            <Text style={styles.totalFinalText}>Total: R$ {total}</Text>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={realizarPagamento}>
            <Text style={styles.payButtonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#111111',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0, 
    flex: 1, 
  },
  loadingText: { color: '#FFFFFF', marginTop: 15, fontSize: 18 },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#8c8787',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006400', 
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#333333',
    textAlign: 'left',
  },
  scrollContainer: { paddingBottom: 150 },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#333333',
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444444'
  },
  cardContent: {
    flex: 1,
  },
  nome: { fontWeight: 'bold', fontSize: 18, color: '#FFFFFF', marginBottom: 5 },
  descricao: { color: '#BBBBBB', marginVertical: 4, fontSize: 14, lineHeight: 20 },
  preco: { color: '#90EE90', fontWeight: 'bold', fontSize: 17, marginBottom: 10 },
  addButton: {
    backgroundColor: '#006400',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  carrinhoBox: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    borderTopWidth: 2,
    borderTopColor: '#006400'
  },
  carrinhoTitle: { color: '#FFFFFF', fontSize: 20, marginBottom: 15, fontWeight: 'bold' },
  itemCarrinho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#444444',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  itemText: { color: '#FFFFFF', fontSize: 16 },
  removerText: { color: '#D90429', fontWeight: 'bold', fontSize: 14 },
  totalCarrinhoContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#444444',
    alignItems: 'flex-end'
  },
  totalCarrinhoText: {
    fontSize: 16,
    color: '#BBBBBB',
    fontWeight: 'bold',
  },
  footerControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalFinalContainer: {
     flex: 1, 
  },
  totalFinalText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
  },
  payButtonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});