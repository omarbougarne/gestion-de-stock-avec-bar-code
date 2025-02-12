import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
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

  

  return (
    <View>

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});
