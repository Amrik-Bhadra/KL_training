import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Image,
  Keyboard,
} from 'react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been made

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Don't search for empty strings

    Keyboard.dismiss(); // Hide the keyboard
    setLoading(true);
    setError('$');
    setHasSearched(true);
    setResults([]); // Clear previous results

    try {
      const response = await fetch(
        `https://dev.to/api/articles?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (e) {
      setError('Failed to fetch articles.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderArticle = ({ item }) => (
    <Pressable style={styles.card}>
      {item.cover_image && (
        <Image source={{ uri: item.cover_image }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardUser}>{item.user.name}</Text>
      </View>
    </Pressable>
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />;
    }
    if (error) {
      return <Text style={styles.messageText}>{error}</Text>;
    }
    if (!hasSearched) {
        return <Text style={styles.messageText}>Start exploring by searching for a topic.</Text>;
    }
    if (results.length === 0) {
      return <Text style={styles.messageText}>No articles found for "{searchQuery}".</Text>;
    }
    return (
      <FlatList
        data={results}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for tags, users, or titles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Allows searching by pressing "return"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  // Re-using card styles from the Home screen for consistency
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardUser: {
    fontSize: 14,
    color: '#666',
  },
});

