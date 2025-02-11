import { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { router } from 'expo-router';
import { saveUserSession } from '../utils/storage';


export default function login() {

  const [userId, setUserId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () =>{
    try{
    const response = await fetch('http:/192.168.8.201:3000/warehousemans');
    const users = await response.json();

    const user = users.find(
        (u: { id: number; secretKey: string; }) => u.id === Number(userId) && u.secretKey === secretKey
      );
      if(user){
        await saveUserSession(user);
        router.replace('/(tabs)/products');
      }else{
        setError("Invalid ID or secret key")
      }
    }catch(err){
      setError('Login failed. Check your connection.');
    }

  }

  return (
    <View>
      <TextInput 
      placeholder="User's ID"
      value={userId}
      onChangeText={setUserId}
      
      />
      <TextInput 
      placeholder="User's Secret"
      value={secretKey}
      onChangeText={setSecretKey}
      
      />
    
    {error && <Text>{error}</Text>}
    <View>
      <button></button>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f0f0f0', 
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
