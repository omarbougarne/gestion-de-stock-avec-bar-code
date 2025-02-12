import React, { useState } from 'react'

import { useRouter } from 'expo-router';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

export default function AddProduct() {
  const appUrl = process.env.EXPO_PUBLIC_APP_URL;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  // const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [solde, setSolde] = useState('');
  const [supplier, setSupplier] = useState('');
  // const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleAddProduct = async () =>{
  if(!name || !type || !price || !solde || !supplier ){
    setError('Please fill in all fields.');
      return;
  }
  setLoading(true);
  setError('')

  try{
    const response = await fetch(`${appUrl}/products`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        type,
        price,
        solde,
        supplier,
        // image
      })
    });
    if(!response.ok){
      throw new Error(`Http error ${response.status}`)
    }
    const newProduct = await response.json();
    console.log("Aded Product", newProduct);

    Alert.alert('Success', 'Product added successfully!');

    router.replace('/(tabs)')

  }catch(err){
    console.error('Failed to add product:', err);
      setError('Failed to add product. Please try again.');
  }finally{
    setLoading(false)
  }

  }
   return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Solde"
        value={solde}
        onChangeText={setSolde}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Supplier"
        value={supplier}
        onChangeText={setSupplier}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      /> */}
      <Button
        title={loading ? 'Adding...' : 'Add Product'}
        onPress={handleAddProduct}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center'
  }
});
