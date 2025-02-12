import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
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
  const { id } = useLocalSearchParams<{id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true)
  useEffect(() =>{
    const fetchProduct = async () =>{
      try{
      const response = await fetch(`http://192.168.9.33:3000/products/${id}`)
      if(!response.ok){
        console.log(`Http error ${response.status}`)
      }

      const data = await response.json();
      setProduct(data);
    }
  catch(err){
    console.log(err);
    setError('Failed fetching product')
  }finally{
    setLoading(false)
  }
  if(id){
  fetchProduct();
  }
}
  }, [])
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
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
