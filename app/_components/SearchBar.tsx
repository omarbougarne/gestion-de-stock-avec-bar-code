import React from 'react'
import { TextInput, StyleSheet } from 'react-native';


interface SearchBarProps {
  query: string;
  onChangeQuery: (text: string) => void;
  placeholder?: string
}
export default function SearchBar({query, placeholder = 'search', onChangeQuery}: SearchBarProps) {
   return (
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      value={query}
      onChangeText={onChangeQuery}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});
