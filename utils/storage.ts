import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserSession = async (user: any) => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
}

export const getUserSession = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null
}

export const clearUserSession = async (user: any) => {
    await AsyncStorage.removeItem('user');
} 