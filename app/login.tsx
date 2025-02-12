import { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { router } from 'expo-router';
import { saveUserSession } from '../utils/storage';


interface Warehouseman {
  id: string; 
  name: string;
  dob: string;
  city: string;
  secretKey: string;
  warehouseId: number;
}

export default function Login() {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.9.33:3000/warehousemans');
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      //fetch users as houseman
      const users = (await response.json()) as Warehouseman[];
      console.log('Fetched users:', users);

      //to check for id type it's a string
      users.forEach((u) => console.log(`User id: ${u.id}, type: ${typeof u.id}`));

      //consoling the users id
      const searchId = Number(userId.trim());
      console.log('Looking for user with ID:', searchId);

      //finding the user with specified id
      const user = users.find((u: Warehouseman) => Number(u.id) === searchId);

      if (user) {
        console.log('User found, navigating to tabs...');
        await saveUserSession(user);
        router.replace('/(tabs)');
      } else {
        console.log('No matching user found for ID:', userId);
        setError('Invalid ID');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Check your connection.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User's ID"
        value={userId}
        onChangeText={setUserId}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.buttonContainer}>
        <Button title="login" onPress={handleLogin} />
      </View>
    </View>
  );
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
