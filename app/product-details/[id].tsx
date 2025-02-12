import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


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


export default function ProductDetails() {
  const appUrl = process.env.EXPO_PUBLIC_APP_URL
  const { id } = useLocalSearchParams<{id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true)
 useEffect(() => {
  const fetchProduct = async () => {
    try {
      console.log('Starting fetch for product id:', id);
      const response = await fetch(`${appUrl}/products/${id}`);
      console.log('Response received:', response);
      if (!response.ok) {
        console.error('Response not OK, status:', response.status);
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      console.log('Product data received:', data);
      setProduct(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch product details');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  if (id) {
    fetchProduct();
  } else {
    setError('No product ID provided');
    setLoading(false);
  }
}, [id, appUrl]);


  
const handleIncreaseStock = () => {
    if (!product) return;
    const newStock = { id: Date.now(), quantity: 1 };
    setProduct({ ...product, stocks: [...product.stocks, newStock] });
  };

  const handleDecreaseStock = () => {
    if (!product) return;
    if (product.stocks.length === 0) return; 
    setProduct({ ...product, stocks: product.stocks.slice(0, product.stocks.length - 1) });
  };
  if(loading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size= "large" color="#000" />
      </View>
    )
  }

  if(error){
    return(
      <View style={styles.container}>
        <Text style= {styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <View>
      <Image source={{uri: product?.image}} style={styles.productImage} />
      <Text style={styles.productName}>{product?.name}</Text>
      <Text style={styles.productType}>Type: {product?.type}</Text>
      <Text style={styles.productPrice}>Price: ${product?.price}</Text>
      <Text style={styles.productSupplier}>Supplier: {product?.supplier}</Text>
      <Text style={styles.productStock}>Stock: {product?.stocks.length}</Text>
      <View style={styles.buttonRow}>
            <Button title="Increase Stock" onPress={handleIncreaseStock} />
            <Button title="Decrease Stock" onPress={handleDecreaseStock} />
          </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productType: {
    fontSize: 16,
    color: '#555',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productSupplier: {
    fontSize: 16,
    color: '#777',
  },
  productStock: {
    fontSize: 16,
    color: '#777',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
