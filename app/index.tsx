
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import Login from './login';

export default function LandingPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App!</Text>
      <Login />
      <Link href="/(tabs)" asChild>
        <Button title="Explore as Guest" />
      </Link>
    </View>
  );
}