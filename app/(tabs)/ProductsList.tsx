import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  Pressable, 
  TextInput 
} from 'react-native';
import type { RelativePathString } from 'expo-router';

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

  // Search/filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');

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

  
  const computeTotalQuantity = (product: Product) => {
    return (product.stocks?.reduce((acc: number, stock: any) => acc + (stock.quantity || 0), 0)) || 0;

  };

  const filteredProducts = products.filter((product) => {
    const lowerQuery = searchQuery.toLowerCase();
    const productQuantity = computeTotalQuantity(product);

   
    const matchesSearch = 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.type.toLowerCase().includes(lowerQuery) ||
      product.supplier.toLowerCase().includes(lowerQuery) ||
      product.barcode.toLowerCase().includes(lowerQuery) ||
      product.price.toString().includes(lowerQuery);

    
    let matchesPrice = true;
    if (minPrice !== '') {
      matchesPrice = matchesPrice && product.price >= parseFloat(minPrice);
    }
    if (maxPrice !== '') {
      matchesPrice = matchesPrice && product.price <= parseFloat(maxPrice);
    }

    
    let matchesQuantity = true;
    if (minQuantity !== '') {
      matchesQuantity = matchesQuantity && productQuantity >= parseFloat(minQuantity);
    }
    if (maxQuantity !== '') {
      matchesQuantity = matchesQuantity && productQuantity <= parseFloat(maxQuantity);
    }

    return matchesSearch && matchesPrice && matchesQuantity;
  });

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
          <Text style={styles.productQuantity}>
            Quantity: {computeTotalQuantity(item)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
    
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      
      <View style={styles.filterRow}>
        <TextInput
          style={styles.filterInput}
          placeholder="Min Price"
          value={minPrice}
          onChangeText={setMinPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Max Price"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
        />
      </View>

     
      <View style={styles.filterRow}>
        <TextInput
          style={styles.filterInput}
          placeholder="Min Quantity"
          value={minQuantity}
          onChangeText={setMinQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Max Quantity"
          value={maxQuantity}
          onChangeText={setMaxQuantity}
          keyboardType="numeric"
        />
      </View>

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
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterInput: {
    flex: 0.48,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
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
  productQuantity: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
