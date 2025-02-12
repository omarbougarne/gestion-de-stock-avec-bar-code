import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, Pressable } from 'react-native';
import type { RelativePathString } from 'expo-router';
import SearchBar from '../_components/SearchBar'; 

interface Product {
  id: number;
  name: string;
  type: string;
  barcode: string;
  price: number;
  solde: number;
  supplier: string;
  image: string;
  stocks: any[];
  editedBy: any[];
}

export default function ProductsList() {
  const appUrl = process.env.EXPO_PUBLIC_APP_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${appUrl}/products`);
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        setProducts(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [appUrl]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => (
    <Link
      href={(`/product-details/${item.id.toString()}` as unknown) as RelativePathString}
      asChild
    >
      <Pressable>
        <View style={styles.productContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productType}>{item.type}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <SearchBar query={searchQuery} onChangeQuery={setSearchQuery} placeholder="Search products..." />
      <FlatList 
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productType: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
