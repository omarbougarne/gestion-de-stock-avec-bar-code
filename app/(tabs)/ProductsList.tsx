import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
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

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.9.33:3000/products');
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
}, []);


  useEffect(() => {
  console.log('Updated products state:', products);
}, [products]);



  if(loading){
    return(
      <View>
        <ActivityIndicator size="large" color="#000"/>
      </View>
    )
  }

  if(error){
    return(
      <View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  const renderItem = ({item}: {item: Product}) => (
<View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productType}>{item.type}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>

  )
  return (
    <View>
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        
      />
    </View>
  )
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