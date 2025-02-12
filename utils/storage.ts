import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserSession = async (user: any) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('User session saved:', user);
    } catch (err) {
        console.error('Failed to save user session:', err);
    }
};

export const getUserSession = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null
}

export const clearUserSession = async (user: any) => {
    await AsyncStorage.removeItem('user');
} 